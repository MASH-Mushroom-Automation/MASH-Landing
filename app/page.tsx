import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StepsSection from "@/components/StepsSection";
import BookingSection from "@/components/BookingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SupportSection from "@/components/SupportSection";
import DownloadSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { getLandingPageData } from "@/lib/sanity";
import type { LandingPageData } from "@/lib/sanity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MASH - Mushroom Automation System Hub",
  description:
    "Professional mushroom cultivation automation platform with real-time monitoring, AI-powered environmental control, and mobile app management.",
  keywords: [
    "mushroom automation",
    "mushroom cultivation",
    "IoT farming",
    "environmental control",
    "smart agriculture",
    "MASH",
  ],
  openGraph: {
    title: "MASH - Mushroom Automation System Hub",
    description:
      "Advanced automation system for professional mushroom cultivation with real-time monitoring, climate control, and intelligent alerts.",
    type: "website",
    siteName: "MASH",
  },
  twitter: {
    card: "summary_large_image",
    title: "MASH - Mushroom Automation System Hub",
    description:
      "Professional mushroom cultivation automation with real-time monitoring and mobile app control.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Home() {
  let landingData: LandingPageData | null = null;

  try {
    landingData = await getLandingPageData();
  } catch {
    // Sanity fetch failed - all components will use hardcoded defaults
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "MASH - Mushroom Automation System Hub",
            description:
              "Professional mushroom cultivation automation platform with real-time monitoring, AI-powered environmental control, and mobile app management.",
            url: "https://join.mashmarket.app",
            contactPoint: {
              "@type": "ContactPoint",
              email: "mash.mushroom.automation@gmail.com",
              contactType: "customer support",
            },
          }),
        }}
      />
      <Navigation data={landingData} />
      <main>
        <HeroSection data={landingData} />
        <ScrollReveal>
          <FeaturesSection data={landingData} />
        </ScrollReveal>
        <ScrollReveal>
          <StepsSection data={landingData} />
        </ScrollReveal>
        <ScrollReveal>
          <BookingSection data={landingData} />
        </ScrollReveal>
        <ScrollReveal>
          <TestimonialsSection data={landingData} />
        </ScrollReveal>
        <ScrollReveal>
          <SupportSection data={landingData} />
        </ScrollReveal>
        <ScrollReveal>
          <DownloadSection data={landingData} />
        </ScrollReveal>
      </main>
      <Footer data={landingData} />
    </div>
  );
}
