'use client';

import { useState, useSyncExternalStore } from 'react';
import { getCalLink, type EventTypeKey } from '@/lib/cal-config';
import { cn } from '@/lib/utils';

interface CalendarSchedulerProps {
  eventType?: EventTypeKey;
  className?: string;
  theme?: 'light' | 'dark' | 'auto';
  hideEventTypeDetails?: boolean;
  layout?: 'month_view' | 'week_view' | 'column_view';
}

function subscribeToDocumentTheme(callback: () => void) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'class') {
        callback();
        break;
      }
    }
  });

  observer.observe(document.documentElement, { attributes: true });
  return () => observer.disconnect();
}

function getDocumentThemeSnapshot(): 'light' | 'dark' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function getDocumentThemeServerSnapshot(): 'light' | 'dark' {
  return 'dark';
}

export default function CalendarScheduler({ 
  eventType = '30min',
  className = '',
  theme = 'auto',
  hideEventTypeDetails = false,
  layout = 'month_view',
}: CalendarSchedulerProps) {
  const [isLoading, setIsLoading] = useState(true);

  const detectedTheme = useSyncExternalStore(
    subscribeToDocumentTheme,
    getDocumentThemeSnapshot,
    getDocumentThemeServerSnapshot
  );

  const currentTheme = theme === 'auto' ? detectedTheme : theme;

  const calLink = getCalLink(eventType);
  
  // Build Cal.com embed URL with parameters
  const embedUrl = new URL(`https://cal.com/${calLink}`);
  embedUrl.searchParams.set('embed', 'true');
  embedUrl.searchParams.set('theme', currentTheme);
  embedUrl.searchParams.set('layout', layout);
  if (hideEventTypeDetails) {
    embedUrl.searchParams.set('hideEventTypeDetails', 'true');
  }

  return (
    <div className={cn("cal-embed-container w-full min-h-[600px] relative", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-componentpage z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
            <p className="text-secondary">Loading calendar...</p>
          </div>
        </div>
      )}
      <iframe
        src={embedUrl.toString()}
        frameBorder="0"
        className="w-full rounded-lg"
        style={{ 
          minHeight: '600px',
          height: '100%',
          border: 'none',
        }}
        onLoad={() => setIsLoading(false)}
        allow="payment"
      />
    </div>
  );
}
