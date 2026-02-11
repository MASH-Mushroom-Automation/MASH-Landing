import { CheckCircle, AlertCircle, Clock } from "lucide-react";

export function StatusBadge({ status }: { status: string }) {
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
