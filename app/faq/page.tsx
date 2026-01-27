"use client";

import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";

const faqCategories = [
  {
    name: "Getting Started",
    faqs: [
      {
        question: "What hardware do I need to get started with MASH?",
        answer: "You will need a compatible microcontroller (Raspberry Pi recommended), environmental sensors for temperature, humidity, and CO2, relay boards for equipment control, and the necessary power supply. We provide a detailed hardware list in our documentation with recommended components and where to purchase them."
      },
      {
        question: "Is MASH suitable for beginners?",
        answer: "Yes! MASH is designed to be user-friendly for both beginners and experienced cultivators. Our comprehensive documentation and tutorials will guide you through the setup process step by step. The mobile app provides an intuitive interface for monitoring and control."
      },
      {
        question: "How long does it take to set up the system?",
        answer: "A basic setup typically takes 2-4 hours for hardware assembly and software configuration. More complex setups with multiple chambers may take longer. Our getting started guide walks you through each step to ensure a smooth setup process."
      },
    ]
  },
  {
    name: "Mobile App",
    faqs: [
      {
        question: "Is the mobile app available for both iOS and Android?",
        answer: "Yes, the MASH mobile application is available for both iOS and Android devices. You can download it from the App Store, Google Play Store, or directly from our website for sideloading."
      },
      {
        question: "Can I use the app when I don't have internet?",
        answer: "Yes, the MASH app includes an offline mode that allows you to view cached data and recent readings even without an internet connection. However, real-time monitoring and control features require an active connection to your MASH system."
      },
      {
        question: "How do I receive alerts on my phone?",
        answer: "The MASH app supports push notifications for critical events. You can configure which alerts you want to receive in the app settings, including temperature thresholds, humidity levels, and system status changes."
      },
    ]
  },
  {
    name: "Features",
    faqs: [
      {
        question: "Can I manage multiple growing chambers?",
        answer: "Absolutely! MASH supports multiple chambers with independent climate zones. You can monitor and control each chamber separately with custom settings for different mushroom species. The dashboard provides an overview of all chambers at once."
      },
      {
        question: "What sensors are supported?",
        answer: "MASH supports a wide range of sensors including DHT22/AM2302 for temperature and humidity, MH-Z19 for CO2 levels, BH1750 for light intensity, and soil moisture sensors for substrate monitoring. Custom sensor integration is possible through our API."
      },
      {
        question: "Can I create custom growing recipes?",
        answer: "Yes, MASH allows you to create, save, and apply custom growing recipes for different mushroom species. Each recipe can specify target temperature, humidity, CO2 levels, and light cycles for different growth phases."
      },
    ]
  },
  {
    name: "Data & Security",
    faqs: [
      {
        question: "Is my data secure?",
        answer: "Yes, all data is encrypted in transit using TLS and at rest. We use industry-standard security practices and offer both cloud and local storage options for complete control over your data. You can also export your data at any time."
      },
      {
        question: "How long is historical data stored?",
        answer: "By default, MASH stores up to 2 years of historical data in the cloud. Local storage limits depend on your hardware configuration. You can export data in CSV or JSON formats for long-term archival."
      },
      {
        question: "Can I export my data?",
        answer: "Yes, you can export your data in multiple formats including CSV, JSON, and Excel. The export feature allows you to select specific date ranges and data types for analysis in external tools."
      },
    ]
  },
  {
    name: "Support",
    faqs: [
      {
        question: "What kind of support do you offer?",
        answer: "We offer email support, comprehensive documentation, video tutorials, and an active community forum on Facebook. Premium support packages with faster response times are available for commercial operations."
      },
      {
        question: "How do I report a bug or request a feature?",
        answer: "You can report bugs or request features through our GitHub repository, community forum, or by emailing our support team directly. We actively review all feedback and incorporate community suggestions into our development roadmap."
      },
      {
        question: "Is there a warranty for the hardware?",
        answer: "Hardware components should be purchased from their respective manufacturers, who provide their own warranties. For MASH-specific hardware kits (when available), we offer a 1-year warranty covering manufacturing defects."
      },
    ]
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-default">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-lg font-medium text-primary pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-tertiary transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 text-secondary">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <PageLayout>
      <div className="bg-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-secondary max-w-3xl mx-auto mb-8">
              Find answers to common questions about MASH
            </p>
            
            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-tertiary" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-default bg-background text-primary focus:ring-2 focus:ring-green focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-default">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-secondary text-lg">
                No FAQs found matching your search.
              </p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.name} className="mb-12">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  {category.name}
                </h2>
                <div className="bg-componentpage rounded-xl p-6">
                  {category.faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            ))
          )}

          {/* CTA */}
          <div className="mt-12 bg-download rounded-xl p-8 text-center text-inverse">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="mb-6 text-brand-light">
              Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
            </p>
            <Link
              href="/support"
              className="inline-flex items-center px-6 py-3 bg-background text-green rounded-full hover:bg-surface-hover transition-colors font-semibold"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
