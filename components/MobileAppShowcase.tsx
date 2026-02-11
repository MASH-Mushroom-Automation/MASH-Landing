"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import type { LandingPageData } from "@/lib/sanity";
import { getSanityImageUrl } from "@/lib/sanity";

const SCREEN_ICON_MAP: Record<string, React.ReactNode> = {
  dashboard: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  controls: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
  ),
  alerts: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  ),
  analytics: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
    </svg>
  ),
};

interface AppScreen {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  features: string[];
  screenshotUrl?: string;
}

/**
 * App screens data representing the MASH mobile application.
 * Each screen shows a key feature of the mobile app.
 */
const DEFAULT_SCREENS: AppScreen[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Real-time overview of all your growing chambers with live sensor data",
    color: "bg-green-600",
    icon: "dashboard",
    features: ["Live temperature & humidity", "CO2 level monitoring", "Growth stage tracking"],
  },
  {
    id: "controls",
    title: "Smart Controls",
    description: "Adjust climate parameters and automation schedules from anywhere",
    color: "bg-blue-600",
    icon: "controls",
    features: ["Temperature set points", "Humidity control", "Fan & misting schedules"],
  },
  {
    id: "alerts",
    title: "Alerts & Notifications",
    description: "Instant push notifications for critical events and threshold breaches",
    color: "bg-amber-600",
    icon: "alerts",
    features: ["Push notifications", "SMS alerts", "Email reports"],
  },
  {
    id: "analytics",
    title: "Analytics & Reports",
    description: "Comprehensive data visualization with historical trends and predictions",
    color: "bg-purple-600",
    icon: "analytics",
    features: ["Growth charts", "Yield predictions", "Export to CSV"],
  },
];

/**
 * MobileAppShowcase displays the MASH mobile application in a phone mockup
 * with parallax scrolling and interactive screen switching.
 */
export default function MobileAppShowcase({ data }: { data?: LandingPageData | null } = {}) {
  const screens = data?.mobileAppScreens
    ? data.mobileAppScreens.map(s => ({
        ...s,
        description: s.subtitle,
        screenshotUrl: s.screenshot?.asset ? getSanityImageUrl(s.screenshot, { width: 560, height: 1120 }) : undefined,
      }))
    : DEFAULT_SCREENS;
  const [activeScreen, setActiveScreen] = useState(screens[0]?.id ?? "dashboard");
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const phoneY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -80]);
  const phoneRotateY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-8, 0, 0, 8]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.9, 1, 1, 0.9]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const featuresX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [50, 0, 0, -50]);

  const currentScreen = screens.find((s) => s.id === activeScreen) || screens[0];

  return (
    <section
      ref={sectionRef}
      id="mobile-app"
      className="py-24 bg-default overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div style={{ opacity: contentOpacity }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {data?.mobileAppTitle ?? "Control From Anywhere"}
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            {data?.mobileAppSubtitle ?? "The MASH mobile application puts your mushroom cultivation operation in the palm of your hand"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Phone Mockup */}
          <motion.div
            style={{ y: phoneY, rotateY: phoneRotateY, scale: phoneScale } as Record<string, unknown>}
            className="flex justify-center perspective-1000"
          >
            <div className="relative w-[280px] h-[560px] rounded-[3rem] border-4 border-gray-700 dark:border-gray-600 bg-gray-900 shadow-2xl overflow-hidden">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-20" />

              {/* Screen content */}
              <div className="absolute inset-2 rounded-[2.5rem] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreen}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    {currentScreen.screenshotUrl ? (
                      <Image
                        src={currentScreen.screenshotUrl}
                        alt={`${currentScreen.title} screen`}
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                    ) : (
                      <div className={`h-full ${currentScreen.color} p-6 flex flex-col`}>
                        {/* Status bar */}
                        <div className="flex justify-between items-center mb-6 mt-6">
                          <span className="text-white text-xs font-medium">9:41</span>
                          <div className="flex gap-1.5">
                            <div className="w-4 h-2.5 border border-white/60 rounded-sm">
                              <div className="w-3/4 h-full bg-white/80 rounded-sm" />
                            </div>
                          </div>
                        </div>

                        {/* App header */}
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                            {SCREEN_ICON_MAP[currentScreen.icon] ?? SCREEN_ICON_MAP["dashboard"]}
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-lg">
                              {currentScreen.title}
                            </h3>
                            <p className="text-white/70 text-xs">MASH App</p>
                          </div>
                        </div>

                        {/* Feature cards */}
                        <div className="flex-1 space-y-3">
                          {currentScreen.features.map((feature, i) => (
                            <motion.div
                              key={feature}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="bg-white/15 backdrop-blur-sm rounded-xl p-3"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full" />
                                <span className="text-white text-sm font-medium">
                                  {feature}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Bottom nav mockup */}
                        <div className="flex justify-around mt-4 pt-3 border-t border-white/20">
                          {["Home", "Data", "Settings"].map((tab) => (
                            <div key={tab} className="text-center">
                              <div className="w-5 h-5 mx-auto bg-white/30 rounded-md mb-1" />
                              <span className="text-white/60 text-[10px]">{tab}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/50 rounded-full z-20" />
            </div>
          </motion.div>

          {/* Feature selector */}
          <motion.div style={{ opacity: contentOpacity, x: featuresX } as Record<string, unknown>} className="space-y-4">
            <h3 className="text-2xl font-bold text-primary mb-6">
              App Features
            </h3>
            {screens.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setActiveScreen(screen.id)}
                className={`w-full text-left p-5 rounded-xl transition-all duration-300 ${
                  activeScreen === screen.id
                    ? "bg-green-600 text-white shadow-lg shadow-green-600/25 scale-[1.02]"
                    : "bg-card hover:bg-surface-hover border border-border"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activeScreen === screen.id
                        ? "bg-white/20 text-white"
                        : "bg-green-600/10 text-green-600 dark:text-green-400"
                    }`}
                  >
                    {SCREEN_ICON_MAP[screen.icon] ?? SCREEN_ICON_MAP["dashboard"]}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{screen.title}</h4>
                    <p
                      className={
                        activeScreen === screen.id
                          ? "text-green-100 text-sm"
                          : "text-secondary text-sm"
                      }
                    >
                      {screen.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
