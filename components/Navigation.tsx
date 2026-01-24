"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    // Only prevent default if we're on the home page
    if (window.location.pathname === '/') {
      e.preventDefault();
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
        // Announce to screen readers
        const heading = element.querySelector("h1, h2, h3");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
          (heading as HTMLElement).focus();
        }
      }
    }
  };

  const navLinks = [
    { href: "/#features", label: "Features" },
    { href: "/documentation", label: "Documentation" },
    { href: "/#scope", label: "Scope" },
    { href: "/support", label: "Support" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-800" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/assets/images/logo.png" alt="MASH Logo" width={58} height={62} />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => link.href.startsWith("/#") ? handleSmoothScroll(e, link.href.substring(1)) : undefined}
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
            <Link
              href="/download"
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
            >
              Download App
            </Link>
          </div>

          <div className="flex items-center md:hidden space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
              aria-expanded={isMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("/#")) {
                    handleSmoothScroll(e, link.href.substring(1));
                  }
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/download"
              onClick={() => setIsMenuOpen(false)}
              className="block mx-3 my-2 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 text-center"
            >
              Download App
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
