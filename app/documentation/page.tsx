import { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";
import { BookOpen, Code, Smartphone, Settings, AlertCircle, Rocket, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation - MASH",
  description: "Comprehensive documentation for the MASH: Mushroom Automation System Hub",
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
      <div className="gradient-hero py-20">
        <div className="section-container">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Documentation
            </h1>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Everything you need to know about setting up, configuring, and using the MASH: Mushroom Automation System
            </p>
          </div>
        </div>
      </div>

      <div className="section-padding bg-default">
        <div className="section-container">
          {/* Quick Links */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/documentation/tutorials"
                className="inline-flex items-center px-6 py-3 bg-linear-to-r from-green-500 to-emerald-400 text-white rounded-full hover:from-green-600 hover:to-emerald-500 transition-all duration-300 shadow-lg"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Tutorials
              </Link>
              <Link
                href="#api-reference"
                className="inline-flex items-center px-6 py-3 bg-componentpage text-primary rounded-full hover:bg-surface-hover transition-colors"
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
                  className="glass-card rounded-xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-success-light rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-green" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-primary">
                        {category.title}
                      </h2>
                      <p className="text-sm text-secondary">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {category.articles.map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={`/documentation/${category.id}/${article.slug}`}
                          className="flex items-center text-secondary hover:text-green transition-colors py-1"
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
          <div className="mt-16 glass-card rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Need More Help?</h2>
            <p className="mb-6 text-secondary">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/support"
                className="inline-flex items-center px-6 py-3 bg-linear-to-r from-green-500 to-emerald-400 text-white rounded-full hover:from-green-600 hover:to-emerald-500 transition-all duration-300 font-semibold shadow-lg"
              >
                Contact Support
              </Link>
              <a
                href="https://www.facebook.com/groups/mashmushrooom"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-green-500/30 text-green-600 dark:text-green-400 rounded-full hover:bg-green-500/10 transition-all duration-300 font-semibold"
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
