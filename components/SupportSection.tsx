import Link from "next/link";
import { calConfig } from "@/lib/cal-config";

export default function SupportSection() {
  return (
    <section id="support" className="py-20 bg-support">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Support & Resources
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            We are here to help you succeed with comprehensive support and resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Schedule a Call - NEW */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Schedule a Call</h3>
            <p className="text-secondary mb-4">Book a video consultation</p>
            <Link href="/schedule" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold">
              Book Now
            </Link>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Email Support</h3>
            <p className="text-secondary mb-4">Get help from our expert team</p>
            <a href={`mailto:${calConfig.contactEmail}`} className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold break-all">
              {calConfig.contactEmail}
            </a>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Community Forum</h3>
            <p className="text-secondary mb-4">Connect with other users</p>
            <a href="https://www.facebook.com/groups/mashmushrooom" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
              Join the Community
            </a>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Knowledge Base</h3>
            <p className="text-secondary mb-4">Browse tutorials and guides</p>
            <Link href="/documentation/tutorials" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold">
              View Articles
            </Link>
          </div>
        </div>

        <div className="bg-componentpage rounded-xl p-8">
          <h3 className="text-2xl font-bold text-primary mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg">
              <h4 className="text-lg font-bold text-primary mb-2">
                What hardware do I need to get started?
              </h4>
              <p className="text-secondary">
                You will need a compatible microcontroller (Raspberry Pi recommended), environmental sensors, 
                relay boards for equipment control, and the necessary power supply. We provide a detailed 
                hardware list in our documentation.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h4 className="text-lg font-bold text-primary mb-2">
                Is the mobile app available for both iOS and Android?
              </h4>
              <p className="text-secondary">
                Yes, the MASH mobile application is available for both iOS and Android devices. 
                You can download it from the App Store or Google Play Store.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h4 className="text-lg font-bold text-primary mb-2">
                Can I manage multiple growing chambers?
              </h4>
              <p className="text-secondary">
                Absolutely! MASH supports multiple chambers with independent climate zones. 
                You can monitor and control each chamber separately with custom settings for different mushroom species.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h4 className="text-lg font-bold text-primary mb-2">
                What kind of support do you offer?
              </h4>
              <p className="text-secondary">
                We offer email support, comprehensive documentation, video tutorials, and an active community forum. 
                Premium support packages are also available for commercial operations.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h4 className="text-lg font-bold text-primary mb-2">
                Is my data secure?
              </h4>
              <p className="text-secondary">
                Yes, all data is encrypted in transit and at rest. We use industry-standard security practices 
                and offer both cloud and local storage options for complete control over your data.
              </p>
            </div>
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
