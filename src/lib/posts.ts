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
  /** The literary H1 — also the JSON-LD headline and the /blog card heading. */
  title: string;
  excerpt: string;
  /**
   * Keyword-led <title> tag, front-loading the post's primary keyword.
   * Kept separate from `title` so the H1 can stay in the host voice while the
   * SERP listing leads with the term we're trying to win. Falls back to `title`.
   * Keep ≤ 60 characters.
   */
  seoTitle?: string;
  /** Keyword-led meta description. Falls back to `excerpt`. Keep ≤ 155 characters. */
  seoDescription?: string;
  /** ISO date, e.g. "2026-06-12" */
  datePublished: string;
  readingMinutes: number;
  tag: "Guide" | "Our Story";
  cover: Img;
  /**
   * Hide from the /blog index and the sitemap while keeping the post fully
   * built — the route still resolves at its direct URL. Use to stage a post
   * that isn't ready to be listed yet. Omit (or false) to publish.
   */
  draft?: boolean;
};

export const posts: Post[] = [
  {
    slug: "land-based-whale-watching-cape-agulhas",
    title:
      "Whales from the dunes: land-based whale watching at Cape Agulhas",
    // Primary keyword: "land based whale watching Cape Agulhas". Deliberately
    // NOT "Cape Agulhas in July" — a month-almanac term is domestic-only, and
    // "July is peak whale season" failed fact-checking (season Jun–Nov, peak
    // Aug–Oct). This post is the site's ONE evergreen whale hub; seasonal
    // posts (August almanac etc.) must link here, not compete with it.
    seoTitle: "Land-Based Whale Watching at Cape Agulhas",
    seoDescription:
      "Southern rights pass June to November, peaking August–October. Where to watch from shore: Struisbaai, the lighthouse beaches and our own dunes.",
    excerpt:
      "From June to November, southern right whales cruise this coast close enough to watch from the sand — no boat, no schedule. Here's where we stand, from Struisbaai's harbour wall to the dunes in front of the house.",
    datePublished: "2026-07-10",
    readingMinutes: 8,
    tag: "Guide",
    cover: img.whaleCoastCover,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Posts that appear on /blog and in the sitemap — drafts excluded. */
export const publishedPosts: Post[] = posts.filter((p) => !p.draft);