// Seeded demo payload.
//
// Serves the IDENTICAL shape as the live endpoint so the whole dashboard can
// be built and reviewed before the Google account exists, then switches to
// real data on env vars alone. Every number comes from a seeded PRNG, so two
// refreshes show the same figures — invented data that jitters on reload
// reads as a bug and makes the UI impossible to review.
//
// Scope-consistent by construction: pages come from the same registry the
// live query is filtered to, so the demo never shows a row the live query
// could not return.

import {
  RANGE_DAYS,
  type AnalyticsPayload,
  type BreakdownRow,
  type DailyPoint,
  type PageRow,
  type RegistryEntry,
  withShares,
} from "./analytics";

/** Fixed seed — the whole point is that this never changes. */
const SEED = 0x5eed_a17a;

/** mulberry32: tiny, fast, and stable across runtimes (unlike Math.random). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function next(): number {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * A stale path GA genuinely could return: a slug that has since been renamed
 * still collects hits from old links for months. Included so the "GA knows a
 * path the registry doesn't" branch of the UI is actually exercised.
 */
const DEMO_UNKNOWN_PATH = "/blog/cape-agulhas-in-july";

const DEMO_COUNTRIES = [
  "South Africa",
  "United Kingdom",
  "Germany",
  "Netherlands",
  "United States",
  "Namibia",
  "Belgium",
];

const DEMO_CHANNELS = [
  "Organic Search",
  "Direct",
  "Referral",
  "Organic Social",
  "Unassigned",
];

const DEMO_DEVICES = ["mobile", "desktop", "tablet"];

export function buildDemoPayload(registry: RegistryEntry[]): AnalyticsPayload {
  const rand = mulberry32(SEED);

  // Range ends yesterday: GA's "today" is always partial, and a half-day bar
  // at the end of the chart looks like a collapse in traffic.
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  end.setUTCDate(end.getUTCDate() - 1);

  const daily: DailyPoint[] = [];
  const perDayRates: { averageSessionDuration: number; engagementRate: number }[] =
    [];

  for (let i = RANGE_DAYS - 1; i >= 0; i--) {
    const day = new Date(end);
    day.setUTCDate(end.getUTCDate() - i);

    // Weekends run hotter — people plan holidays on Saturday mornings.
    const dow = day.getUTCDay();
    const weekend = dow === 0 || dow === 6 ? 1.45 : 1;
    // Gentle growth across the window so the chart has a readable direction.
    const trend = 1 + ((RANGE_DAYS - 1 - i) / RANGE_DAYS) * 0.35;

    const sessions = Math.round((14 + rand() * 16) * weekend * trend);
    const activeUsers = Math.round(sessions * (0.78 + rand() * 0.12));
    const newUsers = Math.round(activeUsers * (0.62 + rand() * 0.18));
    const screenPageViews = Math.round(sessions * (1.5 + rand() * 0.8));

    daily.push({
      date: isoDay(day),
      activeUsers,
      screenPageViews,
      sessions,
      newUsers,
    });
    perDayRates.push({
      averageSessionDuration: 70 + rand() * 150,
      engagementRate: 0.46 + rand() * 0.28,
    });
  }

  const totalSessions = daily.reduce((s, d) => s + d.sessions, 0);
  const totalViews = daily.reduce((s, d) => s + d.screenPageViews, 0);

  // Range totals are NOT the sum of daily uniques (one person visiting on two
  // days is one 30-day user, two daily users). Discount to imitate that.
  const rangeUsers = Math.round(
    daily.reduce((s, d) => s + d.activeUsers, 0) * 0.72,
  );
  const rangeNewUsers = Math.round(rangeUsers * 0.74);

  const durationWeighted = daily.reduce(
    (s, d, i) => s + perDayRates[i].averageSessionDuration * d.sessions,
    0,
  );
  const engagementWeighted = daily.reduce(
    (s, d, i) => s + perDayRates[i].engagementRate * d.sessions,
    0,
  );

  // -- Pages ---------------------------------------------------------------
  // Zipf-ish split: the home page takes the lion's share, posts tail off.
  // The LAST registry entry is deliberately left at zero so the dashboard's
  // "published but no traffic yet" case is visible without waiting for it.
  const weights = registry.map((entry, i) => {
    if (i === registry.length - 1) return 0;
    const base = entry.kind === "home" ? 3.4 : entry.kind === "index" ? 1.2 : 1;
    return (base / (i + 1)) * (0.75 + rand() * 0.5);
  });
  const unknownWeight = 0.18;
  const weightSum =
    weights.reduce((s, w) => s + w, 0) + unknownWeight || 1;

  const pages: PageRow[] = registry.map((entry, i) => {
    const views = Math.round((weights[i] / weightSum) * totalViews);
    return {
      path: entry.path,
      title: entry.title,
      screenPageViews: views,
      activeUsers: Math.round(views * (0.62 + rand() * 0.18)),
      averageSessionDuration: views > 0 ? 55 + rand() * 190 : null,
      known: true,
      kind: entry.kind,
      tag: entry.tag,
      datePublished: entry.datePublished,
    };
  });

  const unknownViews = Math.round((unknownWeight / weightSum) * totalViews);
  pages.push({
    path: DEMO_UNKNOWN_PATH,
    title: "Cape Agulhas in July: what to expect · Gans-te-Ver",
    screenPageViews: unknownViews,
    activeUsers: Math.round(unknownViews * 0.7),
    averageSessionDuration: 48 + rand() * 90,
    known: false,
    kind: "unknown",
  });

  pages.sort((a, b) => b.screenPageViews - a.screenPageViews);

  // -- Breakdowns ----------------------------------------------------------
  const split = (names: string[], head: number): BreakdownRow[] => {
    // Geometric decay from a chosen head share, then normalised by withShares
    // so the numbers on screen always add up to exactly 100%.
    const raw: number[] = [];
    let remaining = 1;
    names.forEach((_, i) => {
      const share =
        i === names.length - 1 ? remaining : remaining * head * (0.85 + rand() * 0.3);
      raw.push(Math.max(share, 0.004));
      remaining = Math.max(remaining - share, 0.01);
    });
    const rawSum = raw.reduce((s, v) => s + v, 0);
    return withShares(
      names.map((name, i) => {
        const sessions = Math.max(1, Math.round((raw[i] / rawSum) * totalSessions));
        return {
          name,
          sessions,
          activeUsers: Math.round(sessions * (0.76 + rand() * 0.14)),
        };
      }),
    );
  };

  const endDate = isoDay(end);
  const startDate = daily[0]?.date ?? endDate;

  return {
    demo: true,
    empty: false,
    // Pinned to the range rather than "now" so two fetches are byte-identical.
    generatedAt: `${endDate}T00:00:00.000Z`,
    range: { startDate, endDate, days: RANGE_DAYS },
    scope: "demo",
    totals: {
      activeUsers: rangeUsers,
      screenPageViews: totalViews,
      sessions: totalSessions,
      newUsers: rangeNewUsers,
      averageSessionDuration:
        totalSessions > 0 ? durationWeighted / totalSessions : 0,
      engagementRate:
        totalSessions > 0 ? engagementWeighted / totalSessions : 0,
    },
    daily,
    pages,
    countries: split(DEMO_COUNTRIES, 0.62),
    channels: split(DEMO_CHANNELS, 0.5),
    devices: split(DEMO_DEVICES, 0.58),
  };
}
