import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Every route prerenders to static HTML, so we ship a static export and
  // host it as plain files on Cloudflare Pages — no Node server needed.
  output: "export",
  // Pin the workspace root so Turbopack does not climb up to C:\Aadi (which
  // contains its own .git) and try to resolve node_modules from there.
  turbopack: {
    root: path.resolve(__dirname),
  },
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    // cldImage() already returns a fully optimised Cloudinary URL
    // (f_auto,q_auto,c_limit), so there is nothing for Next.js to optimise.
    // unoptimized passes the src straight through — required for a static
    // export, which has no image-optimisation server.
    unoptimized: true,
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;