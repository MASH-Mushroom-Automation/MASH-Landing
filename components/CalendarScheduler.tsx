'use client';

import { useEffect, useRef, useState, useId } from 'react';
import { getCalLink, type EventTypeKey } from '@/lib/cal-config';

interface CalendarSchedulerProps {
  eventType?: EventTypeKey;
  theme?: 'light' | 'dark' | 'auto';
  hideEventTypeDetails?: boolean;
  layout?: 'month_view' | 'week_view' | 'column_view';
}

export default function CalendarScheduler({ 
  eventType = '30min',
  theme = 'auto',
  hideEventTypeDetails = false,
  layout = 'month_view',
}: CalendarSchedulerProps) {
  const calInlineRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const uniqueId = useId();
  const namespace = `cal-${eventType}-${uniqueId.replace(/:/g, '')}`;

  useEffect(() => {
    const calLink = getCalLink(eventType);
    let isMounted = true;

    // Cal.com recommended async loader
    (function (C: Window, A: string, L: string) {
      const p = function (a: { q: unknown[] }, ar: IArguments) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...args: unknown[]) {
          const cal = C.Cal!;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement('script')).src = A;
            cal.loaded = true;
          }
          if (args[0] === L) {
            const api = function (...apiArgs: unknown[]) {
              p(api as unknown as { q: unknown[] }, apiArgs as unknown as IArguments);
            };
            const nsName = args[1] as string;
            (api as unknown as { q: unknown[] }).q = (api as unknown as { q: unknown[] }).q || [];
            if (typeof nsName === 'string') {
              cal.ns![nsName] = cal.ns![nsName] || api;
              p(cal.ns![nsName] as unknown as { q: unknown[] }, args as unknown as IArguments);
            } else {
              p(cal as unknown as { q: unknown[] }, args as unknown as IArguments);
            }
            return;
          }
          p(cal as unknown as { q: unknown[] }, args as unknown as IArguments);
        };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    // Initialize Cal with namespace
    window.Cal!('init', namespace, { origin: 'https://cal.com' });

    // Small delay to ensure DOM element is ready
    const initTimeout = setTimeout(() => {
      if (!isMounted || !calInlineRef.current) {
        if (isMounted) setStatus('error');
        return;
      }

      try {
        // Create inline embed
        window.Cal!.ns![namespace]!('inline', {
          elementOrSelector: calInlineRef.current,
          calLink: calLink,
          layout: layout,
          config: {
            theme: theme,
            hideEventTypeDetails: hideEventTypeDetails,
          },
        });

        // Style the embed
        window.Cal!.ns![namespace]!('ui', {
          theme: theme,
          styles: { branding: { brandColor: '#16a34a' } },
          hideEventTypeDetails: hideEventTypeDetails,
        });

        if (isMounted) setStatus('ready');
      } catch (err) {
        console.error('Cal.com initialization error:', err);
        if (isMounted) setStatus('error');
      }
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(initTimeout);
    };
  }, [eventType, theme, hideEventTypeDetails, layout, namespace]);

  return (
    <div className="cal-embed-container w-full min-h-[600px] relative">
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-componentpage z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
            <p className="text-secondary">Loading calendar...</p>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-componentpage z-10">
          <div className="text-center">
            <p className="text-red-500 mb-4">Unable to load calendar</p>
            <a 
              href={`https://cal.com/${getCalLink(eventType)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-brand text-inverse rounded-full hover:bg-brand-hover transition-colors font-semibold"
            >
              Open Calendar in New Tab
            </a>
          </div>
        </div>
      )}
      <div 
        ref={calInlineRef}
        className="w-full"
        style={{ 
          minHeight: '600px',
          overflow: 'auto',
        }}
      />
    </div>
  );
}

// Declare Cal on window for TypeScript
declare global {
  interface Window {
    Cal?: {
      (action: string, ...args: unknown[]): void;
      ns?: Record<string, ((action: string, config: unknown) => void) | undefined>;
      q?: unknown[];
      loaded?: boolean;
    };
  }
}
