import {
  calConfig,
  getCalLink,
  getCalUrl,
  getEventType,
  type EventTypeKey,
} from '@/lib/cal-config';

describe('Cal.com Configuration', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_CAL_USERNAME = 'test-user';
    process.env.NEXT_PUBLIC_CAL_PROFILE_URL = 'https://cal.com/test-user';
    process.env.NEXT_PUBLIC_CONTACT_EMAIL = 'test@example.com';
    process.env.NEXT_PUBLIC_CAL_15MIN_SLUG = '15min';
    process.env.NEXT_PUBLIC_CAL_30MIN_SLUG = '30min';
    process.env.NEXT_PUBLIC_CAL_1HOUR_SLUG = '1-hour-meeting';
  });

  describe('calConfig', () => {
    it('has correct username from env', () => {
      expect(calConfig.username).toBe('test-user');
    });

    it('has correct profile URL from env', () => {
      expect(calConfig.profileUrl).toBe('https://cal.com/test-user');
    });

    it('has correct contact email from env', () => {
      expect(calConfig.contactEmail).toBe('test@example.com');
    });

    it('has event type 15min configured', () => {
      expect(calConfig.eventTypes['15min']).toBeDefined();
      expect(calConfig.eventTypes['15min'].name).toBe('15 Minute Quick Call');
      expect(calConfig.eventTypes['15min'].duration).toBe('15m');
      expect(calConfig.eventTypes['15min'].slug).toBe('15min');
      expect(calConfig.eventTypes['15min'].color).toBe('green');
      expect(calConfig.eventTypes['15min'].popular).toBe(false);
    });

    it('has event type 30min configured', () => {
      expect(calConfig.eventTypes['30min']).toBeDefined();
      expect(calConfig.eventTypes['30min'].name).toBe('30 Minute Consultation');
      expect(calConfig.eventTypes['30min'].duration).toBe('30m');
      expect(calConfig.eventTypes['30min'].slug).toBe('30min');
      expect(calConfig.eventTypes['30min'].color).toBe('blue');
      expect(calConfig.eventTypes['30min'].popular).toBe(true);
    });

    it('has event type 1-hour-meeting configured', () => {
      expect(calConfig.eventTypes['1-hour-meeting']).toBeDefined();
      expect(calConfig.eventTypes['1-hour-meeting'].name).toBe('1 Hour Deep Dive');
      expect(calConfig.eventTypes['1-hour-meeting'].duration).toBe('60m');
      expect(calConfig.eventTypes['1-hour-meeting'].slug).toBe('1-hour-meeting');
      expect(calConfig.eventTypes['1-hour-meeting'].color).toBe('purple');
      expect(calConfig.eventTypes['1-hour-meeting'].popular).toBe(false);
    });
  });

  describe('getCalLink', () => {
    it('returns correct link for 15min event', () => {
      const link = getCalLink('15min');
      expect(link).toBe('test-user/15min');
    });

    it('returns correct link for 30min event', () => {
      const link = getCalLink('30min');
      expect(link).toBe('test-user/30min');
    });

    it('returns correct link for 1-hour-meeting event', () => {
      const link = getCalLink('1-hour-meeting');
      expect(link).toBe('test-user/1-hour-meeting');
    });
  });

  describe('getCalUrl', () => {
    it('returns correct full URL for 15min event', () => {
      const url = getCalUrl('15min');
      expect(url).toBe('https://cal.com/test-user/15min');
    });

    it('returns correct full URL for 30min event', () => {
      const url = getCalUrl('30min');
      expect(url).toBe('https://cal.com/test-user/30min');
    });

    it('returns correct full URL for 1-hour-meeting event', () => {
      const url = getCalUrl('1-hour-meeting');
      expect(url).toBe('https://cal.com/test-user/1-hour-meeting');
    });
  });

  describe('getEventType', () => {
    it('returns event type for valid key', () => {
      const eventType = getEventType('15min');
      expect(eventType).toBe(calConfig.eventTypes['15min']);
    });

    it('returns 30min as default for invalid key', () => {
      const eventType = getEventType('invalid-key');
      expect(eventType).toBe(calConfig.eventTypes['30min']);
    });

    it('returns 30min as default for empty string', () => {
      const eventType = getEventType('');
      expect(eventType).toBe(calConfig.eventTypes['30min']);
    });
  });
});
