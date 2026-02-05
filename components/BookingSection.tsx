import Link from "next/link";
import { Calendar, Clock, Video } from "lucide-react";
import { calConfig } from "@/lib/cal-config";

export default function BookingSection() {
  return (
    <section id="schedule" className="py-16 bg-accent-blue-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Schedule a Meeting
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Book a time to discuss your mushroom automation needs with our team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* 15 Minute Quick Call */}
          <div className="bg-componentpage p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">{calConfig.eventTypes['15min'].duration}</h3>
            <p className="text-secondary mb-6">{calConfig.eventTypes['15min'].description}</p>
            <Link
              href="/schedule?type=15min"
              className="inline-flex items-center px-6 py-3 bg-brand text-inverse rounded-full hover:bg-brand-hover transition-colors font-semibold"
            >
              Book Quick Call
            </Link>
          </div>

          {/* 30 Minute Standard */}
          <div className="relative bg-componentpage p-8 rounded-xl text-center hover:shadow-lg transition-shadow border-2 border-brand">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-brand text-inverse px-4 py-1 rounded-full text-sm font-semibold">
                Popular
              </span>
            </div>
            <div className="w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">{calConfig.eventTypes['30min'].duration}</h3>
            <p className="text-secondary mb-6">{calConfig.eventTypes['30min'].description}</p>
            <Link
              href="/schedule?type=30min"
              className="inline-flex items-center px-6 py-3 bg-brand text-inverse rounded-full hover:bg-brand-hover transition-colors font-semibold"
            >
              Book Consultation
            </Link>
          </div>

          {/* 1 Hour Deep Dive */}
          <div className="bg-componentpage p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-accent-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">{calConfig.eventTypes['1-hour-meeting'].duration}</h3>
            <p className="text-secondary mb-6">{calConfig.eventTypes['1-hour-meeting'].description}</p>
            <Link
              href="/schedule?type=1-hour-meeting"
              className="inline-flex items-center px-6 py-3 bg-brand text-inverse rounded-full hover:bg-brand-hover transition-colors font-semibold"
            >
              Book Deep Dive
            </Link>
          </div>
        </div>

        <div className="text-center">
          <p className="text-secondary mb-4">
            All meetings are conducted via video call. You&apos;ll receive a confirmation email with the meeting link.
          </p>
          <Link
            href="/schedule"
            className="text-brand hover:text-brand-hover font-semibold"
          >
            View All Available Times →
          </Link>
        </div>
      </div>
    </section>
  );
}
