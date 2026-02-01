// Cal.com Configuration
// All Cal.com related settings centralized here

export const calConfig = {
  // Username from cal.com
  username: process.env.NEXT_PUBLIC_CAL_USERNAME || 'mash-mushroom',
  
  // Profile URL
  profileUrl: process.env.NEXT_PUBLIC_CAL_PROFILE_URL || 'https://cal.com/mash-mushroom',
  
  // Contact email
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'mash.mushroom.automation@gmail.com',
  
  // Event types with their configuration
  eventTypes: {
    '15min': {
      name: '15 Minute Quick Call',
      duration: '15m',
      slug: process.env.NEXT_PUBLIC_CAL_15MIN_SLUG || '15min',
      description: 'Perfect for quick questions and basic inquiries',
      color: 'green' as const,
      popular: false,
    },
    '30min': {
      name: '30 Minute Consultation',
      duration: '30m',
      slug: process.env.NEXT_PUBLIC_CAL_30MIN_SLUG || '30min',
      description: 'Standard consultation to discuss your automation needs',
      color: 'blue' as const,
      popular: true,
    },
    '1-hour-meeting': {
      name: '1 Hour Deep Dive',
      duration: '60m',
      slug: process.env.NEXT_PUBLIC_CAL_1HOUR_SLUG || '1-hour-meeting',
      description: 'Comprehensive planning and technical discussion',
      color: 'purple' as const,
      popular: false,
    },
  },
};

// Helper function to get full Cal.com link for an event type
export function getCalLink(eventTypeKey: keyof typeof calConfig.eventTypes): string {
  const eventType = calConfig.eventTypes[eventTypeKey];
  return `${calConfig.username}/${eventType.slug}`;
}

// Helper function to get full Cal.com URL for an event type
export function getCalUrl(eventTypeKey: keyof typeof calConfig.eventTypes): string {
  const eventType = calConfig.eventTypes[eventTypeKey];
  return `https://cal.com/${calConfig.username}/${eventType.slug}`;
}

// Get event type by key
export function getEventType(key: string) {
  return calConfig.eventTypes[key as keyof typeof calConfig.eventTypes] || calConfig.eventTypes['30min'];
}

// Type exports
export type EventTypeKey = keyof typeof calConfig.eventTypes;
export type EventType = typeof calConfig.eventTypes[EventTypeKey];
