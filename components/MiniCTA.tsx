import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * MiniCTA: Compact call-to-action bar placed above the Footer.
 * Provides quick links to support and FAQ pages.
 */
export default function MiniCTA() {
  return (
    <section className="py-16 bg-componentpage">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
          Have Questions?
        </h2>
        <p className="text-secondary text-lg mb-8 max-w-2xl mx-auto">
          Reach out to our team or browse common questions to get started quickly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="xl">
            <Link href="/support">Contact Support</Link>
          </Button>
          <Button asChild size="xl" variant="outline">
            <Link href="/faq">Browse FAQ</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
