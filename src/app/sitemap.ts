import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { posts } from "@/lib/posts";

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
