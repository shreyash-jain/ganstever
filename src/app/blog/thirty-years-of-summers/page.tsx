import type { Metadata } from "next";
import Image from "next/image";
import {
  BlogHero,
  Callout,
  ClosingBlock,
  WhatsAppCTA,
} from "@/components/blog/Blocks";
import { articleLd, breadcrumbLd } from "@/lib/jsonld";
import { getPost } from "@/lib/posts";
import { site } from "@/lib/site";
import { img } from "@/lib/images";

const post = getPost("thirty-years-of-summers")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.excerpt,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    type: "article",
    title: post.title,
    description: post.excerpt,
    url: `${site.url}/blog/${post.slug}`,
    images: [{ url: post.cover.src, alt: post.cover.alt }],
  },
};

export default function Page() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleLd({
              headline: post.title,
              description: post.excerpt,
              path: `/blog/${post.slug}`,
              image: post.cover.src,
              datePublished: post.datePublished,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", url: `${site.url}/` },
              { name: "Journal", url: `${site.url}/blog` },
              { name: post.title, url: `${site.url}/blog/${post.slug}` },
            ]),
          ),
        }}
      />

      <BlogHero
        image={post.cover.src}
        alt={post.cover.alt}
        eyebrow="Our story · Suiderstrand"
        title={post.title}
        intro="A house at the end of a gravel road, a baby three months old, and a family that kept coming back — for thirty years."
        byline={`By ${site.contact.hostName}, as told to the family`}
        datePublished={post.datePublished}
        readingMinutes={post.readingMinutes}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="prose-gv">
          <p>
            My dad bought the stand at Suiderstrand in 1990. There was not
            much here then — there still isn&rsquo;t, thank goodness — just
            fynbos, dunes, the sea, and a gravel road that ends where the
            continent does.
          </p>
          <p>
            I started building the next year, in 1991. My firstborn son,
            Izak, was three months old. If you have ever built a house at
            the end of the world with a newborn on your hip, you will
            understand why this place is not just a property to us. The
            house grew up with the children: five bedrooms, eventually,
            because the family kept growing; long tables, because everyone
            kept coming; and braais everywhere, because this is, after all,
            South Africa.
          </p>
        </div>

        <Callout eyebrow="Why here">
          Gans-te-Ver stands inside a nature reserve, wonderfully isolated —
          and that isolation is something I will always look for.
        </Callout>

        <div className="prose-gv">
          <p>
            For more than thirty years this was simply ours. Christmases
            with sand in everything. Whales breaching while the chops
            sizzled. Children — then grandchildren — learning the rock pools
            at low tide. The kind of holidays that don&rsquo;t photograph
            dramatically but hold a family together.
          </p>
          <p>
            Friends who visited always said the same two things: first,
            &ldquo;I had no idea this place existed,&rdquo; and then,
            quietly, on the last evening, &ldquo;when can we come
            back?&rdquo; That second question is the reason you are reading
            this.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.diningIndoorBraai.src}
            alt={img.diningIndoorBraai.alt}
            width={img.diningIndoorBraai.width}
            height={img.diningIndoorBraai.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The six-seater by the indoor braai — where most of the family
            stories get retold
          </figcaption>
        </figure>

        <div className="prose-gv">
          <p>
            In 2024, I opened the doors. Not because the house stood empty —
            it never really did — but because I kept thinking about that
            question. Let me give other people the same luxury we&rsquo;ve
            had all these years: to be in the middle of nature, a few metres
            from the beach, with absolutely nothing demanding your
            attention.
          </p>
          <p>
            So the house works the way it always has. You bring the food and
            the people; it provides the rest — the five en-suite bedrooms,
            the pizza oven, the braai wall, the main-suite balcony where the
            whale watching happens. There is no reception desk and no
            checklist culture. You message me on WhatsApp, and you deal with
            the person who built the place.
          </p>
        </div>

        <Callout eyebrow="The hope">
          I want this house to become almost like family to the people who
          stay — the place you return to at least once a year, every year.
        </Callout>

        <ClosingBlock
          title="From our family to yours"
          thesis="Thirty years of our summers are in these walls. Now it's your family's turn to add a few."
          body="Come for a weekend. If we've done this right, you'll leave already knowing which bedroom is yours next time."
        />
      </div>

      <WhatsAppCTA
        title="Come and see for yourself"
        body="Five en-suite bedrooms, ten beds, the reserve and the beach — and Madelaine on the other end of the line. Say hello and check your dates."
        buttonLabel="Message Madelaine on WhatsApp"
        pageKey="story"
      />
    </article>
  );
}
