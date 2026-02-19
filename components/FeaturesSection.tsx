import type { LandingPageData } from "@/lib/sanity";
import {
  Cloud,
  BarChart3,
  LayoutGrid,
  Bell,
  Globe,
  BookOpen,
  Check,
  Thermometer,
  Droplets,
  Wind,
  Sun,
} from "lucide-react";

const DEFAULT_SHOWCASE_FEATURES = [
  {
    title: "Optimize your growing environment",
    description:
      "Let IoT sensors continuously monitor temperature, humidity, CO2, and light levels. Focus on what matters most — growing quality mushrooms, while MASH optimizes conditions automatically.",
  },
  {
    title: "Track your cultivation metrics",
    description:
      "Monitor growth cycles with real-time analytics. Get actionable insights to maximize yields during peak growing periods.",
  },
  {
    title: "Automate your daily operations",
    description:
      "Automate climate control, irrigation, and ventilation schedules. Reduce manual work and produce consistently better harvests.",
  },
];

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  "climate-control": <Cloud className="w-5 h-5" />,
  analytics: <BarChart3 className="w-5 h-5" />,
  "multi-chamber": <LayoutGrid className="w-5 h-5" />,
  alerts: <Bell className="w-5 h-5" />,
  "remote-access": <Globe className="w-5 h-5" />,
  recipes: <BookOpen className="w-5 h-5" />,
};

const DEFAULT_FEATURES = [
  {
    title: "Climate Control",
    description:
      "Automated temperature and humidity regulation with precision control systems",
    icon: "climate-control",
  },
  {
    title: "Real-time Analytics",
    description:
      "Comprehensive data visualization and historical trend analysis",
    icon: "analytics",
  },
  {
    title: "Multi-chamber Support",
    description:
      "Manage multiple growing chambers with independent climate zones",
    icon: "multi-chamber",
  },
  {
    title: "Alert System",
    description:
      "Instant notifications for critical events and threshold breaches",
    icon: "alerts",
  },
  {
    title: "Remote Access",
    description: "Secure cloud connectivity for monitoring from anywhere",
    icon: "remote-access",
  },
  {
    title: "Recipe Management",
    description:
      "Store and apply proven growing recipes for different mushroom species",
    icon: "recipes",
  },
];

const DASHBOARD_READINGS = [
  { label: "Temperature", value: "24.5°C", icon: Thermometer, color: "text-orange-400", bar: 72 },
  { label: "Humidity", value: "85%", icon: Droplets, color: "text-blue-400", bar: 85 },
  { label: "CO2 Level", value: "800 ppm", icon: Wind, color: "text-emerald-400", bar: 53 },
  { label: "Light", value: "450 lux", icon: Sun, color: "text-yellow-400", bar: 45 },
];

export default function FeaturesSection({
  data,
}: { data?: LandingPageData | null } = {}) {
  const features = data?.features?.slice(0, 6) ?? DEFAULT_FEATURES;
  const showcaseFeatures = data?.showcaseFeatures ?? DEFAULT_SHOWCASE_FEATURES;

  return (
    <>
      {/* Feature Showcase — Split layout */}
      <section id="features" className="py-20 lg:py-32 bg-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {data?.featuresTitle ??
                "Revolutionize your mushroom cultivation"}
            </h2>
            <p className="text-lg text-secondary max-w-3xl mx-auto">
              {data?.featuresSubtitle ??
                "Transform your growing operation with IoT-powered monitoring and automated environmental control."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Feature list with checkmarks */}
            <div className="space-y-8">
              {showcaseFeatures.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-green-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="text-secondary leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Dashboard mockup card */}
            <div className="flex justify-center">
              <div className="w-full max-w-md glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <span className="ml-2 text-xs text-tertiary font-mono">
                    MASH Dashboard
                  </span>
                </div>

                <div className="space-y-3">
                  {DASHBOARD_READINGS.map((reading) => {
                    const Icon = reading.icon;
                    return (
                      <div
                        key={reading.label}
                        className="flex items-center gap-3 p-3 bg-white/5 dark:bg-white/5 rounded-lg border border-white/5"
                      >
                        <Icon className={`w-4 h-4 ${reading.color} shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-tertiary">
                              {reading.label}
                            </span>
                            <span className="text-sm font-mono font-medium text-green-500">
                              {reading.value}
                            </span>
                          </div>
                          <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-linear-to-r from-green-500 to-emerald-400"
                              style={{ width: `${reading.bar}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-32 gradient-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Take control of your cultivation
            </h2>
            <p className="text-lg text-secondary max-w-3xl mx-auto">
              Everything you need to automate and optimize your mushroom growing
              operation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group glass-card p-6 rounded-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 text-green-600 dark:text-green-400 group-hover:bg-green-500/20 transition-colors duration-300">
                  {FEATURE_ICONS[feature.icon] ?? FEATURE_ICONS["climate-control"]}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
