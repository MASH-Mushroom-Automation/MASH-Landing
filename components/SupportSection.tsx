"use client";

import Link from "next/link";
import { useState } from "react";
import { calConfig } from "@/lib/cal-config";
import { Calendar, Mail, Users, BookOpen, ChevronDown, HelpCircle } from "lucide-react";
import type { LandingPageData } from "@/lib/sanity";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  calendar: Calendar,
  email: Mail,
  community: Users,
  knowledge: BookOpen,
};

const DEFAULT_CHANNELS = [
  { name: "Schedule a Call", description: "Book a video consultation", icon: "calendar", link: "/schedule", linkText: "Book Now" },
  { name: "Email Support", description: "Get help from our expert team", icon: "email", link: `mailto:${calConfig.contactEmail}`, linkText: calConfig.contactEmail },
  { name: "Community Forum", description: "Connect with other users", icon: "community", link: "https://www.facebook.com/groups/mashmushrooom", linkText: "Join the Community" },
  { name: "Knowledge Base", description: "Browse tutorials and guides", icon: "knowledge", link: "/documentation/tutorials", linkText: "View Articles" },
];

const DEFAULT_FAQS = [
  {
    question: "What hardware do I need to get started?",
    answer: "You will need a compatible microcontroller (Raspberry Pi recommended), environmental sensors, relay boards for equipment control, and the necessary power supply. We provide a detailed hardware list in our documentation.",
  },
  {
    question: "Is the mobile app available for both iOS and Android?",
    answer: "Yes, the MASH mobile application is available for both iOS and Android devices. You can download it from the App Store or Google Play Store.",
  },
  {
    question: "Can I manage multiple growing chambers?",
    answer: "Absolutely! MASH supports multiple chambers with independent climate zones. You can monitor and control each chamber separately with custom settings for different mushroom species.",
  },
  {
    question: "What kind of support do you offer?",
    answer: "We offer email support, comprehensive documentation, video tutorials, and an active community forum. Premium support packages are also available for commercial operations.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, all data is encrypted in transit and at rest. We use industry-standard security practices and offer both cloud and local storage options for complete control over your data.",
  },
];

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-primary pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-secondary shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-sm text-secondary leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function SupportSection({ data }: { data?: LandingPageData | null } = {}) {
  const channels = data?.supportChannels ?? DEFAULT_CHANNELS;
  const faqs = data?.supportFaqs ?? DEFAULT_FAQS;

  return (
    <section id="support" className="section-padding bg-default">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 mb-4">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {data?.supportTitle ?? "Support & Resources"}
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            {data?.supportDescription ?? "We are here to help you succeed with comprehensive support and resources."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {channels.map((channel, index) => {
            const isExternal = channel.link.startsWith("http");
            const isMailto = channel.link.startsWith("mailto:");
            const IconComponent = ICON_MAP[channel.icon] ?? BookOpen;

            const card = (
              <div className="glass-card rounded-xl p-6 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/10 text-green-500 dark:text-green-400 mb-4 group-hover:bg-green-500/20 transition-colors">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-primary mb-1">{channel.name}</h3>
                <p className="text-sm text-secondary mb-3">{channel.description}</p>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {channel.linkText ?? channel.name}
                </span>
              </div>
            );

            if (isExternal) {
              return (
                <a key={index} href={channel.link} target="_blank" rel="noopener noreferrer">
                  {card}
                </a>
              );
            }
            if (isMailto) {
              return (
                <a key={index} href={channel.link}>
                  {card}
                </a>
              );
            }
            return (
              <Link key={index} href={channel.link}>
                {card}
              </Link>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium hover:underline"
            >
              View All FAQs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
