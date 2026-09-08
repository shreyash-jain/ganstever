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

const post = getPost("cape-agulhas-weekend-itinerary")!;

// The six blocks of the weekend — rendered as the NumberedList and emitted as
// ItemList JSON-LD from one source so the two can never drift apart.
const blocks = [
  {
    name: "Friday, 14:00 — leave",
    description:
      "N2 east out of the city and up Sir Lowry's Pass. Stop at the lay-by near the top: False Bay, the Cape Flats and Table Mountain behind you in one frame, and the last of the Cape most people know. Everything after it is wheat, sky and space.",
  },
  {
    name: "Friday, 16:15 — Bredasdorp",
    description:
      "The last proper shop, 37 km short of the house. Meat for two braais, bread, fruit, wine. If you are running early, the Shipwreck Museum is a short walk from the main street and a good primer for Saturday — check the hours before you count on it.",
  },
  {
    name: "Friday, 17:30 — arrive, and then stop",
    description:
      "Do not plan anything for this evening. Drop the bags, walk the few metres down to the water while there is still light, then come back and light the fire. This is the hour the whole weekend is actually for.",
  },
  {
    name: "Saturday, 07:30 — the coast, early",
    description:
      "Walk east along the shore. The wind is usually still down before nine, the light is at its best, and you will have the sand to yourselves. The bow of the Meisho Maru sits in the surf along this stretch — close enough to reach on foot and be back for breakfast.",
  },
  {
    name: "Saturday, 12:30 — the lighthouse, the tip, the harbour",
    description:
      "The 1849 lighthouse first, then the boardwalk out to the southernmost marker — a short, flat walk that takes less time than people expect. Carry on to Struisbaai afterwards for the harbour: painted ski-boats on the slipway and, often, a short-tail stingray or two in the shallows by the wall.",
  },
  {
    name: "Sunday, 08:00 — the slow one",
    description:
      "Coffee upstairs while the sea does whatever it is doing. A last walk or a last swim, pack without hurrying, and out by ten. You will be back in Cape Town by mid-afternoon with sand still in the car, which is the correct condition to arrive home in.",
  },
];

// Five practical questions the body prose does not already answer — the ones
// that actually arrive by WhatsApp before a two-night booking. FAQPage markup
// has to mirror what a reader can see, so all five are rendered below.
const faqs = [
  {
    q: "Is two nights actually long enough?",
    a: "For the southernmost tip, the lighthouse, one long beach morning and two unhurried evenings — yes, comfortably. For those plus Arniston, De Hoop or a wine day inland — no. Something gets rushed, and it is usually the part you came for.",
  },
  {
    q: "What time do we need to leave Cape Town?",
    a: `By 14:00 if you can. Check-in is ${site.policies.checkIn}, the drive is about ${site.distances.capeTownHours} before stops, and a two o'clock start gets you here with enough light to walk down to the sea. Leave at five and you arrive in the dark, having driven the best part of the route without seeing it.`,
  },
  {
    q: "Can we fit in Arniston or De Hoop as well?",
    a: "We would not. Both are worth a day each, and both are a further hour or more from us in opposite directions. On a 48-hour weekend they turn Saturday into a second driving day. Save them for a longer stay.",
  },
  {
    q: "Is an ordinary car fine on the last stretch?",
    a: "Yes. Most of the road into Suiderstrand has been paved and only about two kilometres of gravel are left. Take it slowly — for your suspension, and because there is a fair chance of a tortoise in the road.",
  },
  {
    q: "What happens if the weather turns?",
    a: "Sometimes the southeaster arrives and the beach morning does not happen. That is the honest risk of a two-night booking, and it is why the house has an indoor braai, a pizza oven and more than one room to sit in. Big weather at the bottom of Africa is worth watching from behind glass.",
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
              name: "A 48-hour Cape Agulhas weekend itinerary",
              path: `/blog/${post.slug}`,
              items: blocks,
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
        eyebrow="Guide · The two-night weekend"
        title={post.title}
        intro="A Cape Agulhas weekend itinerary written for people who left the city at lunchtime on Friday — the drive, the one full day you get, and the things we would cut."
        byline={`By ${site.contact.hostName} & family`}
        datePublished={post.datePublished}
        readingMinutes={post.readingMinutes}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="prose-gv">
          <p>
            The question comes in on WhatsApp about twice a month, and it is
            always put the same way: is it worth coming all that way for just a
            weekend? Three hours each way, two nights in the middle.
          </p>
          <p>
            Yes. With one condition, which is that you give up on seeing
            everything. A weekend trip from Cape Town to the southern tip works
            beautifully when you treat it as one place and one day. It falls
            apart the moment you try to bolt Arniston, De Hoop and a wine
            tasting onto the same forty-eight hours.
          </p>
        </div>

        <TLDR
          label="The short version"
          items={[
            `Leave Cape Town by 14:00 on Friday. It is ${site.distances.capeTownKm} km and about ${site.distances.capeTownHours} before stops.`,
            `Two nights is our minimum stay and, for this, exactly the right length — check-in ${site.policies.checkIn}, check-out ${site.policies.checkOut}.`,
            "Do the big shop in Bredasdorp, 37 km out. After that it is an OK and a Pick n Pay in Struisbaai, fifteen minutes away.",
            "Saturday is the only full day you get: the coast in the morning, the lighthouse and the harbour after lunch, nothing at all in the evening.",
            "Leave Arniston and De Hoop for a longer trip. On a 2-night self-catering escape they cost you the day you came for.",
          ]}
        />

        <StatGrid
          stats={[
            {
              value: "44 hours",
              label: "what you actually get",
              body: `Check-in at ${site.policies.checkIn} on Friday, check-out at ${site.policies.checkOut} on Sunday. Forty-eight is the headline; forty-four is the number to plan against.`,
            },
            {
              value: `${site.distances.capeTownKm} km`,
              label: "Cape Town to the gravel",
              body: `About ${site.distances.capeTownHours} without stops. With the Bredasdorp shop, budget three and a half.`,
            },
            {
              value: `${site.policies.minNights} nights`,
              label: "our minimum stay",
              body: `Sleeps ${site.capacity.sleeps} across ${site.capacity.bedrooms} en-suite bedrooms, so the same weekend splits five ways or ten.`,
            },
          ]}
        />

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Can you really do Cape Agulhas in a weekend?
          </h2>
          <p>
            You can, and the arithmetic is less generous than the phrase
            &ldquo;48 hours&rdquo; suggests. Arrive at two on Friday, leave at
            ten on Sunday, and you have forty-four hours. Take six of those for
            the two drives and you are down to thirty-eight. Which sounds thin
            until you notice that an ordinary Cape Town weekend gives you rather
            less, and spends a good part of it in traffic.
          </p>
          <p>
            The three hours are the filter, and they are the reason this coast
            still feels the way it does. Nobody arrives at Suiderstrand by
            accident. Hermanus is ninety minutes closer and has the crowds to
            prove it.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Friday: the Sir Lowry&rsquo;s Pass drive and the Bredasdorp stopover
          </h2>
          <p>
            The route is hard to get wrong: N2 east over Sir Lowry&rsquo;s Pass
            and through Elgin, off at Caledon onto the R316, through Napier to
            Bredasdorp, then the R319 south. Stop at the lay-by near the top of
            the pass. It is the last wide view of the Cape you already know, and
            after it the road trip through the Overberg turns into something
            else entirely &mdash; wheat, sky, and a horizon with nothing on it.
          </p>
          <p>
            Bredasdorp is the stopover that matters. It has the biggest
            supermarket and bottle store on the route, and it sits
            thirty-seven kilometres from our front door. Buy more meat than you
            think you need. The full route, stop by stop, is in our{" "}
            <Link
              href="/blog/cape-town-to-cape-agulhas-road-trip"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              road-trip guide
            </Link>
            .
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.fynbosPathGoldenHour.src}
            alt={img.fynbosPathGoldenHour.alt}
            width={img.fynbosPathGoldenHour.width}
            height={img.fynbosPathGoldenHour.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Late light on the fynbos paths &mdash; the walk you do on Friday
            evening because you have not unpacked yet
          </figcaption>
        </figure>

        <Callout eyebrow="The whole argument, in one line">
          Forty-four hours is not a short holiday. It is one long, uninterrupted
          evening with a day on either side of it.
        </Callout>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            The 48 hours, block by block
          </h2>
          <p>
            This is the version we send people who ask. Nothing in it needs
            booking, and none of the timings are precious &mdash; but the shape
            is deliberate, and the order matters more than the clock.
          </p>
        </div>
      </div>

      <NumberedList
        variant="light"
        items={blocks.map((b) => ({ title: b.name, body: b.description }))}
      />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.harbourSkiBoats.src}
            alt={img.harbourSkiBoats.alt}
            width={img.harbourSkiBoats.width}
            height={img.harbourSkiBoats.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Saturday afternoon &mdash; painted boats on the slipway, and the
            stingrays that hang about the harbour wall
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            What we would cut from a short break in the Western Cape
          </h2>
          <p>
            Most weekend itineraries for this stretch of coast are written by
            people selling a day tour, and they read like a list of everything
            within an hour&rsquo;s drive. Ours is shorter on purpose.
          </p>
          <p>
            <strong>Cut the second town.</strong> Arniston is lovely and it is an
            hour away, which on a two-night trip means half of Saturday in the
            car. <strong>Cut the wine day.</strong> The{" "}
            <Link
              href="/blog/wine-tasting-near-cape-agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              Elim ward
            </Link>{" "}
            is forty-five minutes inland and deserves its own unhurried
            afternoon rather than a squeezed one.{" "}
            <strong>
              Cut anything with an opening time you have not checked.
            </strong>{" "}
            Out here hours vary, seasonally and otherwise, and a closed door at
            the end of a forty-minute drive sours an afternoon quickly. Phone
            ahead.
          </p>
          <p>
            What we would not cut is the empty Friday evening. Every guest who
            has tried to fill it has regretted it.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            What you might see, and what we cannot promise
          </h2>
          <p>
            Between June and November there are usually southern right whales
            along this coast, and from about August to October they come close
            enough to watch from the sand without a boat &mdash; we have a whole{" "}
            <Link
              href="/blog/land-based-whale-watching-cape-agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              guide to watching them from shore
            </Link>
            . On any given weekend, though, they are wild animals and the sea is
            the sea. The same goes for the stingrays at the harbour, and for the
            wreck &mdash; photogenic in flat light, almost invisible in a heavy
            swell. If it helps, the{" "}
            <Link
              href="/blog/cape-agulhas-shipwrecks"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              story of why this coast is full of wrecks
            </Link>{" "}
            is worth reading before you go and stand on the tip.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Why a 2-night self-catering escape, and not a hotel
          </h2>
          <p>
            Forty-four hours is not long enough to enjoy eating out twice a day,
            and it is nowhere near long enough to spend an evening waiting for a
            bill.{" "}
            <Link
              href="/#the-house"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              The house
            </Link>{" "}
            was built by our family in {site.builtIn} for the other kind of
            weekend: one kitchen, one table, {site.capacity.bedrooms} en-suite
            bedrooms and room for {site.capacity.sleeps}. Split across a group, a
            whole house from {site.pricing.currencySymbol}
            {site.pricing.fromZAR.toLocaleString("en-ZA")} a night lands under
            what the same group pays for separate rooms &mdash; and nobody
            queues for a bathroom. Rates move with the season, so message us for
            your dates rather than trusting that figure.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.sunroomSeaTable.src}
            alt={img.sunroomSeaTable.alt}
            width={img.sunroomSeaTable.width}
            height={img.sunroomSeaTable.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The top-floor sunroom &mdash; glassed in during 2026, which is what
            makes a windy Saturday survivable
          </figcaption>
        </figure>

        <div className="prose-gv">
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
          thesis="Two nights is enough at the bottom of Africa, provided you spend both of them in the same place."
          body={
            <>
              Leave at two, shop in Bredasdorp, give Friday evening to nothing at
              all, and keep Saturday to one coastal morning and one afternoon
              out. Then{" "}
              <Link
                href="/#book"
                className="font-medium text-sea-deep underline-offset-4 hover:underline"
              >
                hold your dates
              </Link>{" "}
              earlier than feels necessary &mdash; weekends go before midweek
              does, every time.
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
              label:
                "South African History Online — the Cape Agulhas lighthouse begins operating, 1 March 1849",
              href: "https://sahistory.org.za/dated-event/cape-agulhas-lighthouse-begins-operating",
            },
            {
              label: "Cape Agulhas Tourism — Bredasdorp Shipwreck Museum",
              href: "https://capeagulhastourism.co.za/establishment/bredasdorp-shipwreck-museum/",
            },
            {
              label: "Learn to Dive Today — the Meisho Maru No. 38 wreck",
              href: "https://www.learntodivetoday.co.za/blog/2015/12/13/visible-shipwrecks-meisho-maru-no-38/",
            },
            {
              label:
                "Learn to Dive Today — the stingrays at Struisbaai harbour",
              href: "http://www.learntodivetoday.co.za/blog/2015/11/10/the-stingrays-at-struisbaai-harbour/",
            },
          ]}
        />
      </div>

      <WhatsAppCTA
        title="Two nights, one gravel road, no itinerary to speak of"
        body={`Gans-te-Ver sleeps ${site.capacity.sleeps} inside the Suiderstrand reserve — ${site.capacity.bedrooms} en-suite bedrooms, a pizza oven, and the sea a few metres from the door. Message Madelaine to hold a weekend.`}
        buttonLabel="Check availability on WhatsApp"
        pageKey="blog"
      />
    </article>
  );
}
