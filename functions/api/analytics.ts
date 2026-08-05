// GET /api/analytics — the single JSON payload behind /admin.
//
// This is a CLOUDFLARE PAGES FUNCTION, not a Next.js route handler: the site
// is `output: "export"` (see next.config.ts), so there is no Next server to
// host an API route. Cloudflare builds this file alongside the static `out/`
// directory and serves it at /api/analytics.
//
// Imports use RELATIVE paths on purpose — the Pages Functions bundler does not
// read tsconfig `paths`, so "@/lib/..." would fail at build time.

import {
  CONTENT_PATH_PREFIX,
  RANGE_DAYS,
  buildRegistry,
  foldPages,
  formatGaDate,
  joinPagesToRegistry,
  totalsFromDaily,
  withShares,
  type AnalyticsPayload,
  type DailyPoint,
  type Totals,
} from "../../src/lib/analytics";
import { buildDemoPayload } from "../../src/lib/analytics-demo";
import {
  GaApiError,
  dim,
  num,
  readCredentials,
  runReport,
  type GaReport,
  type RunReportRequest,
} from "../../src/lib/ga";

// --- Minimal Workers ambient types ----------------------------------------
// Declared locally rather than depending on @cloudflare/workers-types, which
// would otherwise have to agree with Next's DOM lib across the whole repo.

type Env = Record<string, string | undefined>;

type PagesContext = {
  request: Request;
  env: Env;
  waitUntil: (promise: Promise<unknown>) => void;
};

declare const caches: {
  default: {
    match: (request: Request) => Promise<Response | undefined>;
    put: (request: Request, response: Response) => Promise<void>;
  };
};

/** 15 minutes. GA data is not minute-fresh anyway, and every admin sees the same. */
const CACHE_SECONDS = 900;

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  // The dashboard is per-admin private data; keep it out of shared proxies
  // other than our own deliberate Cache API entry below.
  "x-robots-tag": "noindex, nofollow",
};

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

/**
 * Constant-time compare.
 *
 * Both sides are hashed to a fixed 32 bytes first so that neither the length
 * nor the content of the real credential leaks through timing — comparing raw
 * strings of different lengths returns early and gives away the length.
 */
async function safeEqual(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(a)),
    crypto.subtle.digest("SHA-256", enc.encode(b)),
  ]);
  const va = new Uint8Array(ha);
  const vb = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i];
  return diff === 0;
}

type AuthResult = { ok: true; open: boolean } | { ok: false; reason: string };

async function checkAuth(request: Request, env: Env): Promise<AuthResult> {
  const user = env.ADMIN_USERNAME;
  const pass = env.ADMIN_PASSWORD;

  // Both unset -> local development. Deliberately open, and the payload says
  // so, so nobody mistakes an unprotected deployment for a protected one.
  if (!user && !pass) return { ok: true, open: true };

  // One set without the other is a misconfiguration, not a licence to open up.
  if (!user || !pass) {
    return {
      ok: false,
      reason:
        "Server misconfigured: set ADMIN_USERNAME and ADMIN_PASSWORD together.",
    };
  }

  const header = request.headers.get("authorization") ?? "";
  const [scheme, encoded] = header.split(" ");
  if (!encoded || scheme?.toLowerCase() !== "basic") {
    return { ok: false, reason: "Missing or malformed Authorization header." };
  }

  let decoded: string;
  try {
    decoded = atob(encoded.trim());
  } catch {
    return { ok: false, reason: "Authorization header is not valid base64." };
  }

  // Only the FIRST colon separates user from password — passwords may contain
  // colons and splitting on all of them would silently truncate them.
  const sep = decoded.indexOf(":");
  if (sep < 0) {
    return { ok: false, reason: "Authorization header is not user:password." };
  }

  // Always evaluate both comparisons so a wrong username and a wrong password
  // take the same time.
  const [userOk, passOk] = await Promise.all([
    safeEqual(decoded.slice(0, sep), user),
    safeEqual(decoded.slice(sep + 1), pass),
  ]);

  if (!userOk || !passOk) return { ok: false, reason: "Invalid credentials." };
  return { ok: true, open: false };
}

function unauthorized(reason: string): Response {
  // Deliberately NO `WWW-Authenticate` header: this endpoint is consumed by
  // fetch() from the /admin page, which renders its own sign-in form. Sending
  // a challenge would make some browsers pop a native auth dialog over it.
  return new Response(
    JSON.stringify({ error: "unauthorized", message: reason }),
    { status: 401, headers: JSON_HEADERS },
  );
}

// ---------------------------------------------------------------------------
// GA queries
// ---------------------------------------------------------------------------

const DATE_RANGE = [{ startDate: `${RANGE_DAYS}daysAgo`, endDate: "yesterday" }];

/**
 * Every report carries the same path filter, so flipping CONTENT_PATH_PREFIX
 * to "/blog/" re-scopes the entire dashboard in one edit. With the current "/"
 * it matches every page — a deliberate no-op rather than a special case.
 */
const PATH_FILTER = {
  filter: {
    fieldName: "pagePath",
    stringFilter: { matchType: "BEGINS_WITH", value: CONTENT_PATH_PREFIX },
  },
};

const REPORTS: Record<string, RunReportRequest> = {
  daily: {
    dateRanges: DATE_RANGE,
    dimensions: [{ name: "date" }],
    metrics: [
      { name: "activeUsers" },
      { name: "screenPageViews" },
      { name: "sessions" },
      { name: "newUsers" },
      { name: "averageSessionDuration" },
      { name: "engagementRate" },
    ],
    dimensionFilter: PATH_FILTER,
    orderBys: [{ dimension: { dimensionName: "date" } }],
    limit: 400,
  },
  pages: {
    dateRanges: DATE_RANGE,
    dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "activeUsers" },
      { name: "averageSessionDuration" },
    ],
    dimensionFilter: PATH_FILTER,
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 250,
  },
  countries: {
    dateRanges: DATE_RANGE,
    dimensions: [{ name: "country" }],
    metrics: [{ name: "sessions" }, { name: "activeUsers" }],
    dimensionFilter: PATH_FILTER,
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 50,
  },
  channels: {
    dateRanges: DATE_RANGE,
    dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [{ name: "sessions" }, { name: "activeUsers" }],
    dimensionFilter: PATH_FILTER,
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 25,
  },
  devices: {
    dateRanges: DATE_RANGE,
    dimensions: [{ name: "deviceCategory" }],
    metrics: [{ name: "sessions" }, { name: "activeUsers" }],
    dimensionFilter: PATH_FILTER,
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 10,
  },
  // Range totals, no dimensions. NOT derivable from the daily report: a reader
  // who visits on Monday and Thursday is two daily activeUsers but one 30-day
  // activeUser, so summing the daily series would overstate the headline
  // "readers" number. GA can only de-duplicate this server-side.
  totals: {
    dateRanges: DATE_RANGE,
    metrics: [
      { name: "activeUsers" },
      { name: "screenPageViews" },
      { name: "sessions" },
      { name: "newUsers" },
      { name: "averageSessionDuration" },
      { name: "engagementRate" },
    ],
    dimensionFilter: PATH_FILTER,
  },
};

/** GA omits days with no data; the chart still needs all 30 bars. */
function fillMissingDays(
  points: Map<string, DailyPoint>,
  startDate: string,
  endDate: string,
): DailyPoint[] {
  const out: DailyPoint[] = [];
  const cursor = new Date(`${startDate}T00:00:00Z`);
  const last = new Date(`${endDate}T00:00:00Z`);
  while (cursor <= last) {
    const iso = cursor.toISOString().slice(0, 10);
    out.push(
      points.get(iso) ?? {
        date: iso,
        activeUsers: 0,
        screenPageViews: 0,
        sessions: 0,
        newUsers: 0,
      },
    );
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return out;
}

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

async function buildLivePayload(env: Env): Promise<AnalyticsPayload> {
  const creds = readCredentials(env)!;

  const [daily, pages, countries, channels, devices, totalsReport] =
    await Promise.all([
      runReport(creds, REPORTS.daily),
      runReport(creds, REPORTS.pages),
      runReport(creds, REPORTS.countries),
      runReport(creds, REPORTS.channels),
      runReport(creds, REPORTS.devices),
      runReport(creds, REPORTS.totals),
    ]);

  // -- Daily ---------------------------------------------------------------
  const byDate = new Map<string, DailyPoint>();
  const ratesByDate = new Map<
    string,
    { averageSessionDuration: number; engagementRate: number }
  >();

  for (const row of daily.rows ?? []) {
    const date = formatGaDate(dim(row, 0));
    byDate.set(date, {
      date,
      activeUsers: num(row, 0),
      screenPageViews: num(row, 1),
      sessions: num(row, 2),
      newUsers: num(row, 3),
    });
    ratesByDate.set(date, {
      averageSessionDuration: num(row, 4),
      engagementRate: num(row, 5),
    });
  }

  const startDate = isoDaysAgo(RANGE_DAYS);
  const endDate = isoDaysAgo(1);
  const series = fillMissingDays(byDate, startDate, endDate);

  // -- Totals --------------------------------------------------------------
  const totalsRow = totalsReport.rows?.[0];
  const totals: Totals = totalsRow
    ? {
        activeUsers: num(totalsRow, 0),
        screenPageViews: num(totalsRow, 1),
        sessions: num(totalsRow, 2),
        newUsers: num(totalsRow, 3),
        averageSessionDuration: num(totalsRow, 4),
        engagementRate: num(totalsRow, 5),
      }
    : // Fallback only — over-counts users, but beats showing nothing.
      totalsFromDaily(
        series,
        series.map(
          (d) =>
            ratesByDate.get(d.date) ?? {
              averageSessionDuration: 0,
              engagementRate: 0,
            },
        ),
      );

  // -- Pages ---------------------------------------------------------------
  const folded = foldPages(
    (pages.rows ?? []).map((row) => ({
      path: dim(row, 0),
      title: dim(row, 1),
      screenPageViews: num(row, 0),
      activeUsers: num(row, 1),
      averageSessionDuration: num(row, 2),
    })),
  );
  const pageRows = joinPagesToRegistry(folded, buildRegistry());

  // -- Breakdowns ----------------------------------------------------------
  const breakdown = (report: GaReport) =>
    withShares(
      (report.rows ?? []).map((row) => ({
        name: dim(row, 0) || "(not set)",
        sessions: num(row, 0),
        activeUsers: num(row, 1),
      })),
    );

  const hasAnyData =
    totals.screenPageViews > 0 ||
    totals.sessions > 0 ||
    (pages.rows?.length ?? 0) > 0;

  return {
    demo: false,
    empty: !hasAnyData,
    generatedAt: new Date().toISOString(),
    range: { startDate, endDate, days: RANGE_DAYS },
    scope: CONTENT_PATH_PREFIX,
    totals,
    daily: series,
    pages: pageRows,
    countries: breakdown(countries),
    channels: breakdown(channels),
    devices: breakdown(devices),
  };
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function onRequestGet(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  const auth = await checkAuth(request, env);
  if (!auth.ok) return unauthorized(auth.reason);

  // Cache key is the URL alone — the Authorization header is deliberately
  // excluded. Every authorised admin gets byte-identical data, and CDN caches
  // refuse to store responses keyed on credentials, so including it would
  // disable caching entirely. Auth has already been enforced above, so a cache
  // hit can never be served to an unauthenticated caller.
  const cacheKey = new Request(new URL(request.url).toString(), {
    method: "GET",
  });

  const cached = await caches.default.match(cacheKey);
  if (cached) return cached;

  let payload: AnalyticsPayload;
  try {
    payload = readCredentials(env)
      ? await buildLivePayload(env)
      : buildDemoPayload(buildRegistry());
  } catch (error) {
    if (error instanceof GaApiError) {
      return new Response(
        JSON.stringify({
          error: "ga-api",
          reason: error.reason,
          status: error.status,
          // Google's raw text, verbatim — the two 403s are indistinguishable
          // without it and send you to two different consoles.
          googleMessage: error.googleMessage,
          fix: error.fix,
        }),
        { status: 502, headers: JSON_HEADERS },
      );
    }
    return new Response(
      JSON.stringify({
        error: "internal",
        message: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: JSON_HEADERS },
    );
  }

  const body = JSON.stringify({ ...payload, authOpen: auth.open });
  const response = new Response(body, {
    status: 200,
    headers: {
      ...JSON_HEADERS,
      "cache-control": `public, max-age=${CACHE_SECONDS}`,
    },
  });

  context.waitUntil(caches.default.put(cacheKey, response.clone()));
  return response;
}
