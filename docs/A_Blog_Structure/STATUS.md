# STATUS — Gans-te-Ver journal

**The living state of blog work.** It exists so anyone picking up — a new teammate or a
fresh AI session — knows where things stand without needing chat history. The other docs
say *how*; this says *where we are*.

> **Handoff protocol:**
> - **Before you start:** read `README.md`, then this file.
> - **While you work:** keep the tables below current.
> - **Before you leave:** update statuses, record blockers, list the next actions, and
>   commit your branch.

*Last updated: 2026-09-28.*

---

## Published posts

Nine posts live in `src/lib/posts.ts` on `main`:

| Slug | Tag | Published |
|---|---|---|
| `things-to-do-cape-agulhas` | Guide | 2026-06-12 |
| `thirty-years-of-summers` | Our Story | 2026-06-12 |
| `wine-tasting-near-cape-agulhas` | Guide | 2026-06-15 |
| `land-based-whale-watching-cape-agulhas` | Guide | 2026-07-10 |
| `cape-town-to-cape-agulhas-road-trip` | Guide | 2026-07-29 |
| `cape-agulhas-shipwrecks` | Guide | 2026-09-03 |
| `cape-agulhas-weekend-itinerary` | Guide | 2026-09-08 |
| `two-oceans-meet-cape-agulhas-myth` | Guide | 2026-09-15 |
| `workation-cape-agulhas` | Guide | 2026-09-21 |

**Invariant:** the number of entries in `posts.ts` must equal the number of post folders
under `src/app/(site)/blog/` (excluding `page.tsx`). Check after every merge — a merge can
silently drop an entry, leaving the post reachable at its URL but invisible in `/blog` and
the sitemap.

```bash
grep -c 'slug: "' src/lib/posts.ts
find "src/app/(site)/blog" -mindepth 1 -maxdepth 1 -type d | wc -l
```

## In flight

| Work | Branch | State | Next action |
|---|---|---|---|
| Workation test post (`workation-cape-agulhas`) | merged (#15) | Live | Five items still outstanding for Madelaine (see PR #15): the family "worked a week here" frame, the Wi-Fi connection type, mobile networks at Suiderstrand, any backup power, and longer-stay pricing by message. |
| Elopement post (`elopement-cape-agulhas`) | `blog/elopement-cape-agulhas` | On `preview` (2026-09-23), PR #16 open | Marketing lead + Madelaine review. **Blocking question: does Madelaine welcome a ten-person family-only wedding stay at all?** The site says "Parties and events, no", so the post is framed as house-as-base, never venue — if she says no to small ceremonies outright, the post should not ship. Four more to confirm (see PR #16): beach ceremony below the house, marriage officer signing at the dining table, the 22:00–07:00 quiet hours, and whether to mention a longer-stay rate by message. |
| Two-oceans myth post (`two-oceans-meet-cape-agulhas-myth`) | merged (#14, 2026-09-15) | **Live, but two images are still stand-ins** (cover = `gardenSeaView`, inline = `agulhasReefSwell`) | Generate `two-oceans-cover.png` (1640×1024) and `two-oceans-eddies.png` (1536×1024), upload, and switch `posts.ts` + `page.tsx` to `img.twoOceansCover` / `img.twoOceansEddies`. OpenRouter has credit again as of 2026-09-21. |

*Restore-three-posts and the docs standardisation both shipped (#11, #8).*

## The plan

**Three posts a month**, one per segment — *Planning* · *Logistics* · *Seasonal*. The
full 12-month calendar (Jul 2026 – Jun 2027, 36 posts) with titles, slugs, keywords,
outlines and a *confirm before writing* list per post lives at
[`docs/blog-editorial-calendar.md`](../blog-editorial-calendar.md).

**Recommended publishing order from the calendar:**

1. The Agulhas Wine Triangle — a cool-climate wine day from the bottom of Africa
2. Where two oceans actually meet — why it's Cape Agulhas, not Cape Point
3. Graveyard of Ships — the wrecks that name this coast, from the Meisho Maru to the
   Birkenhead

⚠ The calendar's keywords were **assumed, not researched**. Validate each against the
live SERP before drafting — several are wrong. See `BLOG_PLAYBOOK.md § Keywords`.

## Open items

- The calendar carries a cross-cutting **"⚠ before we write anything — confirm with
  Madelaine"** list. Work through it as posts come up; don't assert anything on it.
- Cloudflare access sits with the boss, not with us — build-command and deploy-setting
  changes have to go through them.
- `.github/workflows/*` cannot be pushed from this machine (git credential lacks the
  `workflow` scope).
