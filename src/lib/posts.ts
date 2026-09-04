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
    slug: "cape-agulhas-shipwrecks",
    title:
      "The shipwreck coast: why so many ships have died at Cape Agulhas",
    // Primary keyword: "Cape Agulhas shipwrecks". Deliberately NOT the
    // calendar's assumed "graveyard of ships Cape Agulhas" — that phrase is a
    // nickname people read, not one they search, and the SERP for it is thin
    // tourism-board copy. "Cape Agulhas shipwrecks" is the term with real
    // intent behind it and no other post here competes for it: the wreck is a
    // single bullet in things-to-do-cape-agulhas, not its subject.
    // ≤46 chars: layout.tsx appends " · Gans-te-Ver" (14) to reach the ~60 cap.
    seoTitle: "Cape Agulhas Shipwrecks: Graveyard of Ships",
    seoDescription:
      "Around 150 ships have been lost off Cape Agulhas since 1673. The currents that sink them, the Meisho Maru you can walk to, and where to see the rest.",
    excerpt:
      "The warm Agulhas current, the cold Southern Ocean and a shallow bank 250 km wide have been wrecking ships here for three and a half centuries. The story, from the wreck at the end of our beach to the one that gave the world “women and children first”.",
    datePublished: "2026-09-03",
    readingMinutes: 4,
    tag: "Guide",
    cover: img.shipwreckCoastCover,
  },
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
  {
    slug: "cape-town-to-cape-agulhas-road-trip",
    title: "Cape Town to Cape Agulhas: the long-weekend drive",
    // Primary keyword: "Cape Town to Cape Agulhas road trip". Deliberately
    // NOT "Cape Town to Cape Agulhas drive" — the calendar assigns that head
    // term to the planned /blog/cape-town-to-cape-agulhas-scenic-drive post.
    // This one owns the long-weekend / trip-planning intent: the 2026 dates,
    // the stops, the shop, the house at the end of it.
    seoTitle: "Cape Town to Cape Agulhas Road Trip",
    seoDescription:
      "The route, the stops and the 2026 long weekends worth booking — 230 km and about three hours from the city to a beach house that sleeps ten.",
    excerpt:
      "Everyone has the same conversation somewhere around Caledon: we could have been in Hermanus by now. You could have — but the extra ninety minutes is the whole point. The drive, the stops, and the 2026 dates worth booking.",
    // Published on the day it went live rather than the brief's 20 August
    // target: a card and an Article datePublished dated three weeks ahead of
    // the deploy reads as a bug to a reader and is a bad signal to Google.
    datePublished: "2026-07-29",
    readingMinutes: 7,
    tag: "Guide",
    cover: img.roadTripCover,
  },
  // ---------------------------------------------------------------------
  // Restored. Both of these shipped in the launch build (031813c) and were
  // then deleted by 30abda3, a "single-post preview" commit that stripped
  // the other journal posts so the wine post could be previewed alone. That
  // deletion reached main and was never reverted, so both 404'd in
  // production. Recovered from origin/journal/agulhas-wine-triangle.
  // ---------------------------------------------------------------------
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

/**
 * Posts that appear on /blog and in the sitemap — drafts excluded, newest
 * first. Sorted rather than relying on the order of the `posts` array: that
 * order is authoring convenience, and a new post appended to the end was
 * landing at the bottom of the index where nobody scrolls. ISO dates compare
 * correctly as strings, and `.filter()` already returned a fresh array, so
 * `posts` itself is not mutated.
 */
export const publishedPosts: Post[] = posts
  .filter((p) => !p.draft)
  .sort((a, b) => b.datePublished.localeCompare(a.datePublished));