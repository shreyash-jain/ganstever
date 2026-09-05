#!/usr/bin/env node
/**
 * Build-time integrity gate.
 *
 * WHY THIS EXISTS
 * ---------------
 * This repository is periodically hit by a force-push worm. The attack shape is
 * always the same:
 *
 *   1. A commit is pushed that looks like an ordinary approved merge — subject
 *      "Merge pull request #N from …" — but whose *committer* is a person
 *      rather than `GitHub <noreply@github.com>`. A real GitHub merge is always
 *      committed by GitHub.
 *   2. That commit rewrites a build-time config — every observed instance has
 *      used `postcss.config.mjs` — appending an obfuscated payload behind
 *      hundreds of spaces, so the file renders as a blank line in an editor and
 *      as an unremarkable one-line change in a diff.
 *   3. It is force-pushed onto `main` (and, on 2026-08-20, onto every branch in
 *      the repo within five seconds).
 *
 * Observed payload sizes, against a 31-character clean baseline:
 *
 *   fd6e62b  (forged "Merge pull request #7")   longest line 31,329 chars
 *   PR #1 head                                  longest line 20,640 chars
 *   PR #6 head                                  longest line  9,154 chars
 *
 * The existing `.github/workflows/revert-force-push.yml` catches these, but it
 * is *reactive*: between the malicious push and the revert there is a window of
 * roughly 10–30 seconds (measured from the repo activity log) during which the
 * poisoned commit genuinely is `main`. Cloudflare Pages triggers on push. If a
 * build starts inside that window, the payload executes on the build machine
 * and ships to production, and the subsequent revert does not unship it.
 *
 * This script closes that window from the other side. `postcss.config.mjs` is
 * loaded by PostCSS during `next build`, so the payload's whole payoff is
 * reaching a build. Wiring this in as `prebuild` means a poisoned tree cannot
 * build at all — locally, in CI, or on Cloudflare, whose build command is
 * `npm run build`. A failed Pages build keeps the previous good deployment,
 * so production stays clean even if the revert loses the race.
 *
 * SCOPE
 * -----
 * Deliberately narrow: only the small, hand-written files that execute during a
 * build or install. They are all well under 100 characters per line in normal
 * use, which makes a length ceiling a precise signal rather than a heuristic.
 * Generated files (`package-lock.json`) and vendored code are not scanned —
 * they have legitimately long lines and would make this noisy, and the worm has
 * never landed there.
 *
 * Run directly with `npm run integrity`.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Files that execute during a build or an install. */
const WATCHED = [
  "postcss.config.mjs",
  "next.config.ts",
  "next.config.js",
  "next.config.mjs",
  "eslint.config.mjs",
  "tailwind.config.ts",
  "tailwind.config.js",
  "package.json",
];

/**
 * No legitimate line in the files above has ever exceeded 60 characters. The
 * smallest payload seen was 9,154. 300 leaves room for a long import or a
 * prettier-defeating URL without leaving room for a smuggled program.
 */
const MAX_LINE = 300;

/**
 * Indicators of compromise. Each has been present in an observed payload, or is
 * a primitive with no legitimate use inside a static site's build config.
 */
const IOCS = [
  [/createRequire/, "createRequire() — used to pull CommonJS into an ESM config"],
  [/_0x[0-9a-fA-F]{4,}/, "hex-mangled identifier (_0x…) — JS obfuscator output"],
  [/String\.fromCharCode/, "String.fromCharCode — string obfuscation"],
  [/ETH_RPC_URL/, "ETH_RPC_URL — wallet-drainer configuration"],
  [/166\.88\.134\.62/, "known command-and-control address 166.88.134.62"],
  [/global\s*\[\s*['"]!['"]\s*\]/, "global['!'] — payload handle"],
  [/\beval\s*\(/, "eval()"],
  [/new\s+Function\s*\(/, "new Function()"],
  [/\bchild_process\b/, "child_process — shell execution"],
  [/\batob\s*\(/, "atob() — base64 payload decode"],
  [/Buffer\.from\s*\([^)]*['"]base64['"]/, "base64 Buffer decode"],
];

/**
 * npm lifecycle hooks run automatically on `npm install`, which makes them the
 * other classic place to hide execution. These are the only ones this project
 * legitimately uses; anything else warrants a human look.
 */
const ALLOWED_LIFECYCLE = new Set(["prebuild"]);
const LIFECYCLE = [
  "preinstall",
  "install",
  "postinstall",
  "prepare",
  "prepublish",
  "prepack",
  "prebuild",
];

const findings = [];

for (const rel of WATCHED) {
  const abs = resolve(ROOT, rel);
  if (!existsSync(abs)) continue;

  const text = readFileSync(abs, "utf8");
  const lines = text.split(/\r?\n/);

  lines.forEach((line, i) => {
    if (line.length > MAX_LINE) {
      findings.push(
        `${rel}:${i + 1} — line is ${line.length.toLocaleString()} characters ` +
          `(ceiling ${MAX_LINE}). The worm pads its payload with whitespace so ` +
          `the line looks blank in an editor.`,
      );
    }
    for (const [re, why] of IOCS) {
      if (re.test(line)) findings.push(`${rel}:${i + 1} — ${why}`);
    }
  });
}

// package.json gets one extra pass: unexpected lifecycle hooks.
const pkgPath = resolve(ROOT, "package.json");
if (existsSync(pkgPath)) {
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    for (const hook of LIFECYCLE) {
      const cmd = pkg.scripts?.[hook];
      if (cmd && !ALLOWED_LIFECYCLE.has(hook)) {
        findings.push(
          `package.json — unexpected "${hook}" lifecycle script: ${cmd}\n` +
            `      These run automatically on npm install. If this is intentional, ` +
            `add it to ALLOWED_LIFECYCLE in this script.`,
        );
      }
    }
  } catch {
    findings.push("package.json — could not be parsed as JSON");
  }
}

if (findings.length > 0) {
  console.error("\n  BUILD BLOCKED — build-time integrity check failed\n");
  for (const f of findings) console.error(`  • ${f}`);
  console.error(
    "\n  This is the signature of the force-push worm that periodically hits\n" +
      "  this repository. Do NOT 'fix' it by editing the payload out and\n" +
      "  carrying on, and do not bypass this check.\n\n" +
      "  Recover the affected file from a known-good commit, e.g.\n" +
      "      git show origin/main:postcss.config.mjs > postcss.config.mjs\n\n" +
      "  then check whether origin/main itself is poisoned before pushing:\n" +
      "      git log origin/main --merges -8 --format='%h %cn <%ce> %s'\n" +
      "  A real merge is committed by 'GitHub <noreply@github.com>'. A\n" +
      "  'Merge pull request' commit committed by a person is forged.\n",
  );
  process.exit(1);
}

console.log("integrity check passed — build-time configs are clean");
