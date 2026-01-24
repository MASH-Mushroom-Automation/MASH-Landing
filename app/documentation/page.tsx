import { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";
import { BookOpen, Code, Smartphone, Settings, AlertCircle, Rocket, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation - MASH",
  description: "Comprehensive documentation for the MASH Mushroom Automation System Hub",
};

const docCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Quick start guide and installation instructions",
    icon: Rocket,
    articles: [
      { title: "System Requirements", slug: "system-requirements" },
      { title: "Hardware Setup", slug: "hardware-setup" },
      { title: "Software Installation", slug: "software-installation" },
      { title: "Initial Configuration", slug: "initial-configuration" },
    ],
  },
  {
    id: "user-guide",
    title: "User Guide",
    description: "Comprehensive guides for system operation",
    icon: BookOpen,
    articles: [
      { title: "Dashboard Overview", slug: "dashboard-overview" },
      { title: "Climate Control", slug: "climate-control" },
      { title: "Alert Configuration", slug: "alert-configuration" },
      { title: "Data Analysis", slug: "data-analysis" },
    ],
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    description: "Mobile application documentation",
    icon: Smartphone,
    articles: [
      { title: "App Installation", slug: "app-installation" },
      { title: "Remote Monitoring", slug: "remote-monitoring" },
      { title: "Push Notifications", slug: "push-notifications" },
      { title: "Offline Mode", slug: "offline-mode" },
    ],
  },
  {
    id: "api-reference",
    title: "API Reference",
    description: "Developer documentation and API guides",
    icon: Code,
    articles: [
      { title: "REST API", slug: "rest-api" },
      { title: "WebSocket Events", slug: "websocket-events" },
      { title: "Authentication", slug: "authentication" },
      { title: "Integration Examples", slug: "integration-examples" },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    description: "Common issues and solutions",
    icon: AlertCircle,
    articles: [
      { title: "Connectivity Issues", slug: "connectivity-issues" },
      { title: "Sensor Calibration", slug: "sensor-calibration" },
      { title: "Error Codes", slug: "error-codes" },
      { title: "Maintenance Guide", slug: "maintenance-guide" },
    ],
  },
  {
    id: "advanced-features",
    title: "Advanced Features",
    description: "Advanced configuration and customization",
    icon: Settings,
    articles: [
      { title: "Custom Recipes", slug: "custom-recipes" },
      { title: "Automation Rules", slug: "automation-rules" },
      { title: "Data Export", slug: "data-export" },
      { title: "Multi-site Management", slug: "multi-site-management" },
    ],
  },
];

export default function DocumentationPage() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Documentation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to know about setting up, configuring, and using the MASH Mushroom Automation System
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Links */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/documentation/tutorials"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Tutorials
              </Link>
              <Link
                href="#api-reference"
                className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Code className="w-5 h-5 mr-2" />
                API Reference
              </Link>
            </div>
          </div>

          {/* Documentation Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {docCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  id={category.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400 transition-colors"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {category.title}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {category.articles.map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={`/documentation/${category.id}/${article.slug}`}
                          className="flex items-center text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors py-1"
                        >
                          <ChevronRight className="w-4 h-4 mr-2" />
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Need Help Section */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p className="mb-6 text-green-100">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/support"
                className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-full hover:bg-gray-100 transition-colors font-semibold"
              >
                Contact Support
              </Link>
              <a
                href="https://www.facebook.com/groups/mashmushrooom"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-400 transition-colors font-semibold"
              >
                Join Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
