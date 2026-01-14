"use client";

import { useState } from "react";

export default function HeroSection() {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20"
            onError={() => setVideoError(true)}
          >
            <source src="/assets/videos/demo.mp4" type="video/mp4" />
            <source src="/assets/videos/demo.webm" type="video/webm" />
          </video>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200" />
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
          MASH Mushroom Automation
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Advanced automation system for professional mushroom cultivation with real-time monitoring, 
          climate control, and intelligent growing environment management
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#features"
            className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            Explore Features
          </a>
          <a
            href="#demo"
            className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg border-2 border-green-600"
          >
            Watch Demo
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Monitoring</h3>
            <p className="text-gray-600">Track temperature, humidity, CO2 levels, and more with precision sensors</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile Control</h3>
            <p className="text-gray-600">Control your mushroom farm from anywhere with our mobile application</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Automated Control</h3>
            <p className="text-gray-600">Intelligent automation maintains optimal growing conditions 24/7</p>
          </div>
        </div>
      </div>
    </section>
  );
}
