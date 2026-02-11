/**
 * Sanity CMS client configuration and helper functions
 * 
 * This module provides utilities for fetching landing page content from Sanity CMS.
 * Handles media asset management (videos, images, APK files) via Sanity CDN.
 */

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity client configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-11-26';
const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true';
const token = process.env.SANITY_API_READ_TOKEN;

if (!projectId || !dataset) {
  throw new Error('Missing required Sanity environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET must be set');
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token, // For authenticated requests
  perspective: 'published', // Only fetch published documents
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

/**
 * Get optimized image URL from Sanity
 * @param source - Sanity image source
 * @param options - Image transformation options
 * @returns Optimized image URL
 */
export interface SanityImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
}

export function getSanityImageUrl(
  source: any, // Changed from SanityImageSource to any
  options: SanityImageOptions = {}
): string {
  if (!source) {
    throw new Error('Image source is required');
  }

  let urlBuilder = builder.image(source);

  if (options.width) {
    urlBuilder = urlBuilder.width(options.width);
  }

  if (options.height) {
    urlBuilder = urlBuilder.height(options.height);
  }

  if (options.quality) {
    urlBuilder = urlBuilder.quality(options.quality);
  }

  if (options.format) {
    urlBuilder = urlBuilder.format(options.format);
  }

  if (options.fit) {
    urlBuilder = urlBuilder.fit(options.fit);
  }

  // Auto format and optimize by default
  urlBuilder = urlBuilder.auto('format');

  return urlBuilder.url();
}

/**
 * Get file URL from Sanity (for videos, PDFs, APKs, etc.)
 * @param asset - Sanity file asset reference
 * @returns Direct URL to the file
 */
export function getSanityFileUrl(asset: any): string {
  if (!asset || !asset._ref) {
    throw new Error('Invalid asset reference');
  }

  // Parse asset reference format: file-{assetId}-{extension}
  const parts = asset._ref.split('-');
  if (parts.length < 3) {
    throw new Error('Invalid asset reference format');
  }

  const assetId = parts[1];
  const extension = parts[2];

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${extension}`;
}

/**
 * Get video URL from Sanity with optional transformation
 * @param asset - Sanity video file asset
 * @param options - Video options (currently just passes through)
 * @returns Video URL
 */
export function getSanityVideoUrl(asset: any, options: Record<string, any> = {}): string {
  return getSanityFileUrl(asset);
}

/**
 * Get 3D model URL from Sanity (for GLB/GLTF files)
 * @param asset - Sanity file asset reference for 3D model
 * @returns Direct URL to the 3D model file on Sanity CDN
 */
export function getSanity3DModelUrl(asset: any): string {
  return getSanityFileUrl(asset);
}

/**
 * Fetch landing page data from Sanity
 * @returns Landing page document
 */
export async function getLandingPageData() {
  const query = `*[_type == "landingPage"][0] {
    ...,
    "heroVideoUrl": heroVideo.asset->url,
    "demoVideos": demoVideos[]{
      ...,
      "videoUrl": video.asset->url,
      "thumbnailUrl": thumbnail.asset->url
    },
    "downloadApkUrl": downloadApk.asset->url,
    "seoImageUrl": seoImage.asset->url,
    "iotDeviceModelUrl": iotDeviceModel.asset->url
  }`;

  try {
    const data = await sanityClient.fetch(query);
    return data;
  } catch (error) {
    console.error('Failed to fetch landing page data:', error);
    throw error;
  }
}

/**
 * Fetch landing page data with caching (for use in Server Components)
 * @param revalidate - Number of seconds to cache (default: 60)
 * @returns Landing page document
 */
export async function getLandingPageDataCached(revalidate: number = 60) {
  const query = `*[_type == "landingPage"][0] {
    ...,
    "heroVideoUrl": heroVideo.asset->url,
    "demoVideos": demoVideos[]{
      ...,
      "videoUrl": video.asset->url,
      "thumbnailUrl": thumbnail.asset->url
    },
    "downloadApkUrl": downloadApk.asset->url,
    "seoImageUrl": seoImage.asset->url,
    "iotDeviceModelUrl": iotDeviceModel.asset->url
  }`;

  try {
    const data = await sanityClient.fetch(query, {}, {
      next: { revalidate }, // ISR with Next.js 16
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch landing page data:', error);
    throw error;
  }
}

/**
 * Type definitions for landing page data
 */
export interface LandingPageData {
  _id: string;
  _type: 'landingPage';
  heroTitle: string;
  heroSubtitle: string;
  heroVideo?: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  heroVideoUrl?: string;
  heroButtons?: Array<{
    text: string;
    href: string;
    variant: 'default' | 'outline' | 'ghost';
  }>;
  features?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  demoTitle?: string;
  demoVideos?: Array<{
    title: string;
    description: string;
    videoUrl?: string;
    thumbnailUrl?: string;
  }>;
  documentationTitle?: string;
  documentationDescription?: string;
  documentationLinks?: Array<{
    title: string;
    description: string;
    href: string;
    icon: string;
  }>;
  scopeTitle?: string;
  scopeContent?: any[];
  scopeFeatures?: Array<{
    title: string;
    description: string;
    capabilities: string[];
  }>;
  supportTitle?: string;
  supportContent?: any[];
  supportChannels?: Array<{
    name: string;
    description: string;
    icon: string;
    link: string;
  }>;
  bookingTitle?: string;
  bookingDescription?: string;
  downloadTitle?: string;
  downloadDescription?: string;
  downloadApk?: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  downloadApkUrl?: string;
  downloadVersion?: string;
  downloadSize?: string;
  downloadReleaseDate?: string;
  downloadReleaseNotes?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: any;
  seoImageUrl?: string;
  iotDeviceModel?: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  iotDeviceModelUrl?: string;
}

// Re-export client for advanced usage
export { sanityClient as client };
