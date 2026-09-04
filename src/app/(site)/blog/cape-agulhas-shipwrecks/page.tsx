import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BlogHero,
  TLDR,
  Callout,
  StatGrid,
  NumberedList,
  ClosingBlock,
  WhatsAppCTA,
  Sources,
} from "@/components/blog/Blocks";
import { articleLd, breadcrumbLd, faqLd, itemListLd } from "@/lib/jsonld";
import { getPost } from "@/lib/posts";
import { site } from "@/lib/site";
import { img } from "@/lib/images";

const post = getPost("cape-agulhas-shipwrecks")!;

// The four older wrecks — rendered as the NumberedList and emitted as
// ItemList JSON-LD from one source so the two can never drift apart. The
// Meisho Maru is deliberately NOT in this list; it has its own section above.
// Dates verified: Zoetendal 23 Aug 1673, Arniston 30 May 1815, Birkenhead
// 26 Feb 1852. The Birkenhead entry keeps its Danger Point / Gansbaai
// location explicit on purpose — it is NOT an Agulhas wreck, and a reader who
// drives here expecting to see it has been misled.
const chapters = [
  {
    name: "The Zoetendal, 1673",
    description:
      "The oldest wreck recorded in South Africa. Its survivors named a lake after the ship: Soetendalsvlei.",
  },
  {
    name: "The Arniston, 1815",
    description:
      "Driven ashore at Waenhuiskrans after her captain thought he had rounded the cape. Of 378 aboard, 372 died.",
  },
  {
    name: "The Birkenhead, 1852",
    description:
      "Off Danger Point near Gansbaai, 100 km west — not an Agulhas wreck. The soldiers held ranks so the boats could take the women and children.",
  },
  {
    name: "The ones nobody counted",
    description:
      "Around 150 is the usual figure. Nobody knows: counts run 130 to 250, and older losses are in none of them.",
  },
];

// Five questions the body prose does not already answer. FAQPage markup has
// to mirror what a reader can actually see on the page, so these are rendered
// below as well as emitted as structured data.
const faqs = [
  {
    q: "How many shipwrecks are there at Cape Agulhas?",
    a: "Around 150 is the museum's figure; other counts run 130 to 250. Only the Meisho Maru No. 38 is visible from shore.",
  },
  {
    q: "Can you walk to the Meisho Maru shipwreck?",
    a: "Yes — a beach walk east from Suiderstrand. Go on a falling tide and look rather than climb.",
  },
  {
    q: "Was the Birkenhead wrecked at Cape Agulhas?",
    a: "No — off Danger Point near Gansbaai, 100 km west. Its relics are in the Bredasdorp museum.",
  },
  {
    q: "Where can you see shipwreck artefacts near Cape Agulhas?",
    a: `The Bredasdorp Shipwreck Museum, ${site.distances.bredasdorpKm} km away, and a smaller one in the lighthouse. Hours vary — confirm first.`,
  },
  {
    q: "Why is the sea off Cape Agulhas so dangerous?",
    a: "A shallow bank 250 km wide, a warm current over it, and westerly gales blowing against that current.",
  },
];

export const metadata: Metadata = {
  // Keyword-led title tag; the H1 below stays in the host voice.
  title: post.seoTitle ?? post.title,
  description: post.seoDescription ?? post.excerpt,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListLd({
              name: "The older Cape Agulhas shipwrecks",
              path: `/blog/${post.slug}`,
              items: chapters,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd(faqs)),
        }}
      />

      <BlogHero
        image={post.cover.src}
        alt={post.cover.alt}
        eyebrow="Guide · The shipwreck coast"
        title={post.title}
        intro="The Cape Agulhas shipwrecks are not a legend. Around 150 ships have gone down here since 1673, and one is a beach walk from our front door."
        byline={`By ${site.contact.hostName} & family`}
        datePublished={post.datePublished}
        readingMinutes={post.readingMinutes}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="prose-gv">
          <p>
            There is a bow sticking out of the sand east of our house.
            Rust-orange, tilted, smaller than people expect. Guests ask the
            same thing: how did a ship end up <em>there</em>, in sight of a
            lighthouse?
          </p>
          <p>
            Sailors called this coast the Graveyard of Ships long before anyone
            was selling holidays here. They were not being dramatic.
          </p>
        </div>

        <TLDR
          label="The short version"
          items={[
            "Around 150 ships lost here since 1673; counts run from 130 to 250.",
            "The Meisho Maru No. 38 ran aground in 1982; all 17 crew swam ashore. The only wreck visible from land.",
            "The Agulhas current danger is physical: a shallow bank 250 km wide, gales blowing into the current.",
            "The Birkenhead (1852), behind “women and children first”, sank off Gansbaai — not here.",
            `Historic shipwrecks of the Western Cape are gathered in the Bredasdorp Shipwreck Museum, ${site.distances.bredasdorpKm} km inland.`,
          ]}
        />

        <StatGrid
          stats={[
            {
              value: "1673",
              label: "the first wreck on record",
              body: "The Zoetendal, a Dutch East India Company ship.",
            },
            {
              value: "~150",
              label: "ships lost around Agulhas",
              body: "The museum's figure. The early ones went unrecorded.",
            },
            {
              value: "1849",
              label: "the lighthouse first lit",
              body: "Built after the Arniston. Still the country's second-oldest.",
            },
          ]}
        />

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Why the sea here kills ships
          </h2>
          <p>
            Start with the floor. The{" "}
            <a
              href="https://en.wikipedia.org/wiki/Agulhas_Bank"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              Agulhas Bank
            </a>{" "}
            is a shallow shelf reaching 250 kilometres out, and shallow water
            makes a swell taller and steeper. Then the current: the warm
            Agulhas current pours down over that bank while the weather comes
            from the west. A gale blowing into a current running the other way
            does not make the sea rough &mdash; it makes it vertical, which is
            why oceanographers come here to study{" "}
            <a
              href="https://link.springer.com/article/10.1023/A:1007978326982"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              freak waves
            </a>
            . And Agulhas is flat: no land in sight until it is under you.
          </p>
        </div>

        <Callout eyebrow="The whole argument, in one line">
          Every other coast keeps its history in a museum. This one keeps it in
          the surf.
        </Callout>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            The Meisho Maru wreck: the one you can walk to
          </h2>
          <p>
            On 16 November 1982 a Japanese trawler was driven ashore in a storm
            just west of the lighthouse, her hold full of frozen tuna. She
            grounded so close in that all seventeen crew swam ashore.
          </p>
          <p>
            Do not expect a ship. Forty years of surf have taken most of her;
            the bow is what is left. Still worth the walk, straight out of{" "}
            <Link
              href="/#the-setting"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              the reserve we sit inside
            </Link>{" "}
            and the first stop on our{" "}
            <Link
              href="/blog/things-to-do-cape-agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              list of things to do around the tip
            </Link>
            . Go on a falling tide, and look rather than climb.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.gardenBeachCurve.src}
            alt={img.gardenBeachCurve.alt}
            width={img.gardenBeachCurve.width}
            height={img.gardenBeachCurve.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The beach the walk follows &mdash; east from our wall
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            The wrecks that came before it
          </h2>
        </div>
      </div>

      <NumberedList
        variant="grid"
        items={chapters.map((c) => ({ title: c.name, body: c.description }))}
      />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Where to see the historic shipwrecks of the Western Cape
          </h2>
          <p>
            What came ashore is in one building &mdash; the{" "}
            <a
              href="https://capeagulhastourism.co.za/establishment/bredasdorp-shipwreck-museum/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              Bredasdorp Shipwreck Museum
            </a>
            , {site.distances.bredasdorpKm} kilometres inland: cannon,
            figureheads, chinaware, navigation instruments, most of it
            original. Hours vary, so check before you drive out.
          </p>
          <p>
            The lighthouse has a small museum too. That is a Saturday, on the
            road you{" "}
            <Link
              href="/blog/cape-town-to-cape-agulhas-road-trip"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              already drive in on
            </Link>
            . Sunday is either{" "}
            <Link
              href="/blog/land-based-whale-watching-cape-agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              whales from the shore
            </Link>{" "}
            or the{" "}
            <Link
              href="/blog/wine-tasting-near-cape-agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              Elim wine ward
            </Link>{" "}
            inland.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Lighthouse history: 1849
          </h2>
          <p>
            The Arniston is what moved the argument. The lamp was{" "}
            <a
              href="https://sahistory.org.za/dated-event/cape-agulhas-lighthouse-begins-operating"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              first lit on 1 March 1849
            </a>
            , local limestone modelled on the Pharos of Alexandria. It helped;
            it did not fix the problem. The Elise, the Cooranga and the Meisho
            Maru all went down within sight of it.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Frequently asked questions
          </h2>
          {faqs.map((f) => (
            <p key={f.q}>
              <strong>{f.q}</strong>
              <br />
              {f.a}
            </p>
          ))}
        </div>

        <ClosingBlock
          title="The honest summary"
          thesis="Three and a half centuries of wrecks, for reasons that have not changed — and one of them still lies at the end of our beach."
          body={
            <>
              The wreck in the morning, the museum after lunch, back at the
              braai before dark. Autumn gives the swell without the winter rain
              &mdash;{" "}
              <Link
                href="/#book"
                className="font-medium text-sea-deep underline-offset-4 hover:underline"
              >
                hold your dates
              </Link>{" "}
              and we will point you at the right tide.
            </>
          }
        />

        <Sources
          items={[
            {
              label: "South African History Online — the Agulhas lighthouse",
              href: "https://sahistory.org.za/dated-event/cape-agulhas-lighthouse-begins-operating",
            },
            {
              label: "National Army Museum — the Birkenhead, 1852",
              href: "https://www.nam.ac.uk/explore/birkenhead-sinking",
            },
            {
              label: "Wikipedia — the Arniston, 1815",
              href: "https://en.wikipedia.org/wiki/Arniston_(ship)",
            },
            {
              label: "Wikipedia — the Agulhas Bank",
              href: "https://en.wikipedia.org/wiki/Agulhas_Bank",
            },
            {
              label: "Cape Agulhas Tourism — the Shipwreck Museum",
              href: "https://capeagulhastourism.co.za/establishment/bredasdorp-shipwreck-museum/",
            },
            {
              label: "SANParks — Agulhas National Park",
              href: "https://www.sanparks.org/parks/agulhas",
            },
          ]}
        />
      </div>

      <WhatsAppCTA
        title="Stay where the story ends"
        body={`The wreck is a beach walk from the front door. Gans-te-Ver sleeps ${site.capacity.sleeps} inside the Suiderstrand reserve — ${site.capacity.bedrooms} en-suite bedrooms and the sea in front of the house.`}
        buttonLabel="Check availability on WhatsApp"
        pageKey="blog"
      />
    </article>
  );
}
