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

const post = getPost("cape-town-to-cape-agulhas-road-trip")!;

// The five stops — rendered as the NumberedList and emitted as ItemList
// JSON-LD from one source so the two can never drift apart.
const stops = [
  {
    name: "The Elgin valley, on the N2",
    description:
      "Apple and pear country, and the last stretch that looks like the Cape you see on postcards. The farm stalls along this section make the right first stop — early enough that you are not stopping out of boredom.",
  },
  {
    name: "Caledon and the turn-off",
    description:
      "Not a destination so much as the moment the drive changes character. Once you are onto the R316, the traffic more or less disappears.",
  },
  {
    name: "Napier",
    description:
      "One main street of Victorian buildings, a few antique and farm-produce shops, an entirely different pace. Worth twenty minutes, and more if you like poking around in other people's old furniture.",
  },
  {
    name: "Bredasdorp",
    description:
      "Your last real town: supermarket, bottle store, pharmacy, fuel. Do your shopping here. The Shipwreck Museum is a good primer before you go and stand at the tip.",
  },
  {
    name: "The last twenty minutes",
    description:
      "The land flattens and opens, and then quite suddenly there is sea at the end of the road. No viewpoint, no lay-by. It just happens, and everyone in the car goes quiet for a second.",
  },
];

// Kept deliberately short: anything already answered in the body prose is not
// repeated here. FAQPage markup has to mirror what a reader can actually see,
// so these three are the ones the body does not cover.
const faqs = [
  {
    q: "Can we bring the dog?",
    a: "Dogs are welcome at the house, by prior arrangement. But Suiderstrand is an enclave surrounded by Agulhas National Park, and SANParks does not permit pets anywhere in a national park — so plan for a dog that is happy at the house rather than one that needs a long beach run. Confirm the current rules with SANParks before you travel.",
  },
  {
    q: "When is the best time of year to come?",
    a: `September and October, for the whales, the flowering fynbos and the light. Midwinter is excellent if you want big weather and an empty coast. Minimum stay is ${site.policies.minNights} nights, and long weekends go first.`,
  },
  {
    q: "Is there signal and wifi?",
    a: "The house has wifi; mobile coverage is workable rather than quick and varies by network. If you plan to work, ask us first. Same for load-shedding — message us for the arrangement on your dates rather than trust a blog post that ages faster than the schedule.",
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
              name: "Five stops on the Cape Town to Cape Agulhas road trip",
              path: `/blog/${post.slug}`,
              items: stops,
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
        eyebrow="Guide · The drive down"
        title={post.title}
        intro="The Cape Town to Cape Agulhas road trip, told straight — the route, the stops, the shop you must not skip, and the 2026 long weekends worth booking now."
        byline={`By ${site.contact.hostName} & family`}
        datePublished={post.datePublished}
        readingMinutes={post.readingMinutes}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="prose-gv">
          <p>
            Everyone who has ever driven from Cape Town to the bottom of Africa
            has had the same conversation in the car somewhere around Caledon.
            It goes: we could have been in Hermanus by now.
          </p>
          <p>
            You could have. But the extra ninety minutes is the whole reason to
            do this drive &mdash; somewhere after Napier the traffic thins to
            nothing, the wheat country opens up, and by the time you turn onto
            the gravel at Suiderstrand you have properly left.
          </p>
        </div>

        <TLDR
          label="The short version"
          items={[
            `${site.distances.capeTownKm} km, about three hours: N2 to Caledon, R316 through Napier to Bredasdorp, R319 south, then a few kilometres of gravel.`,
            "The 2026 long weekends worth booking: Women's Day (8–10 August) and Heritage Day (Thursday 24 September).",
            "Bredasdorp is your last full supermarket and bottle store. Shop there, not hopefully.",
            "An ordinary car is fine on the gravel. Drive it slowly, and watch for tortoises.",
            "Sleeps 10, five en-suite bedrooms. Dogs are welcome at the house — but read the pet section, because the national park around us does not allow them.",
          ]}
        />

        <StatGrid
          stats={[
            {
              value: `${site.distances.capeTownKm} km`,
              label: "Cape Town to the gravel",
              body: `About ${site.distances.capeTownHours} without stops. With one proper stop, budget three and a half to four hours.`,
            },
            {
              value: `${site.distances.bredasdorpKm} km`,
              label: "to the last big shop",
              body: "Bredasdorp has the nearest full-size supermarket and bottle store — roughly forty minutes from the house.",
            },
            {
              value: `Sleeps ${site.capacity.sleeps}`,
              label: `${site.capacity.bedrooms} en-suite bedrooms`,
              body: "One kitchen, one table everybody fits around, and a bathroom per bedroom.",
            },
          ]}
        />

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            The 2026 long weekends in the Western Cape worth booking
          </h2>
          <p>
            <strong>Women&rsquo;s Day, Saturday 8 to Monday 10 August.</strong>{" "}
            The holiday falls on Sunday 9 August 2026, so Monday is observed
            &mdash; three days without taking a day&rsquo;s leave. Midwinter,
            which is not a drawback if you know what you are coming for:
            enormous seas, a fire going all day, and August opening the
            dependable stretch of{" "}
            <Link
              href="/blog/land-based-whale-watching-cape-agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              whale season
            </Link>
            .
          </p>
          <p>
            <strong>Heritage Day and the spring holidays.</strong> This is the
            big one. Heritage Day falls on Thursday 24 September 2026, the
            school term ends the day before, and schools go back on Tuesday 6
            October &mdash; so one day&rsquo;s leave, Friday 25 September, turns
            it into eleven straight days. It is also the best time of year to be
            here: whales at their peak, fynbos flowering, summer crowds not yet
            arrived. These dates go first on our calendar every year.
          </p>
          <p>
            <strong>The quiet second half of October.</strong> Everything
            empties out again while the weather keeps improving and the whales
            are still here. For couples, or anyone with flexible dates, this is
            the window we would take ourselves.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            How far is Cape Agulhas from Cape Town?
          </h2>
          <p>
            About {site.distances.capeTownKm} kilometres and{" "}
            {site.distances.capeTownHours} without stops. The route is hard to
            get wrong: N2 east over Sir Lowry&rsquo;s Pass and through Elgin,
            off at Caledon onto the R316, through Napier to Bredasdorp, then the
            R319 south to L&rsquo;Agulhas and west to Suiderstrand.
          </p>
          <p>
            The last stretch is a few kilometres of maintained gravel inside the
            national park, and an ordinary car handles it fine. Take it slowly
            &mdash; for your suspension, and because there is a fair chance of a
            tortoise in the road. Fuel in Caledon or Bredasdorp; do not leave
            Bredasdorp on a quarter tank assuming there is something further
            south. Turn-by-turn detail lives in the{" "}
            <Link
              href="/#practical"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              good-to-know section
            </Link>
            .
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.suiderstrandGravelRoad.src}
            alt={img.suiderstrandGravelRoad.alt}
            width={img.suiderstrandGravelRoad.width}
            height={img.suiderstrandGravelRoad.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The last few kilometres &mdash; gravel through limestone fynbos,
            with the sea at the end of it
          </figcaption>
        </figure>

        <Callout eyebrow="The whole argument, in one line">
          The ninety minutes past Hermanus is not the price of getting here. It
          is the thing you are buying.
        </Callout>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Five stops that make the drive better than it sounds
          </h2>
          <p>
            In order, from the city. None needs booking, and the lot adds about
            an hour &mdash; which is the point of a weekend away rather than a
            commute.
          </p>
        </div>
      </div>

      <NumberedList
        variant="grid"
        items={stops.map((s) => ({ title: s.name, body: s.description }))}
      />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            What to pack when the nearest big shop is Bredasdorp
          </h2>
          <p>
            Buy in Bredasdorp: all your meat for the braai and more than you
            think, produce and bread for the first two days, and wine and beer
            &mdash; there is a bottle store there and not one closer.
            L&rsquo;Agulhas and Struisbaai cover top-ups. From home, bring
            coffee you actually like, a proper windbreaker in every season, and
            something to do when the weather closes in. It will, and that is
            half the point. Start the pizza oven earlier than you think.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.diningPizzaOven.src}
            alt={img.diningPizzaOven.alt}
            width={img.diningPizzaOven.width}
            height={img.diningPizzaOven.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The end of the drive &mdash; the pizza oven off the dining room,
            and a table everybody fits around
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Self-catering that sleeps 10 in the Western Cape
          </h2>
          <p>
            Most accommodation on this coast is built for two to four, which
            makes larger trips awkward &mdash; two cottages, two kitchens,
            everybody eating in shifts.{" "}
            <Link
              href="/#the-house"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              The house
            </Link>{" "}
            was built by our family in {site.builtIn} for the opposite:{" "}
            {site.capacity.bedrooms} en-suite bedrooms, room for{" "}
            {site.capacity.sleeps}, one kitchen, one table. It is the shared
            bathroom, not the shared kitchen, that ends friendships.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Pet-friendly accommodation at Cape Agulhas
          </h2>
          <p>
            Dogs are welcome at the house &mdash;{" "}
            {site.policies.pets.toLowerCase()} &mdash; but be clear on what that
            means. The village is an enclave{" "}
            <Link
              href="/#the-setting"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              surrounded by Agulhas National Park
            </Link>
            , and SANParks permits no pets anywhere in a national park &mdash;
            not on the trails, not even on a lead. So plan for a dog happy at
            the house and in the walled garden, not one that needs a long
            off-lead run every morning. Check the current rules with SANParks
            before you travel, and tell us when you enquire.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            A sample three-day weekend
          </h2>
          <p>
            <strong>Friday:</strong> leave after lunch, shop in Bredasdorp,
            arrive with enough light to walk down to the water. Braai. Plan
            nothing else. <strong>Saturday:</strong> walk east to the Meisho
            Maru wreck, then the lighthouse and the boardwalks to the
            southernmost marker. <strong>Sunday:</strong> the whale day, or
            forty-five minutes inland to the{" "}
            <Link
              href="/blog/wine-tasting-near-cape-agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              Elim wine ward
            </Link>
            . Pizza oven in the evening. <strong>Monday:</strong> slow morning,
            early lunch, home by late afternoon.
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
          thesis="Three hours is the filter. Exactly far enough that nobody comes here by accident, and exactly close enough to do on a Friday afternoon."
          body={
            <>
              Book the August long weekend for big weather and an empty coast,
              or late September for the whales, the fynbos and the light. Either
              way, shop in Bredasdorp, take the gravel slowly, and{" "}
              <Link
                href="/#book"
                className="font-medium text-sea-deep underline-offset-4 hover:underline"
              >
                hold your dates
              </Link>{" "}
              earlier than feels necessary &mdash; the long weekends go first.
            </>
          }
        />

        <Sources
          items={[
            {
              label: "South African Government — public holidays",
              href: "https://www.gov.za/about-sa/public-holidays",
            },
            {
              label: "Western Cape Government — school calendar",
              href: "https://www.westerncape.gov.za/education/school-calendar",
            },
            {
              label: "SANParks — rules and regulations (pets in parks)",
              href: "https://www.sanparks.org/travel/plan/useful-information/rules-regulations",
            },
            {
              label: "SANParks — Agulhas National Park",
              href: "https://www.sanparks.org/parks/agulhas",
            },
          ]}
        />
      </div>

      <WhatsAppCTA
        title="Three hours from the city, ten people, one table"
        body={`Gans-te-Ver sleeps ${site.capacity.sleeps} inside the Suiderstrand reserve — ${site.capacity.bedrooms} en-suite bedrooms, a pizza oven, and the sea in front of the house. Message Madelaine to hold a long weekend before it goes.`}
        buttonLabel="Check availability on WhatsApp"
        pageKey="blog"
      />
    </article>
  );
}
