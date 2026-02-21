import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import MobileAppShowcase from "@/components/MobileAppShowcase";
import IoTDeviceSection from "@/components/IoTDeviceSection";
import BookingSection from "@/components/BookingSection";
import DownloadSection from "@/components/DownloadSection";
import MiniCTA from "@/components/MiniCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <MobileAppShowcase />
        <IoTDeviceSection />
        <BookingSection />
        <DownloadSection />
        <MiniCTA />
      </main>
      <Footer />
    </div>
  );
}
