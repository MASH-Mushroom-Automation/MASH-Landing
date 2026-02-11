import Link from "next/link";
import { calConfig } from "@/lib/cal-config";
import type { LandingPageData } from "@/lib/sanity";

const CHANNEL_ICON_MAP: Record<string, React.ReactNode> = {
  calendar: (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  email: (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  community: (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
    </svg>
  ),
  knowledge: (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
};

const CHANNEL_STYLE_MAP: Record<string, { gradient: string; iconBg: string; textColor: string }> = {
  calendar: { gradient: "from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30", iconBg: "bg-emerald-600", textColor: "text-emerald-800 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-emerald-200" },
  email: { gradient: "from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30", iconBg: "bg-green-600", textColor: "text-green-800 dark:text-green-300 hover:text-green-900 dark:hover:text-green-200" },
  community: { gradient: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30", iconBg: "bg-blue-600", textColor: "text-blue-800 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-200" },
  knowledge: { gradient: "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30", iconBg: "bg-purple-600", textColor: "text-purple-800 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-200" },
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

export default function SupportSection({ data }: { data?: LandingPageData | null } = {}) {
  const channels = data?.supportChannels ?? DEFAULT_CHANNELS;
  const faqs = data?.supportFaqs ?? DEFAULT_FAQS;
  return (
    <section id="support" className="py-20 bg-support">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {data?.supportTitle ?? "Support & Resources"}
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            {data?.supportDescription ?? "We are here to help you succeed with comprehensive support and resources"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {channels.map((channel, index) => {
            const style = CHANNEL_STYLE_MAP[channel.icon] ?? CHANNEL_STYLE_MAP["calendar"];
            const isExternal = channel.link.startsWith("http");
            const isMailto = channel.link.startsWith("mailto:");
            return (
              <div key={index} className={`bg-gradient-to-br ${style.gradient} p-8 rounded-xl text-center`}>
                <div className={`w-16 h-16 ${style.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {CHANNEL_ICON_MAP[channel.icon] ?? CHANNEL_ICON_MAP["calendar"]}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{channel.name}</h3>
                <p className="text-secondary mb-4">{channel.description}</p>
                {isExternal ? (
                  <a href={channel.link} target="_blank" rel="noopener noreferrer" className={`${style.textColor} font-semibold`}>
                    {channel.linkText ?? channel.name}
                  </a>
                ) : isMailto ? (
                  <a href={channel.link} className={`${style.textColor} font-semibold break-all`}>
                    {channel.linkText ?? channel.name}
                  </a>
                ) : (
                  <Link href={channel.link} className={`${style.textColor} font-semibold`}>
                    {channel.linkText ?? channel.name}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-componentpage rounded-xl p-8">
          <h3 className="text-2xl font-bold text-primary mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card p-6 rounded-lg">
                <h4 className="text-lg font-bold text-primary mb-2">
                  {faq.question}
                </h4>
                <p className="text-secondary">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold"
            >
              View All FAQs
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-secondary mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/schedule"
              className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule a Call
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
