import type { LandingPageData } from "@/lib/sanity";
import { Quote } from "lucide-react";

const DEFAULT_TESTIMONIALS = [
  {
    quote:
      "MASH transformed our oyster mushroom operation. The automated climate control reduced our manual monitoring by 80% and improved yields by 35%.",
    name: "Maria Santos",
    role: "Commercial Grower, Green Valley Farms",
  },
  {
    quote:
      "The real-time analytics dashboard is incredible. We can now track every variable across 12 growing chambers from a single screen. Game changer.",
    name: "James Chen",
    role: "Operations Manager, FungiTech Co.",
  },
  {
    quote:
      "Setting up was surprisingly easy. Within a day, all our sensors were connected and we had full visibility into our shiitake growing rooms.",
    name: "Dr. Amara Obi",
    role: "Research Lead, MycoLab Institute",
  },
];

export default function TestimonialsSection({
  data,
}: { data?: LandingPageData | null } = {}) {
  const testimonials = data?.testimonials ?? DEFAULT_TESTIMONIALS;

  return (
    <section className="py-20 lg:py-32 bg-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {data?.testimonialsTitle ?? "What Growers Are Saying"}
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Trusted by mushroom cultivators worldwide to automate and optimize
            their growing operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-white/10 rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Decorative quote mark */}
              <Quote className="w-8 h-8 text-green-500/30 mb-4" />

              <blockquote className="text-primary leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-500 to-emerald-400 flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-semibold text-primary text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-secondary text-xs">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
