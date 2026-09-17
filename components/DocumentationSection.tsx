import Link from "next/link";
import type { LandingPageData } from "@/lib/sanity";

const DEFAULT_CATEGORIES = [
  {
    title: "Getting Started",
    description: "Quick start guide and installation instructions",
    icon: "",
    links: [
      { name: "System Requirements", href: "/documentation#system-requirements" },
      { name: "Hardware Setup", href: "/documentation#hardware-setup" },
      { name: "Software Installation", href: "/documentation#software-installation" },
      { name: "Initial Configuration", href: "/documentation#initial-configuration" },
    ],
  },
  {
    title: "User Guide",
    description: "Comprehensive guides for system operation",
    icon: "",
    links: [
      { name: "Dashboard Overview", href: "/documentation#dashboard-overview" },
      { name: "Climate Control", href: "/documentation#climate-control" },
      { name: "Alert Configuration", href: "/documentation#alert-configuration" },
      { name: "Data Analysis", href: "/documentation#data-analysis" },
    ],
  },
  {
    title: "Mobile App",
    description: "Mobile application documentation",
    icon: "",
    links: [
      { name: "App Installation", href: "/documentation#app-installation" },
      { name: "Remote Monitoring", href: "/documentation#remote-monitoring" },
      { name: "Push Notifications", href: "/documentation#push-notifications" },
      { name: "Offline Mode", href: "/documentation#offline-mode" },
    ],
  },
  {
    title: "API Reference",
    description: "Developer documentation and API guides",
    icon: "",
    links: [
      { name: "REST API", href: "/documentation#rest-api" },
      { name: "WebSocket Events", href: "/documentation#websocket-events" },
      { name: "Authentication", href: "/documentation#authentication" },
      { name: "Integration Examples", href: "/documentation#integration-examples" },
    ],
  },
  {
    title: "Troubleshooting",
    description: "Common issues and solutions",
    icon: "",
    links: [
      { name: "Connectivity Issues", href: "/documentation#connectivity-issues" },
      { name: "Sensor Calibration", href: "/documentation#sensor-calibration" },
      { name: "Error Codes", href: "/documentation#error-codes" },
      { name: "Maintenance Guide", href: "/documentation#maintenance-guide" },
    ],
  },
  {
    title: "Advanced Features",
    description: "Advanced configuration and customization",
    icon: "",
    links: [
      { name: "Custom Recipes", href: "/documentation#custom-recipes" },
      { name: "Automation Rules", href: "/documentation#automation-rules" },
      { name: "Data Export", href: "/documentation#data-export" },
      { name: "Multi-site Management", href: "/documentation#multi-site-management" },
    ],
  },
];

export default function DocumentationSection({ data }: { data?: LandingPageData | null } = {}) {
  const categories = data?.documentationCategories ?? DEFAULT_CATEGORIES;

  return (
    <section id="documentation" className="py-20 bg-documentation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {data?.documentationTitle ?? "Documentation"}
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            {data?.documentationDescription ?? "Comprehensive guides and resources to help you get the most out of MASH"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-componentpage p-6 rounded-xl border border-default hover:border-green-500 dark:hover:border-green-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-primary mb-2">{category.title}</h3>
              <p className="text-secondary mb-4">{category.description}</p>
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
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
                      {link.name}
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
