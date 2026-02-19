import Link from "next/link";
import { Download, Calendar, ArrowRight } from "lucide-react";
import type { LandingPageData } from "@/lib/sanity";

export default function DownloadSection({ data }: { data?: LandingPageData | null } = {}) {
  return (
    <section id="download" className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.15),transparent_70%)]" />

      <div className="section-container relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
          {data?.downloadTitle ?? "Ready to Automate Your Cultivation?"}
        </h2>
        <p className="text-lg text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          {data?.downloadDescription ?? "Download the MASH mobile app and start monitoring your mushroom cultivation from anywhere. Available for iOS and Android."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/download"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold bg-linear-to-r from-green-500 to-emerald-400 text-white hover:from-green-600 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Download className="w-5 h-5" />
            Download App
          </Link>
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold border border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-500/10 transition-all duration-300"
          >
            <Calendar className="w-5 h-5" />
            Schedule a Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
