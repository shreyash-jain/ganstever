"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  formatDuration,
  formatNumber,
  formatPercent,
  type AnalyticsPayload,
  type BreakdownRow,
  type PageRow,
  type RegistryEntry,
} from "@/lib/analytics";

/** The endpoint adds this after the auth check; it is not part of the report. */
type Payload = AnalyticsPayload & { authOpen?: boolean };

type State =
  | { status: "loading" }
  | { status: "ready"; data: Payload }
  | { status: "unauthorized"; message: string }
  | { status: "error"; message: string; detail?: string };

const ENDPOINT = "/api/analytics";

/**
 * sessionStorage, not localStorage: the credential dies with the tab. This is
 * a convenience for the current session only — the ACTUAL gate is the Basic
 * auth check inside functions/api/analytics.ts. Clearing this key does not
 * grant access, and setting it by hand does not either.
 */
const STORAGE_KEY = "gv-admin-credential";

function basicHeader(username: string, password: string): string {
  return `Basic ${btoa(`${username}:${password}`)}`;
}

// ---------------------------------------------------------------------------

export function Dashboard({ registry }: { registry: RegistryEntry[] }) {
  const [state, setState] = useState<State>({ status: "loading" });
  const credentialRef = useRef<string | null>(null);
  const aliveRef = useRef(true);

  /**
   * Returns the next State rather than calling setState itself. That keeps the
   * only setState out of the effect body — an effect that sets state
   * synchronously cascades renders, and React 19's lint rules reject it.
   */
  const fetchPayload = useCallback(
    async (credential: string | null): Promise<State> => {
      try {
        const res = await fetch(ENDPOINT, {
          headers: credential ? { authorization: credential } : undefined,
          cache: "no-store",
        });

        if (res.status === 401) {
          const body = (await res.json().catch(() => ({}))) as {
            message?: string;
          };
          credentialRef.current = null;
          window.sessionStorage.removeItem(STORAGE_KEY);
          return {
            status: "unauthorized",
            message: credential
              ? "That username and password were not accepted."
              : (body.message ?? "Sign in to view analytics."),
          };
        }

        if (res.status === 404) {
          // `next dev` serves the static app only — Pages Functions are not
          // part of it, so /api/analytics genuinely does not exist there.
          return {
            status: "error",
            message: "The analytics endpoint was not found.",
            detail:
              "If you are on `npm run dev`, that server does not run " +
              "Cloudflare Pages Functions. Use `npm run preview` (build + " +
              "wrangler pages dev on port 8788) to exercise /api/analytics " +
              "locally.",
          };
        }

        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as {
            googleMessage?: string;
            fix?: string;
            message?: string;
          };
          return {
            status: "error",
            message:
              body.googleMessage ??
              body.message ??
              `The analytics endpoint returned ${res.status}.`,
            detail: body.fix,
          };
        }

        const data = (await res.json()) as Payload;
        if (credential) window.sessionStorage.setItem(STORAGE_KEY, credential);
        credentialRef.current = credential;
        return { status: "ready", data };
      } catch (error) {
        return {
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "Could not reach the server.",
        };
      }
    },
    [],
  );

  useEffect(() => {
    aliveRef.current = true;
    // Read sessionStorage INSIDE the effect. Reading it during render would
    // make the hydration pass disagree with the server-rendered markup, and an
    // effect built on that stale "signed out" snapshot bounces a user who has
    // just signed in.
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    credentialRef.current = stored;
    fetchPayload(stored).then((next) => {
      if (aliveRef.current) setState(next);
    });
    return () => {
      aliveRef.current = false;
    };
  }, [fetchPayload]);

  // Called from event handlers only, where setState is the normal thing to do.
  const run = (credential: string | null) => {
    setState({ status: "loading" });
    void fetchPayload(credential).then((next) => {
      if (aliveRef.current) setState(next);
    });
  };

  const refresh = () => run(credentialRef.current);

  const signOut = () => {
    window.sessionStorage.removeItem(STORAGE_KEY);
    credentialRef.current = null;
    setState({ status: "unauthorized", message: "Signed out." });
  };

  const signIn = (username: string, password: string) =>
    run(basicHeader(username, password));

  if (state.status === "unauthorized") {
    return <SignIn message={state.message} onSubmit={signIn} />;
  }

  return (
    <div className="min-h-screen bg-shell text-ink">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <TopBar
          data={state.status === "ready" ? state.data : null}
          onRefresh={refresh}
          // Derived from the payload, not from credentialRef: reading a ref
          // during render is not allowed, and `authOpen` already tells us
          // whether a credential was involved at all.
          onSignOut={
            state.status === "ready" && !state.data.authOpen
              ? signOut
              : undefined
          }
        />

        {state.status === "loading" && <LoadingView registry={registry} />}

        {state.status === "error" && (
          <ErrorView
            message={state.message}
            detail={state.detail}
            onRetry={refresh}
          />
        )}

        {state.status === "ready" && (
          <ReadyView data={state.data} registry={registry} />
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chrome
// ---------------------------------------------------------------------------

function TopBar({
  data,
  onRefresh,
  onSignOut,
}: {
  data: Payload | null;
  onRefresh: () => void;
  onSignOut?: () => void;
}) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-sand pb-5">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-dune">
          Gans-te-Ver
        </p>
        <h1 className="mt-1 font-display text-3xl leading-tight text-sea-deep sm:text-4xl">
          Analytics
        </h1>
        {data && (
          <p className="mt-2 text-sm text-muted">
            {data.range.startDate} to {data.range.endDate} · last{" "}
            {data.range.days} days
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onRefresh}
          className="rounded-full border border-sea/30 px-4 py-2 text-sm font-medium text-sea transition hover:bg-foam"
        >
          Refresh
        </button>
        {onSignOut && (
          <button
            type="button"
            onClick={onSignOut}
            className="rounded-full px-3 py-2 text-sm text-muted transition hover:text-ink"
          >
            Sign out
          </button>
        )}
      </div>
    </header>
  );
}

function SignIn({
  message,
  onSubmit,
}: {
  message: string;
  onSubmit: (username: string, password: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-shell px-4 py-16">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(username, password);
        }}
        className="w-full max-w-sm rounded-2xl border border-sand bg-white p-7 shadow-sm"
      >
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-dune">
          Gans-te-Ver
        </p>
        <h1 className="mt-1 font-display text-2xl text-sea-deep">Analytics</h1>
        <p className="mt-3 text-sm text-muted">{message}</p>

        <label className="mt-6 block text-sm font-medium text-ink" htmlFor="u">
          Username
        </label>
        <input
          id="u"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 w-full rounded-lg border border-sand bg-shell px-3 py-2 text-sm outline-none focus:border-sea"
        />

        <label className="mt-4 block text-sm font-medium text-ink" htmlFor="p">
          Password
        </label>
        <input
          id="p"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-sand bg-shell px-3 py-2 text-sm outline-none focus:border-sea"
        />

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-sea-deep px-4 py-2.5 text-sm font-medium text-shell transition hover:bg-sea"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

function LoadingView({ registry }: { registry: RegistryEntry[] }) {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-2xl border border-sand bg-white" />
        ))}
      </div>
      <div className="h-56 rounded-2xl border border-sand bg-white" />
      <div
        className="rounded-2xl border border-sand bg-white"
        style={{ height: `${Math.min(registry.length, 8) * 44 + 72}px` }}
      />
    </div>
  );
}

function ErrorView({
  message,
  detail,
  onRetry,
}: {
  message: string;
  detail?: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dune/40 bg-dune/5 p-6">
      <h2 className="font-display text-xl text-sea-deep">
        Could not load analytics
      </h2>
      {/* Google's own wording, verbatim — the two different 403s are
          indistinguishable without it. */}
      <p className="mt-3 whitespace-pre-wrap break-words text-sm text-ink/85">
        {message}
      </p>
      {detail && (
        <p className="mt-4 whitespace-pre-wrap break-words rounded-lg bg-white p-4 text-sm text-muted">
          {detail}
        </p>
      )}
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-full border border-sea/30 px-4 py-2 text-sm font-medium text-sea transition hover:bg-foam"
      >
        Try again
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

function ReadyView({
  data,
  registry,
}: {
  data: Payload;
  registry: RegistryEntry[];
}) {
  // Before GA has a single row, still list every published page at zero rather
  // than showing an empty table that reads as "the dashboard is broken".
  const pages: PageRow[] =
    data.pages.length > 0
      ? data.pages
      : registry.map((entry) => ({
          path: entry.path,
          title: entry.title,
          screenPageViews: 0,
          activeUsers: 0,
          averageSessionDuration: null,
          known: true,
          kind: entry.kind,
          tag: entry.tag,
          datePublished: entry.datePublished,
        }));

  const topCountry = data.countries[0];

  return (
    <div className="space-y-6">
      {data.demo && (
        <Banner tone="warn" title="DEMO DATA">
          No Google credentials are configured, so every number on this page is
          invented. It is generated from a fixed seed, so it will not change
          between refreshes. Set <Code>GOOGLE_ANALYTICS_PROPERTY_ID</Code>,{" "}
          <Code>GOOGLE_ANALYTICS_CLIENT_EMAIL</Code> and{" "}
          <Code>GOOGLE_ANALYTICS_PRIVATE_KEY</Code> to switch to live data.
        </Banner>
      )}

      {data.authOpen && (
        <Banner tone="alert" title="This page is not password protected">
          <Code>ADMIN_USERNAME</Code> and <Code>ADMIN_PASSWORD</Code> are both
          unset, so <Code>/api/analytics</Code> is answering anyone who asks.
          That is fine locally. Set both before this reaches production —
          especially alongside the <Code>GOOGLE_*</Code> variables, or real
          analytics become publicly fetchable.
        </Banner>
      )}

      {data.empty && (
        <Banner tone="info" title="Connected, but no data yet">
          Google Analytics is reachable and the credentials work — the property
          simply has no recorded traffic for this period. That is expected for a
          new property: the tracking tag has to be live on the site, and data
          takes 24–48 hours to appear after the first visit.
        </Banner>
      )}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi
          label="Readers"
          value={formatNumber(data.totals.activeUsers)}
          sub={`${formatNumber(data.totals.newUsers)} of them new`}
        />
        <Kpi
          label="Pageviews"
          value={formatNumber(data.totals.screenPageViews)}
          sub={`${formatNumber(data.totals.sessions)} sessions`}
        />
        <Kpi
          label="Engagement"
          value={formatPercent(data.totals.engagementRate)}
          sub={`${formatDuration(
            data.totals.averageSessionDuration || null,
          )} average visit`}
        />
        <Kpi
          label="Top region"
          value={topCountry?.name ?? "—"}
          sub={
            topCountry
              ? `${formatPercent(topCountry.share)} of sessions`
              : "No sessions yet"
          }
        />
      </section>

      <DailyChart data={data} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Devices">
          <DeviceBars rows={data.devices} />
        </Panel>
        <Panel title="How people arrive">
          <RankedList rows={data.channels} emptyLabel="No sessions yet" />
        </Panel>
      </div>

      <Panel title="Where readers are">
        <RankedList rows={data.countries} emptyLabel="No sessions yet" />
      </Panel>

      <Panel title="Pages">
        <PageTable rows={pages} />
      </Panel>

      <p className="pb-4 text-xs text-muted">
        Generated {new Date(data.generatedAt).toLocaleString("en-ZA")} ·
        {data.demo ? " demo data" : ` scope ${data.scope}`} · cached for 15
        minutes
      </p>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-[0.85em]">
      {children}
    </code>
  );
}

function Banner({
  tone,
  title,
  children,
}: {
  tone: "warn" | "alert" | "info";
  title: string;
  children: React.ReactNode;
}) {
  const tones = {
    warn: "border-dune bg-dune/10 text-dune-deep",
    alert: "border-red-500/50 bg-red-500/5 text-red-800",
    info: "border-sea/30 bg-foam text-sea-deep",
  } as const;

  return (
    <div className={`rounded-2xl border-2 p-5 ${tones[tone]}`}>
      <p className="text-xs font-bold uppercase tracking-[0.18em]">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink/80">{children}</p>
    </div>
  );
}

function Kpi({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-sand bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
        {label}
      </p>
      {/* Country names can be long ("United States Minor Outlying Islands"),
          so this must wrap and shrink rather than push the card wide. */}
      <p className="mt-2 break-words font-display text-3xl leading-tight text-sea-deep">
        {value}
      </p>
      <p className="mt-1 text-sm text-muted">{sub}</p>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    // min-w-0 is load-bearing: grid and flex children default to
    // `min-width: auto`, which refuses to shrink below their content's
    // intrinsic width. Without it these panels grow past the page container on
    // a narrow screen and the whole body scrolls sideways.
    <section className="min-w-0 rounded-2xl border border-sand bg-white p-5">
      <h2 className="font-display text-lg text-sea-deep">{title}</h2>
      <div className="mt-4 min-w-0">{children}</div>
    </section>
  );
}

/**
 * Hand-rolled bar chart — 30 flex children, height as a percentage. No
 * charting library: one would be a large dependency for a single static chart,
 * and most of them do not server-render cleanly.
 */
function DailyChart({ data }: { data: Payload }) {
  const max = Math.max(...data.daily.map((d) => d.screenPageViews), 1);

  return (
    <section className="rounded-2xl border border-sand bg-white p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-lg text-sea-deep">
          Pageviews, last {data.range.days} days
        </h2>
        <p className="text-sm text-muted">peak {formatNumber(max)}/day</p>
      </div>

      <div className="mt-5 flex h-44 items-end gap-[3px]" role="img"
        aria-label={`Daily pageviews from ${data.range.startDate} to ${data.range.endDate}, peaking at ${max} in a day.`}
      >
        {data.daily.map((point) => {
          const pct = (point.screenPageViews / max) * 100;
          return (
            <div
              key={point.date}
              className="group relative flex h-full min-w-0 flex-1 items-end"
              title={`${point.date}: ${formatNumber(
                point.screenPageViews,
              )} views, ${formatNumber(point.activeUsers)} readers`}
            >
              <div
                className="w-full rounded-t-sm bg-sea/75 transition group-hover:bg-sea-deep"
                // A zero day still gets a 2px sliver so the axis stays legible
                // and the day is visibly present rather than missing.
                style={{ height: `max(${pct}%, 2px)` }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex justify-between text-xs text-muted">
        <span>{data.daily[0]?.date}</span>
        <span>{data.daily[data.daily.length - 1]?.date}</span>
      </div>
    </section>
  );
}

function DeviceBars({ rows }: { rows: BreakdownRow[] }) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted">No sessions yet</p>;
  }

  return (
    <ul className="space-y-4">
      {rows.map((row) => (
        <li key={row.name}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate capitalize text-ink">{row.name}</span>
            <span className="shrink-0 tabular-nums text-muted">
              {formatPercent(row.share)} · {formatNumber(row.sessions)}
            </span>
          </div>
          <div
            className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-sand"
            role="progressbar"
            aria-label={row.name}
            aria-valuenow={Math.round(row.share * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-sea"
              style={{ width: `${row.share * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function RankedList({
  rows,
  emptyLabel,
}: {
  rows: BreakdownRow[];
  emptyLabel: string;
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted">{emptyLabel}</p>;
  }

  return (
    <ol className="space-y-2.5">
      {rows.slice(0, 8).map((row, i) => (
        <li key={row.name} className="flex items-center gap-3 text-sm">
          <span className="w-5 shrink-0 tabular-nums text-muted">{i + 1}</span>
          <span className="min-w-0 flex-1 truncate text-ink" title={row.name}>
            {row.name}
          </span>
          <span className="w-24 shrink-0 overflow-hidden rounded-full bg-sand">
            <span
              className="block h-2 rounded-full bg-dune"
              style={{ width: `${row.share * 100}%` }}
            />
          </span>
          <span className="w-20 shrink-0 text-right tabular-nums text-muted">
            {formatNumber(row.sessions)} ({formatPercent(row.share)})
          </span>
        </li>
      ))}
    </ol>
  );
}

function PageTable({ rows }: { rows: PageRow[] }) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted">No pages to show.</p>;
  }

  return (
    // The table is wider than a phone. It scrolls INSIDE this box — the page
    // body must never scroll horizontally.
    <div className="-mx-5 overflow-x-auto px-5">
      {/* table-fixed is what makes truncation possible: with auto layout the
          title column grows to fit its longest title, so `truncate` never has
          a bounded width to work against. Fixed layout gives the first column
          whatever the sized columns leave over. */}
      <table className="w-full min-w-[36rem] table-fixed border-collapse text-sm">
        <thead>
          <tr className="border-b border-sand text-left text-xs uppercase tracking-wider text-muted">
            <th className="py-2 pr-3 font-medium">Page</th>
            <th className="w-24 py-2 pr-3 text-right font-medium">Views</th>
            <th className="w-24 py-2 pr-3 text-right font-medium">Readers</th>
            <th className="w-28 py-2 text-right font-medium">Avg. visit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.path} className="border-b border-sand/60 last:border-0">
              <td className="py-3 pr-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="min-w-0 flex-1 truncate text-ink"
                    title={row.title}
                  >
                    {row.title}
                  </span>
                  <Badge row={row} />
                </div>
                <span className="mt-0.5 block truncate font-mono text-xs text-muted">
                  {row.path}
                </span>
              </td>
              <td className="py-3 pr-3 text-right tabular-nums">
                {formatNumber(row.screenPageViews)}
              </td>
              <td className="py-3 pr-3 text-right tabular-nums text-muted">
                {formatNumber(row.activeUsers)}
              </td>
              {/* A page with no views has no measurable average — an em dash,
                  never "0s", which would read as "people bounced instantly". */}
              <td className="py-3 text-right tabular-nums text-muted">
                {formatDuration(row.averageSessionDuration)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Badge({ row }: { row: PageRow }) {
  if (!row.known) {
    return (
      <span
        className="shrink-0 rounded-full border border-dune/50 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-dune-deep"
        title="Google Analytics reported this path, but it is not in the site's page registry — most likely an old URL that still gets traffic."
      >
        Unlisted
      </span>
    );
  }

  const label =
    row.kind === "home"
      ? "Home"
      : row.kind === "index"
        ? "Index"
        : (row.tag ?? "Post");

  const tone =
    row.kind === "post"
      ? "border-sea/40 text-sea"
      : "border-muted/40 text-muted";

  return (
    <span
      className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider ${tone}`}
    >
      {label}
    </span>
  );
}
