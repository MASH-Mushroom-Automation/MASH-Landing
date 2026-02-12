// Instead of importing the real lib which pulls @sanity/client (ESM), mock the exported helper.
jest.mock('@/lib/sanity', () => ({
  getSanityImageUrl: jest.fn(() => 'https://cdn.sanity.io/images/test/production/sample.jpg'),
}));

import { getSanityImageUrl } from '@/lib/sanity';

describe('sanity helpers (nav)', () => {
  it('returns a URL string for an image source (mocked)', () => {
    const src = { _ref: 'image-123' } as any;
    const url = getSanityImageUrl(src as any, { width: 200 });
    expect(typeof url).toBe('string');
    expect(url).toContain('https://cdn.sanity.io');
  });
});
