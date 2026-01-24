"use client";

import { useState } from "react";

export default function DemoSection() {
  const [activeVideo, setActiveVideo] = useState("overview");

  const videos = [
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

  return (
    <section id="demo" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            See MASH in Action
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Watch our demonstration videos to understand how MASH transforms mushroom cultivation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl aspect-video flex items-center justify-center">
              <video
                key={activeVideo}
                controls
                className="w-full h-full"
                poster="/assets/images/poster.png"
              >
                <source src={`/assets/videos/${activeVideo}.mp4`} type="video/mp4" />
                <source src={`/assets/videos/${activeVideo}.webm`} type="video/webm" />
                Your browser does not support the video tag.
              </video>
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
                    : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                <h3 className="font-bold text-lg mb-1">{video.title}</h3>
                <p className={activeVideo === video.id ? "text-green-100" : "text-gray-600 dark:text-gray-400"}>
                  {video.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">99.9%</div>
            <div className="text-gray-600 dark:text-gray-400">System Uptime</div>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">30%</div>
            <div className="text-gray-600 dark:text-gray-400">Yield Increase</div>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-400">Monitoring</div>
          </div>
        </div>
      </div>
    </section>
  );
}
