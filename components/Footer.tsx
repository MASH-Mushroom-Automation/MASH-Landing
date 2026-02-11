import Link from "next/link";
import type { LandingPageData } from "@/lib/sanity";

const DEFAULT_SECTIONS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Demo", href: "/#demo" },
      { label: "Scope", href: "/#scope" },
      { label: "Download", href: "/download" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/documentation" },
      { label: "Tutorials", href: "/documentation/tutorials" },
      { label: "Community Forum", href: "https://www.facebook.com/groups/mashmushrooom" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Schedule a Call", href: "/schedule" },
      { label: "Help Center", href: "/support" },
      { label: "Contact Us", href: "/support#contact" },
      { label: "Status", href: "/status" },
    ],
  },
];

export default function Footer({ data }: { data?: LandingPageData | null } = {}) {
  const sections = data?.footerSections ?? DEFAULT_SECTIONS;
  return (
    <footer className="bg-footer text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl font-bold text-green-400">{data?.footerBrand ?? "MASH"}</span>
            </div>
            <p className="text-sm text-gray-400">
              {data?.footerDescription ?? "Professional mushroom cultivation automation platform with advanced monitoring and control."}
            </p>
          </div>

          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={linkIndex}>
                      {isExternal ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className="hover:text-green-400 transition-colors">
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

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              {data?.footerCopyright ?? "Copyright 2026 MASH: Mushroom Automation. All rights reserved."}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-green-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/license" className="hover:text-green-400 transition-colors">
                License
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
