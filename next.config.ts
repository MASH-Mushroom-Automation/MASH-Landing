import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ['framer-motion'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.modules = [
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
      ...(config.resolve.modules || []),
    ];
    config.resolve.alias = {
      ...config.resolve.alias,
      'framer-motion': path.resolve(__dirname, 'node_modules/framer-motion'),
      'motion-dom': path.resolve(__dirname, 'node_modules/motion-dom'),
      'motion-utils': path.resolve(__dirname, 'node_modules/motion-utils'),
    };
    return config;
  },
};

export default nextConfig;
