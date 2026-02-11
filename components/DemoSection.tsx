"use client";

import { useState } from "react";
import type { LandingPageData } from "@/lib/sanity";

/**
 * Demo video data.
 * Video URLs will be populated from Sanity CMS once assets are uploaded
 * via scripts/upload-assets.js. Until then, videos show a placeholder.
 */
const DEFAULT_VIDEOS = [
  {
    id: "overview",
    title: "System Overview",
    description: "Get a comprehensive tour of the MASH automation system",
  },
  {
    id: "setup",
    title: "Installation & Setup",
    description: "Learn how to install and configure your MASH system",
  },
  {
    id: "mobile",
    title: "Mobile App Demo",
    description: "Explore the mobile application features and controls",
  },
];

const DEFAULT_STATS = [
  { value: "99.9%", label: "System Uptime" },
  { value: "30%", label: "Yield Increase" },
  { value: "24/7", label: "Monitoring" },
];

export default function DemoSection({ data }: { data?: LandingPageData | null } = {}) {
  const videos = data?.demoVideos ?? DEFAULT_VIDEOS;
  const stats = data?.demoStats ?? DEFAULT_STATS;
  const [activeVideo, setActiveVideo] = useState("overview");

  return (
    <section id="demo" className="py-20 bg-demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {data?.demoTitle ?? "See MASH in Action"}
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            {data?.demoSubtitle ?? "Watch our demonstration videos to understand how MASH transforms mushroom cultivation"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl aspect-video flex items-center justify-center">
              <div className="text-center text-gray-400 p-8">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium">
                  {videos.find(v => v.id === activeVideo)?.title || "Demo Video"}
                </p>
                <p className="text-sm mt-2">Video coming soon</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video.id)}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  activeVideo === video.id
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-card hover:bg-surface-hover"
                }`}
              >
                <h3 className="font-bold text-lg mb-1">{video.title}</h3>
                <p className={activeVideo === video.id ? "text-green-100" : "text-secondary"}>
                  {video.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card p-6 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{stat.value}</div>
              <div className="text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
