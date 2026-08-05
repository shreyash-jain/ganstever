import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Emit a static robots.txt at build time (required under `output: "export"`).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Disallow stops crawling, not indexing — Google will still list a URL
      // it has never fetched if something links to it. The `noindex` meta tag
      // on /admin is what actually keeps it out of the index; this pair is
      // belt and braces.
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
