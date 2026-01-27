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
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success-light text-success-strong">
          <CheckCircle className="w-4 h-4 mr-1" />
          Operational
        </span>
      );
    case "degraded":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-warning-light text-warning-strong">
          <AlertCircle className="w-4 h-4 mr-1" />
          Degraded
        </span>
      );
    case "outage":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-error-light text-error-strong">
          <AlertCircle className="w-4 h-4 mr-1" />
          Outage
        </span>
      );
    case "maintenance":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-blue-light text-accent-blue">
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
      <div className={`py-16 ${allOperational ? "bg-download" : "bg-warning-gradient"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-inverse">
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

      <div className="py-16 bg-default">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Services Status */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Service Status
            </h2>
            <div className="bg-componentpage rounded-xl divide-y divide-default">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="p-6 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-primary">
                      {service.name}
                    </h3>
                    <p className="text-secondary text-sm">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-tertiary">
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
            <h2 className="text-2xl font-bold text-primary mb-6">
              90-Day Uptime
            </h2>
            <div className="bg-componentpage rounded-xl p-6">
              <div className="flex items-end justify-between h-24 gap-1">
                {Array.from({ length: 90 }).map((_, i) => {
                  // Use deterministic pseudo-random based on index for consistent rendering
                  const height = 90 + ((i * 7) % 10);
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-green rounded-t"
                      style={{ height: `${height}%` }}
                      title={`Day ${i + 1}: 99.9% uptime`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-4 text-sm text-tertiary">
                <span>90 days ago</span>
                <span>Today</span>
              </div>
            </div>
          </div>

          {/* Recent Incidents */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Recent Incidents
            </h2>
            <div className="space-y-4">
              {recentIncidents.map((incident, index) => (
                <div
                  key={index}
                  className="bg-componentpage rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-primary">
                      {incident.title}
                    </h3>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-success-light text-success-strong">
                      Resolved
                    </span>
                  </div>
                  <p className="text-secondary mb-2">
                    {incident.description}
                  </p>
                  <span className="text-sm text-tertiary">{incident.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subscribe to Updates */}
          <div className="mt-16 bg-download rounded-xl p-8 text-center text-inverse">
            <h2 className="text-2xl font-bold mb-4">Get Status Updates</h2>
            <p className="mb-6 text-brand-light">
              Subscribe to receive notifications about system status changes.
            </p>
            <div className="flex max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-primary focus:ring-2 focus:ring-green"
              />
              <button className="px-6 py-3 bg-background text-green rounded-lg hover:bg-surface-hover transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
