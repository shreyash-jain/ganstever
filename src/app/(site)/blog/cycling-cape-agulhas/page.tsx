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
import { articleLd, breadcrumbLd, faqLd } from "@/lib/jsonld";
import { getPost } from "@/lib/posts";
import { site } from "@/lib/site";
import { img } from "@/lib/images";

const post = getPost("cycling-cape-agulhas")!;

const linkCls = "font-medium text-sea underline-offset-4 hover:underline";
const h2Cls = "font-display text-2xl text-sea-deep md:text-3xl";

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>
      {children}
    </a>
  );
}

// Rendered below as visible text AND emitted as FAQPage JSON-LD from this one
// array. No invented trail names, no current race dates, no operating hours.
const faqs = [
  {
    q: "Is Cape Agulhas a good place for mountain biking?",
    a: "If you mean technical single-track, we can't point you to a verified, year-round trail network here. If you mean cycling generally — flat coast roads, reserve gravel, a wide-open view — yes, and it's underrated.",
  },
  {
    q: "Are there beginner-friendly cycling routes around Suiderstrand?",
    a: "Yes. The coast road and the reserve's own gravel roads are flat and carry almost no traffic. The out-and-back to the southernmost tip is the easiest start.",
  },
  {
    q: "How long are the cycling routes around Suiderstrand?",
    a: `It depends which road you pick rather than a fixed trail: about ${site.distances.southernmostTipKm} km to the tip, ${site.distances.lighthouseKm} km to the lighthouse, ${site.distances.struisbaaiKm} km to Struisbaai — one-way distances you can ride as an out-and-back or stitch into a longer loop.`,
  },
  {
    q: "What should I bring for cycling at Cape Agulhas?",
    a: "A gravel or hybrid bike rather than a downhill mountain bike, a helmet, more water than feels necessary, sun protection, and a basic repair kit — the nearest bike shop is a drive away.",
  },
  {
    q: "Can families cycle together around Suiderstrand?",
    a: "Yes, on the flat coast road. Watch the wind with younger or less confident riders, and turn back before anyone's tired rather than after.",
  },
  {
    q: "Where can I stay when exploring Cape Agulhas by bike?",
    a: `We're biased: Gans-te-Ver sleeps ${site.capacity.sleeps} across ${site.capacity.bedrooms} en-suite bedrooms in Suiderstrand, about ${site.distances.southernmostTipKm} km from the tip, with a gravel road leading straight out to the rides above.`,
  },
];

export const metadata: Metadata = {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(faqs)) }}
      />

      <BlogHero
        image={post.cover.src}
        alt={post.cover.alt}
        eyebrow="Guide · Cycling at Cape Agulhas"
        title={post.title}
        intro="Search “mountain biking Cape Agulhas” and you'll expect single-track. What's actually here is flat coast road, reserve gravel and a southeaster that decides more than any trail map does — and it's still worth bringing a bike."
        byline={`By ${site.contact.hostName} & family`}
        datePublished={post.datePublished}
        readingMinutes={post.readingMinutes}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="prose-gv">
          <p>
            We get asked about bikes more often than we expected, usually by
            someone who has found a map online showing three routes and wants
            to know which to ride first. The honest answer is that we have not
            been able to verify the trail network that map seems to promise —
            and we have lived on this stretch of coast since 1991.
          </p>
          <p>
            What is here instead is flatter, slower, and arguably better
            suited to a holiday than switchbacks would be: gravel roads
            through the reserve, a quiet coast road to Struisbaai, and one
            hilly race day a year that briefly turns this into mountain-bike
            country.
          </p>
        </div>

        <TLDR
          label="The short version"
          items={[
            "We could not verify a marked, year-round mountain-bike trail network at Suiderstrand — what's here is road and gravel riding on flat to gently rolling ground.",
            `The out-and-back to the southernmost tip is about ${site.distances.southernmostTipKm} km from our gate; to the lighthouse, about ${site.distances.lighthouseKm} km; to Struisbaai, about ${site.distances.struisbaaiKm} km — all on sealed or graded roads.`,
            "The Cape Agulhas Classic MTB has run as a one-day community race in past years — confirm the current year's listing before you plan a trip around it.",
            "The southeaster, not the terrain, is what actually slows you down here. Ride mornings if you can.",
            "A gravel or hybrid bike suits this coast better than a downhill mountain bike — bring your own; we don't know of a rental shop in Suiderstrand itself.",
          ]}
        />

        <StatGrid
          stats={[
            {
              value: `${site.distances.southernmostTipKm} km`,
              label: "gate to the southernmost tip",
              body: "Flat the whole way — a fair ride before breakfast.",
            },
            {
              value: `${site.distances.lighthouseKm} km`,
              label: "gate to the Cape Agulhas lighthouse",
              body: "A longer out-and-back, with a climb up the tower at the end if you want it.",
            },
            {
              value: `${site.distances.struisbaaiKm} km`,
              label: "gate to Struisbaai",
              body: "One-way along the coast road; loop back a different way if you know the side streets.",
            },
          ]}
        />

        <div className="prose-gv">
          <h2 className={h2Cls}>What&rsquo;s actually here, versus what the map promised you</h2>
          <p>
            If someone sent you a trail map with three distances on it — a
            short loop, something in the twelves, a longer one past twenty —
            we would like to see it too. We searched for an official,
            public mountain-bike trail network at Suiderstrand and came up
            empty. The{" "}
            <Ext href="https://www.sanparks.org/parks/agulhas">
              SANParks page for Agulhas National Park
            </Ext>{" "}
            does not list mountain biking among its activities, and more than
            one route-sharing site flags cycling as restricted on stretches of
            the coastal path near the lighthouse and the tip itself.
          </p>
          <p>
            None of that means the map is fake. It may describe a private
            farm route, a one-off race course, or something drawn for a
            single event rather than a public trail. What we will not do is
            print three distances as fact when we cannot point you to where
            they come from. If you have the source, we would genuinely like
            to see it — it would make this a better post. Until then, here is
            what we can actually stand behind.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.cyclingFynbosTrack.src}
            alt={img.cyclingFynbosTrack.alt}
            width={img.cyclingFynbosTrack.width}
            height={img.cyclingFynbosTrack.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            A reserve track through the fynbos &mdash; illustrative
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className={h2Cls}>The riding that is actually here</h2>
          <p>
            The Agulhas Plain is, by any description we could find, flat to
            gently rolling — limestone and sand under fynbos, not the
            switchback country a mountain bike is built for. That makes it
            good cycling country of a different kind. Suiderstrand&rsquo;s own
            gravel roads thread through the reserve behind the dunes; the
            tarred coast road runs from here past the lighthouse to
            Struisbaai and on to L&rsquo;Agulhas, with almost no traffic
            outside the December peak.
          </p>
          <p>
            None of it is waymarked for bikes specifically. You are riding
            public roads, not a signed network, so bring a map of your own and
            keep an eye out for cars on the tar stretches. Inside Agulhas
            National Park itself, check with SANParks before you ride — some
            of the paths closest to the tip and the lighthouse are for
            walkers only, and the rules are the kind of thing that changes
            without much warning.
          </p>
        </div>

        <Callout eyebrow="What we would tell a friend">
          Bring a gravel bike, not a downhill one. The hill here is the wind,
          and it blows every day of the year.
        </Callout>

        <div className="prose-gv">
          <h2 className={h2Cls}>
            The one day a year this briefly becomes mountain-bike country
          </h2>
          <p>
            The{" "}
            <Ext href="https://xplorio.com/agulhas/cape-agulhas-classic-mtb">
              Cape Agulhas Classic MTB
            </Ext>{" "}
            is a community race and trail run that has, in past years, run a
            loop from Struisbaai past the lighthouse toward Suiderstrand and
            back through the back roads. It is the closest thing to organised
            mountain biking this area has produced, complete with route
            marshals and a finish-line braai. We could not confirm whether it
            is running in its usual form this year, so check the current
            listing before you build a trip around a specific date.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.cyclingBicycleFencePost.src}
            alt={img.cyclingBicycleFencePost.alt}
            width={img.cyclingBicycleFencePost.width}
            height={img.cyclingBicycleFencePost.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The kind of bike this coast actually suits &mdash; illustrative
          </figcaption>
        </figure>
      </div>

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="prose-gv">
          <h2 className={h2Cls}>What to pack for a ride here</h2>
          <p>
            Nothing exotic, but a few things matter more here than they would
            on a managed trail with a shop at the trailhead.
          </p>
        </div>
      </div>

      <NumberedList
        variant="grid"
        items={[
          {
            title: "A gravel or hybrid bike",
            body: "Comfortable tyres that handle gravel and tar both — not a lightweight road racer, not a downhill mountain bike.",
          },
          {
            title: "Helmet and gloves",
            body: "Non-negotiable in the wind and on loose gravel surfaces.",
          },
          {
            title: "More water than feels necessary",
            body: "There is nowhere to buy a drink between Suiderstrand and Struisbaai or L'Agulhas. Carry what you need both ways.",
          },
          {
            title: "Sun protection",
            body: "Sunscreen, sunglasses, something to cut the wind on your face — the glare off the limestone roads is real.",
          },
          {
            title: "A basic repair kit",
            body: "Spare tube, pump, multitool. The nearest bike shop is a proper drive away, not a phone call.",
          },
          {
            title: "An offline map on your phone",
            body: "Signal gets patchy on the gravel stretches through the reserve.",
          },
        ]}
      />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="prose-gv">
          <h2 className={h2Cls}>Other things to do near here</h2>
          <p>
            A bike is one way to see this coast, not the only one. Our{" "}
            <Link href="/blog/agulhas-national-park-visitor-guide" className={linkCls}>
              Agulhas National Park visitor guide
            </Link>{" "}
            covers the tip, the lighthouse and the park&rsquo;s cycling rules in
            more detail, and our{" "}
            <Link href="/blog/things-to-do-cape-agulhas" className={linkCls}>
              full guide to things to do
            </Link>{" "}
            rounds up the rest — the shipwreck, the harbour at Struisbaai, the
            walking trails that start from our own gate. If you only have a
            weekend, our{" "}
            <Link href="/blog/cape-agulhas-weekend-itinerary" className={linkCls}>
              48-hour itinerary
            </Link>{" "}
            fits a ride in alongside everything else worth doing.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.fynbosSea.src}
            alt={img.fynbosSea.alt}
            width={img.fynbosSea.width}
            height={img.fynbosSea.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The fynbos between our wall and the sea &mdash; not a marked
            trail, just where most of our own rides start
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className={h2Cls}>Where to stay if you&rsquo;re bringing a bike</h2>
          <p>
            Our family built{" "}
            <Link href="/#the-house" className={linkCls}>
              Gans-te-Ver
            </Link>{" "}
            in Suiderstrand in 1991 and opened it to guests in 2024. It
            sleeps {site.capacity.sleeps} across {site.capacity.bedrooms}{" "}
            en-suite bedrooms, and the gravel road out front is the same one
            that leads to every ride in this post. There is a double garage
            and a shaded carport — somewhere dry to keep a bike that is not
            the same corner as the beach towels.
          </p>
          <p>
            We will say the quiet part plainly: if you came here hoping for
            a bike park, we cannot give you one, and we would rather tell you
            that now than have you find out on the gravel road in.
          </p>
        </div>

        <div className="prose-gv mt-16">
          <h2 className={h2Cls}>Frequently asked questions</h2>
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
          thesis="Bring a gravel bike, not a downhill one — and ride before the wind wakes up."
          body={
            <>
              The roads here will not test your suspension. They will show
              you a coastline most cyclists never see, at the pace a bike
              gives you over a car. When you are ready to plan the rest of
              the stay around it,{" "}
              <Link
                href="/#book"
                className="font-medium text-sea-deep underline-offset-4 hover:underline"
              >
                ask us about your dates
              </Link>
              .
            </>
          }
        />

        <Sources
          items={[
            {
              label: "SANParks — Agulhas National Park",
              href: "https://www.sanparks.org/parks/agulhas",
            },
            {
              label: "SANParks — hikes, walks and trails at Agulhas",
              href: "https://www.sanparks.org/parks/agulhas/what-to-do/activities/hikes-walks-trails",
            },
            {
              label: "Xplorio — Cape Agulhas Classic MTB",
              href: "https://xplorio.com/agulhas/cape-agulhas-classic-mtb",
            },
          ]}
        />
      </div>

      <WhatsAppCTA
        title="Bring the bike. We'll keep the gravel road ready."
        body={`Five en-suite bedrooms, ${site.capacity.sleeps} guests, and a reserve road leading straight out from the gate. Message us for dates.`}
        buttonLabel="Check availability on WhatsApp"
        pageKey="blog"
      />
    </article>
  );
}
