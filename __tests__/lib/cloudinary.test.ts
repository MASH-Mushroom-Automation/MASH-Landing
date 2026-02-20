import { describe, it, expect } from 'vitest';
import {
  getCloudinaryImageUrl,
  getCloudinaryVideoUrl,
  getVideoThumbnailUrl,
  CLOUDINARY_ASSETS,
} from '@/lib/cloudinary';

describe('getCloudinaryImageUrl', () => {
  it('generates basic image URL with defaults', () => {
    const url = getCloudinaryImageUrl('mash/logo');
    expect(url).toContain('/image/upload/');
    expect(url).toContain('mash/logo');
    expect(url).toContain('q_auto');
    expect(url).toContain('f_auto');
    expect(url).toContain('c_fill');
    expect(url).toContain('g_auto');
  });

  it('includes width and height', () => {
    const url = getCloudinaryImageUrl('mash/logo', { width: 200, height: 100 });
    expect(url).toContain('w_200');
    expect(url).toContain('h_100');
  });

  it('includes crop and gravity', () => {
    const url = getCloudinaryImageUrl('mash/logo', { crop: 'thumb', gravity: 'face' });
    expect(url).toContain('c_thumb');
    expect(url).toContain('g_face');
  });

  it('uses custom quality', () => {
    const url = getCloudinaryImageUrl('mash/logo', { quality: 80 });
    expect(url).toContain('q_80');
  });

  it('uses custom format', () => {
    const url = getCloudinaryImageUrl('mash/logo', { format: 'webp' });
    expect(url).toContain('f_webp');
  });

  it('generates URL without width when not provided', () => {
    const url = getCloudinaryImageUrl('mash/logo', { height: 50 });
    expect(url).not.toContain('w_');
    expect(url).toContain('h_50');
  });

  it('generates URL without height when not provided', () => {
    const url = getCloudinaryImageUrl('mash/logo', { width: 50 });
    expect(url).toContain('w_50');
    expect(url).not.toMatch(/h_\d/);
  });
});

describe('getCloudinaryVideoUrl', () => {
  it('generates video URL', () => {
    const url = getCloudinaryVideoUrl('mash/demo');
    expect(url).toContain('/video/upload/');
    expect(url).toContain('mash/demo');
    expect(url).toContain('q_auto');
    expect(url).toContain('f_auto');
  });

  it('includes format override', () => {
    const url = getCloudinaryVideoUrl('mash/demo', { format: 'mp4' });
    expect(url).toContain('f_mp4');
  });

  it('includes width and height for video', () => {
    const url = getCloudinaryVideoUrl('mash/demo', { width: 1920, height: 1080 });
    expect(url).toContain('w_1920');
    expect(url).toContain('h_1080');
  });

  it('generates video URL without width/height when not provided', () => {
    const url = getCloudinaryVideoUrl('mash/demo');
    expect(url).not.toMatch(/w_\d/);
    expect(url).not.toMatch(/h_\d/);
  });
});

describe('getVideoThumbnailUrl', () => {
  it('generates thumbnail URL ending with .jpg', () => {
    const url = getVideoThumbnailUrl('mash/demo');
    expect(url).toContain('/video/upload/');
    expect(url).toContain('f_jpg');
    expect(url).toContain('so_0');
    expect(url).toMatch(/mash\/demo\.jpg$/);
  });

  it('includes width and height for thumbnail', () => {
    const url = getVideoThumbnailUrl('mash/demo', { width: 640, height: 360 });
    expect(url).toContain('w_640');
    expect(url).toContain('h_360');
  });

  it('generates thumbnail without width/height when not provided', () => {
    const url = getVideoThumbnailUrl('mash/demo');
    expect(url).not.toMatch(/w_\d/);
    expect(url).not.toMatch(/h_\d/);
  });

  it('uses custom quality for thumbnail', () => {
    const url = getVideoThumbnailUrl('mash/demo', { quality: 90 });
    expect(url).toContain('q_90');
  });
});

describe('CLOUDINARY_ASSETS', () => {
  it('has image assets', () => {
    expect(CLOUDINARY_ASSETS.images.logo).toBe('mash/logo');
    expect(CLOUDINARY_ASSETS.images.poster).toBe('mash/poster');
  });

  it('has video assets', () => {
    expect(CLOUDINARY_ASSETS.videos.demo).toBe('mash/demo');
    expect(CLOUDINARY_ASSETS.videos.overview).toBe('mash/overview');
    expect(CLOUDINARY_ASSETS.videos.setup).toBe('mash/setup');
    expect(CLOUDINARY_ASSETS.videos.mobile).toBe('mash/mobile');
  });
});
