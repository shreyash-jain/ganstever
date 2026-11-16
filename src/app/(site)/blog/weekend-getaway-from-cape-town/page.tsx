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

const post = getPost("weekend-getaway-from-cape-town")!;

// Five questions to ask before driving past Hermanus. Rendered as the
// NumberedList below — the honest "who this is for" section.
const questions = [
  {
    title: "How many nights have you got?",
    body: `Two is our minimum and the right number. With one night, the extra drive eats the evening you came for — go to Hermanus and be glad of it. With three or more, this gets better every day, because the drive stops being the main event.`,
  },
  {
    title: "Is it a couple, or a crowd?",
    body: `A couple will be happy anywhere. The case for us is a group: the house sleeps ${site.capacity.sleeps} across ${site.capacity.bedrooms} en-suite bedrooms, with one kitchen and one table, so five couples or two families spend the weekend together instead of in five rooms down a corridor.`,
  },
  {
    title: "Do you want things to do, or somewhere to be?",
    body: "This coast has plenty to look at — a lighthouse, a wreck, a harbour — and almost nothing to book. If you need a programme, a town does that better. If the plan is a long walk and a longer evening, keep reading.",
  },
  {
    title: "Can you live with the wind?",
    body: "The southeaster comes in some weekends and flattens the beach morning. We have a glassed-in sunroom, an indoor braai and a pizza oven for exactly that, but it is a risk, and we would rather you heard it from us.",
  },
  {
    title: "Are you happy to cook?",
    body: "It is a self-catering house. You shop in Bredasdorp on the way down, and from there the weekend is groceries, a fire and whoever is holding the tongs. If you want a restaurant booking every night, this is the wrong house.",
  },
];

const faqs = [
  {
    q: "How far is Suiderstrand from Cape Town?",
    a: `About ${site.distances.capeTownKm} km by road, and about ${site.distances.capeTownHours} before stops. Hermanus, by comparison, is about 120 km and roughly an hour and a half.`,
  },
  {
    q: "Is it worth driving that far for one weekend?",
    a: "For two nights, yes, if you want somewhere quiet and you are happy to spend a Friday afternoon on the road. For one night, no — choose somewhere closer and don't feel bad about it.",
  },
  {
    q: "Do we need a 4x4 or a high-clearance car?",
    a: "No. Most of the road into Suiderstrand has been paved and only about two kilometres of gravel are left. An ordinary car is fine if you take it slowly — there is a fair chance of a tortoise in the road.",
  },
  {
    q: "What does the house cost for a weekend?",
    a: `Whole-house rates start from ${site.pricing.currencySymbol}${site.pricing.fromZAR.toLocaleString("en-ZA")} per night and move with the season and the size of your group. Message us for your dates and we will quote you properly.`,
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
          __html: JSON.stringify(faqLd(faqs)),
        }}
      />

      <BlogHero
        image={post.cover.src}
        alt={post.cover.alt}
        eyebrow="Guide · The weekend past Hermanus"
        title={post.title}
        intro="A weekend getaway from Cape Town that ends where the road does — the honest drive, what the extra hour past Hermanus buys you, and who should stop short."
        byline={`By ${site.contact.hostName} & family`}
        datePublished={post.datePublished}
        readingMinutes={post.readingMinutes}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="prose-gv">
          <p>
            Ask anyone in Cape Town where to go for a weekend and the answers
            arrive in the same order. The Winelands. Hermanus, about 120 km east
            and an hour and a half away. All good answers, and all places you
            have very likely been.
          </p>
          <p>
            Ours is the answer past Hermanus. Suiderstrand is {site.distances.capeTownKm}{" "}
            km from the city, about {site.distances.capeTownHours} on the road,
            and the extra hour and a quarter each way is the whole argument for
            coming. It is also the whole argument against, so we will make both.
          </p>
        </div>

        <TLDR
          label="The short version"
          items={[
            `Suiderstrand is ${site.distances.capeTownKm} km and about ${site.distances.capeTownHours} from Cape Town. Hermanus is about 120 km and an hour and a half.`,
            "The extra hour and a quarter each way is the cost and the point. It is why this stretch of coast is still quiet.",
            `Two nights is our minimum and the right length. For a single night, honestly, go to Hermanus.`,
            "Do the big shop in Bredasdorp, 37 km before the house, and give Friday evening to nothing at all.",
            `A whole house for up to ${site.capacity.sleeps} starts from ${site.pricing.currencySymbol}${site.pricing.fromZAR.toLocaleString("en-ZA")} a night, seasonal. Message us for a real quote.`,
          ]}
        />

        <StatGrid
          stats={[
            {
              value: `${site.distances.capeTownKm} km`,
              label: "Cape Town to our door",
              body: `About ${site.distances.capeTownHours} without stops; the last couple of kilometres are gravel.`,
            },
            {
              value: "~120 km",
              label: "Cape Town to Hermanus",
              body: "Around an hour and twenty-five to an hour and a half, depending on whose estimate you trust and what the N2 is doing.",
            },
            {
              value: `${site.policies.minNights} nights`,
              label: "our minimum stay",
              body: `Check-in ${site.policies.checkIn}, check-out ${site.policies.checkOut} — so a Friday-to-Sunday weekend gives you about forty-four hours.`,
            },
          ]}
        />

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Why the extra hour is the point
          </h2>
          <p>
            A weekend away is not measured in kilometres. It is measured in how
            long it takes before you stop checking your phone. Hermanus is close
            enough that Monday is still in the car with you. At three hours,
            something gives. Somewhere after Caledon the road narrows, the
            traffic thins, and by the time you turn south at Bredasdorp the
            city has stopped being the thing you are thinking about.
          </p>
          <p>
            That is not a romantic claim; it is arithmetic. A road that ends at
            the southern tip of Africa does not carry through-traffic. Everyone
            who comes this way meant to.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.weekendGetawayCover.src}
            alt={img.weekendGetawayCover.alt}
            width={img.weekendGetawayCover.width}
            height={img.weekendGetawayCover.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Illustrative &mdash; the last stretch of a Friday drive south, late
            light, nothing coming the other way
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            What the extra drive actually costs
          </h2>
          <p>
            Be honest about it. Hermanus is roughly{" "}
            <a
              href="https://www.rome2rio.com/s/Cape-Town/Hermanus"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              120 km from Cape Town
            </a>
            , an hour and twenty-five minutes or so. We are {site.distances.capeTownKm} km
            and {site.distances.capeTownHours}. Across a weekend that is around
            two and a half more hours in the car, on a Friday afternoon when
            you are already tired and a Sunday afternoon when you would rather
            not go home.
          </p>
          <p>
            It buys you the end of the road. Not a metaphor: the southernmost
            marker in{" "}
            <a
              href="https://www.sanparks.org/parks/agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              Agulhas National Park
            </a>{" "}
            is about {site.distances.southernmostTipKm} km from the house, the
            lighthouse about {site.distances.lighthouseKm} km. The tower was{" "}
            <a
              href="https://sahistory.org.za/dated-event/cape-agulhas-lighthouse-begins-operating"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              first lit on 1 March 1849
            </a>
            , and the wreck of the Japanese trawler Meisho Maru 38, stranded in
            1982, still lies in the surf along this coast. Opening
            hours at both change with the season and the year, so confirm
            before you drive. We have written the whole Saturday up in our{" "}
            <Link
              href="/blog/cape-agulhas-weekend-itinerary"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              forty-eight-hour itinerary
            </Link>
            , and the road itself, stop by stop, in the{" "}
            <Link
              href="/blog/cape-town-to-cape-agulhas-road-trip"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              road-trip guide
            </Link>
            .
          </p>
        </div>

        <Callout eyebrow="The whole argument, in one line">
          The drive is not the price of the weekend. It is the first part of it.
        </Callout>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Suiderstrand accommodation: a whole house, not two rooms
          </h2>
          <p>
            Most weekend places sell you a room. Ours sells you the house: our
            family built it in {site.builtIn}, it stands inside a coastal nature
            reserve a few metres from the beach, and it takes up to{" "}
            {site.capacity.sleeps} people across {site.capacity.bedrooms} en-suite
            bedrooms. There is a pizza oven, an indoor braai and an outdoor one.
            The sea is visible from almost every room.{" "}
            <Link
              href="/#the-house"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              The house, room by room
            </Link>{" "}
            is on the home page.
          </p>
          <p>
            The practical details are short. Check-in is {site.policies.checkIn},
            check-out {site.policies.checkOut}, minimum two nights. Whole-house
            rates start from {site.pricing.currencySymbol}
            {site.pricing.fromZAR.toLocaleString("en-ZA")} a night and move with
            the season, so please ask rather than trust a number on a web page.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.sunroomSunset.src}
            alt={img.sunroomSunset.alt}
            width={img.sunroomSunset.width}
            height={img.sunroomSunset.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Saturday evening from the top-floor sunroom &mdash; the part of the
            weekend you cannot book anywhere else
          </figcaption>
        </figure>
      </div>

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Five questions before you drive past Hermanus
          </h2>
          <p>
            We would rather you decided properly than arrived disappointed.
            Answer these honestly, and the choice usually makes itself.
          </p>
        </div>
      </div>

      <NumberedList variant="light" items={questions} />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            When the weekend works best
          </h2>
          <p>
            Any month has something. Between June and November there are
            usually southern right whales along this coast &mdash; often
            visible from the shore, though never on demand &mdash; and we have
            a{" "}
            <Link
              href="/blog/land-based-whale-watching-cape-agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              guide to watching them from the sand
            </Link>
            . Summer and school holidays go first, and weekends go before
            midweek does. If you only want to know what there is to do, the{" "}
            <Link
              href="/blog/things-to-do-cape-agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              things-to-do guide
            </Link>{" "}
            is where to start.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.weekendGetawaySundayMorning.src}
            alt={img.weekendGetawaySundayMorning.alt}
            width={img.weekendGetawaySundayMorning.width}
            height={img.weekendGetawaySundayMorning.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Illustrative &mdash; Sunday morning, which is meant to be slow
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
          thesis="If you have one night, stay closer. If you have two, drive the extra hour."
          body={
            <>
              Leave by two on Friday, shop in Bredasdorp, and give the first
              evening to nothing. Then{" "}
              <Link
                href="/#book"
                className="font-medium text-sea-deep underline-offset-4 hover:underline"
              >
                hold your dates
              </Link>{" "}
              earlier than feels necessary.
            </>
          }
        />

        <Sources
          items={[
            {
              label: "Rome2Rio — Cape Town to Hermanus by road",
              href: "https://www.rome2rio.com/s/Cape-Town/Hermanus",
            },
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
              label: "Learn to Dive Today — the Meisho Maru No. 38 wreck",
              href: "https://www.learntodivetoday.co.za/blog/2015/12/13/visible-shipwrecks-meisho-maru-no-38/",
            },
            {
              label: "Discover Cape Agulhas — whale watching",
              href: "https://discovercapeagulhas.co.za/display/welcome-to-the-whales",
            },
          ]}
        />
      </div>

      <WhatsAppCTA
        title="Two nights, a whole house, and the end of the road"
        body={`Gans-te-Ver sleeps ${site.capacity.sleeps} inside the Suiderstrand reserve — ${site.capacity.bedrooms} en-suite bedrooms, a pizza oven, and the sea a few metres from the door. Message Madelaine to hold a weekend.`}
        buttonLabel="Check availability on WhatsApp"
        pageKey="blog"
      />
    </article>
  );
}
