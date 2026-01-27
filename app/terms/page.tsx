import { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Terms of Service - MASH",
  description: "Terms of service for the MASH Mushroom Automation System",
};

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="bg-page-header py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-secondary">
              Last updated: January 1, 2026
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-default">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-secondary mb-6">
              By accessing or using the MASH Mushroom Automation System (&quot;Service&quot;), you agree to be 
              bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of these terms, 
              you may not access the Service.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              2. Description of Service
            </h2>
            <p className="text-secondary mb-6">
              MASH is a mushroom cultivation automation platform that provides environmental monitoring, 
              climate control, and data analysis tools. The Service includes mobile applications, web 
              interfaces, cloud services, and related documentation.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              3. User Accounts
            </h2>
            <p className="text-secondary mb-4">
              When you create an account with us, you must provide accurate, complete, and current information. 
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-secondary mb-6 space-y-2">
              <li>Safeguarding your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
              <li>Ensuring your account information remains current</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              4. Acceptable Use
            </h2>
            <p className="text-secondary mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 text-secondary mb-6 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the intellectual property rights of others</li>
              <li>Transmit malicious code or interfere with the Service</li>
              <li>Attempt to gain unauthorized access to any systems</li>
              <li>Impersonate any person or entity</li>
              <li>Collect user data without consent</li>
              <li>Use the Service for illegal cultivation activities</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              5. Intellectual Property
            </h2>
            <p className="text-secondary mb-6">
              The Service and its original content, features, and functionality are owned by MASH Mushroom 
              Automation and are protected by international copyright, trademark, and other intellectual 
              property laws. The MASH software is provided under an open-source license (see License page 
              for details).
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              6. User Content
            </h2>
            <p className="text-secondary mb-6">
              You retain ownership of any content you create or upload to the Service, including growing 
              recipes, configuration settings, and environmental data. By using the Service, you grant us 
              a non-exclusive license to use, store, and process this content solely for the purpose of 
              providing the Service.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              7. Hardware and Third-Party Services
            </h2>
            <p className="text-secondary mb-6">
              MASH provides software and cloud services. Any hardware components (sensors, controllers, etc.) 
              are subject to their respective manufacturers&apos; terms and warranties. We are not responsible for 
              the performance or failure of third-party hardware.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              8. Service Availability
            </h2>
            <p className="text-secondary mb-6">
              We strive to maintain high availability of the Service, but we do not guarantee uninterrupted 
              access. We may modify, suspend, or discontinue any part of the Service at any time with 
              reasonable notice. For critical cultivation operations, we recommend implementing local 
              backup systems.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              9. Disclaimer of Warranties
            </h2>
            <p className="text-secondary mb-6">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, 
              EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, 
              SECURE, OR ERROR-FREE. CULTIVATION RESULTS MAY VARY BASED ON NUMEROUS FACTORS BEYOND 
              THE SERVICE&apos;S CONTROL.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              10. Limitation of Liability
            </h2>
            <p className="text-secondary mb-6">
              IN NO EVENT SHALL MASH MUSHROOM AUTOMATION BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR CROPS, ARISING OUT 
              OF YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU 
              FOR THE SERVICE IN THE PAST TWELVE MONTHS.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              11. Indemnification
            </h2>
            <p className="text-secondary mb-6">
              You agree to defend, indemnify, and hold harmless MASH Mushroom Automation and its affiliates 
              from any claims, damages, or expenses arising from your use of the Service or violation of 
              these Terms.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              12. Termination
            </h2>
            <p className="text-secondary mb-6">
              We may terminate or suspend your account and access to the Service immediately, without prior 
              notice, for conduct that we determine violates these Terms or is harmful to other users or 
              the Service. Upon termination, your right to use the Service will cease immediately. You may 
              export your data before termination.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              13. Governing Law
            </h2>
            <p className="text-secondary mb-6">
              These Terms shall be governed by and construed in accordance with the laws of the Philippines, 
              without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              14. Changes to Terms
            </h2>
            <p className="text-secondary mb-6">
              We reserve the right to modify these Terms at any time. We will provide notice of any material 
              changes by posting the new Terms on this page. Your continued use of the Service after such 
              modifications constitutes acceptance of the updated Terms.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              15. Contact Us
            </h2>
            <p className="text-secondary mb-6">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="bg-componentpage p-6 rounded-lg">
              <p className="text-secondary">
                <strong>Email:</strong> mash.mushroom.automation@gmail.com<br />
                <strong>Website:</strong> https://mash-landing.vercel.app
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
