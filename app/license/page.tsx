import { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";
import { Scale, FileText, Github, Check, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "License - MASH",
  description: "License information for the MASH: Mushroom Automation System",
};

export default function LicensePage() {
  return (
    <PageLayout>
      <div className="gradient-hero section-padding">
        <div className="section-container text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
            <Scale className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            License
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            MASH is open-source software
          </p>
        </div>
      </div>

      <div className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* License Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              MIT License
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              MASH: Mushroom Automation System is released under the MIT License, one of the most 
              permissive open-source licenses. This means you are free to use, modify, and distribute 
              the software for both personal and commercial purposes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
                    Permitted
                  </h3>
                </div>
                <ul className="text-green-700 dark:text-green-400 space-y-2">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Commercial use</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Modification</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Distribution</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Private use</li>
                </ul>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                    Conditions
                  </h3>
                </div>
                <ul className="text-yellow-700 dark:text-yellow-400 space-y-2">
                  <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Include copyright notice</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Include license text</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Full License Text */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Full License Text
            </h2>
            <div className="glass-card p-6 font-mono text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
{`MIT License

Copyright (c) 2026 MASH: Mushroom Automation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
            </div>
          </div>

          {/* Third-Party Licenses */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Third-Party Licenses
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              MASH uses several open-source libraries and frameworks. We are grateful to the maintainers 
              of these projects:
            </p>
            <div className="space-y-3">
              {[
                { name: "Next.js", license: "MIT", url: "https://nextjs.org" },
                { name: "React", license: "MIT", url: "https://reactjs.org" },
                { name: "Tailwind CSS", license: "MIT", url: "https://tailwindcss.com" },
                { name: "Lucide Icons", license: "ISC", url: "https://lucide.dev" },
                { name: "next-themes", license: "MIT", url: "https://github.com/pacocoursey/next-themes" },
              ].map((lib) => (
                <div 
                  key={lib.name}
                  className="glass-card flex items-center justify-between p-4"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{lib.name}</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-500">{lib.license} License</span>
                  </div>
                  <a 
                    href={lib.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 dark:text-green-400 hover:underline text-sm"
                  >
                    View Project
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Source Code */}
          <div className="glass-card p-8 text-center">
            <Github className="w-12 h-12 mx-auto mb-4 text-gray-900 dark:text-white" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">View Source Code</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              MASH is open source. Explore the code, report issues, or contribute on GitHub.
            </p>
            <a
              href="https://github.com/MASH-Mushroom-Automation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-linear-to-r from-green-500 to-emerald-400 text-white rounded-lg hover:from-green-600 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </a>
          </div>

          {/* Related Pages */}
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <Link
              href="/privacy"
              className="inline-flex items-center px-4 py-2 text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <FileText className="w-4 h-4 mr-2" />
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center px-4 py-2 text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <FileText className="w-4 h-4 mr-2" />
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
