"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getSanityFileUrl, type LandingPageData } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

/**
 * Default hero video asset reference for Sanity CMS.
 * This is the animated MASH logo video uploaded to Sanity.
 */
const DEFAULT_HERO_VIDEO_ASSET: { _ref: string; _type: string } | null = {
  _ref: 'file-71501ee4a175fe13f42a40a9490a3db191df2db3-mp4',
  _type: 'reference',
};

const DEFAULT_HERO_BUTTONS = [
  { text: "Explore Features", href: "#features", variant: "default" as const },
  { text: "View Documentation", href: "/documentation", variant: "outline" as const },
];

const HERO_CARD_ICON_MAP: Record<string, React.ReactNode> = {
  monitoring: (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  mobile: (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  automation: (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

const DEFAULT_HERO_CARDS = [
  { title: "Real-time Monitoring", value: "Track temperature, humidity, CO2 levels, and more with precision sensors", icon: "monitoring" },
  { title: "Mobile Control", value: "Control your mushroom farm from anywhere with our mobile application", icon: "mobile" },
  { title: "Automated Control", value: "Intelligent automation maintains optimal growing conditions 24/7", icon: "automation" },
];

export default function HeroSection({ data }: { data?: LandingPageData | null } = {}) {
  const [videoError, setVideoError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const heroVideoAsset = data?.heroVideo?.asset ?? DEFAULT_HERO_VIDEO_ASSET;
  const heroVideoUrl = heroVideoAsset
    ? getSanityFileUrl(heroVideoAsset)
    : null;

  const stagger = prefersReducedMotion ? 0 : 0.15;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero">
      <div className="absolute inset-0 z-0">
        {heroVideoUrl && !videoError && !prefersReducedMotion ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            crossOrigin="anonymous"
            preload="none"
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
            onError={() => setVideoError(true)}
            aria-hidden="true"
          >
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full bg-hero" />
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: stagger * 0 }}
        >
          {data?.heroTitle ?? "MASH: Mushroom Automation"}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-secondary mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: stagger * 1 }}
        >
          {data?.heroSubtitle ?? "Advanced automation system for professional mushroom cultivation with real-time monitoring, climate control, and intelligent growing environment management"}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: stagger * 2 }}
        >
          {(data?.heroButtons ?? DEFAULT_HERO_BUTTONS).map((button, index) => (
            <Button
              key={index}
              asChild
              variant={button.variant === "outline" ? "outline" : "default"}
              size="xl"
              className={
                button.variant === "outline"
                  ? "border-2 border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 bg-surface hover:bg-surface-hover shadow-lg"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-lg"
              }
            >
              <a href={button.href}>{button.text}</a>
            </Button>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: stagger * 3 }}
        >
          {(data?.heroCards ?? DEFAULT_HERO_CARDS).map((card, index) => (
            <Card key={index} className="bg-card/90 backdrop-blur-sm shadow-lg border-default">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  {HERO_CARD_ICON_MAP[card.icon] ?? HERO_CARD_ICON_MAP["monitoring"]}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{card.title}</h3>
                <p className="text-secondary">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>

      {/* Scroll-down chevron */}
      <motion.a
        href="#features"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-secondary hover:text-primary transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: stagger * 4 }}
        aria-label="Scroll to features"
      >
        <ChevronDown className="w-8 h-8 animate-bounce" />
      </motion.a>
    </section>
  );
}
