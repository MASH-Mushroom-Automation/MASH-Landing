import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/assets/images/logo.png" alt="MASH Logo" width={90} height={64} />
            </div>
            <p className="text-sm text-gray-400">
              Professional mushroom cultivation automation platform with advanced monitoring and control.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="hover:text-green-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#demo" className="hover:text-green-400 transition-colors">
                  Demo
                </Link>
              </li>
              <li>
                <Link href="#scope" className="hover:text-green-400 transition-colors">
                  Scope
                </Link>
              </li>
              <li>
                <Link href="#download" className="hover:text-green-400 transition-colors">
                  Download
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#documentation" className="hover:text-green-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400 transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400 transition-colors">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400 transition-colors">
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#support" className="hover:text-green-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <a href="mailto:mash.mushroom.automation@gmail.com" className="hover:text-green-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400 transition-colors">
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              Copyright 2026 MASH Mushroom Automation. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors">
                License
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
