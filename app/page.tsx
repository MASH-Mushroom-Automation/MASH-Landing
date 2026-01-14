import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import DemoSection from "@/components/DemoSection";
import DocumentationSection from "@/components/DocumentationSection";
import ScopeSection from "@/components/ScopeSection";
import SupportSection from "@/components/SupportSection";
import DownloadSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <DocumentationSection />
        <ScopeSection />
        <SupportSection />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}
