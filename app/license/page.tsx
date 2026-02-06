import { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";
import { Scale, FileText, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "License - MASH",
  description: "License information for the MASH: Mushroom Automation System",
};

export default function LicensePage() {
  return (
    <PageLayout>
      <div className="bg-page-header py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand rounded-full mb-4">
              <Scale className="w-8 h-8 text-inverse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              License
            </h1>
            <p className="text-xl text-secondary">
              MASH is open-source software
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-default">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* License Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6">
              MIT License
            </h2>
            <p className="text-secondary mb-6">
              MASH: Mushroom Automation System is released under the MIT License, one of the most 
              permissive open-source licenses. This means you are free to use, modify, and distribute 
              the software for both personal and commercial purposes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-success-light p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-success-strong mb-3">
                  ✓ Permitted
                </h3>
                <ul className="text-success-strong space-y-2">
                  <li>• Commercial use</li>
                  <li>• Modification</li>
                  <li>• Distribution</li>
                  <li>• Private use</li>
                </ul>
              </div>
              <div className="bg-warning-light p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-warning-strong mb-3">
                  ⚠ Conditions
                </h3>
                <ul className="text-warning-strong space-y-2">
                  <li>• Include copyright notice</li>
                  <li>• Include license text</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Full License Text */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Full License Text
            </h2>
            <div className="bg-componentpage p-6 rounded-xl font-mono text-sm text-secondary whitespace-pre-wrap">
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
            <h2 className="text-2xl font-bold text-primary mb-6">
              Third-Party Licenses
            </h2>
            <p className="text-secondary mb-6">
              MASH uses several open-source libraries and frameworks. We are grateful to the maintainers 
              of these projects:
            </p>
            <div className="space-y-4">
              {[
                { name: "Next.js", license: "MIT", url: "https://nextjs.org" },
                { name: "React", license: "MIT", url: "https://reactjs.org" },
                { name: "Tailwind CSS", license: "MIT", url: "https://tailwindcss.com" },
                { name: "Lucide Icons", license: "ISC", url: "https://lucide.dev" },
                { name: "next-themes", license: "MIT", url: "https://github.com/pacocoursey/next-themes" },
              ].map((lib) => (
                <div 
                  key={lib.name}
                  className="flex items-center justify-between p-4 bg-componentpage rounded-lg"
                >
                  <div>
                    <h4 className="font-semibold text-primary">{lib.name}</h4>
                    <span className="text-sm text-tertiary">{lib.license} License</span>
                  </div>
                  <a 
                    href={lib.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green hover:underline text-sm"
                  >
                    View Project
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Source Code */}
          <div className="bg-gradient-dark rounded-xl p-8 text-center text-inverse">
            <Github className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">View Source Code</h2>
            <p className="mb-6 text-secondary">
              MASH is open source. Explore the code, report issues, or contribute on GitHub.
            </p>
            <a
              href="https://github.com/MASH-Mushroom-Automation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-background text-primary rounded-full hover:bg-surface-hover transition-colors font-semibold"
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </a>
          </div>

          {/* Related Pages */}
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <Link
              href="/privacy"
              className="inline-flex items-center px-4 py-2 text-secondary hover:text-green"
            >
              <FileText className="w-4 h-4 mr-2" />
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center px-4 py-2 text-secondary hover:text-green"
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
