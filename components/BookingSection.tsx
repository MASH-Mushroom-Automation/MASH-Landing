import Link from "next/link";
import { calConfig } from "@/lib/cal-config";
import { Check, Clock, Star, ArrowRight } from "lucide-react";
import type { LandingPageData } from "@/lib/sanity";

const DEFAULT_PLANS = [
  {
    name: "Quick Call",
    duration: calConfig.eventTypes['15min'].duration,
    description: calConfig.eventTypes['15min'].description,
    features: [
      "Quick setup questions",
      "Hardware compatibility check",
      "Basic troubleshooting",
    ],
    href: "/schedule?type=15min",
    popular: false,
  },
  {
    name: "Consultation",
    duration: calConfig.eventTypes['30min'].duration,
    description: calConfig.eventTypes['30min'].description,
    features: [
      "Full system walkthrough",
      "Custom configuration advice",
      "Growing environment assessment",
      "Integration planning",
    ],
    href: "/schedule?type=30min",
    popular: true,
  },
  {
    name: "Deep Dive",
    duration: calConfig.eventTypes['1-hour-meeting'].duration,
    description: calConfig.eventTypes['1-hour-meeting'].description,
    features: [
      "Everything in Consultation",
      "Multi-chamber setup planning",
      "Advanced automation rules",
      "Data export & analytics review",
      "Priority follow-up support",
    ],
    href: "/schedule?type=1-hour-meeting",
    popular: false,
  },
];

export default function BookingSection({ data }: { data?: LandingPageData | null } = {}) {
  const plans = DEFAULT_PLANS;

  return (
    <section id="schedule" className="section-padding bg-default">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 mb-4">
            <Clock className="w-4 h-4" />
            Free Consultations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {data?.bookingTitle ?? "Schedule a Consultation"}
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            {data?.bookingDescription ?? "Book a free video call to discuss your mushroom cultivation automation needs with our team."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative glass-card rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col ${
                plan.popular
                  ? "ring-2 ring-green-500 dark:ring-green-400 shadow-lg shadow-green-500/10"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-linear-to-r from-green-500 to-emerald-400 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                    <Star className="w-3 h-3" />
                    Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-primary">Free</span>
                  <span className="text-sm text-secondary">{plan.duration}</span>
                </div>
                <p className="text-sm text-secondary leading-relaxed">{plan.description}</p>
              </div>

              <div className="border-t border-gray-200 dark:border-white/10 pt-6 mb-8 flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-secondary">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={plan.href}
                className={`flex items-center justify-center gap-2 w-full text-center py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-linear-to-r from-green-500 to-emerald-400 text-white hover:from-green-600 hover:to-emerald-500 shadow-lg hover:shadow-xl"
                    : "border border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-500/10"
                }`}
              >
                Book Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
