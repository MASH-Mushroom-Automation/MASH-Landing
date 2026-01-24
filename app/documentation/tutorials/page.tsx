import { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";
import { Clock, Tag, ChevronRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Tutorials - MASH Documentation",
  description: "Step-by-step tutorials for the MASH Mushroom Automation System",
};

const tutorials = [
  {
    id: "getting-started-guide",
    title: "Complete Getting Started Guide",
    description: "A comprehensive guide to setting up your MASH system from scratch, including hardware assembly and software configuration.",
    category: "Getting Started",
    readTime: "15 min",
    difficulty: "Beginner",
  },
  {
    id: "sensor-setup",
    title: "Setting Up Temperature & Humidity Sensors",
    description: "Learn how to properly install and calibrate your environmental sensors for accurate readings.",
    category: "Hardware",
    readTime: "10 min",
    difficulty: "Beginner",
  },
  {
    id: "climate-automation",
    title: "Creating Climate Automation Rules",
    description: "Set up automatic climate control rules to maintain optimal growing conditions 24/7.",
    category: "Automation",
    readTime: "12 min",
    difficulty: "Intermediate",
  },
  {
    id: "mobile-app-setup",
    title: "Mobile App Configuration",
    description: "Connect your MASH system to the mobile app for remote monitoring and control.",
    category: "Mobile",
    readTime: "8 min",
    difficulty: "Beginner",
  },
  {
    id: "growing-recipes",
    title: "Creating Custom Growing Recipes",
    description: "Design and save custom growing recipes for different mushroom species with optimal parameters.",
    category: "Advanced",
    readTime: "20 min",
    difficulty: "Advanced",
  },
  {
    id: "data-analysis",
    title: "Analyzing Your Growing Data",
    description: "Learn how to interpret your sensor data and use analytics to improve yields.",
    category: "Analytics",
    readTime: "15 min",
    difficulty: "Intermediate",
  },
  {
    id: "alert-setup",
    title: "Configuring Alert Notifications",
    description: "Set up email and push notifications for critical environmental events.",
    category: "Notifications",
    readTime: "8 min",
    difficulty: "Beginner",
  },
  {
    id: "api-integration",
    title: "Integrating with Third-Party Systems",
    description: "Use the MASH API to connect with home automation systems and other IoT platforms.",
    category: "Developer",
    readTime: "25 min",
    difficulty: "Advanced",
  },
];

const categories = ["All", "Getting Started", "Hardware", "Automation", "Mobile", "Advanced", "Analytics", "Notifications", "Developer"];

export default function TutorialsPage() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <Link href="/documentation" className="text-purple-600 dark:text-purple-400 hover:underline">
              Documentation
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">Tutorials</span>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Tutorials & Guides
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Step-by-step tutorials to help you get the most out of your MASH system
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tutorials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.map((tutorial) => (
              <article
                key={tutorial.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-800/50 transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                    <Tag className="w-3 h-3 mr-1" />
                    {tutorial.category}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    tutorial.difficulty === "Beginner"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                      : tutorial.difficulty === "Intermediate"
                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                  }`}>
                    {tutorial.difficulty}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {tutorial.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {tutorial.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {tutorial.readTime}
                  </span>
                  <Link
                    href={`/documentation/tutorials/${tutorial.id}`}
                    className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
                  >
                    Read Tutorial
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Want to contribute a tutorial?
            </p>
            <a
              href="https://github.com/MASH-Mushroom-Automation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-semibold"
            >
              Contribute on GitHub
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
