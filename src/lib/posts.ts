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
    // Primary keyword: "land based whale watching Cape Agulhas". NOT "Cape
    // Agulhas in July" (domestic-only, and "July is peak" failed fact-check —
    // season Jun–Nov, peak Aug–Oct). The site's one evergreen whale hub.
    seoTitle: "Land-Based Whale Watching at Cape Agulhas",
    seoDescription:
      "Southern rights pass June to November, peaking August–October. Where to watch from shore: Struisbaai, the lighthouse beaches and our own dunes.",
    excerpt:
      "From June to November, southern right whales cruise this coast close enough to watch from the sand — no boat, no schedule. Here's where we stand, from Struisbaai's harbour wall to the dunes in front of the house.",
    datePublished: "2026-07-10",
    readingMinutes: 8,
    tag: "Guide",
    cover: img.whaleCoastCover,
    // Staged: the page builds and resolves at its URL, but only the wine post
    // is listed on /blog + the sitemap. Delete this line to publish it live.
    draft: true,
  },
  {
    slug: "wine-tasting-near-cape-agulhas",
    title:
      "The Agulhas Wine Triangle: a cool-climate wine day from the bottom of Africa",
    // Primary keyword: "wine tasting near Cape Agulhas". We deliberately do NOT
    // chase "Cape Agulhas wine route" — that SERP is held by the Agulhas Wine
    // Triangle's own site plus Decanter/WOSA, and the term promises all 15
    // member cellars across 5 sub-regions when this post covers the Elim day.
    // ≤46 chars: layout.tsx appends " · Gans-te-Ver" (14) to reach the ~60 cap.
    seoTitle: "Wine Tasting near Cape Agulhas: an Elim Day",
    seoDescription:
      "Africa's coldest wine ward is 45 minutes inland. The Elim cellars we send guests to, how to plan the day, and why you should confirm hours first.",
    excerpt:
      "Forty-five minutes inland from our gravel road is the coldest, southernmost wine ward in Africa — Sauvignon Blanc grown in sea wind and shale. Here's the wine day we send guests on, anchored at Black Oystercatcher.",
    datePublished: "2026-06-15",
    readingMinutes: 8,
    tag: "Guide",
    cover: img.elimVineyardCover,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Posts that appear on /blog and in the sitemap — drafts excluded. */
export const publishedPosts: Post[] = posts.filter((p) => !p.draft);