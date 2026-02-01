'use client';

import { Suspense, useState, useMemo } from "react";
import PageLayout from "@/components/layout/PageLayout";
import CalendarScheduler from "@/components/CalendarScheduler";
import { Calendar, Clock, Video, CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { calConfig, type EventTypeKey } from "@/lib/cal-config";

function ScheduleContent() {
  const searchParams = useSearchParams();
  
  // Get initial meeting type from URL params
  const initialType = useMemo(() => {
    const typeParam = searchParams.get('type');
    if (typeParam && typeParam in calConfig.eventTypes) {
      return typeParam as EventTypeKey;
    }
    return '30min' as EventTypeKey;
  }, [searchParams]);
  
  const [meetingType, setMeetingType] = useState<EventTypeKey>(initialType);

  const selectedEvent = calConfig.eventTypes[meetingType];

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Schedule a Meeting
            </h1>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Book a time that works for you to discuss your mushroom automation needs
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meeting Type Selection */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Choose Your Meeting Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {(Object.keys(calConfig.eventTypes) as EventTypeKey[]).map((key) => {
                const event = calConfig.eventTypes[key];
                return (
                  <button
                    key={key}
                    onClick={() => setMeetingType(key)}
                    className={`p-6 rounded-xl text-center transition-all ${
                      meetingType === key
                        ? 'bg-brand text-inverse shadow-lg scale-105'
                        : 'bg-componentpage hover:shadow-md'
                    }`}
                  >
                    <div className={`text-3xl font-bold mb-2 ${
                      meetingType === key ? 'text-inverse' : 'text-primary'
                    }`}>
                      {event.duration}
                    </div>
                    <div className={`text-sm font-semibold ${
                      meetingType === key ? 'text-inverse/90' : 'text-secondary'
                    }`}>
                      {event.name}
                    </div>
                    {event.popular && (
                      <span className="inline-block mt-2 px-2 py-1 bg-green-500/20 text-green-600 dark:text-green-400 text-xs rounded-full">
                        Popular
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calendar Embed */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-componentpage rounded-xl p-8 shadow-lg">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {selectedEvent.name}
                </h3>
                <p className="text-secondary mb-4">
                  {selectedEvent.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-secondary">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedEvent.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    <span>Video Conference</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Flexible Scheduling</span>
                  </div>
                </div>
              </div>

              {/* Cal.com Calendar Component */}
              <CalendarScheduler 
                key={meetingType}
                eventType={meetingType} 
                theme="auto"
              />
            </div>
          </div>

          {/* What to Expect */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">
              What to Expect
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Instant Confirmation</h4>
                  <p className="text-secondary text-sm">
                    Receive an email confirmation with meeting details and video link
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Expert Guidance</h4>
                  <p className="text-secondary text-sm">
                    Connect with MASH experts who understand automation
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Flexible Rescheduling</h4>
                  <p className="text-secondary text-sm">
                    Easy to reschedule or cancel if plans change
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Actionable Insights</h4>
                  <p className="text-secondary text-sm">
                    Walk away with clear next steps for your automation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-16 text-center">
            <p className="text-secondary mb-4">
              Questions about scheduling? Contact us at{' '}
              <a
                href={`mailto:${calConfig.contactEmail}`}
                className="text-brand hover:text-brand-hover font-semibold"
              >
                {calConfig.contactEmail}
              </a>
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default function SchedulePage() {
  return (
    <Suspense fallback={
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
            <p className="text-secondary">Loading calendar...</p>
          </div>
        </div>
      </PageLayout>
    }>
      <ScheduleContent />
    </Suspense>
  );
}
