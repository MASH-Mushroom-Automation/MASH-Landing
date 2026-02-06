import { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy - MASH",
  description: "Privacy policy for the MASH: Mushroom Automation System",
};

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="bg-page-header py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Privacy Policy
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
              1. Introduction
            </h2>
            <p className="text-secondary mb-6">
              MASH: Mushroom Automation (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you use our MASH application and services.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              2. Information We Collect
            </h2>
            <h3 className="text-xl font-semibold text-primary mt-6 mb-3">
              2.1 Personal Information
            </h3>
            <p className="text-secondary mb-4">
              We may collect personal information that you voluntarily provide when using our services:
            </p>
            <ul className="list-disc pl-6 text-secondary mb-6 space-y-2">
              <li>Name and email address</li>
              <li>Account credentials</li>
              <li>Contact information</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-primary mt-6 mb-3">
              2.2 Device and Sensor Data
            </h3>
            <p className="text-secondary mb-4">
              Our system collects environmental data from your mushroom cultivation setup:
            </p>
            <ul className="list-disc pl-6 text-secondary mb-6 space-y-2">
              <li>Temperature readings</li>
              <li>Humidity levels</li>
              <li>CO2 concentrations</li>
              <li>Light intensity measurements</li>
              <li>System configuration settings</li>
            </ul>

            <h3 className="text-xl font-semibold text-primary mt-6 mb-3">
              2.3 Usage Data
            </h3>
            <p className="text-secondary mb-6">
              We automatically collect certain information about how you interact with our services, 
              including app usage patterns, feature utilization, and error logs to improve our services.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-secondary mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 text-secondary mb-6 space-y-2">
              <li>Provide, operate, and maintain our services</li>
              <li>Send you alerts and notifications about your cultivation environment</li>
              <li>Improve, personalize, and expand our services</li>
              <li>Communicate with you about updates, support, and promotional offers</li>
              <li>Process transactions and send related information</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Detect, prevent, and address technical issues</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              4. Data Storage and Security
            </h2>
            <p className="text-secondary mb-6">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. Your data 
              is encrypted both in transit (using TLS) and at rest. We offer both cloud-based and local 
              storage options for your environmental data.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              5. Data Sharing
            </h2>
            <p className="text-secondary mb-4">
              We do not sell your personal information. We may share your information in the following situations:
            </p>
            <ul className="list-disc pl-6 text-secondary mb-6 space-y-2">
              <li><strong>With your consent:</strong> When you explicitly authorize us to share your information</li>
              <li><strong>Service providers:</strong> With third-party vendors who assist in operating our services</li>
              <li><strong>Legal requirements:</strong> If required by law or to protect our rights and safety</li>
              <li><strong>Business transfers:</strong> In connection with any merger, acquisition, or sale of assets</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              6. Your Rights
            </h2>
            <p className="text-secondary mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 text-secondary mb-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent where applicable</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              7. Data Retention
            </h2>
            <p className="text-secondary mb-6">
              We retain your personal information for as long as necessary to provide our services and 
              fulfill the purposes outlined in this policy. Environmental data is retained for up to 2 years 
              by default, though you can export or delete your data at any time through the application settings.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              8. Children&apos;s Privacy
            </h2>
            <p className="text-secondary mb-6">
              Our services are not intended for individuals under the age of 13. We do not knowingly collect 
              personal information from children under 13. If you believe we have collected information from 
              a child, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              9. Changes to This Policy
            </h2>
            <p className="text-secondary mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are 
              advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              10. Contact Us
            </h2>
            <p className="text-secondary mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
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
