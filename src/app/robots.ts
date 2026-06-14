import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Emit a static robots.txt at build time (required under `output: "export"`).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
