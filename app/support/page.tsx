import { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";
import { Mail, MessageCircle, BookOpen, Clock, MapPin, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Support - MASH",
  description: "Get help and support for your MASH: Mushroom Automation System",
};

export default function SupportPage() {
  return (
    <PageLayout>
      <div className="bg-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              How Can We Help?
            </h1>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Our team is here to help you succeed with MASH. Find answers or get in touch.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-success-light p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-inverse" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Schedule a Meeting</h3>
              <p className="text-secondary mb-4">
                Book a video call with our team
              </p>
              <Link
                href="/schedule"
                className="inline-flex items-center text-green-800 dark:text-green-300 hover:text-green-900 dark:hover:text-green-200 font-semibold"
              >
                Book a Call
              </Link>
            </div>

            <div className="bg-success-light p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-inverse" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Documentation</h3>
              <p className="text-secondary mb-4">
                Browse our comprehensive guides and tutorials
              </p>
              <Link
                href="/documentation"
                className="inline-flex items-center text-green-800 dark:text-green-300 hover:text-green-900 dark:hover:text-green-200 font-semibold"
              >
                View Documentation
              </Link>
            </div>

            <div className="bg-accent-blue-light p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-inverse" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Community Forum</h3>
              <p className="text-secondary mb-4">
                Connect with other MASH users
              </p>
              <a
                href="https://www.facebook.com/groups/mashmushrooom"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-800 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-200 font-semibold"
              >
                Join Community
              </a>
            </div>

            <div className="bg-accent-purple-light p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-accent-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-inverse" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Email Support</h3>
              <p className="text-secondary mb-4">
                Get personalized help from our team
              </p>
              <a
                href="mailto:mash.mushroom.automation@gmail.com"
                className="inline-flex items-center text-purple-800 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-200 font-semibold"
              >
                Send Email
              </a>
            </div>
          </div>

          {/* Contact Form Section */}
          <div id="contact" className="max-w-3xl mx-auto">
            <div className="bg-componentpage rounded-xl p-8">
              <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                Contact Support
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 rounded-lg border-default bg-background text-primary focus:ring-2 focus:ring-green focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-lg border-default bg-background text-primary focus:ring-2 focus:ring-green focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg border-default bg-background text-primary focus:ring-2 focus:ring-green focus:border-transparent"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="hardware">Hardware Issues</option>
                    <option value="software">Software Issues</option>
                    <option value="mobile">Mobile App Support</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border-default bg-background text-primary focus:ring-2 focus:ring-green focus:border-transparent"
                    placeholder="Describe your issue or question in detail..."
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center px-8 py-3 bg-brand text-inverse rounded-full hover:bg-brand-hover transition-colors font-semibold"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-componentpage rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
              <a href="mailto:mash.mushroom.automation@gmail.com" className="text-secondary hover:text-green">
                mash.mushroom.automation@gmail.com
              </a>
            </div>
            <div>
              <div className="w-12 h-12 bg-componentpage rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Response Time</h3>
              <p className="text-secondary">
                Usually within 24-48 hours
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-componentpage rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Location</h3>
              <p className="text-secondary">
                Philippines
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
