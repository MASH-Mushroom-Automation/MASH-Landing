import { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "System Status - MASH",
  description: "Check the operational status of MASH services",
};

const services = [
  {
    name: "Cloud API",
    status: "operational",
    description: "Core API services for data sync and remote access",
    uptime: "99.99%",
  },
  {
    name: "Mobile App Backend",
    status: "operational",
    description: "Backend services for iOS and Android apps",
    uptime: "99.98%",
  },
  {
    name: "Push Notifications",
    status: "operational",
    description: "Real-time alert delivery system",
    uptime: "99.95%",
  },
  {
    name: "Data Storage",
    status: "operational",
    description: "Cloud data storage and backup services",
    uptime: "99.99%",
  },
  {
    name: "Authentication",
    status: "operational",
    description: "User authentication and authorization",
    uptime: "99.99%",
  },
  {
    name: "WebSocket Server",
    status: "operational",
    description: "Real-time data streaming services",
    uptime: "99.97%",
  },
];

const recentIncidents = [
  {
    date: "2026-01-15",
    title: "Scheduled Maintenance Complete",
    description: "Successfully completed scheduled maintenance for cloud infrastructure upgrade.",
    status: "resolved",
  },
  {
    date: "2026-01-10",
    title: "Push Notification Delays",
    description: "Some users experienced delayed push notifications. Issue identified and resolved.",
    status: "resolved",
  },
  {
    date: "2026-01-05",
    title: "API Performance Improvement",
    description: "Deployed performance improvements for API response times.",
    status: "resolved",
  },
];

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "operational":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
          <CheckCircle className="w-4 h-4 mr-1" />
          Operational
        </span>
      );
    case "degraded":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
          <AlertCircle className="w-4 h-4 mr-1" />
          Degraded
        </span>
      );
    case "outage":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
          <AlertCircle className="w-4 h-4 mr-1" />
          Outage
        </span>
      );
    case "maintenance":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
          <Clock className="w-4 h-4 mr-1" />
          Maintenance
        </span>
      );
    default:
      return null;
  }
}

export default function StatusPage() {
  const allOperational = services.every((s) => s.status === "operational");

  return (
    <PageLayout>
      <div className={`py-16 ${allOperational ? "bg-gradient-to-br from-green-600 to-green-700" : "bg-gradient-to-br from-yellow-500 to-yellow-600"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {allOperational ? "All Systems Operational" : "Some Systems Affected"}
            </h1>
            <p className="text-xl opacity-90">
              Last updated: {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Services Status */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Service Status
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl divide-y divide-gray-200 dark:divide-gray-700">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="p-6 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      {service.uptime} uptime
                    </span>
                    <StatusBadge status={service.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Uptime Chart Placeholder */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              90-Day Uptime
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="flex items-end justify-between h-24 gap-1">
                {Array.from({ length: 90 }).map((_, i) => {
                  // Use deterministic pseudo-random based on index for consistent rendering
                  const height = 90 + ((i * 7) % 10);
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-green-500 rounded-t"
                      style={{ height: `${height}%` }}
                      title={`Day ${i + 1}: 99.9% uptime`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-500">
                <span>90 days ago</span>
                <span>Today</span>
              </div>
            </div>
          </div>

          {/* Recent Incidents */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Incidents
            </h2>
            <div className="space-y-4">
              {recentIncidents.map((incident, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {incident.title}
                    </h3>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                      Resolved
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {incident.description}
                  </p>
                  <span className="text-sm text-gray-500">{incident.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subscribe to Updates */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Get Status Updates</h2>
            <p className="mb-6 text-green-100">
              Subscribe to receive notifications about system status changes.
            </p>
            <div className="flex max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-300"
              />
              <button className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
