import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.in",
        pathname: "/storage/v1/object/public/**",
      },
      {
        // Allow images from any HTTPS source for recipe images
        protocol: "https",
        hostname: "**",
      },
    ],
    // Skip image optimization in development to avoid NAT64/private IP issues
    // In production, Vercel's image optimizer handles this properly
    unoptimized: process.env.NODE_ENV === "development",
  },
  // Allow dev server access from network
  allowedDevOrigins: ["http://192.0.0.2:3000"],
};

export default withNextIntl(nextConfig);
