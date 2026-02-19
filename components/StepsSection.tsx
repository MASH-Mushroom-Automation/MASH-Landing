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
    <section id="how-it-works" className="py-20 lg:py-32 bg-default">
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

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-green-500/20 via-green-500/40 to-green-500/20" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative text-center">
                {/* Step number badge */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 text-white text-xl font-bold mb-6 shadow-lg">
                  {step.step}
                  <div className="absolute -inset-1 rounded-full bg-green-500/20 animate-pulse" />
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <Icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-secondary leading-relaxed max-w-sm mx-auto">
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
