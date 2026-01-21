"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
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
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900"><Image src="/assets/images/logo.png" alt="MASH Logo" width={58} height={62} /></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "#features")}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#documentation"
              onClick={(e) => handleSmoothScroll(e, "#documentation")}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Documentation
            </a>
            <a
              href="#scope"
              onClick={(e) => handleSmoothScroll(e, "#scope")}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Scope
            </a>
            <a
              href="#support"
              onClick={(e) => handleSmoothScroll(e, "#support")}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Support
            </a>
            <a
              href="#download"
              onClick={(e) => handleSmoothScroll(e, "#download")}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
            >
              Download App
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-600"
            aria-expanded={isMenuOpen}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "#features")}
              className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md"
            >
              Features
            </a>
            <a
              href="#documentation"
              onClick={(e) => handleSmoothScroll(e, "#documentation")}
              className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md"
            >
              Documentation
            </a>
            <a
              href="#scope"
              onClick={(e) => handleSmoothScroll(e, "#scope")}
              className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md"
            >
              Scope
            </a>
            <a
              href="#support"
              onClick={(e) => handleSmoothScroll(e, "#support")}
              className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md"
            >
              Support
            </a>
            <a
              href="#download"
              onClick={(e) => handleSmoothScroll(e, "#download")}
              className="block mx-3 my-2 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 text-center"
            >
              Download App
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
