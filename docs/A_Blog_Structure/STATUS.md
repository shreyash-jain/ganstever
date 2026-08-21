# STATUS — Gans-te-Ver journal

**The living state of blog work.** It exists so anyone picking up — a new teammate or a
fresh AI session — knows where things stand without needing chat history. The other docs
say *how*; this says *where we are*.

> **Handoff protocol:**
> - **Before you start:** read `README.md`, then this file.
> - **While you work:** keep the tables below current.
> - **Before you leave:** update statuses, record blockers, list the next actions, and
>   commit your branch.

*Last updated: 2026-08-21.*

---

## Published posts

Five posts live in `src/lib/posts.ts`:

| Slug | Tag | Published |
|---|---|---|
| `things-to-do-cape-agulhas` | Guide | 2026-06-12 |
| `thirty-years-of-summers` | Our Story | 2026-06-12 |
| `wine-tasting-near-cape-agulhas` | Guide | 2026-06-15 |
| `land-based-whale-watching-cape-agulhas` | Guide | 2026-07-10 |
| `cape-town-to-cape-agulhas-road-trip` | Guide | 2026-07-29 |

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
| Restore three journal posts | `blog/restore-three-journal-posts` | Local branch, in progress | Verify against `origin/main`, build, PR |
| Blog docs standardisation | *(this folder)* | Uncommitted | Commit `docs/A_Blog_Structure/` + `.claude/commands/blog.md` + the `.gitignore` change that lets the command be tracked |

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
