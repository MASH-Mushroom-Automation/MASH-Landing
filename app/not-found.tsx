import Link from "next/link";
import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found - MASH",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-7xl sm:text-8xl font-bold text-green-600 dark:text-green-400 mb-4">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-secondary text-lg mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button asChild size="xl">
          <Link href="/">Back to Homepage</Link>
        </Button>
      </div>
    </PageLayout>
  );
}
