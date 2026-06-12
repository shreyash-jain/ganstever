import { img, type Img } from "./images";

// ---------------------------------------------------------------------
// Journal registry — the single list that drives /blog and the sitemap.
//
// To publish a new post:
//   1. Create src/app/blog/<slug>/page.tsx (copy an existing post as a
//      template — the block library in components/blog/Blocks.tsx is the
//      grammar: BlogHero, TLDR, Callout, StatGrid, NumberedList,
//      ClosingBlock, WhatsAppCTA, Sources).
//   2. Add its entry here. Nothing else to wire up.
// ---------------------------------------------------------------------

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, e.g. "2026-06-12" */
  datePublished: string;
  readingMinutes: number;
  tag: "Guide" | "Our Story";
  cover: Img;
};

export const posts: Post[] = [
  {
    slug: "things-to-do-cape-agulhas",
    title: "Things to do around Suiderstrand & Cape Agulhas",
    excerpt:
      "The southernmost tip of Africa, the lighthouse, a shipwreck you can walk to, whales off the dunes — a local family's guide to the very bottom of the continent.",
    datePublished: "2026-06-12",
    readingMinutes: 9,
    tag: "Guide",
    cover: img.gardenBeachCurve,
  },
  {
    slug: "thirty-years-of-summers",
    title: "Thirty years of summers: why we finally opened Gans-te-Ver",
    excerpt:
      "A stand bought in 1990, a house built the year after, and three decades of family summers at the end of a gravel road — the story of why we finally opened the doors in 2024.",
    datePublished: "2026-06-12",
    readingMinutes: 6,
    tag: "Our Story",
    cover: img.balconyBraaiSea,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}