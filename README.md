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
- Deployed to Cloudflare Pages via `@cloudflare/next-on-pages`
  (`wrangler.toml`; Pages project name `ganstever`)

```bash
npm ci          # install
npm run dev     # local dev on :3000
npm run build   # production build
npm run lint    # eslint
```

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
- [ ] **Domain**: `site.ts` assumes `https://ganstever.com`. If the final
      purchase is a different TLD (.co.za), update `site.url`.
- [ ] **Exact GPS / street address** for the structured data
      (`site.geo`, currently approximate Suiderstrand coordinates).
- [ ] **GA4**: create the property and paste the ID into
      `GA_MEASUREMENT_ID` in `src/app/layout.tsx`.
- [ ] **Rates**: "from R1,300/night, min 2 nights" came from the SA-Venues
      listing (June 2026) — confirm it still holds.
- [ ] Google Business Profile rename/claim ("Gans-te-Ver"), then match
      the site's brand spelling everywhere.

## Deploying

Cloudflare Pages, same recipe as Kanaan: connect the repo, framework
preset **Next.js**, build command `npx @cloudflare/next-on-pages@1`,
output `.vercel/output/static`, and the `nodejs_compat` flag comes from
`wrangler.toml`. Point `ganstever.com` at the Pages project when DNS is
ready.