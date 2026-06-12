import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack does not climb up to C:\Aadi (which
  // contains its own .git) and try to resolve node_modules from there.
  turbopack: {
    root: path.resolve(__dirname),
  },
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    // Cloudinary already serves AVIF/WebP via f_auto, so we let it deliver
    // the optimised bytes and pass the URL through next/image unchanged.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dprx4pret/**",
      },
    ],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;