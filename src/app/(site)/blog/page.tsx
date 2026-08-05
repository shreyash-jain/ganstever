import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { publishedPosts as posts } from "@/lib/posts";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Journal — guides & stories from the southernmost tip of Africa",
  description:
    "Local guides to Suiderstrand, Cape Agulhas and the Overberg coast, and the story of our family beach house — written by the people who built it.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", url: `${site.url}/` },
              { name: "Journal", url: `${site.url}/blog` },
            ]),
          ),
        }}
      />
      <section className="bg-shell">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-20 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-dune">
            The journal
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl leading-tight text-sea-deep md:text-5xl">
            Notes from the bottom of Africa
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/80 md:text-lg">
            Guides to Suiderstrand, Cape Agulhas and the Overberg coast — and
            the occasional chapter of our own story. Written by the family,
            not a content farm.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {posts.map((p) => (
              <article key={p.slug} className="group">
                <Link href={`/blog/${p.slug}`} className="block">
                  <div className="overflow-hidden rounded-3xl">
                    <Image
                      src={p.cover.src}
                      alt={p.cover.alt}
                      width={p.cover.width}
                      height={p.cover.height}
                      sizes="(min-width: 768px) 48vw, 100vw"
                      className="aspect-[16/10] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-dune">
                    {p.tag} ·{" "}
                    {new Date(p.datePublished).toLocaleDateString("en-ZA", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    · {p.readingMinutes} min read
                  </p>
                  <h2 className="mt-2 font-display text-2xl leading-snug text-sea-deep transition-colors group-hover:text-sea md:text-[1.7rem]">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink/80 md:text-base">
                    {p.excerpt}
                  </p>
                  <p className="mt-3 text-sm font-medium text-sea">
                    Read the post →
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
