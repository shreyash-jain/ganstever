# CLIENT — Gans-te-Ver

Who the client is, who reads them, how they sound, and every standing instruction they
have given. **This file is living.** Every time Madelaine or the manager reacts to a
draft, write the lesson down here as a rule with its reason. That is the whole mechanism
by which the next blog is better than this one.

---

## The business

**Gans-te-Ver** — a self-catering holiday house at **Suiderstrand**, near **Cape
Agulhas**, Western Cape, South Africa. The family built the house in **1991** and has
holidayed there ever since, across three generations.

- Site: **https://ganstever.com** (journal at `/blog`)
- Owner / client contact: **Madelaine**
- Bookings: **WhatsApp only** — `+27 82 374 4676`. Every post ends in a WhatsApp CTA.
- The account is managed by Vidyayatan Technologies; the manager reviews everything
  before it reaches Madelaine, and cares a great deal about not putting the client in a
  position where they have to walk something back. **Flag anything unverified rather than
  asserting it.**

## The reader

Someone planning a trip to the southern tip of Africa, at one of three stages:

1. **Planning** — top of funnel. "What is there to see at the southern tip?"
2. **Logistics** — mid/bottom of funnel. The honest drive, when to come, what a whole
   house costs versus ten hotel rooms, wifi and load-shedding, how WhatsApp booking works.
3. **Seasonal** — a month-by-month almanac that matches publishing to live search demand.

Three posts a month, one per segment.

## Voice

Warm, understated, literary, honest. **First-person host** — "we", "our". The family's
lived knowledge is the asset: name the corner of the balcony, the last sensible petrol
stop, the thing that goes wrong.

- South African idiom where it is natural: braai, stoep, fynbos, southeaster, padkos.
- **SA / British spelling**: metres, kilometres, colour, harbour, neighbour, realise.
- Specific facts anchor trust. Vague enthusiasm destroys it.
- **Anti-hype.** If a month is bleak, say so, then say why you love it anyway.
- **Honesty is the marketing.** "Confirm the hours before you drive" outperforms a
  confident wrong opening time.

### Banned words and phrases — never use, in any form

`nestled` · `hidden gem` · `home away from home` · `something for everyone` ·
`bucket list` · `unwind` · `best-kept secret` · `must-see` · `nature lover's paradise`

## Facts and accuracy

- **Never invent a fact.** Capacity, distances, prices and contact details come from
  `src/lib/site.ts`. Photo keys come from `src/lib/images.ts`.
- **Never publish operating hours.** Write "hours vary — confirm before you go".
- Soften anything seasonal or wildlife-related — "often", "usually", "early in the
  window". **Never promise a sighting.**
- Every factual claim a reader could act on gets a source in the `Sources` block, with a
  real fetchable URL.
- Anything you could not verify goes into a **⚠ Confirm before publishing** list handed to
  the human — never into the prose.

## Visual direction

Documentary, realistic, muted natural colours — the site's palette. Landscape and
interior over people.

- **Maximum 4 images per post.** The cover (the `BlogHero` and OG image) counts as one.
- **At least one real property photograph, always.** Default mix: 3 AI + 1 property.
- Real photos are Madelaine's own, already in `src/lib/images.ts`. **Never scrape.**
- AI images are **illustrative** and must never be passed off as a specific named farm,
  room or person. Keep the provenance comment in `images.ts` honest.
- Every prompt ends with: `No people, no text, no logos.` plus an explicit aspect ratio.
  Ask for *documentary photography* / *realistic photograph* and *muted natural colours*.
- Covers are **16:10**, horizon low, subject off-centre — the H1 sits in the middle and a
  dark gradient covers the top.

---

## Standing instructions and past feedback

*Append every new one, newest first, with the date and the reason. Never delete an entry
— supersede it and say so.*

- **Three posts a month, one per segment** (Planning / Logistics / Seasonal), sequenced to
  demand — whale and almanac posts just before each season, December-booking and festive
  posts in October, long-weekend posts before the actual 2027 public holidays.
- **Every post carries a "⚠ Confirm before writing/publishing" list** for Madelaine. This
  is how the manager protects the client from having to walk something back.
- **Never chase head terms.** `ganstever.com` is a new domain with almost no backlinks.
  Terms held by tourism boards, TripAdvisor, Rome2Rio or Decanter are 12-month-plus plays.
  Win experiential, entity-specific and last-mile long-tail first.
- **Match intent to scope.** A "wine route" keyword promises fifteen cellars; if the post
  covers one ward, target the ward.

*Last reviewed: 2026-08-21.*
