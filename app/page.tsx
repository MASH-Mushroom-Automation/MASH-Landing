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

export default async function Home() {
  let modelUrl: string | undefined;

  try {
    const data = await getLandingPageData();
    if (data?.iotDeviceModel?.asset) {
      modelUrl = getSanityFileUrl(data.iotDeviceModel.asset);
    }
  } catch {
    // Sanity fetch failed - IoTDeviceSection will use local fallback
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <MobileAppShowcase />
        <IoTDeviceSection modelUrl={modelUrl} />
        <DemoSection />
        <DocumentationSection />
        <ScopeSection />
        <BookingSection />
        <SupportSection />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}
