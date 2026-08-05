import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { publishedPosts } from "@/lib/posts";

/**
 * 404, with the site's chrome.
 *
 * This lives at the app root rather than inside the (site) route group
 * because Next matches the root not-found for ANY unmatched URL — a nested
 * one would only cover misses beneath its own segment. Since the root layout
 * is deliberately bare (so /admin inherits nothing), this page renders the
 * header, footer and analytics tag itself.
 */
export const metadata: Metadata = {
  title: "Page not found",
  // Required, and not redundant. Next emits its own <meta name="robots"
  // content="noindex"> for this route, but the ROOT layout sets
  // `index, follow` for the whole site, and that inherits down to here — so
  // without this override the built 404.html carries two CONTRADICTORY robots
  // tags. This makes both of them noindex. `follow` is kept so the links out
  // of this page still pass crawlers back into the site.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const recent = publishedPosts.slice(0, 3);

  return (
    <>
      <GoogleAnalytics />
      <Header />
      <main className="flex-1">
        <section className="bg-shell">
          <div className="mx-auto max-w-3xl px-5 py-20 md:py-28 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-dune">
              404
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-sea-deep md:text-5xl">
              This one washed out to sea
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink/80 md:text-lg">
              The page you were after isn&rsquo;t here — it may have moved, or
              the link that sent you may have been typed from memory. The house
              is still exactly where it was.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full bg-sea-deep px-5 py-2.5 text-sm font-medium text-shell transition hover:bg-sea"
              >
                Back to the house
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-sea/30 px-5 py-2.5 text-sm font-medium text-sea transition hover:bg-foam"
              >
                Read the journal
              </Link>
            </div>

            {recent.length > 0 && (
              <div className="mt-14 border-t border-sand pt-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  Recently in the journal
                </p>
                <ul className="mt-4 space-y-3">
                  {recent.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="font-display text-lg text-sea-deep underline-offset-4 hover:underline"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
