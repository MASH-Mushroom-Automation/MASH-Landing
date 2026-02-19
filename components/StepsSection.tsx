import type { LandingPageData } from "@/lib/sanity";
import { Cpu, BarChart3, Zap } from "lucide-react";

const DEFAULT_STEPS = [
  {
    step: 1,
    title: "Connect Your Hardware",
    description:
      "Set up IoT sensors and actuators in your growing environment. MASH supports a wide range of temperature, humidity, CO2, and light sensors.",
    icon: Cpu,
  },
  {
    step: 2,
    title: "Monitor & Analyze",
    description:
      "Access your real-time dashboard with comprehensive analytics. Track environmental conditions, growth cycles, and performance metrics.",
    icon: BarChart3,
  },
  {
    step: 3,
    title: "Automate & Optimize",
    description:
      "Create intelligent automation rules and growing recipes. Let AI-driven controls maintain optimal conditions for each mushroom species.",
    icon: Zap,
  },
];

export default function StepsSection({
  data,
}: { data?: LandingPageData | null } = {}) {
  const steps = DEFAULT_STEPS;

  return (
    <section id="how-it-works" className="py-20 lg:py-32 gradient-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {data?.stepsTitle ?? "Start Growing Smarter in 3 Steps"}
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Get up and running with MASH in minutes. Our platform makes it easy
            to connect, monitor, and automate your cultivation.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px">
            <div className="h-full bg-linear-to-r from-green-500/0 via-green-500/30 to-green-500/0" />
            {/* Animated dots on the connecting line */}
            <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500/40 animate-pulse" />
            <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500/40 animate-pulse [animation-delay:1s]" />
          </div>

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative text-center group">
                {/* Step number badge */}
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br from-green-500 to-emerald-400 text-white text-lg font-bold mb-6 shadow-lg">
                  {step.step}
                  <div className="absolute -inset-1.5 rounded-full bg-green-500/15 group-hover:bg-green-500/25 transition-colors duration-300" />
                </div>

                {/* Illustration placeholder - light/dark swap */}
                <div className="mx-auto mb-6 w-full max-w-[200px] h-32 rounded-xl bg-white/5 dark:bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon className="w-12 h-12 text-green-500/50 dark:text-green-400/50 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-secondary leading-relaxed max-w-xs mx-auto text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
