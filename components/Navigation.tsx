"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">MASH</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-green-600 transition-colors">
              Features
            </Link>
            <Link href="#documentation" className="text-gray-700 hover:text-green-600 transition-colors">
              Documentation
            </Link>
            <Link href="#scope" className="text-gray-700 hover:text-green-600 transition-colors">
              Scope
            </Link>
            <Link href="#support" className="text-gray-700 hover:text-green-600 transition-colors">
              Support
            </Link>
            <Link 
              href="#download" 
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
            >
              Download App
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
            <Link
              href="#features"
              className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#documentation"
              className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </Link>
            <Link
              href="#scope"
              className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Scope
            </Link>
            <Link
              href="#support"
              className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            <Link
              href="#download"
              className="block mx-3 my-2 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Download App
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
