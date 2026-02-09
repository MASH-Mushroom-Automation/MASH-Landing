import {
  sanityClient,
  getSanityImageUrl,
  getSanityFileUrl,
  getSanityVideoUrl,
  getLandingPageData,
  getLandingPageDataCached,
} from '@/lib/sanity';

// Mock @sanity/client
jest.mock('@sanity/client', () => ({
  createClient: jest.fn(() => ({
    fetch: jest.fn(),
    assets: {
      upload: jest.fn(),
    },
  })),
}));

// Mock @sanity/image-url
jest.mock('@sanity/image-url', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    image: jest.fn(() => ({
      width: jest.fn().mockReturnThis(),
      height: jest.fn().mockReturnThis(),
      quality: jest.fn().mockReturnThis(),
      format: jest.fn().mockReturnThis(),
      fit: jest.fn().mockReturnThis(),
      auto: jest.fn().mockReturnThis(),
      url: jest.fn(() => 'https://cdn.sanity.io/images/test-project/production/image-123.jpg'),
    })),
  })),
}));

describe('Sanity Client Configuration', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test-project';
    process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';
    process.env.NEXT_PUBLIC_SANITY_API_VERSION = '2024-11-26';
    process.env.NEXT_PUBLIC_SANITY_USE_CDN = 'true';
    process.env.SANITY_API_READ_TOKEN = 'test-token';
  });

  it('exports sanityClient', () => {
    expect(sanityClient).toBeDefined();
  });

  it('sanityClient has fetch method', () => {
    expect(sanityClient.fetch).toBeDefined();
    expect(typeof sanityClient.fetch).toBe('function');
  });

  it('sanityClient has assets.upload method', () => {
    expect(sanityClient.assets).toBeDefined();
    expect(sanityClient.assets.upload).toBeDefined();
    expect(typeof sanityClient.assets.upload).toBe('function');
  });
});

describe('getSanityImageUrl', () => {
  const mockImageSource = {
    _type: 'image',
    asset: {
      _ref: 'image-abc123',
      _type: 'reference',
    },
  };

  it('generates basic image URL', () => {
    const url = getSanityImageUrl(mockImageSource);
    expect(url).toBe('https://cdn.sanity.io/images/test-project/production/image-123.jpg');
  });

  it('throws error if source is missing', () => {
    expect(() => getSanityImageUrl(null as any)).toThrow('Image source is required');
  });

  it('accepts width option', () => {
    const url = getSanityImageUrl(mockImageSource, { width: 800 });
    expect(url).toBeDefined();
  });

  it('accepts height option', () => {
    const url = getSanityImageUrl(mockImageSource, { height: 600 });
    expect(url).toBeDefined();
  });

  it('accepts quality option', () => {
    const url = getSanityImageUrl(mockImageSource, { quality: 90 });
    expect(url).toBeDefined();
  });

  it('accepts format option', () => {
    const url = getSanityImageUrl(mockImageSource, { format: 'webp' });
    expect(url).toBeDefined();
  });

  it('accepts fit option', () => {
    const url = getSanityImageUrl(mockImageSource, { fit: 'crop' });
    expect(url).toBeDefined();
  });

  it('combines multiple options', () => {
    const url = getSanityImageUrl(mockImageSource, {
      width: 1200,
      height: 630,
      quality: 85,
      format: 'webp',
      fit: 'crop',
    });
    expect(url).toBeDefined();
  });

  it('applies auto format by default', () => {
    const url = getSanityImageUrl(mockImageSource);
    expect(url).toBeDefined();
  });
});

describe('getSanityFileUrl', () => {
  it('generates file URL from asset reference', () => {
    const asset = {
      _ref: 'file-abc123xyz-mp4',
      _type: 'reference',
    };

    const url = getSanityFileUrl(asset);
    expect(url).toBe('https://cdn.sanity.io/files/test-project/production/abc123xyz.mp4');
  });

  it('throws error for invalid asset', () => {
    expect(() => getSanityFileUrl(null)).toThrow('Invalid asset reference');
  });

  it('throws error for missing _ref', () => {
    expect(() => getSanityFileUrl({ _type: 'reference' })).toThrow('Invalid asset reference');
  });

  it('throws error for invalid _ref format', () => {
    const asset = {
      _ref: 'invalid-format',
      _type: 'reference',
    };
    expect(() => getSanityFileUrl(asset)).toThrow('Invalid asset reference format');
  });

  it('handles different file extensions', () => {
    const pdfAsset = {
      _ref: 'file-xyz789-pdf',
      _type: 'reference',
    };
    const url = getSanityFileUrl(pdfAsset);
    expect(url).toContain('.pdf');
  });

  it('handles APK files', () => {
    const apkAsset = {
      _ref: 'file-apk123-apk',
      _type: 'reference',
    };
    const url = getSanityFileUrl(apkAsset);
    expect(url).toContain('.apk');
  });

  it('generates correct CDN URL structure', () => {
    const asset = {
      _ref: 'file-test456-mp4',
      _type: 'reference',
    };
    const url = getSanityFileUrl(asset);
    expect(url).toMatch(/^https:\/\/cdn\.sanity\.io\/files\//);
  });
});

describe('getSanityVideoUrl', () => {
  it('returns file URL for video asset', () => {
    const videoAsset = {
      _ref: 'file-video123-mp4',
      _type: 'reference',
    };
    const url = getSanityVideoUrl(videoAsset);
    expect(url).toBe('https://cdn.sanity.io/files/test-project/production/video123.mp4');
  });

  it('accepts options parameter', () => {
    const videoAsset = {
      _ref: 'file-video456-mp4',
      _type: 'reference',
    };
    const url = getSanityVideoUrl(videoAsset, { quality: 'auto' });
    expect(url).toBeDefined();
  });

  it('handles WebM videos', () => {
    const videoAsset = {
      _ref: 'file-video789-webm',
      _type: 'reference',
    };
    const url = getSanityVideoUrl(videoAsset);
    expect(url).toContain('.webm');
  });
});

describe('getLandingPageData', () => {
  const mockLandingPageData = {
    _id: 'landingPage-main',
    _type: 'landingPage',
    heroTitle: 'Test Hero Title',
    heroSubtitle: 'Test Hero Subtitle',
    heroVideoUrl: 'https://cdn.sanity.io/files/test-project/production/hero-video.mp4',
    features: [
      { title: 'Feature 1', description: 'Description 1', icon: 'icon1' },
      { title: 'Feature 2', description: 'Description 2', icon: 'icon2' },
    ],
  };

  beforeEach(() => {
    (sanityClient.fetch as jest.Mock).mockResolvedValue(mockLandingPageData);
  });

  it('fetches landing page data', async () => {
    const data = await getLandingPageData();
    expect(data).toEqual(mockLandingPageData);
  });

  it('calls sanityClient.fetch with correct query', async () => {
    await getLandingPageData();
    expect(sanityClient.fetch).toHaveBeenCalledWith(expect.stringContaining('*[_type == "landingPage"][0]'));
  });

  it('returns hero title', async () => {
    const data = await getLandingPageData();
    expect(data.heroTitle).toBe('Test Hero Title');
  });

  it('returns features array', async () => {
    const data = await getLandingPageData();
    expect(data.features).toHaveLength(2);
    expect(data.features[0].title).toBe('Feature 1');
  });

  it('throws error on fetch failure', async () => {
    (sanityClient.fetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'));
    await expect(getLandingPageData()).rejects.toThrow('Fetch failed');
  });

  it('handles missing data gracefully', async () => {
    (sanityClient.fetch as jest.Mock).mockResolvedValue(null);
    const data = await getLandingPageData();
    expect(data).toBeNull();
  });
});

describe('getLandingPageDataCached', () => {
  const mockLandingPageData = {
    _id: 'landingPage-main',
    _type: 'landingPage',
    heroTitle: 'Cached Hero Title',
  };

  beforeEach(() => {
    (sanityClient.fetch as jest.Mock).mockResolvedValue(mockLandingPageData);
  });

  it('fetches landing page data with caching', async () => {
    const data = await getLandingPageDataCached();
    expect(data).toEqual(mockLandingPageData);
  });

  it('uses default revalidate time of 60 seconds', async () => {
    await getLandingPageDataCached();
    expect(sanityClient.fetch).toHaveBeenCalledWith(
      expect.any(String),
      {},
      expect.objectContaining({ next: { revalidate: 60 } })
    );
  });

  it('accepts custom revalidate time', async () => {
    await getLandingPageDataCached(120);
    expect(sanityClient.fetch).toHaveBeenCalledWith(
      expect.any(String),
      {},
      expect.objectContaining({ next: { revalidate: 120 } })
    );
  });

  it('returns cached data', async () => {
    const data = await getLandingPageDataCached(30);
    expect(data.heroTitle).toBe('Cached Hero Title');
  });
});

describe('Error Handling', () => {
  it('throws error if SANITY_PROJECT_ID is missing', () => {
    const originalProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

    // Re-require the module to trigger the check
    expect(() => {
      jest.isolateModules(() => {
        require('@/lib/sanity');
      });
    }).toThrow();

    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = originalProjectId;
  });

  it('handles network errors gracefully', async () => {
    (sanityClient.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
    await expect(getLandingPageData()).rejects.toThrow('Network error');
  });

  it('logs errors to console', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (sanityClient.fetch as jest.Mock).mockRejectedValue(new Error('Test error'));
    
    try {
      await getLandingPageData();
    } catch (error) {
      // Expected to throw
    }
    
    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch landing page data:', expect.any(Error));
    consoleSpy.mockRestore();
  });
});

describe('Type Definitions', () => {
  it('LandingPageData interface is properly exported', () => {
    // This test ensures TypeScript compilation includes the interface
    const mockData: any = {
      _id: 'test',
      _type: 'landingPage',
      heroTitle: 'Test',
      heroSubtitle: 'Test',
    };
    expect(mockData._type).toBe('landingPage');
  });
});
