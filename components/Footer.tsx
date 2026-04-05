import Link from "next/link";
import type { LandingPageData } from "@/lib/sanity";

const DEFAULT_SECTIONS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Mobile App", href: "/#mobile-app" },
      { label: "Hardware", href: "/#iot-device" },
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
  const year = new Date().getFullYear();
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
            <div className="flex gap-4 mt-4">
              <a
                href="https://github.com/ppnamias"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/groups/mashmushrooom"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
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
              {data?.footerCopyright ?? `Copyright ${year} MASH: Mushroom Automation. All rights reserved.`}
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
