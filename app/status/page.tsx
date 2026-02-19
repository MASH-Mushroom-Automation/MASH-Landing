import { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import { CheckCircle, Activity, Mail } from "lucide-react";

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

function StatusIndicator({ status }: { status: string }) {
  const isOperational = status === "operational";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
      isOperational 
        ? "bg-green-500/10 text-green-600 dark:text-green-400" 
        : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
    }`}>
      <span className={`w-2 h-2 rounded-full ${isOperational ? "bg-green-500" : "bg-yellow-500"}`} />
      {isOperational ? "Operational" : "Degraded"}
    </span>
  );
}

export default function StatusPage() {
  const allOperational = services.every((s) => s.status === "operational");

  return (
    <PageLayout>
      <div className="gradient-hero section-padding">
        <div className="section-container text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            allOperational ? "bg-green-500/10" : "bg-yellow-500/10"
          }`}>
            {allOperational 
              ? <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              : <Activity className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            }
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {allOperational ? "All Systems Operational" : "Some Systems Affected"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>

      <div className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Services Status */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Service Status
            </h2>
            <div className="glass-card divide-y divide-gray-200 dark:divide-white/10">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {service.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 hidden sm:inline">
                      {service.uptime} uptime
                    </span>
                    <StatusIndicator status={service.status} />
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
            <div className="glass-card p-6">
              <div className="overflow-x-auto">
                <div className="flex items-end justify-between h-24 gap-0.5 min-w-125">
                  {Array.from({ length: 90 }).map((_, i) => {
                    const height = 90 + ((i * 7) % 10);
                    return (
                      <div
                        key={i}
                        className="flex-1 bg-green-500 dark:bg-green-400 rounded-t"
                        style={{ height: `${height}%` }}
                        title={`Day ${i + 1}: 99.9% uptime`}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between mt-4 text-sm text-gray-500 min-w-125">
                  <span>90 days ago</span>
                  <span>Today</span>
                </div>
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
                  className="glass-card p-6"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {incident.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400">
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
          <div className="mt-16 glass-card p-8 text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Get Status Updates</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Subscribe to receive notifications about system status changes.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
              <button className="px-6 py-3 bg-linear-to-r from-green-500 to-emerald-400 text-white rounded-lg hover:from-green-600 hover:to-emerald-500 transition-all duration-300 font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
