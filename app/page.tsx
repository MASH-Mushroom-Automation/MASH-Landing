import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import MobileAppShowcase from "@/components/MobileAppShowcase";
import IoTDeviceSection from "@/components/IoTDeviceSection";
import BookingSection from "@/components/BookingSection";
import DownloadSection from "@/components/DownloadSection";
import MiniCTA from "@/components/MiniCTA";
import Footer from "@/components/Footer";
import { getLandingPageDataCached } from "@/lib/sanity";

export default async function Home() {
  let landingData = null;
  try {
    landingData = await getLandingPageDataCached();
  } catch {
    // Fallback: sections render with defaults when Sanity is unreachable
  }

  return (
    <div className="min-h-screen">
      <main id="main-content">
        <HeroSection data={landingData} />
        <FeaturesSection data={landingData} />
        <MobileAppShowcase />
        <IoTDeviceSection data={landingData} />
        <BookingSection data={landingData} />
        <DownloadSection data={landingData} />
        <MiniCTA />
      </main>
      <Footer data={landingData} />
    </div>
  );
}
