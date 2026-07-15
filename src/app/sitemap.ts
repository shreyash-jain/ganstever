import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { publishedPosts as posts } from "@/lib/posts";

// Emit a static sitemap.xml at build time (required under `output: "export"`).
export const dynamic = "force-static";

// Emit a static sitemap.xml at build time (required under `output: "export"`).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/blog`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.datePublished,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
