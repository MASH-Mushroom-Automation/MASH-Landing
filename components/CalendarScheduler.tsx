'use client';

import { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const [detectedTheme, setDetectedTheme] = useState<'light' | 'dark'>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'dark';
  });

  // Subscribe to theme changes via MutationObserver
  useEffect(() => {
    if (theme !== 'auto') return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setDetectedTheme(isDark ? 'dark' : 'light');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, [theme]);

  const currentTheme = theme !== 'auto' ? theme : detectedTheme;

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
    <div className="cal-embed-container w-full min-h-150 relative">
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
