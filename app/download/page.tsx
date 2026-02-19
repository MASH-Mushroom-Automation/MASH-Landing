import { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import { Download, Smartphone, Monitor, Apple, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Download - MASH",
  description: "Download the MASH: Mushroom Automation app for your device",
};

const appFeatures = [
  "Real-time sensor monitoring",
  "Remote climate control",
  "Push notifications for alerts",
  "Historical data charts",
  "Multi-chamber support",
  "Offline mode capability",
];

const desktopFeatures = [
  "Full dashboard experience",
  "Advanced data analytics",
  "Bulk configuration export",
  "Multi-monitor support",
  "Keyboard shortcuts",
  "Local data backup",
];

export default function DownloadPage() {
  return (
    <PageLayout>
      <div className="gradient-hero py-20">
        <div className="section-container text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-6">
            <Download className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Download MASH
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Get the MASH app for your preferred platform and start monitoring your mushroom cultivation
          </p>
        </div>
      </div>

      <div className="section-padding bg-default">
        <div className="section-container">
          {/* Mobile Apps Section */}
          <div className="mb-20">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Smartphone className="w-7 h-7 text-green-500" />
              <h2 className="text-3xl font-bold text-primary">Mobile Apps</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* iOS App */}
              <div className="glass-card rounded-xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <Apple className="w-12 h-12 text-primary mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold text-primary">iOS App</h3>
                    <p className="text-secondary">iPhone &amp; iPad</p>
                  </div>
                </div>
                <p className="text-secondary mb-6">
                  Available for devices running iOS 14.0 or later
                </p>
                <div className="space-y-3 mb-6">
                  {appFeatures.map((feature) => (
                    <div key={feature} className="flex items-center text-secondary">
                      <Check className="w-4 h-4 text-green-500 mr-2 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-full px-6 py-3 bg-gray-900 dark:bg-gray-800 text-white rounded-lg opacity-60 cursor-not-allowed">
                    Coming Soon on App Store!
                  </div>
                  <div className="flex items-center justify-center w-full px-6 py-3 border border-gray-200 dark:border-white/10 text-secondary rounded-lg opacity-60 cursor-not-allowed">
                    Coming Soon!
                  </div>
                </div>
              </div>

              {/* Android App */}
              <div className="glass-card rounded-xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <svg className="w-12 h-12 text-green-500 mr-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div>
                    <h3 className="text-2xl font-bold text-primary">Android App</h3>
                    <p className="text-secondary">Phones &amp; Tablets</p>
                  </div>
                </div>
                <p className="text-secondary mb-6">
                  Available for devices running Android 8.0 or later
                </p>
                <div className="space-y-3 mb-6">
                  {appFeatures.map((feature) => (
                    <div key={feature} className="flex items-center text-secondary">
                      <Check className="w-4 h-4 text-green-500 mr-2 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-full px-6 py-3 bg-green-600 text-white rounded-lg opacity-60 cursor-not-allowed">
                    Coming Soon on Play Store
                  </div>
                  <a
                    href="/downloads/mash-v1.4.3b5.apk"
                    className="flex items-center justify-center w-full px-6 py-3 border border-green-500/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-500/10 transition-colors"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Direct Download (.apk)
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Apps Section */}
          <div>
            <div className="flex items-center justify-center gap-3 mb-8">
              <Monitor className="w-7 h-7 text-green-500" />
              <h2 className="text-3xl font-bold text-primary">Desktop Apps</h2>
            </div>

            <div className="glass-card rounded-xl p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">Desktop Features</h3>
                  <div className="space-y-3">
                    {desktopFeatures.map((feature) => (
                      <div key={feature} className="flex items-center text-secondary">
                        <Check className="w-4 h-4 text-green-500 mr-2 shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-end">
                  <div className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg text-center opacity-60 cursor-not-allowed">
                    Coming Soon!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Requirements */}
          <div className="mt-20 text-center">
            <h3 className="text-xl font-bold text-primary mb-6">System Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
              <div className="glass-card p-6 rounded-xl">
                <h4 className="font-semibold text-primary mb-2">Mobile</h4>
                <ul className="text-sm text-secondary space-y-1">
                  <li>iOS 14.0+ or Android 8.0+</li>
                  <li>100 MB free storage</li>
                  <li>Internet connection</li>
                </ul>
              </div>
              <div className="glass-card p-6 rounded-xl">
                <h4 className="font-semibold text-primary mb-2">Windows</h4>
                <ul className="text-sm text-secondary space-y-1">
                  <li>Windows 10 or later</li>
                  <li>4 GB RAM</li>
                  <li>200 MB free storage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
