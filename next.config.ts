import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /^https?.*(\/api\/pitches\/[^/]+\/slides)/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "pitch-slides-cache",
          expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 7 },
        },
      },
      {
        urlPattern: /^https?.*(\/api\/pitches\/[^/]+$)/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "pitch-cache",
          expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
        },
      },
    ],
  },
});

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
};

export default withPWA(nextConfig);
