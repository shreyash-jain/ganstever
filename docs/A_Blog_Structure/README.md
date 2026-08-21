# START HERE — Gans-te-Ver journal

**This folder is the single source of truth for blog work in this repo.** A new teammate
or a fresh AI session with zero chat history can ship a correct post using only these
files.

**Read in this order:**

1. **README.md** (this file) — what the client is, the rules you must not break
2. **[CLIENT.md](CLIENT.md)** — who they are, who reads them, the voice, and every
   standing instruction they have given. Living file: add to it after every round of
   feedback.
3. **[BLOG_PLAYBOOK.md](BLOG_PLAYBOOK.md)** — how to write and build a post *here*
4. **[ARCHITECTURE.md](ARCHITECTURE.md)** — commands, image pipeline, traps, deploy
5. **[STATUS.md](STATUS.md)** — the living ledger: what's published, what's next

> **These files win.** When they disagree with an old memory, a stale doc, or chat
> history — believe these. If you find one wrong, fix it and bump the date.

The day-to-day workflow is the **`/blog`** command (`.claude/commands/blog.md`). It is
identical in every client repo; everything client-specific is here.

The 12-month editorial calendar lives at
[`docs/blog-editorial-calendar.md`](../blog-editorial-calendar.md) — 36 posts with
titles, slugs, keywords, outlines and a *confirm before writing* list each.

---

## 60-second context

**Gans-te-Ver** is a self-catering holiday house at **Suiderstrand**, near **Cape
Agulhas** — the southernmost tip of Africa, Western Cape, South Africa. The family built
it in **1991** and has holidayed there ever since. That lived knowledge is the one asset a
content farm cannot buy, and it is the whole editorial strategy.

- Live site: **https://ganstever.com** (also `https://ganstever.pages.dev`), journal at
  `/blog`
- Client contact: **Madelaine**, the property owner
- Bookings run through **WhatsApp** — `+27 82 374 4676`

**The journal** publishes **3 posts a month** across three segments — *Planning*
(top-of-funnel discovery), *Logistics* (booking-closers), *Seasonal* (a month-by-month
almanac) — each routing the reader to a WhatsApp enquiry.

## Stack in one line

Next.js **16.2.6** (App Router, Turbopack) · React 19 · TypeScript · Tailwind ·
**static export** (`output: "export"` → `out/`) · photos on Cloudinary (cloud
`dprx4pret`, folder `ganstever/`) · deployed to **Cloudflare Pages**, `main` = production.

## The non-negotiables

1. **Never invent a fact.** Capacity, distances, prices and contact details come from
   `src/lib/site.ts`; photo keys from `src/lib/images.ts`. Anything you couldn't verify
   goes into a **⚠ Confirm before publishing** note to the human — never into the prose
   as an assertion.
2. **Never publish operating hours.** They go stale and make the client look careless.
   Write "hours vary — confirm before you go". House rule, not a preference.
3. **Never promise a wildlife sighting.** Soften anything seasonal: "often", "usually",
   "early in the window".
4. **One primary keyword per post, never shared with another post.** Two posts on the
   same primary is cannibalisation.
5. **Keep at least one real property photograph per post.** A real-business travel blog
   with zero real photos is a trust problem. Default mix: 3 AI + 1 property photo.
6. **The Cloudflare build command must be `npm run build`, output dir `out`.** If it is
   ever set to `npx @cloudflare/next-on-pages@1` the deploy fails — and it's the wrong
   tool for a static site. That setting lives only in the Cloudflare dashboard.
7. **Never force-push `main`.** A GitHub Action reverts force-pushes. Fetch and
   **rebase** onto `origin/main`, which advances without warning when the boss merges a PR.
8. **Run `npm run build` before pushing.** A broken `main` fails quietly — Cloudflare
   keeps the last good build, so the site looks fine while your change never ships.

## Where everything lives

| Thing | Path |
|---|---|
| Post registry (drives `/blog` + sitemap) | `src/lib/posts.ts` |
| A single post | `src/app/(site)/blog/<slug>/page.tsx` |
| The block library (the grammar) | `src/components/blog/Blocks.tsx` |
| Image catalogue (every photo slot) | `src/lib/images.ts` |
| Cloudinary URL builder (cloud name) | `src/lib/cloudinary.ts` |
| Business facts: address, WhatsApp, capacity | `src/lib/site.ts` |
| JSON-LD builders | `src/lib/jsonld.ts` |
| Editorial calendar (36 posts) | `docs/blog-editorial-calendar.md` |
| Image generation / upload scripts | `scripts/*.py` |

*Last reviewed: 2026-08-21.*
