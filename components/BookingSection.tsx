import Link from "next/link";
import { Calendar, Clock, Video } from "lucide-react";
import { calConfig } from "@/lib/cal-config";
import type { LandingPageData } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function BookingSection({ data }: { data?: LandingPageData | null } = {}) {
  return (
    <section id="booking" className="py-20 bg-componentpage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {data?.bookingTitle ?? "Schedule a Meeting"}
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              {data?.bookingDescription ?? "Book a time to discuss your mushroom automation needs with our team"}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* 15 Minute Quick Call */}
          <ScrollReveal delay={0}>
            <Card className="bg-componentpage hover:shadow-lg transition-shadow h-full border-default">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">{calConfig.eventTypes['15min'].duration}</h3>
                <p className="text-secondary mb-6">{calConfig.eventTypes['15min'].description}</p>
                <Button asChild size="xl">
                  <Link href="/schedule?type=15min">Book Quick Call</Link>
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* 30 Minute Standard */}
          <ScrollReveal delay={0.1}>
            <Card className="relative bg-card hover:shadow-lg transition-shadow h-full border-2 border-brand">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-brand text-inverse px-4 py-1 rounded-full text-sm font-semibold">
                  Popular
                </span>
              </div>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">{calConfig.eventTypes['30min'].duration}</h3>
                <p className="text-secondary mb-6">{calConfig.eventTypes['30min'].description}</p>
                <Button asChild size="xl">
                  <Link href="/schedule?type=30min">Book Consultation</Link>
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* 1 Hour Deep Dive */}
          <ScrollReveal delay={0.2}>
            <Card className="bg-card hover:shadow-lg transition-shadow h-full border-default">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">{calConfig.eventTypes['1-hour-meeting'].duration}</h3>
                <p className="text-secondary mb-6">{calConfig.eventTypes['1-hour-meeting'].description}</p>
                <Button asChild size="xl">
                  <Link href="/schedule?type=1-hour-meeting">Book Deep Dive</Link>
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="text-center">
            <p className="text-secondary mb-4">
              All meetings are conducted via video call. You&apos;ll receive a confirmation email with the meeting link.
            </p>
            <Button asChild variant="link" className="text-brand hover:text-brand-hover font-semibold text-base">
              <Link href="/schedule">View All Available Times →</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
