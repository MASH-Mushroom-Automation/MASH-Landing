/**
 * Sanity CMS client configuration and helper functions
 *
 * This module provides utilities for fetching landing page content from Sanity CMS.
 * Handles media asset management (videos, images, APK files) via Sanity CDN.
 */

import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// Sanity client configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-11-26';
const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true';
const token = process.env.SANITY_API_READ_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    'Missing required Sanity environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET must be set'
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token,
  perspective: 'published',
});

// Image URL builder
const builder = createImageUrlBuilder(sanityClient);

/**
 * Image transformation options for Sanity images
 */
export interface SanityImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
}

/**
 * Get optimized image URL from Sanity
 */
export function getSanityImageUrl(
  source: any,
  options: SanityImageOptions = {}
): string {
  if (!source) {
    throw new Error('Image source is required');
  }

  let urlBuilder = builder.image(source);

  if (options.width) urlBuilder = urlBuilder.width(options.width);
  if (options.height) urlBuilder = urlBuilder.height(options.height);
  if (options.quality) urlBuilder = urlBuilder.quality(options.quality);
  if (options.format) urlBuilder = urlBuilder.format(options.format);
  if (options.fit) urlBuilder = urlBuilder.fit(options.fit);

  urlBuilder = urlBuilder.auto('format');
  return urlBuilder.url();
}

/**
 * Get file URL from Sanity (for videos, PDFs, APKs, GLB, etc.)
 */
export function getSanityFileUrl(asset: any): string {
  if (!asset || !asset._ref) {
    throw new Error('Invalid asset reference');
  }

  const parts = asset._ref.split('-');
  if (parts.length < 3) {
    throw new Error('Invalid asset reference format');
  }

  const assetId = parts[1];
  const extension = parts[2];

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${extension}`;
}

/**
 * Get video URL from Sanity
 */
export function getSanityVideoUrl(asset: any): string {
  return getSanityFileUrl(asset);
}

/**
 * Get 3D model URL from Sanity (for GLB/GLTF files)
 */
export function getSanity3DModelUrl(asset: any): string {
  return getSanityFileUrl(asset);
}

/**
 * GROQ query that fetches the complete landing page document with all asset URLs resolved
 */
const LANDING_PAGE_QUERY = `*[_type == "landingPage"][0] {
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

/**
 * Fetch landing page data from Sanity
 */
export async function getLandingPageData(): Promise<LandingPageData | null> {
  try {
    const data = await sanityClient.fetch(LANDING_PAGE_QUERY);
    return data;
  } catch (error) {
    console.error('Failed to fetch landing page data:', error);
    throw error;
  }
}

/**
 * Fetch landing page data with ISR caching (for Server Components)
 */
export async function getLandingPageDataCached(
  revalidate: number = 60
): Promise<LandingPageData | null> {
  try {
    const data = await sanityClient.fetch(
      LANDING_PAGE_QUERY,
      {},
      { next: { revalidate } }
    );
    return data;
  } catch (error) {
    console.error('Failed to fetch landing page data:', error);
    throw error;
  }
}

// ============================================================
// Type definitions for landing page data
// ============================================================

export interface SanityAssetRef {
  _ref: string;
  _type: string;
}

export interface LandingPageData {
  _id: string;
  _type: 'landingPage';

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroVideo?: { asset: SanityAssetRef };
  heroVideoUrl?: string;
  heroButtons?: Array<{
    text: string;
    href: string;
    variant: 'default' | 'outline' | 'ghost';
  }>;
  heroCards?: Array<{
    title: string;
    value: string;
    icon: string;
  }>;

  // Features Section
  featuresTitle?: string;
  featuresSubtitle?: string;
  features?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;

  // Demo Section
  demoTitle?: string;
  demoSubtitle?: string;
  demoStats?: Array<{
    value: string;
    label: string;
  }>;
  demoVideos?: Array<{
    id: string;
    title: string;
    description: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    video?: { asset: SanityAssetRef };
  }>;

  // Documentation Section
  documentationTitle?: string;
  documentationDescription?: string;
  documentationCategories?: Array<{
    title: string;
    description: string;
    icon: string;
    links: Array<{
      name: string;
      href: string;
    }>;
  }>;

  // Scope Section
  scopeTitle?: string;
  scopeDescription?: string;
  scopeCategories?: Array<{
    title: string;
    icon: string;
    items: string[];
  }>;
  scopeArchitectureTitle?: string;
  scopeArchitectureDescription?: string;
  scopeArchitectureLayers?: Array<{
    name: string;
    items: string[];
  }>;

  // Mobile App Showcase
  mobileAppTitle?: string;
  mobileAppSubtitle?: string;
  mobileAppScreens?: Array<{
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    color: string;
    features: string[];
  }>;

  // IoT Device Section
  iotDeviceTitle?: string;
  iotDeviceSubtitle?: string;
  iotDeviceDescription?: string;
  iotDeviceModel?: { asset: SanityAssetRef };
  iotDeviceModelUrl?: string;
  iotDeviceSpecs?: Array<{
    id: string;
    label: string;
    value: string;
    unit?: string;
    description: string;
    details: Array<{ label: string; value: string }>;
    metrics: Array<{ value: string; label: string }>;
  }>;

  // Booking Section
  bookingTitle?: string;
  bookingDescription?: string;
  bookingFeatures?: string[];

  // Support Section
  supportTitle?: string;
  supportDescription?: string;
  supportChannels?: Array<{
    name: string;
    description: string;
    icon: string;
    link: string;
    linkText?: string;
  }>;
  supportFaqs?: Array<{
    question: string;
    answer: string;
  }>;

  // Download Section
  downloadTitle?: string;
  downloadDescription?: string;
  downloadAppFeatures?: string[];
  downloadApk?: { asset: SanityAssetRef };
  downloadApkUrl?: string;
  downloadVersion?: string;
  downloadSize?: string;
  downloadReleaseDate?: string;
  downloadReleaseNotes?: string;

  // Navigation
  navigationBrand?: string;
  navigationLinks?: Array<{
    label: string;
    href: string;
  }>;

  // Footer
  footerBrand?: string;
  footerTagline?: string;
  footerDescription?: string;
  footerSections?: Array<{
    title: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  }>;
  footerCopyright?: string;

  // FAQ Page
  faqTitle?: string;
  faqSubtitle?: string;
  faqCategories?: Array<{
    name: string;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  }>;
  faqCtaTitle?: string;
  faqCtaDescription?: string;

  // SEO
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: any;
  seoImageUrl?: string;
}

// Re-export client for advanced usage
export { sanityClient as client };
