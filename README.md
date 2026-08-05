# Gans-te-Ver — ganstever.com

Marketing site for **Gans-te-Ver**, Madelaine Alberts' self-catering family
beach house in Suiderstrand, Cape Agulhas (sleeps 10 · 5 en-suite bedrooms ·
inside a coastal nature reserve, metres from the beach). Built by
Vidyayatan Technologies. Sister project to the Kanaan Guest Farm site
(same stack and conventions) and to the upcoming Izmaan Lodge build.

## Stack

- Next.js 16 (App Router, `src/`), React 19, TypeScript
- Tailwind CSS 4 (design tokens in `src/app/globals.css`)
- Images served from Cloudinary (`dprx4pret` cloud, `ganstever/` folder)
- **Static export** (`output: "export"` → `out/`) hosted on Cloudflare Pages
  (`wrangler.toml`; Pages project name `ganstever`), plus one Cloudflare
  Pages Function in `functions/` for the analytics endpoint

```bash
npm ci           # install
npm run dev      # local dev on :3000 (static app only — NO /api routes)
npm run build    # production build -> out/
npm run preview  # build + wrangler pages dev on :8790 (serves /api/analytics)
npm run lint     # eslint
npm run typecheck
npm run check:ga # verify the GA4 service-account credentials
```

> `npm run dev` does not run Cloudflare Pages Functions, so `/api/analytics`
> 404s there and `/admin` shows an explanatory error. Use `npm run preview`
> to exercise the endpoint locally.

## Architecture

- `/` is a **single-flow page** (brief: scannable in 60 seconds):
  Hero → Our Story → The House → The Setting → Who it's for → Good to
  Know → Book. Sections live in `src/components/home/`.
- `/blog` is the **journal** (1–2 SEO posts/month). Each post is a folder
  under `src/app/blog/<slug>/page.tsx` built from the block library in
  `src/components/blog/Blocks.tsx`; the registry in `src/lib/posts.ts`
  drives the index page and the sitemap. **To add a post:** copy an
  existing post folder, write, add one registry entry — done.
- All copy facts (capacity, rates, distances, contact, listing URLs) live
  in `src/lib/site.ts` — change once, updates everywhere.
- SEO: per-page metadata, `sitemap.ts`, `robots.ts`, JSON-LD
  (LodgingBusiness + WebSite in the layout, FAQPage on `/`, Article +
  Breadcrumb on posts), OG image at `public/og.jpg`.

## Photos

**Rule (from the brief): never scrape images from Google or third parties.**
Approved sources only: the owner's own listing uploads, her personal
photos, or a commissioned shoot.

- Current set: Madelaine's own photographs, pulled at 2400px from her Best
  Getaways gallery — `scripts/fetch-bestgetaways.py` documents/reproduces
  the pull into `raw_photos/` (gitignored).
- The curated, renamed subset is committed at `public/images/` and
  referenced in `src/lib/images.ts` (one entry per photo, with honest alt
  text).
- `scripts/upload-to-cloudinary.py` pushes `public/images/` to the
  `ganstever/` Cloudinary folder (reads `CLOUDINARY_URL` from `.env.local`,
  gitignored). Idempotent — re-run after any photo swap.
- `scripts/make-assets.py` regenerates `public/og.jpg`, the apple-touch
  icon and the favicon from the hero photo.
- When better originals arrive from Madelaine (Drive / local shoot),
  replace files in `public/images/` keeping the same names, then re-run
  the uploader — no code changes needed.

## Before launch — confirm with the client

- [ ] **WhatsApp number**: site uses `+27 82 374 4676` (Madelaine's SA
      number). Confirm this is the Gans-te-Ver enquiry line — the
      `+258 84 570 5769` number belongs with Izmaan Lodge. One place to
      change: `src/lib/site.ts`.
- [x] **Domain**: confirmed. `https://ganstever.com` is live on Cloudflare and
      serves the site; `site.url`, the sitemap and `robots.txt` all agree.
      (`ganstever.pages.dev` serves the same content; canonical tags point at
      the `.com`.)
- [ ] **Exact GPS / street address** for the structured data
      (`site.geo`, currently approximate Suiderstrand coordinates).
- [ ] **GA4**: create the property, then paste the measurement ID into
      `GA_MEASUREMENT_ID_DEFAULT` in `src/lib/site.ts`. **Nothing is being
      collected until this is done** — the tag is wired up but inert while the
      value is empty, so there is no historical data and `/admin` shows demo
      or zeroes. Also set the reporting variables (see [Analytics](#analytics))
      and switch **Data retention to 14 months** (Admin → Data collection and
      modification) — the default of 2 months applies forward only and expired
      data is unrecoverable.
- [ ] **Rates**: "from R1,300/night, min 2 nights" came from the SA-Venues
      listing (June 2026) — confirm it still holds.
- [ ] **Check-out time conflict**: SA-Venues says check-out 10:00 (what the
      site shows); Booking.com house rules say 06:00–09:00, with check-in
      14:00–16:00 and arrival time required in advance. Confirm the real
      times with Madelaine and align all listings.
- [ ] **Damage policy**: Booking.com mentions up to R1,000 chargeable after
      check-out — decide whether the site should mention it (currently
      doesn't).
- [ ] Google Business Profile rename/claim ("Gans-te-Ver"), then match
      the site's brand spelling everywhere.

## Analytics

Two separate halves, easily confused — they use **different IDs**.

**Collection (public).** The gtag snippet lives in `src/app/(site)/layout.tsx`
and reads the **measurement ID** (`G-XXXXXXXXXX`) from `gaMeasurementId` in
`src/lib/site.ts`. It is committed in source rather than left to an env var
because a static export inlines `NEXT_PUBLIC_*` at build time, and Cloudflare
keeps Production and Preview variables as separate lists — an ID set in only
one list silently never ships. `NEXT_PUBLIC_GA_MEASUREMENT_ID` overrides it.
Deliberately scoped to `(site)`, so opening `/admin` is not recorded as a
visit and the dashboard cannot inflate its own numbers.

**Reporting (private).** `/admin` is a password-gated dashboard reading the
GA4 Data API through `functions/api/analytics.ts`, a Cloudflare Pages Function
(the site is a static export, so there is no Next.js server to host an API
route). It uses the **property ID** — about 9 digits, *not* the measurement ID
and *not* the Stream ID.

Set these in **Cloudflare Pages → Settings → Environment variables**, for
**both** Production and Preview, then **redeploy** (env changes do not apply
to existing deployments):

| Variable | Notes |
| --- | --- |
| `GOOGLE_ANALYTICS_PROPERTY_ID` | ~9 digits. Admin → Property details |
| `GOOGLE_ANALYTICS_CLIENT_EMAIL` | the actual `client_email` from the JSON |
| `GOOGLE_ANALYTICS_PRIVATE_KEY` | paste **raw, no quotes** in the dashboard |
| `ADMIN_USERNAME` | |
| `ADMIN_PASSWORD` | |

Set `ADMIN_*` **together with** the `GOOGLE_*` vars. If the Google vars land
alone, real analytics become publicly fetchable at `/api/analytics`. If both
`ADMIN_*` are unset the endpoint runs open and says so on the page.

With no Google credentials the endpoint serves seeded demo data behind a
"DEMO DATA" banner, so the dashboard is reviewable before the Google account
exists. Locally, copy `.dev.vars.example` to `.dev.vars` (gitignored) and run
`npm run check:ga` — it walks key-parses → token-issues → `runReport`-200 and
names the exact fix for each failure.

## Deploying

Cloudflare Pages: connect the repo, framework preset **Next.js**, build
command **`npm run build`**, output directory **`out`**. Point
`ganstever.com` at the Pages project.

> **Do not** set the build command to `npx @cloudflare/next-on-pages@1`. That
> is the edge-runtime tool for a server-rendered app; this site is a static
> export, and next-on-pages fails at install with an `ERESOLVE` peer-dep
> conflict. It has been the cause of more than one failed deploy here.

`functions/` is picked up automatically by the Pages build and deployed
alongside the static `out/` directory — nothing extra to configure.