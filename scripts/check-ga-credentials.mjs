#!/usr/bin/env node
// Verify the GA4 service-account credentials BEFORE blaming the dashboard.
//
//   npm run check:ga
//
// Reads `.dev.vars` — the SAME file `wrangler pages dev` reads — so a pass
// here means the local server has working credentials, not merely that some
// other file somewhere is correct. Falls back to real environment variables,
// which is how you check a CI or production shell.
//
// Walks the three failure points in order and names the exact fix for each:
//   1. does the private key parse?
//   2. does Google issue an access token?
//   3. does runReport return 200?

import { readFile } from "node:fs/promises";
import { SignJWT, importPKCS8 } from "jose";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";

const ok = (msg) => console.log(`${GREEN}  PASS${RESET}  ${msg}`);
const info = (msg) => console.log(`${DIM}        ${msg}${RESET}`);

function fail(step, problem, fix) {
  console.log(`${RED}  FAIL${RESET}  ${step}`);
  console.log(`\n${RED}Problem:${RESET} ${problem}`);
  console.log(`\n${YELLOW}Fix:${RESET} ${fix}\n`);
  process.exit(1);
}

/**
 * Parse .dev.vars. Same format as .env: KEY=value, `#` comments, and values
 * optionally wrapped in quotes (which is how a private key with literal \n
 * has to be written in this file).
 */
function parseDotenv(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length > 1) ||
      (value.startsWith("'") && value.endsWith("'") && value.length > 1)
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

async function loadEnv() {
  try {
    const text = await readFile(new URL("../.dev.vars", import.meta.url), "utf8");
    info("Reading .dev.vars (the file `wrangler pages dev` also reads)");
    return { ...process.env, ...parseDotenv(text) };
  } catch {
    info("No .dev.vars found — falling back to process environment");
    return { ...process.env };
  }
}

function normalizePrivateKey(raw) {
  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, "\n").trim();
}

const env = await loadEnv();
console.log("\nChecking GA4 credentials\n");

// --- Step 0: presence -------------------------------------------------------

const propertyIdRaw = env.GOOGLE_ANALYTICS_PROPERTY_ID?.trim();
const clientEmail = env.GOOGLE_ANALYTICS_CLIENT_EMAIL?.trim();
const privateKeyRaw = env.GOOGLE_ANALYTICS_PRIVATE_KEY;

const missing = [
  !propertyIdRaw && "GOOGLE_ANALYTICS_PROPERTY_ID",
  !clientEmail && "GOOGLE_ANALYTICS_CLIENT_EMAIL",
  !privateKeyRaw && "GOOGLE_ANALYTICS_PRIVATE_KEY",
].filter(Boolean);

if (missing.length) {
  fail(
    "Step 0 — variables present",
    `Not set: ${missing.join(", ")}`,
    "Create `.dev.vars` in the project root (it is gitignored) with:\n\n" +
      '  GOOGLE_ANALYTICS_PROPERTY_ID=123456789\n' +
      '  GOOGLE_ANALYTICS_CLIENT_EMAIL=name@project-id.iam.gserviceaccount.com\n' +
      '  GOOGLE_ANALYTICS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nMIIE...\\n-----END PRIVATE KEY-----\\n"\n\n' +
      "Note the DOUBLE QUOTES around the private key here. In the Cloudflare\n" +
      "dashboard, paste the same value RAW with no quotes.",
  );
}
ok("Step 0 — all three variables are set");

const propertyId = propertyIdRaw.replace(/^properties\//, "");

if (/^G-/i.test(propertyId)) {
  fail(
    "Step 0b — property ID looks right",
    `GOOGLE_ANALYTICS_PROPERTY_ID is "${propertyId}", which is a MEASUREMENT ID.`,
    "The measurement ID (G-XXXXXXXXXX) writes data from the browser tag. The\n" +
      "Data API reads with the PROPERTY ID — about 9 digits, at Google\n" +
      "Analytics -> Admin -> Property details (top right). Shortcut: in the\n" +
      "Analytics URL /a<account>p<property>/, it is the digits after 'p'.",
  );
}
if (!/^\d{6,15}$/.test(propertyId)) {
  fail(
    "Step 0b — property ID looks right",
    `GOOGLE_ANALYTICS_PROPERTY_ID is "${propertyId}", which is not a plain number.`,
    "It should be ~9 digits only, e.g. 123456789.",
  );
}
ok(`Step 0b — property ID is numeric (${propertyId})`);
info(
  "If this 403s later, double-check it is the PROPERTY ID and not the STREAM",
);
info(
  "ID — both are ~9 digits and the Stream ID sits on the Data streams page,",
);
info("which is exactly where people go looking for the property ID.");

if (!/^[^@]+@[^.]+\.iam\.gserviceaccount\.com$/.test(clientEmail)) {
  fail(
    "Step 0c — client email looks right",
    `GOOGLE_ANALYTICS_CLIENT_EMAIL is "${clientEmail}".`,
    "Use the ACTUAL `client_email` field from the downloaded service-account\n" +
      "JSON — never a guessed one. It looks like\n" +
      "  <name>@<project-id>.iam.gserviceaccount.com",
  );
}
ok(`Step 0c — client email is a service account (${clientEmail})`);

// --- Step 1: does the key parse? -------------------------------------------

const pem = normalizePrivateKey(privateKeyRaw);

if (!pem.includes("-----BEGIN PRIVATE KEY-----")) {
  fail(
    "Step 1 — private key parses",
    "The key has no '-----BEGIN PRIVATE KEY-----' header.",
    "Copy the WHOLE `private_key` value out of the service-account JSON,\n" +
      "including the BEGIN and END lines. In .dev.vars it must be wrapped in\n" +
      'double quotes so the literal \\n sequences survive.',
  );
}

let privateKey;
try {
  privateKey = await importPKCS8(pem, "RS256");
} catch (error) {
  fail(
    "Step 1 — private key parses",
    `importPKCS8 rejected the key: ${error.message}`,
    "The header is present but the body is malformed — usually the newlines\n" +
      "were mangled, or the value was truncated on paste. Re-copy it from the\n" +
      "JSON file. In .dev.vars it should be ONE line in double quotes with\n" +
      "literal \\n between the base64 lines.",
  );
}
ok("Step 1 — private key parses as a PKCS#8 RSA key");

// --- Step 2: does Google issue a token? ------------------------------------

const issuedAt = Math.floor(Date.now() / 1000);
const assertion = await new SignJWT({ scope: SCOPE })
  .setProtectedHeader({ alg: "RS256", typ: "JWT" })
  .setIssuer(clientEmail)
  .setSubject(clientEmail)
  .setAudience(TOKEN_URL)
  .setIssuedAt(issuedAt)
  .setExpirationTime(issuedAt + 3600)
  .sign(privateKey);

const tokenRes = await fetch(TOKEN_URL, {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  }),
});
const tokenBody = await tokenRes.json();

if (!tokenRes.ok || !tokenBody.access_token) {
  const err = tokenBody.error ?? `HTTP ${tokenRes.status}`;
  fail(
    "Step 2 — Google issues an access token",
    `${err}: ${tokenBody.error_description ?? "(no description)"}`,
    err === "invalid_grant"
      ? "Either the key has been deleted/disabled in IAM, or the client_email\n" +
          "does not belong to this key, or this machine's clock is wrong by more\n" +
          "than a few minutes. Check IAM -> Service Accounts -> Keys first."
      : "The JWT was rejected before any Analytics permission was consulted, so\n" +
          "this is a Google Cloud problem, not a GA4 one. Re-download the JSON\n" +
          "key and re-paste both the client_email and the private_key.",
  );
}
ok("Step 2 — Google issued an access token");

// --- Step 3: does runReport return 200? ------------------------------------

const reportRes = await fetch(
  `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
  {
    method: "POST",
    headers: {
      authorization: `Bearer ${tokenBody.access_token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      dateRanges: [{ startDate: "30daysAgo", endDate: "yesterday" }],
      metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
    }),
  },
);

if (!reportRes.ok) {
  const text = await reportRes.text();
  let message = text;
  let status;
  try {
    const parsed = JSON.parse(text);
    message = parsed.error?.message ?? text;
    status = parsed.error?.status;
  } catch {
    /* keep raw text */
  }

  const haystack = `${status ?? ""} ${message}`.toLowerCase();
  const apiDisabled =
    haystack.includes("service_disabled") ||
    haystack.includes("has not been used in project") ||
    haystack.includes("is disabled");

  if (reportRes.status === 403 && apiDisabled) {
    fail(
      "Step 3 — runReport returns 200",
      `403 SERVICE_DISABLED. Google said:\n\n  ${message}`,
      "The Google Analytics DATA API is not enabled in the Cloud project that\n" +
        "owns this service account.\n\n" +
        "  Google Cloud Console -> check the project selector shows the RIGHT\n" +
        "  project -> APIs & Services -> Library -> 'Google Analytics Data API'\n" +
        "  -> Enable.\n\n" +
        "Enabling the Analytics ADMIN API does not enable the Data API. Doing\n" +
        "this under the wrong project is the usual reason for 'I enabled it and\n" +
        "it still fails'.",
    );
  }

  if (reportRes.status === 403) {
    fail(
      "Step 3 — runReport returns 200",
      `403 PERMISSION_DENIED. Google said:\n\n  ${message}`,
      "The API is enabled, but the service account is not on the GA4 property.\n\n" +
        "  Google Analytics -> Admin -> Property access management -> +\n" +
        `  -> paste  ${clientEmail}\n` +
        "  -> role Viewer -> untick 'Notify new users by email' -> Add.\n\n" +
        "This is a DIFFERENT console from the API-enablement fix above — do not\n" +
        "go back to Google Cloud for this one.",
    );
  }

  if (reportRes.status === 404) {
    fail(
      "Step 3 — runReport returns 200",
      `404. Google said:\n\n  ${message}`,
      `No property with ID ${propertyId}. You have almost certainly used the\n` +
        "STREAM ID instead of the PROPERTY ID — both are ~9 digits and both\n" +
        "appear near the Data streams page.\n\n" +
        "  Property ID: Admin -> Property details, top right.\n" +
        "  Or: the digits after 'p' in the /a<account>p<property>/ part of the\n" +
        "  Analytics URL.",
    );
  }

  fail(
    "Step 3 — runReport returns 200",
    `HTTP ${reportRes.status}. Google said:\n\n  ${message}`,
    "Unexpected. The raw message above is Google's own text — search for it.",
  );
}

const report = await reportRes.json();
ok("Step 3 — runReport returned 200");

const row = report.rows?.[0];
const views = Number(row?.metricValues?.[0]?.value ?? 0);
const users = Number(row?.metricValues?.[1]?.value ?? 0);

console.log(`\n${GREEN}All three checks passed.${RESET}`);
console.log(
  `Last 30 days on property ${propertyId}: ` +
    `${views} pageviews, ${users} active users.\n`,
);

if (views === 0 && users === 0) {
  console.log(
    `${YELLOW}Note:${RESET} the property is reachable but has no data yet.\n` +
      "That is expected until the gtag tracking snippet has been live on the\n" +
      "site for a while. The dashboard will show its 'connected, no data yet'\n" +
      "state rather than an error.\n",
  );
}
