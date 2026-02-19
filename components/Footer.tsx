import Link from "next/link";
import { Github, Facebook } from "lucide-react";
import type { LandingPageData } from "@/lib/sanity";

const DEFAULT_SECTIONS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Download", href: "/download" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/documentation" },
      { label: "FAQ", href: "/faq" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Schedule a Call", href: "/schedule" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer({ data }: { data?: LandingPageData | null } = {}) {
  const sections = data?.footerSections ?? DEFAULT_SECTIONS;
  return (
    <footer className="border-t border-gray-200 dark:border-white/10 bg-default">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl font-bold bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              {data?.footerBrand ?? "MASH"}
            </span>
            <p className="text-sm text-tertiary mt-3 leading-relaxed">
              {data?.footerDescription ?? "Smart mushroom cultivation automation powered by IoT technology."}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://github.com/MASH-Mushroom-Automation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 text-tertiary hover:text-primary hover:bg-green-500/10 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/groups/mashmushrooom"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 text-tertiary hover:text-primary hover:bg-green-500/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-primary mb-4">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link, linkIndex) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={linkIndex}>
                      {isExternal ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-tertiary hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-sm text-tertiary hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-tertiary">
            {data?.footerCopyright ?? "Copyright 2026 MASH. All rights reserved."}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-tertiary hover:text-green-600 dark:hover:text-green-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-tertiary hover:text-green-600 dark:hover:text-green-400 transition-colors">
              Terms
            </Link>
            <Link href="/license" className="text-sm text-tertiary hover:text-green-600 dark:hover:text-green-400 transition-colors">
              License
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
