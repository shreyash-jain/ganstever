// GA4 Data API client that runs on Cloudflare Workers.
//
// Deliberately NOT @google-analytics/data: that library speaks gRPC over
// node:http2 and cannot run on Workers or any edge runtime. Instead we do the
// three steps by hand, all of which are plain Web APIs:
//
//   1. sign an RS256 service-account JWT with `jose`
//   2. exchange it for an access token at oauth2.googleapis.com
//   3. POST to analyticsdata.googleapis.com with fetch
//
// Imported by functions/api/analytics.ts via a RELATIVE path — the Pages
// Functions bundler does not resolve the `@/` tsconfig alias.

import { SignJWT, importPKCS8 } from "jose";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const DATA_API = "https://analyticsdata.googleapis.com/v1beta";
const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

export type GaCredentials = {
  propertyId: string;
  clientEmail: string;
  privateKey: string;
};

/**
 * The service-account `private_key` arrives in several shapes depending on
 * where a human pasted it, and all of them have to work:
 *
 *   - straight from the JSON: one line with literal backslash-n sequences
 *   - from .dev.vars / .env: double-quoted, so the quotes come along too
 *   - from the Cloudflare dashboard: raw, with real newlines already
 *
 * Normalise all of them to a real PEM. Throws with a specific message rather
 * than letting importPKCS8 fail with something cryptic.
 */
export function normalizePrivateKey(raw: string): string {
  let key = raw.trim();

  // Strip one layer of wrapping quotes (single or double) if present.
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }

  // Literal \n (two characters) -> real newline. Harmless if already real.
  key = key.replace(/\\n/g, "\n").trim();

  if (!key.includes("-----BEGIN PRIVATE KEY-----")) {
    throw new Error(
      "GOOGLE_ANALYTICS_PRIVATE_KEY is missing the '-----BEGIN PRIVATE KEY-----' " +
        "header. Copy the whole `private_key` value out of the service-account " +
        "JSON, including the BEGIN/END lines.",
    );
  }

  return key;
}

/** Read credentials from an env bag, or null if they are not all present. */
export function readCredentials(
  env: Record<string, string | undefined>,
): GaCredentials | null {
  const propertyId = env.GOOGLE_ANALYTICS_PROPERTY_ID?.trim();
  const clientEmail = env.GOOGLE_ANALYTICS_CLIENT_EMAIL?.trim();
  const privateKey = env.GOOGLE_ANALYTICS_PRIVATE_KEY;

  if (!propertyId || !clientEmail || !privateKey) return null;

  return {
    propertyId: propertyId.replace(/^properties\//, ""),
    clientEmail,
    privateKey,
  };
}

// ---------------------------------------------------------------------------
// Access token, cached in module scope.
//
// A Workers isolate is reused across requests, so this cache survives between
// them and most requests skip the token round-trip entirely. Keyed by client
// email so a credential change cannot serve a stale token.
// ---------------------------------------------------------------------------

type CachedToken = { token: string; expiresAt: number; key: string };
let cachedToken: CachedToken | null = null;

/** Refresh this many ms before actual expiry, so a token never dies in flight. */
const REFRESH_MARGIN_MS = 60_000;

export async function getAccessToken(creds: GaCredentials): Promise<string> {
  const now = Date.now();
  if (
    cachedToken &&
    cachedToken.key === creds.clientEmail &&
    cachedToken.expiresAt - REFRESH_MARGIN_MS > now
  ) {
    return cachedToken.token;
  }

  const pem = normalizePrivateKey(creds.privateKey);

  let privateKey: CryptoKey;
  try {
    privateKey = (await importPKCS8(pem, "RS256")) as CryptoKey;
  } catch (cause) {
    throw new Error(
      "GOOGLE_ANALYTICS_PRIVATE_KEY could not be parsed as a PKCS#8 RSA key. " +
        "The value is present and has the BEGIN header, so the body is likely " +
        "truncated or had its newlines mangled. Re-paste it from the JSON.",
      { cause },
    );
  }

  const issuedAt = Math.floor(now / 1000);
  const assertion = await new SignJWT({ scope: SCOPE })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(creds.clientEmail)
    .setSubject(creds.clientEmail)
    .setAudience(TOKEN_URL)
    .setIssuedAt(issuedAt)
    .setExpirationTime(issuedAt + 3600)
    .sign(privateKey);

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  const body = (await res.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!res.ok || !body.access_token) {
    // invalid_grant here almost always means clock skew or a key that has been
    // deleted/disabled in IAM — not a permissions problem on the GA property.
    throw new Error(
      `Google refused the service-account JWT (${res.status} ${
        body.error ?? "unknown"
      }): ${body.error_description ?? "no description"}. ` +
        "If this says 'invalid_grant', the key has been revoked in IAM or the " +
        "client_email does not match the key.",
    );
  }

  cachedToken = {
    token: body.access_token,
    expiresAt: now + (body.expires_in ?? 3600) * 1000,
    key: creds.clientEmail,
  };

  return body.access_token;
}

/** Test seam: drop the cached token (used by scripts/check-ga-credentials.mjs). */
export function resetTokenCache(): void {
  cachedToken = null;
}

// ---------------------------------------------------------------------------
// runReport
// ---------------------------------------------------------------------------

export type RunReportRequest = {
  dateRanges: { startDate: string; endDate: string }[];
  dimensions?: { name: string }[];
  metrics?: { name: string }[];
  dimensionFilter?: unknown;
  orderBys?: unknown[];
  limit?: number;
  keepEmptyRows?: boolean;
};

export type GaRow = {
  dimensionValues?: { value?: string }[];
  metricValues?: { value?: string }[];
};

export type GaReport = {
  rows?: GaRow[];
  rowCount?: number;
  dimensionHeaders?: { name: string }[];
  metricHeaders?: { name: string; type?: string }[];
};

/**
 * A 403 from Google has two completely different causes that send you to two
 * different consoles. Getting this wrong costs an hour, so we classify it and
 * always carry Google's raw message through.
 */
export class GaApiError extends Error {
  readonly status: number;
  readonly reason: "api-not-enabled" | "no-property-access" | "other";
  readonly googleMessage: string;
  readonly fix: string;

  constructor(status: number, googleMessage: string, googleStatus?: string) {
    const haystack = `${googleStatus ?? ""} ${googleMessage}`.toLowerCase();

    // Google returns SERVICE_DISABLED / "has not been used in project ... before
    // or it is disabled" when the Data API itself was never switched on.
    const apiDisabled =
      haystack.includes("service_disabled") ||
      haystack.includes("has not been used in project") ||
      haystack.includes("is disabled");

    let reason: "api-not-enabled" | "no-property-access" | "other" = "other";
    let fix = "";

    if (status === 403 && apiDisabled) {
      reason = "api-not-enabled";
      fix =
        "The Google Analytics Data API is not enabled in the Cloud project " +
        "that owns this service account. Fix: Google Cloud Console -> confirm " +
        "the CORRECT project is selected -> APIs & Services -> Library -> " +
        "'Google Analytics Data API' -> Enable. (Enabling the Admin API does " +
        "not enable this one.)";
    } else if (status === 403) {
      reason = "no-property-access";
      fix =
        "The service account is not on the GA4 property. Fix: Google " +
        "Analytics -> Admin -> Property access management -> + -> paste the " +
        "client_email from the JSON -> role Viewer -> untick notify. " +
        "(This is a different console from the API-enablement fix.)";
    } else if (status === 404) {
      reason = "other";
      fix =
        "No such property. GOOGLE_ANALYTICS_PROPERTY_ID must be the ~9-digit " +
        "PROPERTY id (Admin -> Property details, or the digits after 'p' in " +
        "the /a<account>p<property>/ part of the Analytics URL) — NOT the " +
        "Stream ID from the Data streams page, and not the G-XXXXXXXXXX " +
        "measurement ID.";
    } else if (status === 401) {
      reason = "other";
      fix = "The access token was rejected. Re-check the service-account key.";
    } else {
      fix = "Unexpected error from the GA4 Data API.";
    }

    super(`GA4 Data API ${status}: ${googleMessage}\n\n${fix}`);
    this.name = "GaApiError";
    this.status = status;
    this.reason = reason;
    this.googleMessage = googleMessage;
    this.fix = fix;
  }
}

export async function runReport(
  creds: GaCredentials,
  request: RunReportRequest,
): Promise<GaReport> {
  const token = await getAccessToken(creds);

  const res = await fetch(
    `${DATA_API}/properties/${creds.propertyId}:runReport`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    let message = text;
    let googleStatus: string | undefined;
    try {
      const parsed = JSON.parse(text) as {
        error?: { message?: string; status?: string };
      };
      message = parsed.error?.message ?? text;
      googleStatus = parsed.error?.status;
    } catch {
      // Non-JSON error body — keep the raw text, it is still the best clue.
    }
    throw new GaApiError(res.status, message, googleStatus);
  }

  return (await res.json()) as GaReport;
}

// ---------------------------------------------------------------------------
// Row helpers
// ---------------------------------------------------------------------------

export function dim(row: GaRow, i: number): string {
  return row.dimensionValues?.[i]?.value ?? "";
}

export function num(row: GaRow, i: number): number {
  const value = Number(row.metricValues?.[i]?.value ?? 0);
  return Number.isFinite(value) ? value : 0;
}
