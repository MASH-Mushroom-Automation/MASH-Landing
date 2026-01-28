/**
 * Cloudinary configuration and helper functions
 * 
 * This module provides utilities for generating Cloudinary URLs for images and videos.
 * All assets are hosted on Cloudinary to reduce GitHub traffic and improve performance.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: string | 'auto';
  crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb' | 'pad';
  gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west';
}

/**
 * Generate a Cloudinary URL for an image
 * @param publicId - The public ID of the image in Cloudinary (e.g., 'mash/logo')
 * @param options - Optional transformation parameters
 * @returns The complete Cloudinary URL
 */
export function getCloudinaryImageUrl(
  publicId: string,
  options: CloudinaryOptions = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto'
  } = options;

  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (gravity) transformations.push(`g_${gravity}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  const transformStr = transformations.join(',');
  
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformStr}/${publicId}`;
}

/**
 * Generate a Cloudinary URL for a video
 * @param publicId - The public ID of the video in Cloudinary (e.g., 'mash/demo')
 * @param options - Optional transformation parameters
 * @returns The complete Cloudinary URL
 */
export function getCloudinaryVideoUrl(
  publicId: string,
  options: CloudinaryOptions = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
  } = options;

  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  const transformStr = transformations.join(',');
  
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transformStr}/${publicId}`;
}

/**
 * Get poster image URL for a video
 * @param publicId - The public ID of the video in Cloudinary
 * @param options - Optional transformation parameters
 * @returns The complete Cloudinary URL for the video poster
 */
export function getVideoThumbnailUrl(
  publicId: string,
  options: CloudinaryOptions = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
  } = options;

  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push(`q_${quality}`);
  transformations.push('f_jpg');
  transformations.push('so_0'); // Get frame at 0 seconds

  const transformStr = transformations.join(',');
  
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transformStr}/${publicId}.jpg`;
}

/**
 * Predefined asset paths for the MASH project
 * Update these paths after uploading assets to Cloudinary
 */
export const CLOUDINARY_ASSETS = {
  images: {
    logo: 'mash/logo',
    poster: 'mash/poster',
  },
  videos: {
    demo: 'mash/demo',
    overview: 'mash/overview',
    setup: 'mash/setup',
    mobile: 'mash/mobile',
  },
};
