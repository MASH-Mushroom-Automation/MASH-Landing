import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import MobileAppShowcase from "@/components/MobileAppShowcase";
import IoTDeviceSection from "@/components/IoTDeviceSection";
import DemoSection from "@/components/DemoSection";
import DocumentationSection from "@/components/DocumentationSection";
import ScopeSection from "@/components/ScopeSection";
import BookingSection from "@/components/BookingSection";
import SupportSection from "@/components/SupportSection";
import DownloadSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";
import { getLandingPageData, getSanityFileUrl } from "@/lib/sanity";
import type { LandingPageData } from "@/lib/sanity";

export default async function Home() {
  let landingData: LandingPageData | null = null;
  let modelUrl: string | undefined;

  try {
    landingData = await getLandingPageData();
    if (landingData?.iotDeviceModel?.asset) {
      modelUrl = getSanityFileUrl(landingData.iotDeviceModel.asset);
    }
  } catch {
    // Sanity fetch failed - all components will use hardcoded defaults
  }

  return (
    <div className="min-h-screen">
      <Navigation data={landingData} />
      <main>
        <HeroSection data={landingData} />
        <FeaturesSection data={landingData} />
        <MobileAppShowcase data={landingData} />
        <IoTDeviceSection modelUrl={modelUrl} data={landingData} />
        <DemoSection data={landingData} />
        <DocumentationSection data={landingData} />
        <ScopeSection data={landingData} />
        <BookingSection data={landingData} />
        <SupportSection data={landingData} />
        <DownloadSection data={landingData} />
      </main>
      <Footer data={landingData} />
    </div>
  );
}
