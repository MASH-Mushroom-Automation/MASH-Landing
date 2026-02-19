// Sanity CMS types and data fetching
// All components use hardcoded defaults when Sanity data is unavailable

export interface LandingPageData {
  // Hero
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtons?: Array<{ text: string; href: string; variant: "default" | "outline" }>;

  // Features
  featuresTitle?: string;
  featuresSubtitle?: string;
  features?: Array<{ title: string; description: string; icon: string }>;
  showcaseFeatures?: Array<{ title: string; description: string }>;

  // Steps
  stepsTitle?: string;
  steps?: Array<{ title: string; description: string; step: number }>;

  // Booking
  bookingTitle?: string;
  bookingDescription?: string;

  // Testimonials
  testimonialsTitle?: string;
  testimonials?: Array<{ quote: string; name: string; role: string; avatar?: string }>;

  // Support
  supportTitle?: string;
  supportDescription?: string;
  supportChannels?: Array<{ title: string; description: string; icon: string; href: string }>;
  supportFaqs?: Array<{ question: string; answer: string }>;

  // Download
  downloadTitle?: string;
  downloadDescription?: string;

  // Navigation
  navigationBrand?: string;
  navigationLinks?: Array<{ label: string; href: string }>;

  // Footer
  footerBrand?: string;
  footerDescription?: string;
  footerCopyright?: string;
  footerSections?: Array<{ title: string; links: Array<{ label: string; href: string }> }>;
}

export async function getLandingPageData(): Promise<LandingPageData | null> {
  // Sanity CMS integration placeholder
  // All components fall back to hardcoded defaults when this returns null
  return null;
}
