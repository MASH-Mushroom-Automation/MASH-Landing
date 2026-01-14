export default function SupportSection() {
  return (
    <section id="support" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Support & Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are here to help you succeed with comprehensive support and resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Get help from our expert team</p>
            <a href="mailto:support@mash-automation.com" className="text-green-600 hover:text-green-700 font-semibold">
              support@mash-automation.com
            </a>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Community Forum</h3>
            <p className="text-gray-600 mb-4">Connect with other users</p>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
              Join the Community
            </a>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Knowledge Base</h3>
            <p className="text-gray-600 mb-4">Browse tutorials and guides</p>
            <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold">
              View Articles
            </a>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                What hardware do I need to get started?
              </h4>
              <p className="text-gray-600">
                You will need a compatible microcontroller (Raspberry Pi recommended), environmental sensors, 
                relay boards for equipment control, and the necessary power supply. We provide a detailed 
                hardware list in our documentation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Is the mobile app available for both iOS and Android?
              </h4>
              <p className="text-gray-600">
                Yes, the MASH mobile application is available for both iOS and Android devices. 
                You can download it from the App Store or Google Play Store.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Can I manage multiple growing chambers?
              </h4>
              <p className="text-gray-600">
                Absolutely! MASH supports multiple chambers with independent climate zones. 
                You can monitor and control each chamber separately with custom settings for different mushroom species.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                What kind of support do you offer?
              </h4>
              <p className="text-gray-600">
                We offer email support, comprehensive documentation, video tutorials, and an active community forum. 
                Premium support packages are also available for commercial operations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Is my data secure?
              </h4>
              <p className="text-gray-600">
                Yes, all data is encrypted in transit and at rest. We use industry-standard security practices 
                and offer both cloud and local storage options for complete control over your data.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="#"
            className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
