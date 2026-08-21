# BLOG PLAYBOOK — Gans-te-Ver

How a post is **written** and **built** in this repo. Voice, facts policy and client rules
live in [CLIENT.md](CLIENT.md); commands, images and traps in
[ARCHITECTURE.md](ARCHITECTURE.md). The end-to-end process is `/blog`.

---

## Part 1 — Keywords (do this first, before writing a word)

**Research the keyword before drafting.** Validate the calendar's assumed keyword against
the live SERP — the calendar's keywords were assumed, not researched, and several are
wrong. Never trust one unchecked.

Each post owns **exactly one primary keyword**. Two posts must never target the same
primary — that is cannibalisation and it splits ranking equity.

| Tier | Count | Where it goes |
|---|---|---|
| **Primary** | 1 | Slug, `seoTitle`, `seoDescription`, hero intro, one `H2`, naturally in body |
| **Secondary** | 3–5 | `H2` headings and body prose |
| **Tertiary / long-tail** | 3–6 | `TLDR` bullets and any FAQ-style block |

- **The slug *is* the primary keyword** — `/blog/wine-tasting-near-cape-agulhas`.
- **The H1 and the title tag are different strings, on purpose.** The H1 (`post.title`)
  stays literary and human; the title tag (`post.seoTitle`) front-loads the keyword. Both
  live in `src/lib/posts.ts`; `page.tsx` reads `post.seoTitle ?? post.title`.
- **`seoTitle` ≤ 46 characters.** `app/layout.tsx` sets `template: "%s · Gans-te-Ver"`,
  which appends 14 — so 46 + 14 lands on Google's ~60-char cap. **`seoDescription` ≤ 155.**
- **Don't chase head terms** (see CLIENT.md).

---

## Part 2 — Block grammar

Import from `@/components/blog/Blocks`. **Rhythm beats variety** — a callout, stat grid or
list roughly every **250–400 words**.

1. `BlogHero` — eyebrow, literary H1, a one-sentence intro **containing the primary
   keyword**, byline
2. Opening prose — 2 short paragraphs
3. `TLDR` — 5 bullets, near the top, carrying the long-tail terms. The heading is the
   `label` prop; house default is `"Activities to do"`, falling back to `TL;DR`
4. `StatGrid` — exactly 3 parallel, verifiable facts
5. Prose with `H2`s — secondary keywords live here
6. `Callout` — the single most quotable line in the post
7. `NumberedList` — `variant="grid" | "light" | "dark"`
8. Inline figures
9. `ClosingBlock` — **always second-to-last**
10. `Sources` — real, fetchable URLs
11. `WhatsAppCTA` — **always last**, `pageKey="blog"`

**Structural rules that break the build if ignored:**

- `NumberedList` breaks out of the prose column. **Close the `max-w-3xl` wrapper `div`
  before rendering it**, then open a new one after.
- JSX *text* needs HTML entities (`&rsquo;`, `&mdash;`, `&ldquo;`) or ESLint's
  `react/no-unescaped-entities` fails the build. String *props* do not.
- **Internal links:** at least two, using `next/link`. Prefer `/#the-setting`,
  `/#the-house`, `/#book` and other live journal posts. **Never link to a post that does
  not exist.**

---

## Part 3 — Images

Art direction, the 4-image cap, the "always one real property photo" rule and the prompt
template are in [CLIENT.md § Visual direction](CLIENT.md).

**Mechanics:** add each new image as a key in `src/lib/images.ts` whose `cldImage()`
`public_id` matches the filename exactly. Generate into `public/images/<public_id>.png`,
then upload with `scripts/upload-to-cloudinary.py` — the filename *is* the Cloudinary
link, there is no separate registry step.

Generation: see [ARCHITECTURE.md § Generating blog images](ARCHITECTURE.md).
(`scripts/generate-images-gemini.py` is the older Gemini path and still works if a key is
present, but OpenRouter is the current route.)

---

## Part 4 — The registry

Every post is one entry in the `posts` array in `src/lib/posts.ts`. **Nothing else to
wire** — `/blog` and `sitemap.xml` both derive from it.

```ts
{
  slug: "wine-tasting-near-cape-agulhas",   // == the primary keyword
  title: "…",                                // literary H1
  seoTitle: "…",                             // ≤46 chars, keyword front-loaded
  seoDescription: "…",                       // ≤155 chars
  excerpt: "…",                              // the /blog card + OG description
  datePublished: "2026-06-15",               // ISO
  readingMinutes: 8,
  tag: "Guide",                              // "Guide" | "Our Story"
  cover: img.someKey,                        // unique per post — never reuse a cover
  // draft: true,                            // builds, but hidden from /blog + sitemap
}
```

`draft: true` stages a post — it still builds and resolves at its direct URL, but
`publishedPosts` (which drives `/blog` and `sitemap.xml`) filters it out. Remove the line
to publish; `getPost()` still finds drafts, so direct links and previews work.

The route itself is `src/app/(site)/blog/<slug>/page.tsx` — the `(site)` route group does
not appear in the URL. Deleting a route leaves stale generated types in `.next`; if the
build complains about a module it cannot find under `src/app/…/blog/…`, delete `.next` and
rebuild.

---

## Part 5 — Ship

```bash
git fetch origin
git checkout main && git rebase origin/main     # never force-push main
git checkout -b blog/<slug>
# … write, build images, register …
npm run lint
npm run build                                   # the gate
```

Commit scoped to this post's files, push the branch, open a PR, hand over the link.
**Don't merge until told.** After any merge, check `src/app/sitemap.ts` and
`src/app/robots.ts` for a duplicated `export const dynamic` — a bad merge does this and it
silently blocks every Cloudflare deploy.

---

## Definition of done

- [ ] Primary keyword validated against the live SERP, not assumed
- [ ] No other post targets the same primary keyword
- [ ] Slug == primary keyword; `seoTitle` ≤ 46; `seoDescription` ≤ 155
- [ ] Zero banned words; SA/British spelling throughout
- [ ] No operating hours; no invented facts; no promised wildlife sightings
- [ ] ≤ 4 images, at least one real property photo, every AI image labelled in `images.ts`
- [ ] `TLDR` near the top; `ClosingBlock` second-to-last; `WhatsAppCTA` last
- [ ] Article + Breadcrumb JSON-LD present; canonical and OG set
- [ ] Every internal link resolves to a route that exists
- [ ] `npm run lint` and `npm run build` both pass
- [ ] ⚠ Confirm-before-publishing list handed to the human

*Last reviewed: 2026-08-21.*
