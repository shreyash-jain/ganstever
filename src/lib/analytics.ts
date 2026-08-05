// Shared shape and maths for the /admin dashboard.
//
// Imported by BOTH the Cloudflare Pages Function (functions/api/analytics.ts,
// by relative path) and the client UI, so it must stay free of node: builtins
// and of anything Next-specific.

import { publishedPosts, type Post } from "./posts";

/**
 * Which slice of the site the dashboard reports on.
 *
 * Every GA query is filtered with `pagePath BEGINS_WITH` this value, so "/"
 * means the whole site. Set it to "/blog/" to report on the journal alone —
 * this one constant is the only edit needed, and the demo data follows it too.
 *
 * Whole-site is deliberate here: `/` is a single-flow page carrying the
 * booking CTA, so excluding it would hide where enquiries actually come from.
 */
export const CONTENT_PATH_PREFIX = "/";

/** Days of history the dashboard shows. */
export const RANGE_DAYS = 30;

// ---------------------------------------------------------------------------
// Payload
// ---------------------------------------------------------------------------

export type Totals = {
  activeUsers: number;
  screenPageViews: number;
  sessions: number;
  newUsers: number;
  /** Seconds. Weighted by sessions, not a plain mean. */
  averageSessionDuration: number;
  /** 0..1. Weighted by sessions, not a plain mean. */
  engagementRate: number;
};

export type DailyPoint = {
  /** ISO "yyyy-mm-dd" — GA's "yyyymmdd" is reformatted on the way in. */
  date: string;
  activeUsers: number;
  screenPageViews: number;
  sessions: number;
  newUsers: number;
};

export type PageRow = {
  path: string;
  /** Our own title when the path is in the registry, else GA's page title. */
  title: string;
  screenPageViews: number;
  activeUsers: number;
  /** Seconds. Null when GA has no rows to average. */
  averageSessionDuration: number | null;
  /** False when GA reports a path the registry does not know about. */
  known: boolean;
  kind: "home" | "index" | "post" | "unknown";
  tag?: Post["tag"];
  datePublished?: string;
};

export type BreakdownRow = {
  name: string;
  sessions: number;
  activeUsers: number;
  /** 0..1 of total sessions. Shares across a breakdown sum to 1. */
  share: number;
};

export type AnalyticsPayload = {
  /** True when no credentials are configured and the numbers are invented. */
  demo: boolean;
  /** True when GA is connected and authorised but has returned no rows yet. */
  empty: boolean;
  generatedAt: string;
  range: { startDate: string; endDate: string; days: number };
  scope: string;
  totals: Totals;
  daily: DailyPoint[];
  pages: PageRow[];
  countries: BreakdownRow[];
  channels: BreakdownRow[];
  devices: BreakdownRow[];
};

// ---------------------------------------------------------------------------
// Registry — the pages we know exist, whether or not GA has rows for them.
// ---------------------------------------------------------------------------

export type RegistryEntry = {
  path: string;
  title: string;
  kind: "home" | "index" | "post";
  tag?: Post["tag"];
  datePublished?: string;
};

/**
 * Every published URL, newest posts first behind the two fixed pages.
 *
 * The dashboard renders from this rather than from GA's rows, so a post with
 * no traffic still appears at 0 instead of silently vanishing.
 */
export function buildRegistry(posts: Post[] = publishedPosts): RegistryEntry[] {
  return [
    { path: "/", title: "Home", kind: "home" as const },
    { path: "/blog", title: "Journal (index)", kind: "index" as const },
    ...posts.map((p) => ({
      path: `/blog/${p.slug}`,
      title: p.title,
      kind: "post" as const,
      tag: p.tag,
      datePublished: p.datePublished,
    })),
  ].filter((entry) => entry.path.startsWith(CONTENT_PATH_PREFIX));
}

// ---------------------------------------------------------------------------
// Normalisation
// ---------------------------------------------------------------------------

/** GA hands back "20260805"; everything downstream wants "2026-08-05". */
export function formatGaDate(yyyymmdd: string): string {
  const m = /^(\d{4})(\d{2})(\d{2})$/.exec(yyyymmdd.trim());
  if (!m) return yyyymmdd;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

/**
 * Fold the variants GA reports as separate paths onto one canonical path:
 * query strings (?fbclid=...), fragments, and the trailing slash. Without
 * this, one post can appear three times in the leaderboard and none of the
 * three shows its real total.
 */
export function normalizePath(path: string): string {
  let p = (path || "/").split("?")[0].split("#")[0].trim();
  if (!p.startsWith("/")) p = `/${p}`;
  // Drop a trailing slash, but never turn "/" into "".
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  // Static export writes /blog/foo.html; treat it as /blog/foo.
  if (p.endsWith("/index.html")) p = p.slice(0, -"/index.html".length) || "/";
  else if (p.endsWith(".html")) p = p.slice(0, -".html".length);
  return p || "/";
}

/** Seconds -> "3m 04s" / "42s". */
export function formatDuration(seconds: number | null): string {
  if (seconds === null || !Number.isFinite(seconds) || seconds <= 0) return "—";
  const total = Math.round(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${String(s).padStart(2, "0")}s`;
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-ZA").format(Math.round(n));
}

export function formatPercent(fraction: number): string {
  return `${Math.round(fraction * 1000) / 10}%`;
}

// ---------------------------------------------------------------------------
// Aggregation
// ---------------------------------------------------------------------------

type RawPage = {
  path: string;
  title: string;
  screenPageViews: number;
  activeUsers: number;
  averageSessionDuration: number;
};

/**
 * Fold duplicate paths together.
 *
 * Counts add, but averages must not: two rows for the same post with 100 views
 * at 10s and 1 view at 600s average out to 15.8s, not 305s. Re-weight by
 * pageviews, which is the denominator GA used to produce each row's average.
 */
export function foldPages(rows: RawPage[]): Map<string, RawPage> {
  const folded = new Map<string, RawPage & { durationWeight: number }>();

  for (const row of rows) {
    const path = normalizePath(row.path);
    const existing = folded.get(path);
    // A row with no views carries no information about the average.
    const weight = row.screenPageViews > 0 ? row.screenPageViews : 0;

    if (!existing) {
      folded.set(path, {
        path,
        title: row.title,
        screenPageViews: row.screenPageViews,
        activeUsers: row.activeUsers,
        averageSessionDuration: row.averageSessionDuration * weight,
        durationWeight: weight,
      });
      continue;
    }

    existing.screenPageViews += row.screenPageViews;
    // activeUsers cannot be summed exactly across rows (the same person may
    // appear in both), but GA gives us no better join key here. Summing
    // over-counts slightly; taking the max under-counts badly. Sum, and treat
    // per-page users as approximate.
    existing.activeUsers += row.activeUsers;
    existing.averageSessionDuration += row.averageSessionDuration * weight;
    existing.durationWeight += weight;
    // Prefer the title from the highest-traffic variant.
    if (row.screenPageViews > 0 && !existing.title) existing.title = row.title;
  }

  const out = new Map<string, RawPage>();
  for (const [path, row] of folded) {
    out.set(path, {
      path,
      title: row.title,
      screenPageViews: row.screenPageViews,
      activeUsers: row.activeUsers,
      averageSessionDuration:
        row.durationWeight > 0
          ? row.averageSessionDuration / row.durationWeight
          : 0,
    });
  }
  return out;
}

/**
 * Join GA's page rows onto the registry.
 *
 * Registry titles win over GA's: GA stores whatever `<title>` was live when it
 * crawled, so its titles carry the " · Gans-te-Ver" suffix and go stale the
 * moment a post is retitled. Paths GA reports that we do not recognise are
 * kept but marked `known: false` so the UI can show them differently.
 */
export function joinPagesToRegistry(
  gaPages: Map<string, RawPage>,
  registry: RegistryEntry[],
): PageRow[] {
  const rows: PageRow[] = [];
  const used = new Set<string>();

  for (const entry of registry) {
    const hit = gaPages.get(entry.path);
    if (hit) used.add(entry.path);
    rows.push({
      path: entry.path,
      title: entry.title,
      screenPageViews: hit?.screenPageViews ?? 0,
      activeUsers: hit?.activeUsers ?? 0,
      averageSessionDuration:
        hit && hit.screenPageViews > 0 ? hit.averageSessionDuration : null,
      known: true,
      kind: entry.kind,
      tag: entry.tag,
      datePublished: entry.datePublished,
    });
  }

  for (const [path, row] of gaPages) {
    if (used.has(path)) continue;
    rows.push({
      path,
      // Nothing of ours to prefer here, so GA's title is all we have.
      title: row.title || path,
      screenPageViews: row.screenPageViews,
      activeUsers: row.activeUsers,
      averageSessionDuration:
        row.screenPageViews > 0 ? row.averageSessionDuration : null,
      known: false,
      kind: "unknown",
    });
  }

  return rows.sort((a, b) => b.screenPageViews - a.screenPageViews);
}

/** Attach each row's share of total sessions; shares sum to 1 (or all 0). */
export function withShares(
  rows: { name: string; sessions: number; activeUsers: number }[],
): BreakdownRow[] {
  const total = rows.reduce((sum, r) => sum + r.sessions, 0);
  return rows
    .map((r) => ({ ...r, share: total > 0 ? r.sessions / total : 0 }))
    .sort((a, b) => b.sessions - a.sessions);
}

/**
 * Totals from the daily series, plus the two rate metrics.
 *
 * `averageSessionDuration` and `engagementRate` are per-session rates, so the
 * 30-day figure is a session-weighted average of the daily values — a plain
 * mean would let a dead Tuesday with 1 session count as much as a busy
 * Saturday with 200.
 */
export function totalsFromDaily(
  daily: DailyPoint[],
  perDayRates: { averageSessionDuration: number; engagementRate: number }[],
): Totals {
  const totals: Totals = {
    activeUsers: 0,
    screenPageViews: 0,
    sessions: 0,
    newUsers: 0,
    averageSessionDuration: 0,
    engagementRate: 0,
  };

  let durationWeighted = 0;
  let engagementWeighted = 0;

  daily.forEach((d, i) => {
    totals.activeUsers += d.activeUsers;
    totals.screenPageViews += d.screenPageViews;
    totals.sessions += d.sessions;
    totals.newUsers += d.newUsers;
    const rates = perDayRates[i];
    if (rates) {
      durationWeighted += rates.averageSessionDuration * d.sessions;
      engagementWeighted += rates.engagementRate * d.sessions;
    }
  });

  if (totals.sessions > 0) {
    totals.averageSessionDuration = durationWeighted / totals.sessions;
    totals.engagementRate = engagementWeighted / totals.sessions;
  }

  return totals;
}
