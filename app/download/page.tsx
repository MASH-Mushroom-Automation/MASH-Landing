import { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import { Download, Smartphone, Monitor, Apple, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Download - MASH",
  description: "Download the MASH Mushroom Automation app for your device",
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
      <div className="bg-download py-16 text-inverse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Download className="w-8 h-8 text-inverse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Download MASH
            </h1>
            <p className="text-xl text-brand-light max-w-3xl mx-auto">
              Get the MASH app for your preferred platform and start monitoring your mushroom cultivation
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Apps Section */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <Smartphone className="w-8 h-8 text-green mr-3" />
              <h2 className="text-3xl font-bold text-primary">Mobile Apps</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* iOS App */}
              <div className="bg-componentpage rounded-xl p-8 border-default">
                <div className="flex items-center mb-6">
                  <Apple className="w-12 h-12 text-primary mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold text-primary">iOS App</h3>
                    <p className="text-secondary">iPhone & iPad</p>
                  </div>
                </div>
                <p className="text-secondary mb-6">
                  Available for devices running iOS 14.0 or later
                </p>
                <div className="space-y-3 mb-6">
                  {appFeatures.map((feature) => (
                    <div key={feature} className="flex items-center text-secondary">
                      <CheckCircle className="w-5 h-5 text-green mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                {/* This should be disabled for now. */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-full px-6 py-3 bg-gradient-dark text-inverse rounded-lg hover:bg-gradient-dark/80 transition-colors">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5M13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                    </svg>
                    {/* Download from App Store */}
                    Coming Soon on App Store!
                  </div>
                  <div
                    className="flex items-center justify-center w-full px-6 py-3 border-2 border-default text-secondary rounded-lg hover:bg-surface-hover transition-colors"
                  >
                    {/* <Download className="w-5 h-5 mr-2" />
                    Direct Download (.ipa) */}
                    Coming Soon!
                  </div>
                </div>
              </div>

              {/* Android App */}
              <div className="bg-componentpage rounded-xl p-8 border-default">
                <div className="flex items-center mb-6">
                  <svg className="w-12 h-12 text-green mr-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div>
                    <h3 className="text-2xl font-bold text-primary">Android App</h3>
                    <p className="text-secondary">Phones & Tablets</p>
                  </div>
                </div>
                <p className="text-secondary mb-6">
                  Available for devices running Android 8.0 or later
                </p>
                <div className="space-y-3 mb-6">
                  {appFeatures.map((feature) => (
                    <div key={feature} className="flex items-center text-secondary">
                      <CheckCircle className="w-5 h-5 text-green mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div
                    className="flex items-center justify-center w-full px-6 py-3 bg-brand text-inverse rounded-lg hover:bg-brand-hover transition-colors"
                  >
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    Coming soon on Play Store
                  </div>
                  <a
                    href="/downloads/mash-r1-020526-0.apk"
                    className="flex items-center justify-center w-full px-6 py-3 border-2 border-default text-secondary rounded-lg hover:bg-surface-hover transition-colors"
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
            <div className="flex items-center justify-center mb-8">
              <Monitor className="w-8 h-8 text-green mr-3" />
              <h2 className="text-3xl font-bold text-primary">Desktop Apps</h2>
            </div>

            <div className="bg-componentpage rounded-xl p-8 border-default max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">Desktop Features</h3>
                  <div className="space-y-3">
                    {desktopFeatures.map((feature) => (
                      <div key={feature} className="flex items-center text-secondary">
                        <CheckCircle className="w-5 h-5 text-green mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div
                    className="flex items-center justify-center w-full px-6 py-3 bg-accent-blue text-inverse rounded-lg hover:bg-accent-blue-hover transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 12V6.75L9 5.43V11.91L3 12M20 3V11.75L10 11.9V5.21L20 3M3 13L9 13.09V19.9L3 18.75V13M20 13.25V22L10 20.09V13.1L20 13.25Z" />
                    </svg>
                    Coming Soon!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Requirements */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold text-primary mb-4">System Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
              <div className="bg-componentpage p-6 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Mobile</h4>
                <ul className="text-sm text-secondary space-y-1">
                  <li>• iOS 14.0+ or Android 8.0+</li>
                  <li>• 100 MB free storage</li>
                  <li>• Internet connection</li>
                </ul>
              </div>
              <div className="bg-componentpage p-6 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Windows</h4>
                <ul className="text-sm text-secondary space-y-1">
                  <li>• Windows 10 or later</li>
                  <li>• 4 GB RAM</li>
                  <li>• 200 MB free storage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
