import { describe, it, expect } from 'vitest';
import { getLandingPageData } from '@/lib/sanity';

describe('getLandingPageData', () => {
  it('returns null (placeholder)', async () => {
    const data = await getLandingPageData();
    expect(data).toBeNull();
  });
});
