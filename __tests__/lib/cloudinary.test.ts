import { 
  getCloudinaryImageUrl, 
  getCloudinaryVideoUrl, 
  getVideoThumbnailUrl,
  CLOUDINARY_ASSETS 
} from '@/lib/cloudinary';

describe('Cloudinary Utilities', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test-cloud';
  });

  describe('getCloudinaryImageUrl', () => {
    it('generates basic image URL', () => {
      const url = getCloudinaryImageUrl('mash/logo');
      expect(url).toContain('res.cloudinary.com/test-cloud/image/upload');
      expect(url).toContain('mash/logo');
    });

    it('applies width transformation', () => {
      const url = getCloudinaryImageUrl('mash/logo', { width: 200 });
      expect(url).toContain('w_200');
    });

    it('applies height transformation', () => {
      const url = getCloudinaryImageUrl('mash/logo', { height: 100 });
      expect(url).toContain('h_100');
    });

    it('applies quality transformation', () => {
      const url = getCloudinaryImageUrl('mash/logo', { quality: 80 });
      expect(url).toContain('q_80');
    });

    it('applies auto quality by default', () => {
      const url = getCloudinaryImageUrl('mash/logo');
      expect(url).toContain('q_auto');
    });

    it('applies format transformation', () => {
      const url = getCloudinaryImageUrl('mash/logo', { format: 'webp' });
      expect(url).toContain('f_webp');
    });

    it('applies auto format by default', () => {
      const url = getCloudinaryImageUrl('mash/logo');
      expect(url).toContain('f_auto');
    });

    it('applies crop transformation', () => {
      const url = getCloudinaryImageUrl('mash/logo', { crop: 'fit' });
      expect(url).toContain('c_fit');
    });

    it('applies gravity transformation', () => {
      const url = getCloudinaryImageUrl('mash/logo', { gravity: 'face' });
      expect(url).toContain('g_face');
    });

    it('combines multiple transformations', () => {
      const url = getCloudinaryImageUrl('mash/logo', {
        width: 200,
        height: 100,
        quality: 90,
        format: 'webp',
        crop: 'fill',
        gravity: 'center'
      });
      expect(url).toContain('w_200');
      expect(url).toContain('h_100');
      expect(url).toContain('q_90');
      expect(url).toContain('f_webp');
      expect(url).toContain('c_fill');
      expect(url).toContain('g_center');
    });
  });

  describe('getCloudinaryVideoUrl', () => {
    it('generates basic video URL', () => {
      const url = getCloudinaryVideoUrl('mash/demo');
      expect(url).toContain('res.cloudinary.com/test-cloud/video/upload');
      expect(url).toContain('mash/demo');
    });

    it('applies width transformation', () => {
      const url = getCloudinaryVideoUrl('mash/demo', { width: 1920 });
      expect(url).toContain('w_1920');
    });

    it('applies height transformation', () => {
      const url = getCloudinaryVideoUrl('mash/demo', { height: 1080 });
      expect(url).toContain('h_1080');
    });

    it('applies quality transformation', () => {
      const url = getCloudinaryVideoUrl('mash/demo', { quality: 'auto' });
      expect(url).toContain('q_auto');
    });

    it('applies format transformation', () => {
      const url = getCloudinaryVideoUrl('mash/demo', { format: 'mp4' });
      expect(url).toContain('f_mp4');
    });

    it('combines multiple transformations', () => {
      const url = getCloudinaryVideoUrl('mash/demo', {
        width: 1920,
        height: 1080,
        quality: 'auto',
        format: 'mp4'
      });
      expect(url).toContain('w_1920');
      expect(url).toContain('h_1080');
      expect(url).toContain('q_auto');
      expect(url).toContain('f_mp4');
    });
  });

  describe('getVideoThumbnailUrl', () => {
    it('generates video thumbnail URL', () => {
      const url = getVideoThumbnailUrl('mash/demo');
      expect(url).toContain('res.cloudinary.com/test-cloud/video/upload');
      expect(url).toContain('f_jpg');
      expect(url).toContain('so_0');
      expect(url).toContain('mash/demo.jpg');
    });

    it('applies width transformation', () => {
      const url = getVideoThumbnailUrl('mash/demo', { width: 640 });
      expect(url).toContain('w_640');
    });

    it('applies height transformation', () => {
      const url = getVideoThumbnailUrl('mash/demo', { height: 360 });
      expect(url).toContain('h_360');
    });

    it('applies quality transformation', () => {
      const url = getVideoThumbnailUrl('mash/demo', { quality: 80 });
      expect(url).toContain('q_80');
    });

    it('always uses jpg format', () => {
      const url = getVideoThumbnailUrl('mash/demo', { format: 'png' });
      expect(url).toContain('f_jpg');
      expect(url).not.toContain('f_png');
    });
  });

  describe('CLOUDINARY_ASSETS', () => {
    it('contains predefined image assets', () => {
      expect(CLOUDINARY_ASSETS.images).toBeDefined();
      expect(CLOUDINARY_ASSETS.images.logo).toBe('mash/logo');
      expect(CLOUDINARY_ASSETS.images.poster).toBe('mash/poster');
    });

    it('contains predefined video assets', () => {
      expect(CLOUDINARY_ASSETS.videos).toBeDefined();
      expect(CLOUDINARY_ASSETS.videos.demo).toBe('mash/demo');
      expect(CLOUDINARY_ASSETS.videos.overview).toBe('mash/overview');
      expect(CLOUDINARY_ASSETS.videos.setup).toBe('mash/setup');
      expect(CLOUDINARY_ASSETS.videos.mobile).toBe('mash/mobile');
    });
  });
});
