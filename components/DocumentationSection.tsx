import Link from "next/link";

export default function DocumentationSection() {
  const docCategories = [
    {
      title: "Getting Started",
      description: "Quick start guide and installation instructions",
      links: [
        "System Requirements",
        "Hardware Setup",
        "Software Installation",
        "Initial Configuration",
      ],
    },
    {
      title: "User Guide",
      description: "Comprehensive guides for system operation",
      links: [
        "Dashboard Overview",
        "Climate Control",
        "Alert Configuration",
        "Data Analysis",
      ],
    },
    {
      title: "Mobile App",
      description: "Mobile application documentation",
      links: [
        "App Installation",
        "Remote Monitoring",
        "Push Notifications",
        "Offline Mode",
      ],
    },
    {
      title: "API Reference",
      description: "Developer documentation and API guides",
      links: [
        "REST API",
        "WebSocket Events",
        "Authentication",
        "Integration Examples",
      ],
    },
    {
      title: "Troubleshooting",
      description: "Common issues and solutions",
      links: [
        "Connectivity Issues",
        "Sensor Calibration",
        "Error Codes",
        "Maintenance Guide",
      ],
    },
    {
      title: "Advanced Features",
      description: "Advanced configuration and customization",
      links: [
        "Custom Recipes",
        "Automation Rules",
        "Data Export",
        "Multi-site Management",
      ],
    },
  ];

  return (
    <section id="documentation" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Documentation
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive guides and resources to help you get the most out of MASH
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{category.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={`/documentation#${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/documentation"
            className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            View Full Documentation
          </Link>
        </div>
      </div>
    </section>
  );
}
