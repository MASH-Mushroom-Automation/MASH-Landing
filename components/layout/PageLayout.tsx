import Link from "next/link";
import Footer from "@/components/Footer";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  children: React.ReactNode;
  /** Optional breadcrumb trail. First item is always "Home". */
  breadcrumbs?: BreadcrumbItem[];
}

export default function PageLayout({ children, breadcrumbs }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main id="main-content" className="flex-grow pt-24">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center gap-2 text-sm text-secondary">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {crumb.href && index < breadcrumbs.length - 1 ? (
                    <Link href={crumb.href} className="hover:text-primary transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-primary font-medium">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
}
