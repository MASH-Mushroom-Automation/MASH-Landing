import { describe, it, expect } from 'vitest';
import { calConfig, getCalLink, getCalUrl, getEventType } from '@/lib/cal-config';

describe('calConfig', () => {
  it('has correct username', () => {
    expect(calConfig.username).toBe('mash-mushroom');
  });

  it('has three event types', () => {
    const keys = Object.keys(calConfig.eventTypes);
    expect(keys).toHaveLength(3);
    expect(keys).toContain('15min');
    expect(keys).toContain('30min');
    expect(keys).toContain('1-hour-meeting');
  });

  it('has contact email', () => {
    expect(calConfig.contactEmail).toBe('mash.mushroom.automation@gmail.com');
  });

  it('marks 30min as popular', () => {
    expect(calConfig.eventTypes['30min'].popular).toBe(true);
    expect(calConfig.eventTypes['15min'].popular).toBe(false);
  });
});

describe('getCalLink', () => {
  it('returns correct link for 15min', () => {
    expect(getCalLink('15min')).toBe('mash-mushroom/15min');
  });

  it('returns correct link for 30min', () => {
    expect(getCalLink('30min')).toBe('mash-mushroom/30min');
  });

  it('returns correct link for 1-hour-meeting', () => {
    expect(getCalLink('1-hour-meeting')).toBe('mash-mushroom/1-hour-meeting');
  });
});

describe('getCalUrl', () => {
  it('returns full URL', () => {
    expect(getCalUrl('30min')).toBe('https://cal.com/mash-mushroom/30min');
  });
});

describe('getEventType', () => {
  it('returns correct event type by key', () => {
    const event = getEventType('15min');
    expect(event.name).toBe('15 Minute Quick Call');
    expect(event.duration).toBe('15m');
  });

  it('falls back to 30min for unknown key', () => {
    const event = getEventType('unknown');
    expect(event.name).toBe('30 Minute Consultation');
  });
});
