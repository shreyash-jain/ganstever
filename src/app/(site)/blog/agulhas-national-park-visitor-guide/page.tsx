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

const post = getPost("agulhas-national-park-visitor-guide")!;

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
// array, so the markup can never describe something the reader cannot see.
// Deliberately no opening hours and no rand figures: both go stale.
const faqs = [
  {
    q: "Is Agulhas National Park the southernmost point of Africa?",
    a: "The southernmost tip of Africa is at Cape Agulhas, on the park's coast. Cape Point, near Cape Town, is a common mix-up: it is about 150 km to the north-west.",
  },
  {
    q: "Where exactly do the Atlantic and Indian oceans meet?",
    a: "Officially at the 20° east line, which reaches land at Cape Agulhas. It is a line on a map agreed in 1953, not a line in the water; the real mixing is a slow churn offshore.",
  },
  {
    q: "How far is Agulhas National Park from Cape Town?",
    a: `About ${site.distances.capeTownKm} km by road, roughly ${site.distances.capeTownHours} without long stops.`,
  },
  {
    q: "How much time do you need at Cape Agulhas?",
    a: "Half a day covers the tip, the lighthouse and a look at the wreck. A day or two lets you walk, watch birds and see it in more than one light.",
  },
  {
    q: "Is it free to visit the southernmost tip?",
    a: "No. SANParks charges a daily conservation fee for the park, and the lighthouse has its own entry. Rates change each year, so check the SANParks fee page before you drive.",
  },
  {
    q: "Is the Cape Agulhas lighthouse open to visitors?",
    a: "Yes, there is a lighthouse museum and you can go up. Hours vary, so confirm before you go.",
  },
  {
    q: "Where can you stay near Agulhas National Park?",
    a: `SANParks has its own rest camp in the park. Outside it, Suiderstrand and L'Agulhas have self-catering houses; ours, Gans-te-Ver, sleeps ${site.capacity.sleeps} and is ${site.distances.southernmostTipKm} km from the tip.`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(faqs)) }}
      />

      <BlogHero
        image={post.cover.src}
        alt={post.cover.alt}
        eyebrow="Guide · Agulhas National Park"
        title={post.title}
        intro="Agulhas National Park holds the southernmost tip of Africa, but the tip is the smallest thing in it. Here is the rest, from a family that has holidayed beside it since 1991."
        byline={`By ${site.contact.hostName} & family`}
        datePublished={post.datePublished}
        readingMinutes={post.readingMinutes}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="prose-gv">
          <p>
            Most people give Agulhas National Park exactly as long as it takes
            to be photographed beside a stone map of Africa. Fair enough. It is
            a good map, and you have driven a long way to stand on it.
          </p>
          <p>
            But the map sits on the edge of something much bigger, and the
            bigger thing is why we have come back every summer since 1991. This
            is how we would spend a day or two there, and where we would
            sleep afterwards.
          </p>
        </div>

        <TLDR
          label="The short version"
          items={[
            "Agulhas National Park holds the southernmost tip of Africa, the 1849 lighthouse and the one shipwreck you can still see from shore.",
            `It is about ${site.distances.capeTownKm} km from Cape Town, a drive of roughly ${site.distances.capeTownHours}. Plan half a day for the landmarks, a day or two for the park itself.`,
            "The real wealth is the fynbos and the birds, not big game. There are no Big Five here.",
            "Whales come in winter and spring, often but never on demand. Wind decides most of your plans, whatever the month.",
            `Staying in Suiderstrand puts you ${site.distances.southernmostTipKm} km from the tip, so you can go at either end of the day.`,
          ]}
        />

        <StatGrid
          stats={[
            {
              value: "1999",
              label: "the park was proclaimed",
              body: "The older Cape Agulhas and Struisbaai nature reserves were folded into it.",
            },
            {
              value: "~2,000",
              label: "plant species, by SANParks' count",
              body: "About 100 of them are found nowhere else.",
            },
            {
              value: `${site.distances.southernmostTipKm} km`,
              label: "from our front door to the tip",
              body: "Approximate road distance from Suiderstrand.",
            },
          ]}
        />

        <div className="prose-gv">
          <h2 className={h2Cls}>What Agulhas National Park actually is</h2>
          <p>
            It is a long strip of wild coast and coastal plain, roughly 21,000
            hectares by{" "}
            <Ext href="https://www.birdlife.org.za/iba-directory/agulhas-plain-heuningnes-estuary/">
              BirdLife South Africa&rsquo;s figure
            </Ext>
            , and it keeps growing as land is added. Limestone shelves run into
            the sea. Behind them the ground rolls inland through fynbos and
            wetland, with salt pans and the odd flat, shining vlei.
          </p>
          <p>
            It is not a big-game park, and anyone who arrives hoping for
            elephants will be disappointed by about the second kilometre. What
            it protects is quieter: a piece of the Cape Floral Region, one of
            the most plant-rich places on earth, plus the birds that live in
            it. The{" "}
            <Ext href="https://www.sanparks.org/parks/agulhas">
              SANParks page for the park
            </Ext>{" "}
            is the place to check current rules and fees.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.agulhasParkFynbos.src}
            alt={img.agulhasParkFynbos.alt}
            width={img.agulhasParkFynbos.width}
            height={img.agulhasParkFynbos.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Limestone fynbos &mdash; illustrative
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className={h2Cls}>The southernmost tip of Africa</h2>
          <p>
            Start here, because everyone does. The tip is marked by a map of the
            continent laid out in stone, with the sea breaking a few metres
            behind it. Cape Agulhas, not Cape Point, is the true southernmost
            point of Africa. Cape Point is about 150 km north-west and looks
            more dramatic on a postcard, which is how the confusion survives.
          </p>
          <p>
            The monument also marks the official boundary between the Atlantic
            and Indian oceans, and that deserves a caution. The line is
            real on a map, at 20° east. In the water there is nothing to see,
            and we wrote a whole post about{" "}
            <Link href="/blog/two-oceans-meet-cape-agulhas-myth" className={linkCls}>
              why two oceans do not really meet in a line
            </Link>
            . Go for the place, not for a colour change.
          </p>
          <p>
            Our advice is the edge of the day. The light is kinder, and the
            wind is often kinder too.
          </p>

          <h2 className={h2Cls}>The Cape Agulhas lighthouse</h2>
          <p>
            Lit on 1 March 1849, it is{" "}
            <Ext href="https://sahistory.org.za/node/10977">
              the second-oldest lighthouse still working in South Africa
            </Ext>
            , modelled on the Pharos of Alexandria. There is a small museum
            inside, and you can climb for a view along the whole flat coast.
            You will see why sailors lost ships here. Hours vary, so confirm
            before you go; we would rather you did that than arrive at a
            locked door.
          </p>

          <h2 className={h2Cls}>The Meisho Maru shipwreck</h2>
          <p>
            On 16 November 1982 a Japanese fishing vessel, the Meisho Maru 38,
            ran aground about 4 km west of the lighthouse. According to
            SANParks, it is{" "}
            <Ext href="https://www.sanparks.org/parks/agulhas/explore/heritage/shipwrecks-and-maritime-heritage">
              the only wreck still visible
            </Ext>{" "}
            from the shore along this coast. What is left is rust and a bow, and
            it is smaller than people expect. Walk to it, look, and do not
            climb. The rocks are sharp and the swell does not warn you. For the
            older wrecks, and the reasons for them, read{" "}
            <Link href="/blog/cape-agulhas-shipwrecks" className={linkCls}>
              our shipwreck post
            </Link>
            .
          </p>
        </div>

        <Callout eyebrow="What we would tell a friend">
          Give the tip an hour and the rest of the park the rest of your stay.
        </Callout>

        <div className="prose-gv">
          <h2 className={h2Cls}>Fynbos, birds and the quiet side of the park</h2>
          <p>
            This is the part we love, and the part most day visitors miss. SANParks
            counts around 2,000 plant species in the park, including some 100
            that grow nowhere else, much of it on the pale limestone soils you
            can see underfoot. It is small, tough, silver-green country. It
            looks plain from the car and extraordinary at knee height.
          </p>
          <p>
            Birds follow the plants. BirdLife lists the Agulhas Plain as an
            important bird area: Cape cormorants along the coast, sunbirds and
            sugarbirds in the fynbos, and, on the salt pans inland, flamingos
            that turn up in numbers on occasion. Occasionally is the honest
            word. We have had mornings with a pan full of birds and mornings
            with wind and one heron.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.agulhasParkSaltPan.src}
            alt={img.agulhasParkSaltPan.alt}
            width={img.agulhasParkSaltPan.width}
            height={img.agulhasParkSaltPan.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The inland side of the plain &mdash; illustrative
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className={h2Cls}>Whales, and when to come</h2>
          <p>
            Southern right whales come close to this shore in winter and spring.
            Often, not always; nobody can promise you a sighting, and anyone who
            does is selling something. If whales are why you are coming, we
            have written two posts on{" "}
            <Link href="/blog/cape-agulhas-whale-watching-season" className={linkCls}>
              planning around the whale season
            </Link>{" "}
            and{" "}
            <Link href="/blog/land-based-whale-watching-cape-agulhas" className={linkCls}>
              where to stand on land
            </Link>
            .
          </p>
          <p>
            The other seasons have their own case. Summer gives long days, and
            autumn gives the clearest light for photographs. Spring brings
            flowers on the fynbos. And the wind blows in all of them: the
            southeaster can turn a pleasant walk into a bracing one, so pack a
            jacket in January as well as June.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="prose-gv">
          <h2 className={h2Cls}>One day in and around the park</h2>
          <p>
            If you only have a day, this order works. We have left out clock
            times on purpose: opening hours vary, so check each stop before you
            drive.
          </p>
        </div>
      </div>

      <NumberedList
        variant="grid"
        items={[
          {
            title: "Early",
            body: "Coffee, then the tip while the light is low. Walk the shoreline beside it for a while before the car park fills.",
          },
          {
            title: "Mid-morning",
            body: "The lighthouse and its museum. Climb, look at the flat country, and let it explain the shipwrecks.",
          },
          {
            title: "Late morning",
            body: "The Meisho Maru on foot, if the tide and the swell allow. Look rather than climb.",
          },
          {
            title: "Lunch",
            body: `Padkos in the car or a table in L'Agulhas or Struisbaai, ${site.distances.struisbaaiKm} km away. We do not know of shops inside the park, so bring water.`,
          },
          {
            title: "Afternoon",
            body: "A slow stretch of fynbos and shore, or Struisbaai harbour. Then home before dark.",
          },
        ]}
      />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="prose-gv">
          <p>
            The tighter version is in our{" "}
            <Link href="/blog/cape-agulhas-weekend-itinerary" className={linkCls}>
              48-hour weekend itinerary
            </Link>
            , and the full list of things to do is{" "}
            <Link href="/blog/things-to-do-cape-agulhas" className={linkCls}>
              here
            </Link>
            .
          </p>

          <h2 className={h2Cls}>Where to stay near Agulhas National Park</h2>
          <p>
            You can drive down from Cape Town for the day. About {site.distances.capeTownKm}{" "}
            km each way is a long day for what you see, and you spend it in the
            car instead of the park. Sleeping nearby lets you take the tip at
            sunrise and the wreck on a falling tide, and then do nothing.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.sunroomBraai.src}
            alt={img.sunroomBraai.alt}
            width={img.sunroomBraai.width}
            height={img.sunroomBraai.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The braai corner at Gans-te-Ver, with the sea along one wall
          </figcaption>
        </figure>

        <div className="prose-gv">
          <p>
            We are biased, obviously. Our family built{" "}
            <Link href="/#the-house" className={linkCls}>
              Gans-te-Ver
            </Link>{" "}
            in Suiderstrand in 1991 and opened it to guests in 2024. It sleeps{" "}
            {site.capacity.sleeps} across {site.capacity.bedrooms} en-suite
            bedrooms, stands inside a{" "}
            <Link href="/#the-setting" className={linkCls}>
              coastal nature reserve
            </Link>{" "}
            a few metres from the beach, and the tip is about{" "}
            {site.distances.southernmostTipKm} km away, with the lighthouse at{" "}
            {site.distances.lighthouseKm} km. The kitchen is self-catering, there
            is a pizza oven and an indoor and outdoor braai.
          </p>
          <p>
            One thing to know. The house is a base, not a venue: no parties or
            events, and quiet hours run {site.policies.quietHours} because the
            reserve is quiet. If that suits you, so will the rest.
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
          thesis="The tip takes an hour. The park takes as long as you give it."
          body={
            <>
              Come for the stone map if you must; everyone does. Then stay
              long enough to see the fynbos at knee height and the pans in
              late light. When you are ready,{" "}
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
              label: "SANParks — shipwrecks and maritime heritage",
              href: "https://www.sanparks.org/parks/agulhas/explore/heritage/shipwrecks-and-maritime-heritage",
            },
            {
              label: "SANParks — daily conservation fees",
              href: "https://www.sanparks.org/travel/book/useful-information/rates-fees",
            },
            {
              label: "SANParks — vegetation of Agulhas National Park",
              href: "https://www.sanparks.org/parks/agulhas/explore/fauna-flora/vegetation",
            },
            {
              label: "BirdLife South Africa — Agulhas Plain & Heuningnes Estuary IBA",
              href: "https://www.birdlife.org.za/iba-directory/agulhas-plain-heuningnes-estuary/",
            },
            {
              label: "South African History Online — the Cape Agulhas lighthouse",
              href: "https://sahistory.org.za/node/10977",
            },
            {
              label: "Atlas Obscura — Wreck of the Meisho Maru No. 38",
              href: "https://www.atlasobscura.com/places/wreck-of-the-meisho-maru-no-38",
            },
          ]}
        />
      </div>

      <WhatsAppCTA
        title="Make Gans-te-Ver your base at the tip"
        body={`Five en-suite bedrooms, ${site.capacity.sleeps} guests, the reserve around you and the beach a few metres away. Message us for dates.`}
        buttonLabel="Check availability on WhatsApp"
        pageKey="blog"
      />
    </article>
  );
}
