import Link from "next/link";

export default function DownloadSection() {
  return (
    <section id="download" className="py-20 bg-gradient-to-br from-green-600 to-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get Started with MASH
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Download our mobile app and start monitoring your mushroom cultivation from anywhere
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <a
            href="#"
            className="bg-white text-gray-900 p-8 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <svg className="w-12 h-12 mr-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5M13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              <div>
                <div className="text-sm text-gray-600">Download on the</div>
                <div className="text-2xl font-bold">App Store</div>
              </div>
            </div>
            <p className="text-gray-600">
              Available for iPhone and iPad running iOS 14.0 or later
            </p>
          </a>

          <a
            href="#"
            className="bg-white text-gray-900 p-8 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <svg className="w-12 h-12 mr-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div>
                <div className="text-sm text-gray-600">Get it on</div>
                <div className="text-2xl font-bold">Google Play</div>
              </div>
            </div>
            <p className="text-gray-600">
              Available for Android devices running Android 8.0 or later
            </p>
          </a>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">App Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold mb-1">Real-time Monitoring</h4>
                <p className="text-green-100">View live sensor data from anywhere</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold mb-1">Remote Control</h4>
                <p className="text-green-100">Adjust settings on the go</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold mb-1">Push Notifications</h4>
                <p className="text-green-100">Get alerts for critical events</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold mb-1">Historical Data</h4>
                <p className="text-green-100">Access charts and trends</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold mb-1">Multi-chamber Support</h4>
                <p className="text-green-100">Manage all your chambers</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold mb-1">Offline Mode</h4>
                <p className="text-green-100">View cached data without connection</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-green-100 mb-4">Need the desktop version or direct download?</p>
          <Link
            href="/download"
            className="inline-flex items-center bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            View All Downloads
          </Link>
        </div>
      </div>
    </section>
  );
}
