import type { LandingPageData } from "@/lib/sanity";
import { Thermometer, Droplets, Wind, Sun } from "lucide-react";

const DEFAULT_HERO_BUTTONS = [
  { text: "Get Started", href: "#features", variant: "default" as const },
  { text: "Learn More", href: "#how-it-works", variant: "outline" as const },
];

const DASHBOARD_METRICS = [
  { label: "Temperature", value: "24.5°C", icon: Thermometer, color: "text-orange-400" },
  { label: "Humidity", value: "85%", icon: Droplets, color: "text-blue-400" },
  { label: "CO2 Level", value: "800 ppm", icon: Wind, color: "text-emerald-400" },
  { label: "Light", value: "450 lux", icon: Sun, color: "text-yellow-400" },
];

export default function HeroSection({ data }: { data?: LandingPageData | null } = {}) {
  return (
    <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-32 overflow-hidden gradient-hero">
      {/* Animated gradient background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-green-500/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-emerald-500/8 blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl animate-pulse [animation-delay:4s]" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle, rgb(34 197 94) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              IoT-Powered Cultivation
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary mb-6 leading-[1.08]">
              {data?.heroTitle ?? (
                <>
                  <span className="gradient-text-brand">Smart</span> Mushroom
                  <br className="hidden sm:block" /> Cultivation Platform
                </>
              )}
            </h1>

            <p className="text-lg md:text-xl text-secondary mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {data?.heroSubtitle ??
                "Advanced IoT automation for professional mushroom cultivation with real-time monitoring, climate control, and intelligent growing environment management."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              {(data?.heroButtons ?? DEFAULT_HERO_BUTTONS).map((button: { text: string; href: string; variant: "default" | "outline" }, index: number) => (
                <a
                  key={index}
                  href={button.href}
                  className={
                    button.variant === "outline"
                      ? "px-7 py-3 rounded-lg text-base font-semibold border border-green-500/40 text-green-600 dark:text-green-400 hover:bg-green-500/10 transition-all duration-300"
                      : "px-7 py-3 rounded-lg text-base font-semibold bg-linear-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  }
                >
                  {button.text}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Dashboard preview card */}
          <div className="hidden lg:block">
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-primary">Live Dashboard</span>
                </div>
                <span className="text-xs text-tertiary">Chamber A</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {DASHBOARD_METRICS.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={metric.label}
                      className="bg-white/5 dark:bg-white/5 rounded-xl p-4 border border-white/5"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-4 h-4 ${metric.color}`} />
                        <span className="text-xs text-tertiary">{metric.label}</span>
                      </div>
                      <div className="text-xl font-bold text-primary">{metric.value}</div>
                    </div>
                  );
                })}
              </div>

              {/* Mini chart placeholder */}
              <div className="mt-4 h-16 rounded-lg bg-white/5 dark:bg-white/5 border border-white/5 flex items-end justify-between px-3 pb-2 gap-1">
                {[40, 65, 45, 80, 55, 70, 60, 85, 50, 75, 65, 90].map((h, i) => (
                  <div
                    key={i}
                    className="w-full rounded-sm bg-linear-to-t from-green-500/40 to-green-500/80"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
