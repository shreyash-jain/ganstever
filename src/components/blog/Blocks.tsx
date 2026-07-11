import Link from "next/link";
import Image from "next/image";
import { whatsappLink } from "@/lib/site";

// ---------------------------------------------------------------------
// Gans-te-Ver journal block library — the grammar for every Guide and
// Story post. TLDR at the top, max 4 images, a callout / stat grid /
// numbered list every 250–400 words, a closing block second-to-last,
// then a WhatsApp CTA. Reading rhythm > visual variety.
// ---------------------------------------------------------------------

// --- TL;DR -----------------------------------------------------------
export function TLDR({
  items,
  label = "TL;DR",
}: {
  items: string[];
  label?: string;
}) {
  return (
    <aside className="not-prose my-10 rounded-2xl border-l-4 border-dune bg-sand/70 p-6 md:p-8">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-dune-deep">
        {label}
      </p>
      <ul className="mt-4 space-y-2 text-base leading-relaxed text-ink/85">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-dune" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// --- Callout (the single most quotable line per post) ----------------
export function Callout({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="not-prose my-12 rounded-2xl border-l-4 border-dune bg-sand/70 p-7 md:p-9">
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-dune-deep">
          {eyebrow}
        </p>
      )}
      <p
        className={`font-display text-2xl leading-snug text-sea-deep md:text-3xl ${
          eyebrow ? "mt-3" : ""
        }`}
      >
        {children}
      </p>
    </aside>
  );
}

// --- 3-card stat grid (parallel facts: distances, times, capacity) ---
export type Stat = { value: string; label: string; body?: string };

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="not-prose my-12 grid gap-4 md:grid-cols-3">
      {stats.map((s, i) => (
        <article
          key={i}
          className="rounded-2xl border border-black/5 bg-shell p-7"
        >
          <p className="font-display text-4xl leading-none tracking-tight text-sea-deep">
            {s.value}
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-dune-deep">
            {s.label}
          </p>
          {s.body && (
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              {s.body}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

// --- Numbered list — light / dark / grid variants ---------------------
export type NumberedItem = {
  title: string;
  body: string;
};

export function NumberedList({
  items,
  variant = "light",
}: {
  items: NumberedItem[];
  variant?: "light" | "dark" | "grid";
}) {
  // Every variant renders inside the same wider wrapper so the list
  // breaks out of the prose column and uses the available canvas. The
  // page is responsible for closing its prose div before rendering this.
  const wrapper = "not-prose my-12 mx-auto w-full max-w-5xl px-5 lg:px-0";

  if (variant === "grid") {
    return (
      <ol className={`${wrapper} grid gap-4 md:grid-cols-2`}>
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-5 rounded-2xl border border-black/5 bg-shell p-6 md:p-7"
          >
            <span className="font-display text-3xl leading-none text-dune">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <h4 className="font-display text-lg text-sea-deep">
                {item.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  if (variant === "dark") {
    return (
      <ol className={`${wrapper} space-y-3 rounded-3xl bg-sea p-6 md:p-10`}>
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-5 rounded-2xl bg-sea-deep/40 p-6"
          >
            <span className="font-display text-3xl leading-none text-dune">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <h4 className="font-display text-lg text-shell md:text-xl">
                {item.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-shell/85">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  // light (default)
  return (
    <ol className={`${wrapper} space-y-3`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-5 rounded-2xl bg-sand/70 p-6">
          <span className="font-display text-3xl leading-none text-dune">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex-1">
            <h4 className="font-display text-lg text-sea-deep">
              {item.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// --- Closing block (always second-to-last) ----------------------------
export function ClosingBlock({
  title,
  thesis,
  body,
}: {
  title: string;
  thesis: string;
  body: React.ReactNode;
}) {
  return (
    <aside className="not-prose my-12 rounded-3xl bg-gradient-to-br from-sand to-shell p-8 md:p-12">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-dune-deep">
        {title}
      </p>
      <p className="mt-4 font-display text-2xl leading-snug text-sea-deep md:text-3xl">
        {thesis}
      </p>
      <p className="mt-5 text-base leading-relaxed text-ink/80">{body}</p>
    </aside>
  );
}

// --- WhatsApp CTA (sea band with dune button) -------------------------
export function WhatsAppCTA({
  title,
  body,
  buttonLabel = "Start a stay on WhatsApp",
  pageKey = "blog",
}: {
  title: string;
  body: string;
  buttonLabel?: string;
  pageKey?: Parameters<typeof whatsappLink>[0];
}) {
  return (
    <section className="bg-sea text-shell">
      <div className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-shell/70">
          Start the conversation
        </p>
        <h2 className="mt-3 font-display text-3xl text-shell md:text-4xl">
          {title}
        </h2>
        <p className="mt-5 text-shell/85">{body}</p>
        <div className="mt-7">
          <Link
            href={whatsappLink(pageKey)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-dune px-6 py-3 text-sm font-medium text-shell hover:bg-dune-deep"
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

// --- Full-bleed blog hero with overlay + H1 + meta strip -----------
export function BlogHero({
  image,
  alt,
  eyebrow,
  title,
  intro,
  byline,
  datePublished,
  readingMinutes,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  intro: string;
  byline: string;
  datePublished: string;
  readingMinutes: number;
}) {
  return (
    <header className="relative h-[70vh] min-h-[560px] w-full overflow-hidden bg-sea-deep">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sea-deep/40 via-sea-deep/55 to-sea-deep/85" />
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-16 md:pb-20">
        <div className="mx-auto max-w-3xl px-5 text-center text-shell lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-shell/75">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-4xl leading-tight text-shell md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-shell/85 md:text-lg">
            {intro}
          </p>
          <p className="mt-7 text-xs uppercase tracking-[0.18em] text-shell/65">
            {byline} ·{" "}
            {new Date(datePublished).toLocaleDateString("en-ZA", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {readingMinutes} min read
          </p>
        </div>
      </div>
    </header>
  );
}

// --- Source citation block (bottom of every guide) ------------------
export function Sources({ items }: { items: { label: string; href: string }[] }) {
  return (
    <aside className="not-prose my-12 border-t border-black/10 pt-8">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
        Sources & further reading
      </p>
      <ul className="mt-4 space-y-2 text-sm text-ink/80">
        {items.map((s, i) => (
          <li key={i}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dune-deep underline-offset-4 hover:underline"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted">
        Times, fees and conditions change. Verify each source against its
        live page before relying on a specific figure.
      </p>
    </aside>
  );
}