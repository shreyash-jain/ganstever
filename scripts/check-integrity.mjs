#!/usr/bin/env node
/**
 * Build-time integrity gate.
 *
 * WHY THIS EXISTS
 * ---------------
 * This repository is periodically hit by a worm. It has arrived by at least two
 * different routes, which is the important thing to understand before editing
 * this file: do not narrow it back down to "the postcss thing".
 *
 *   Route 1 — the build config.
 *   A commit is pushed whose subject reads "Merge pull request #N from …" but
 *   whose *committer* is a person rather than `GitHub <noreply@github.com>`. A
 *   real GitHub merge is always committed by GitHub; that mismatch is the tell.
 *   It appends an obfuscated payload to `postcss.config.mjs` behind hundreds of
 *   spaces, so the file renders as a blank line in an editor and an
 *   unremarkable one-line change in a diff. Observed sizes, against a
 *   31-character clean baseline: 31,329 / 20,640 / 9,154 characters.
 *
 *   Route 2 — a font.
 *   Malware has also reached these repos disguised as a font asset. A font is
 *   an attractive carrier: it is binary, nobody opens it, nobody diffs it, and
 *   a .woff2 in public/ looks like housekeeping. It becomes dangerous when
 *   something loads it — a next/font/local import, an @font-face rule, or a
 *   file that is not a font at all but is named like one and imported as code.
 *
 * WHY IT RUNS AS `prebuild`
 * -------------------------
 * `.github/workflows/revert-force-push.yml` already reverts force-pushes to
 * `main`, but it is reactive. The repo activity log shows a 10-30 second window
 * between the malicious push and the revert, during which the poisoned commit
 * genuinely is `main`. Cloudflare Pages triggers on push; a build starting
 * inside that window executes the payload on the build machine and ships it,
 * and the later revert does not unship it.
 *
 * Reaching a build is the payload's entire payoff, so the gate sits in front of
 * the build. A poisoned tree cannot build — locally, in CI, or on Cloudflare,
 * whose build command is `npm run build`. A failed Pages build keeps the
 * previous good deployment, so production stays clean even when the revert
 * loses the race.
 *
 * SIGNAL DISCIPLINE
 * -----------------
 * A gate that cries wolf gets bypassed, and a bypassed gate is worse than none.
 * So findings are split in two:
 *
 *   BLOCKING  unambiguous. Obfuscator output, a known C2 address, a font that
 *             is not a font. Verified against this repo: zero of these today.
 *   REVIEW    contextual primitives (atob, base64 decode, child_process) that
 *             have honest uses. Printed, never fatal — except inside a
 *             build-executing config, where they have no honest use at all.
 *
 * Known-good things this deliberately does NOT flag, each verified by hand:
 *   - functions/api/analytics.ts uses atob() to decode an HTTP Basic auth
 *     header. Legitimate.
 *   - docs/ describes the image-generation recipe in prose, including code
 *     samples. Markdown is not executed, so it is not swept.
 *   - public/images/elim-vineyard.png and sauvignon-pour.png are complete,
 *     valid JPEGs that carry a .png extension. Cosmetic, not malicious, so a
 *     real image under the wrong image extension is a note rather than a block.
 *
 * Run on its own with `npm run integrity`.
 */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname, relative, extname, basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = resolve(ROOT, "scripts/check-integrity.mjs");

const blocking = [];
const review = [];
const notes = [];

// ---------------------------------------------------------------------------
// Signatures
// ---------------------------------------------------------------------------

/** No honest use anywhere in this project. Any hit fails the build. */
const IOCS_BLOCKING = [
  [/_0x[0-9a-fA-F]{4,}/, "hex-mangled identifier (_0x…) — JS obfuscator output"],
  [/ETH_RPC_URL/, "ETH_RPC_URL — wallet-drainer configuration"],
  [/166\.88\.134\.62/, "known command-and-control address 166.88.134.62"],
  [/global\s*\[\s*['"]!['"]\s*\]/, "global['!'] — payload handle"],
  [/String\.fromCharCode\s*\(\s*(?:0x[0-9a-fA-F]+|\d+)\s*,/, "String.fromCharCode with a numeric list — string obfuscation"],
  [/\beval\s*\(/, "eval()"],
  [/new\s+Function\s*\(/, "new Function()"],
];

/** Honest uses exist. Reported, but only fatal inside a build config. */
const IOCS_REVIEW = [
  [/createRequire/, "createRequire() — pulls CommonJS into an ESM module"],
  [/\bchild_process\b/, "child_process — shell execution"],
  [/\batob\s*\(/, "atob() — base64 decode"],
  [/Buffer\.from\s*\([^)]*['"]base64['"]/, "base64 Buffer decode"],
];

const SKIP_DIRS = new Set([
  "node_modules", ".next", "out", ".git", ".wrangler", ".vercel", "dist", "coverage",
]);

/** Generated or vendored — legitimately huge lines, never hand-edited. */
const SKIP_FILES = new Set(["package-lock.json", "yarn.lock", "pnpm-lock.yaml"]);

/**
 * Swept for IOCs. Markdown is excluded on purpose: docs quote code samples, and
 * documentation is never executed.
 */
const CODE_EXT = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".css", ".scss",
  ".json", ".html", ".svg", ".yml", ".yaml", ".py",
]);

function* walk(dir) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.name.startsWith(".") && e.name !== ".github") continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      yield* walk(full);
    } else if (e.isFile() && resolve(full) !== SELF) {
      yield full;
    }
  }
}

const rel = (abs) => relative(ROOT, abs).replace(/\\/g, "/");

// ---------------------------------------------------------------------------
// 1. Build-executing configs — line length, and every IOC is fatal here
// ---------------------------------------------------------------------------
// Small hand-written files. Longest legitimate line across all of them today is
// 55 characters; the smallest payload seen was 9,154. A ceiling here is a
// precise signal rather than a heuristic.

const CONFIGS = [
  "postcss.config.mjs", "next.config.ts", "next.config.js", "next.config.mjs",
  "eslint.config.mjs", "tailwind.config.ts", "tailwind.config.js", "package.json",
];
const CONFIG_MAX_LINE = 300;

for (const name of CONFIGS) {
  const abs = resolve(ROOT, name);
  if (!existsSync(abs)) continue;
  readFileSync(abs, "utf8").split(/\r?\n/).forEach((line, i) => {
    if (line.length > CONFIG_MAX_LINE) {
      blocking.push(
        `${name}:${i + 1} — line is ${line.length.toLocaleString()} characters ` +
          `(ceiling ${CONFIG_MAX_LINE}). The worm pads its payload with whitespace ` +
          `so the line looks blank in an editor.`,
      );
    }
    for (const [re, why] of [...IOCS_BLOCKING, ...IOCS_REVIEW]) {
      if (re.test(line)) blocking.push(`${name}:${i + 1} — ${why}, inside a build config`);
    }
  });
}

// npm lifecycle hooks run automatically on `npm install` — the other classic
// place to hide execution.
const ALLOWED_LIFECYCLE = new Set(["prebuild"]);
const pkgPath = resolve(ROOT, "package.json");
if (existsSync(pkgPath)) {
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    for (const hook of ["preinstall", "install", "postinstall", "prepare", "prepublish", "prepack", "prebuild"]) {
      const cmd = pkg.scripts?.[hook];
      if (cmd && !ALLOWED_LIFECYCLE.has(hook)) {
        blocking.push(
          `package.json — unexpected "${hook}" lifecycle script: ${cmd}\n` +
            `      These run automatically on npm install. If intentional, add it ` +
            `to ALLOWED_LIFECYCLE in this script.`,
        );
      }
    }
  } catch {
    blocking.push("package.json — could not be parsed as JSON");
  }
}

// ---------------------------------------------------------------------------
// 2. Binary assets must be what their extension claims
// ---------------------------------------------------------------------------
// This is the check that catches malware arriving as a font: a .woff2 that does
// not begin with `wOF2` is not a font, whatever it is named.

const MAGIC = {
  ".woff":  [[0x77, 0x4f, 0x46, 0x46]],
  ".woff2": [[0x77, 0x4f, 0x46, 0x32]],
  ".otf":   [[0x4f, 0x54, 0x54, 0x4f]],
  ".ttf":   [[0x00, 0x01, 0x00, 0x00], [0x74, 0x72, 0x75, 0x65], [0x74, 0x74, 0x63, 0x66]],
  ".png":   [[0x89, 0x50, 0x4e, 0x47]],
  ".jpg":   [[0xff, 0xd8, 0xff]],
  ".jpeg":  [[0xff, 0xd8, 0xff]],
  ".gif":   [[0x47, 0x49, 0x46, 0x38]],
  ".webp":  [[0x52, 0x49, 0x46, 0x46]],
  ".ico":   [[0x00, 0x00, 0x01, 0x00]],
};
const LABEL = {
  ".woff": "wOFF font", ".woff2": "wOF2 font", ".otf": "OTTO font", ".ttf": "TrueType font",
  ".png": "PNG", ".jpg": "JPEG", ".jpeg": "JPEG", ".gif": "GIF", ".webp": "WebP", ".ico": "ICO",
};
const FONT_EXTS = new Set([".woff", ".woff2", ".ttf", ".otf", ".eot"]);
const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico"]);

const matches = (head, ext) =>
  (MAGIC[ext] ?? []).some((sig) => sig.every((b, i) => head[i] === b));

/** What the bytes actually are, regardless of the name. */
function detect(head) {
  for (const ext of Object.keys(MAGIC)) {
    if (matches(head, ext)) return ext;
  }
  return null;
}

let fontCount = 0;

for (const abs of walk(ROOT)) {
  const ext = extname(abs).toLowerCase();
  if (FONT_EXTS.has(ext)) fontCount++;

  if (ext === ".eot") {
    blocking.push(`${rel(abs)} — .eot font. Obsolete format with no use here; treat as suspicious.`);
    continue;
  }
  if (!MAGIC[ext]) continue;

  let head;
  try { head = readFileSync(abs).subarray(0, 8); } catch { continue; }
  if (matches(head, ext)) continue;

  const actual = detect(head);
  const hex = Array.from(head.subarray(0, 4)).map((b) => b.toString(16).padStart(2, "0")).join(" ");
  const ascii = Array.from(head.subarray(0, 4)).map((b) => (b >= 32 && b < 127 ? String.fromCharCode(b) : ".")).join("");

  // A real asset under the wrong extension for the same family is a naming
  // slip, not an attack: browsers sniff content and Cloudinary re-encodes.
  // Worth knowing, never worth blocking a deploy over.
  const sameFamily =
    (IMAGE_EXTS.has(ext) && actual && IMAGE_EXTS.has(actual)) ||
    (FONT_EXTS.has(ext) && actual && FONT_EXTS.has(actual));
  if (sameFamily) {
    notes.push(`${rel(abs)} is a valid ${LABEL[actual]} carrying a ${ext} extension (cosmetic mismatch)`);
    continue;
  }

  blocking.push(
    `${rel(abs)} — file is not what its extension claims. Expected ${LABEL[ext]}, ` +
      `found bytes ${hex} ("${ascii}")${actual ? ` which is a ${LABEL[actual]}` : ", matching no known asset format"}. ` +
      `Malware has reached these repos disguised as a font asset.`,
  );
}

// ---------------------------------------------------------------------------
// 3. IOC sweep across every executable text file
// ---------------------------------------------------------------------------

for (const abs of walk(ROOT)) {
  const ext = extname(abs).toLowerCase();
  if (!CODE_EXT.has(ext) || SKIP_FILES.has(basename(abs))) continue;

  let lines;
  try { lines = readFileSync(abs, "utf8").split(/\r?\n/); } catch { continue; }
  const r = rel(abs);

  lines.forEach((line, i) => {
    for (const [re, why] of IOCS_BLOCKING) if (re.test(line)) blocking.push(`${r}:${i + 1} — ${why}`);
    for (const [re, why] of IOCS_REVIEW) if (re.test(line)) review.push(`${r}:${i + 1} — ${why}`);
  });

  // An SVG is markup, and markup can carry script.
  if (ext === ".svg") {
    const text = lines.join("\n");
    if (/<script/i.test(text) || /javascript:/i.test(text)) {
      blocking.push(`${r} — SVG contains a <script> element or a javascript: URL.`);
    } else if (/\son(?:load|error|click|mouse\w+)\s*=/i.test(text)) {
      review.push(`${r} — SVG carries an inline event handler attribute.`);
    }
  }
}

// ---------------------------------------------------------------------------
// 4. Font-loading surface
// ---------------------------------------------------------------------------
// A font asset is inert until something loads it. This project loads fonts
// exclusively through next/font/google, which fetches at build time and
// self-hosts, and ships no font files of its own. Anything else is new — and
// new is exactly what we want to see.

const ALLOWED_FONT_HOSTS = [/fonts\.gstatic\.com/, /fonts\.googleapis\.com/];
const LOADER_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".scss"]);

for (const abs of walk(ROOT)) {
  if (!LOADER_EXT.has(extname(abs).toLowerCase())) continue;
  let lines;
  try { lines = readFileSync(abs, "utf8").split(/\r?\n/); } catch { continue; }
  const r = rel(abs);

  lines.forEach((line, i) => {
    if (/next\/font\/local|\blocalFont\s*\(/.test(line)) {
      // Self-hosting a font is a perfectly reasonable thing to start doing, so
      // this reports rather than blocks. The teeth are in the magic-byte check
      // above: a planted "font" that is not a font fails the build regardless
      // of how it is loaded.
      review.push(
        `${r}:${i + 1} — loads a LOCAL font. This project otherwise uses ` +
          `next/font/google and ships no font files; confirm the file is a real font.`,
      );
    }
    if (/@font-face/i.test(line)) {
      review.push(`${r}:${i + 1} — @font-face rule. This project has none; verify its src.`);
    }
    const m = line.match(/src\s*:\s*url\(\s*['"]?([^'")]+)/i);
    if (m) {
      const u = m[1];
      if (/^https?:\/\//i.test(u) && !ALLOWED_FONT_HOSTS.some((h) => h.test(u))) {
        review.push(`${r}:${i + 1} — font loaded from an unrecognised host: ${u}`);
      }
      if (/^data:/i.test(u)) {
        blocking.push(`${r}:${i + 1} — font embedded as a data: URL, hiding its contents from review.`);
      }
    }
  });
}

// ---------------------------------------------------------------------------
// 5. public/ hygiene — everything here is served verbatim to visitors
// ---------------------------------------------------------------------------

const PUBLIC_OK = new Set([
  ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".ico",
  ".txt", ".xml", ".pdf", ".woff", ".woff2",
]);
const PUBLIC_DIR = resolve(ROOT, "public");

if (existsSync(PUBLIC_DIR)) {
  for (const abs of walk(PUBLIC_DIR)) {
    const name = basename(abs);
    const ext = extname(abs).toLowerCase();
    if (!PUBLIC_OK.has(ext)) {
      // Videos, manifests and similar get added legitimately over time, so this
      // reports rather than blocks.
      review.push(`${rel(abs)} — unexpected file type in public/, which is served verbatim to visitors.`);
    }
    // inter.woff2.js — reads as a font in a listing, executes as a script.
    const parts = name.split(".");
    if (parts.length > 2) {
      const inner = "." + parts[parts.length - 2].toLowerCase();
      if (FONT_EXTS.has(inner) || IMAGE_EXTS.has(inner)) {
        blocking.push(`${rel(abs)} — double extension. Reads as an asset in a file listing but is not one.`);
      }
    }
  }
}

if (fontCount === 0) {
  notes.push("no font files in the tree (fonts come from next/font/google) — the expected state");
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const uniq = (a) => [...new Set(a)];

if (blocking.length > 0) {
  console.error("\n  BUILD BLOCKED — integrity check failed\n");
  for (const f of uniq(blocking)) console.error(`  x ${f}`);
  if (review.length) {
    console.error("\n  also worth a look:");
    for (const f of uniq(review)) console.error(`  ? ${f}`);
  }
  console.error(
    "\n  This repository is periodically hit by a worm that has arrived both as a\n" +
      "  padded payload in a build config and disguised as a font asset. Do NOT\n" +
      "  edit the offending content out and carry on, and do not bypass this check.\n\n" +
      "  Restore the affected file from a known-good commit, e.g.\n" +
      "      git show origin/main:postcss.config.mjs > postcss.config.mjs\n\n" +
      "  Then check whether origin/main is itself poisoned:\n" +
      "      git log origin/main --merges -8 --format='%h %cn <%ce> %s'\n" +
      "  A real merge is committed by 'GitHub <noreply@github.com>'. A\n" +
      "  'Merge pull request' commit committed by a person is forged.\n",
  );
  process.exit(1);
}

console.log("integrity check passed");
for (const n of uniq(notes)) console.log(`  - ${n}`);
for (const f of uniq(review)) console.log(`  ? ${f} (known-good; see the header of this script)`);
