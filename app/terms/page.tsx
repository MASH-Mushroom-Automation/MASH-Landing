import { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service - MASH",
  description: "Terms of service for the MASH: Mushroom Automation System",
};

const sections = [
  { id: "agreement", title: "1. Agreement to Terms" },
  { id: "description", title: "2. Description of Service" },
  { id: "accounts", title: "3. User Accounts" },
  { id: "acceptable-use", title: "4. Acceptable Use" },
  { id: "intellectual-property", title: "5. Intellectual Property" },
  { id: "user-content", title: "6. User Content" },
  { id: "hardware", title: "7. Hardware and Third-Party Services" },
  { id: "availability", title: "8. Service Availability" },
  { id: "warranties", title: "9. Disclaimer of Warranties" },
  { id: "liability", title: "10. Limitation of Liability" },
  { id: "indemnification", title: "11. Indemnification" },
  { id: "termination", title: "12. Termination" },
  { id: "governing-law", title: "13. Governing Law" },
  { id: "changes", title: "14. Changes to Terms" },
  { id: "contact", title: "15. Contact Us" },
];

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="gradient-hero section-padding">
        <div className="section-container text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
            <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Last updated: January 1, 2026
          </p>
        </div>
      </div>

      <div className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Table of Contents */}
          <nav className="glass-card p-6 mb-12">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 id="agreement" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              By accessing or using the MASH: Mushroom Automation System (&quot;Service&quot;), you agree to be 
              bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of these terms, 
              you may not access the Service.
            </p>

            <h2 id="description" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">
              2. Description of Service
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              MASH is a mushroom cultivation automation platform that provides environmental monitoring, 
              climate control, and data analysis tools. The Service includes mobile applications, web 
              interfaces, cloud services, and related documentation.
            </p>

            <h2 id="accounts" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">
              3. User Accounts
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              When you create an account with us, you must provide accurate, complete, and current information. 
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-6 space-y-2">
              <li>Safeguarding your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
              <li>Ensuring your account information remains current</li>
            </ul>

            <h2 id="acceptable-use" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">
              4. Acceptable Use
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-6 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the intellectual property rights of others</li>
              <li>Transmit malicious code or interfere with the Service</li>
              <li>Attempt to gain unauthorized access to any systems</li>
              <li>Impersonate any person or entity</li>
              <li>Collect user data without consent</li>
              <li>Use the Service for illegal cultivation activities</li>
            </ul>

            <h2 id="intellectual-property" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">
              5. Intellectual Property
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The Service and its original content, features, and functionality are owned by MASH Mushroom 
              Automation and are protected by international copyright, trademark, and other intellectual 
              property laws. The MASH software is provided under an open-source license (see License page 
              for details).
            </p>

            <h2 id="user-content" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">
              6. User Content
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You retain ownership of any content you create or upload to the Service, including growing 
              recipes, configuration settings, and environmental data. By using the Service, you grant us 
              a non-exclusive license to use, store, and process this content solely for the purpose of 
              providing the Service.
            </p>

            <h2 id="hardware" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">
              7. Hardware and Third-Party Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              MASH provides software and cloud services. Any hardware components (sensors, controllers, etc.) 
              are subject to their respective manufacturers&apos; terms and warranties. We are not responsible for 
              the performance or failure of third-party hardware.
            </p>

            <h2 id="availability" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">
              8. Service Availability
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We strive to maintain high availability of the Service, but we do not guarantee uninterrupted 
              access. We may modify, suspend, or discontinue any part of the Service at any time with 
              reasonable notice. For critical cultivation operations, we recommend implementing local 
              backup systems.
            </p>

            <h2 id="warranties" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">
              9. Disclaimer of Warranties
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, 
              EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, 
              SECURE, OR ERROR-FREE. CULTIVATION RESULTS MAY VARY BASED ON NUMEROUS FACTORS BEYOND 
              THE SERVICE&apos;S CONTROL.
            </p>

            <h2 id="liability" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">
              10. Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              IN NO EVENT SHALL MASH: Mushroom Automation BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR CROPS, ARISING OUT 
              OF YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU 
              FOR THE SERVICE IN THE PAST TWELVE MONTHS.
            </p>

            <h2 id="indemnification" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">
              11. Indemnification
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You agree to defend, indemnify, and hold harmless MASH: Mushroom Automation and its affiliates 
              from any claims, damages, or expenses arising from your use of the Service or violation of 
              these Terms.
            </p>

            <h2 id="termination" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">
              12. Termination
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We may terminate or suspend your account and access to the Service immediately, without prior 
              notice, for conduct that we determine violates these Terms or is harmful to other users or 
              the Service. Upon termination, your right to use the Service will cease immediately. You may 
              export your data before termination.
            </p>

            <h2 id="governing-law" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">
              13. Governing Law
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              These Terms shall be governed by and construed in accordance with the laws of the Philippines, 
              without regard to its conflict of law provisions.
            </p>

            <h2 id="changes" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">
              14. Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We reserve the right to modify these Terms at any time. We will provide notice of any material 
              changes by posting the new Terms on this page. Your continued use of the Service after such 
              modifications constitutes acceptance of the updated Terms.
            </p>

            <h2 id="contact" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">
              15. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="glass-card p-6">
              <p className="text-gray-600 dark:text-gray-400">
                <strong className="text-gray-900 dark:text-white">Email:</strong> mash.mushroom.automation@gmail.com<br />
                <strong className="text-gray-900 dark:text-white">Website:</strong> https://join.mashmarket.app
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
