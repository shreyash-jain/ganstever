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

const post = getPost("workation-cape-agulhas")!;

// The five working days of the test — rendered as the NumberedList and
// emitted as ItemList JSON-LD from one source so the two can never drift.
const days = [
  {
    name: "Monday — find the seat",
    description:
      "We arrived on the Sunday, so Monday started with the ordinary question: where do you sit? We tried three places before nine. The top-floor sunroom won the morning — bistro table, glass on three sides, the sea doing its thing behind the screen. The first call of the week ran from there. Nobody on it asked why the light was so good.",
  },
  {
    name: "Tuesday — the rhythm",
    description:
      "Walk to the water at seven, back by half past, coffee, laptop open by eight. The trick we learnt on Tuesday is that a working day here has hard edges: the sea is a few metres away and it does not care about your inbox. That is not a distraction. It is a clock, and it is more honest than the one on your screen.",
  },
  {
    name: "Wednesday — the southeaster",
    description:
      "The wind came up overnight and stayed. On the old open balcony this would have ended outdoor working for the week; the sunroom was glassed in during 2026 and on Wednesday it earned its keep. You watch the sea go white and hear almost none of it. Do not plan on working outside at the bottom of Africa. Plan on working behind glass, with the view.",
  },
  {
    name: "Thursday — the long one",
    description:
      "A day of back-to-back calls, so we split up: one of us in the main suite's sitting corner with the door shut, one at the dining table under the skylights, one in the second lounge. Five en-suite bedrooms means five doors that close. By four we were done, and by half past four two of us were in the sea, which is the only sensible reason to have worked here at all.",
  },
  {
    name: "Friday — finish early, on purpose",
    description:
      "We stopped at lunch. Struisbaai harbour is twelve kilometres away and the fish is better bought than described. The braai was lit before the sun went, and the week ended the way weeks at this house have ended since 1991 — outside, facing the sea, with nothing left to do. That, and not the router, is the part of a workation people underrate.",
  },
];

// The questions that actually arrive on WhatsApp before a working-week
// booking. FAQPage markup has to mirror what a reader can see, so all four
// are rendered below.
const faqs = [
  {
    q: "Is the Wi-Fi good enough for video calls?",
    a: "The house has Wi-Fi and we use it for calls ourselves. If your work depends on a specific line speed or on being on camera all day, message us before you book and we will tell you exactly what the connection is on your dates. We would rather lose a booking than have you lose a call.",
  },
  {
    q: "What about load-shedding?",
    a: "South Africa has had no load-shedding since 16 May 2025 — 476 consecutive days at Eskom's last count, on 4 September 2026 — and the 2026 winter passed without an hour of it. Bring a power bank anyway. It is a rural coast, and a line goes down for ordinary reasons now and then.",
  },
  {
    q: "Is there mobile signal at the house?",
    a: "There is signal, and it is not city signal. Which network you are on matters more here than in Cape Town, so tell us yours when you enquire and we will be honest about it. Download offline maps and anything you cannot afford to buffer before you leave the N2.",
  },
  {
    q: "Can we stay longer than a week?",
    a: `Yes. Our minimum is ${site.policies.minNights} nights and there is no maximum; longer stays are priced by message rather than a list, because the rate moves with the season. Tell us your dates and how many of you there are.`,
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
              name: "A working week at Gans-te-Ver, day by day",
              path: `/blog/${post.slug}`,
              items: days,
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
        eyebrow="Guide · The workation test"
        title={post.title}
        intro="A Cape Agulhas workation, tested the only way that counts: five ordinary working days at the house, laptops open, real deadlines — and an honest report on what held and what did not."
        byline={`By ${site.contact.hostName} & family`}
        datePublished={post.datePublished}
        readingMinutes={post.readingMinutes}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="prose-gv">
          <p>
            For thirty years the first question anyone asked about the house
            was how far it is to the beach. Since we opened it to guests in{" "}
            {site.hostedSince}, the first question has been different: what is
            the Wi-Fi like? Asked carefully, usually by someone who has been
            burnt before.
          </p>
          <p>
            So we tested it. Five ordinary working days at Gans-te-Ver, a
            laptop each, the usual calls, and one rule &mdash; write down
            anything that goes wrong. This is that report, for anyone weighing
            a remote work getaway in the Western Cape against the safer, duller
            option of staying in the city.
          </p>
        </div>

        <TLDR
          label="The short version"
          items={[
            "Yes, you can work from here. The house has Wi-Fi, five en-suite rooms with doors that close, and a glassed-in sunroom that is a better desk than most offices.",
            "Load-shedding is not the problem it was: South Africa has had none since 16 May 2025 — 476 consecutive days at Eskom's 4 September 2026 count. Bring a power bank anyway.",
            "The time zone is the quiet advantage. South Africa runs on UTC+2 all year, so a London or Berlin team is never more than two hours away.",
            `This is a laptop-friendly holiday house, not a co-working space. There is no café with plugs down the road; the nearest shop is ${site.distances.struisbaaiKm} km away in Struisbaai.`,
            "Extended stays suit the house best when the whole house is used — a couple, a family with one worker in it, or a small team on an offsite. A solo worker is paying for ten beds.",
          ]}
        />

        <StatGrid
          stats={[
            {
              value: "476 days",
              label: "without load-shedding",
              body: "Eskom's count on 4 September 2026, running from the last outage on 16 May 2025. The whole 2026 winter passed without an hour of it.",
            },
            {
              value: "UTC+2",
              label: "all year, no clock changes",
              body: "Two hours ahead of London in winter and one in summer. Level with Berlin, Paris and Amsterdam from late March to late October.",
            },
            {
              value: `${site.capacity.bedrooms} doors`,
              label: "that actually close",
              body: `Every bedroom is en-suite, so a call in one room does not become everyone's call. Sleeps ${site.capacity.sleeps}, which is also the catch — more on that below.`,
            },
          ]}
        />

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Can you work from a holiday home in South Africa? The honest answer
          </h2>
          <p>
            You can, and the internet is the least interesting part of the
            answer. The house has Wi-Fi, and for a week of ordinary work it
            held. We will not print a
            speed in this post, because a number measured on one Tuesday is the
            kind of thing that gets a small business into trouble on a
            different Tuesday. Ask us for your dates and we will tell you what
            the line is that week, plainly.
          </p>
          <p>
            What made the week work was the building. The house was built in{" "}
            {site.builtIn} for a large family who did not want to be in one
            room all day, and it turns out that is exactly the floor plan a
            working household needs. Two lounges. A dining room under
            skylights. A top-floor sunroom that was an open balcony until 2026
            and is now glass on three sides &mdash; the desk with the view,
            with the wind kept out. And five bedrooms with their own doors,
            which sounds trivial until you have tried to take a call in a
            two-bedroom rental with a family in it.
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
            The top-floor sunroom &mdash; the desk that won the mornings.
            Glassed in during 2026; the view did not change, the wind did.
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            The week, day by day
          </h2>
          <p>
            Nothing below is a schedule. It is what actually happened, in the
            order it happened, with the one bad-weather day left in because a
            workation post with no wind in it would be fiction on this coast.
          </p>
        </div>
      </div>

      <NumberedList
        variant="light"
        items={days.map((d) => ({ title: d.name, body: d.description }))}
      />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.workationSoutheaster.src}
            alt={img.workationSoutheaster.alt}
            width={img.workationSoutheaster.width}
            height={img.workationSoutheaster.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Wednesday, roughly. The southeaster is the reason to work behind
            glass, and the reason the view is never boring.
          </figcaption>
        </figure>

        <Callout eyebrow="What the test actually measured">
          The Wi-Fi is not the test. The test is whether you can close the
          laptop at four and be in the sea by half past. That part, the house
          passes without trying.
        </Callout>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Self-catering with Wi-Fi: what that does and does not mean
          </h2>
          <p>
            It means the connection is there and it is included. It does not
            mean there is someone to reset a router at nine on a Monday. We
            live a WhatsApp message away and we answer, but this is a family
            beach house at the end of a gravel road, not a serviced office, and
            an honest workation post should say so.
          </p>
          <p>
            Three practical things, then. <strong>Do not plan on Starlink.</strong>{" "}
            It is still not licensed to sell service in South Africa &mdash; the
            regulator confirmed as recently as June 2026 that no application has
            been made &mdash; so a dish in the boot will not save you.{" "}
            <strong>Tell us your mobile network.</strong> Signal at Suiderstrand
            is real but it is not Cape Town signal, and it differs by carrier;
            we would rather say so before you book than after.{" "}
            <strong>Download before Caledon.</strong> Offline maps, the files you
            cannot afford to buffer, the series you will not admit you watch.
            The{" "}
            <Link
              href="/blog/cape-town-to-cape-agulhas-road-trip"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              drive down
            </Link>{" "}
            is the last stretch of the day where that is effortless.
          </p>
          <p>
            For readers working for an employer abroad: South Africa&rsquo;s
            remote work visa, a visitor&rsquo;s visa for people paid from
            outside the country, has had its income floor set at the equivalent
            of R650&nbsp;976 a year since the October 2024 amendment to the
            Immigration Regulations, and runs for anything from three months to
            three years. That is the number to check your payslip against; the
            rest is Home Affairs&rsquo; department, and we would not pretend
            otherwise.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Who a remote work getaway in the Western Cape actually suits
          </h2>
          <p>
            Here is the concession. The house sleeps {site.capacity.sleeps}.
            Whole-house rates start from {site.pricing.currencySymbol}
            {site.pricing.fromZAR.toLocaleString("en-ZA")} a night and move with
            the season, and there is no per-person price, because there is no
            way to rent half a kitchen. One person with a laptop, on their own,
            is paying for ten beds and a pizza oven, and a room in Struisbaai
            would serve them better. We say that in the first message when
            someone asks.
          </p>
          <p>
            Where the maths turns is when the house is used as a house. A
            couple where one of you works and the other walks. A family that
            can take the school holidays somewhere else because one parent
            stays on the clock. And &mdash; the one we are quietly built for
            &mdash; a small team on an offsite: five rooms, one long table,
            two braais, and an evening with no bill to wait for. Split across a
            team of eight, a whole house on the coast lands well under eight
            hotel rooms, and nobody has to find a restaurant that seats eight
            at seven.
          </p>
          <p>
            Between June and November there are usually southern right whales
            along this shore, and a lunch break spent on the dunes with
            binoculars is a real thing here rather than a brochure line &mdash;
            our{" "}
            <Link
              href="/blog/land-based-whale-watching-cape-agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              guide to watching them from land
            </Link>{" "}
            has the honest odds by month. Outside the season the break is a
            walk on an empty beach, or the wreck at the end of it &mdash; the{" "}
            <Link
              href="/blog/cape-agulhas-shipwrecks"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              Meisho Maru
            </Link>{" "}
            is close enough to reach on foot and be back before the next call.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.workationRailingCoffee.src}
            alt={img.workationRailingCoffee.alt}
            width={img.workationRailingCoffee.width}
            height={img.workationRailingCoffee.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The seven o&rsquo;clock version of a stand-up meeting
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Work from the coast: what we would tell a friend
          </h2>
          <p>
            Come for at least a week; a two-night weekend is a different trip,
            and we have{" "}
            <Link
              href="/blog/cape-agulhas-weekend-itinerary"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              written that one separately
            </Link>
            . Arrive on the Sunday, not the Monday morning. Do the big shop in
            Bredasdorp on the way in, because the next proper supermarket is a
            drive, not a walk. Put the person with the most calls in the main
            suite. Keep Friday afternoon empty, or give it to the{" "}
            <Link
              href="/blog/wine-tasting-near-cape-agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              Elim cellars
            </Link>{" "}
            forty-five minutes inland &mdash; the rest of what there is to do
            at the tip is in our{" "}
            <Link
              href="/blog/things-to-do-cape-agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              guide to the area
            </Link>
            . And if your team is in New York, know before you book that their three o&rsquo;clock is your
            nine at night &mdash; a European team is a gift here, an American
            one costs you your evenings.
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
          thesis="You can work from here. The question is whether you can stop — and the house was built for the stopping."
          body={
            <>
              Wi-Fi, five doors that close, a glassed-in desk with the sea in
              it, and no load-shedding for the first time in years. Bring a
              power bank, tell us your network, and{" "}
              <Link
                href="/#book"
                className="font-medium text-sea-deep underline-offset-4 hover:underline"
              >
                ask for a week
              </Link>{" "}
              rather than a weekend &mdash; midweek is when the coast is
              emptiest, and when the rate is kindest.
            </>
          }
        />

        <Sources
          items={[
            {
              label:
                "Eskom — 476 consecutive days without loadshedding, statement of 4 September 2026",
              href: "https://www.eskom.co.za/eskom-fully-meets-2026-winter-demand-eaf-remains-at-its-highest-level-since-2020-67-79-and-diesel-expenditure-declines-by-r4-84-billion-or-81-64-to-deliver-energy-security/",
            },
            {
              label:
                "Eskom — midnight marks a year without loadshedding (last implemented 15 May 2025)",
              href: "https://www.eskom.co.za/eskom-maintains-grid-stability-as-winter-demand-rises-midnight-marks-a-year-without-loadshedding/",
            },
            {
              label:
                "TechAfrica News — ICASA spells out satellite licensing rules as Starlink's entry remains on hold, 30 June 2026",
              href: "https://techafricanews.com/2026/06/30/icasa-spells-out-satellite-licensing-rules-as-starlinks-south-africa-entry-remains-on-hold/",
            },
            {
              label:
                "STBB — Home Affairs gazettes amendments to the Immigration Regulations: remote work visa threshold lowered to R650 976 (October 2024)",
              href: "https://stbb.co.za/pulse-reforming-the-visa-regime-home-affairs-gazettes-amendments-to-immigration-regulations/",
            },
            {
              label: "Department of Home Affairs — gazette notices, October 2024",
              href: "https://www.greengazette.co.za/departments/home-affairs/20241022",
            },
            {
              label:
                "NMISA (National Metrology Institute of South Africa) — South African Standard Time is UTC + 2 hours",
              href: "http://time.nmisa.org/time/",
            },
          ]}
        />
      </div>

      <WhatsAppCTA
        title="A week at the desk, with the sea in it"
        body={`Gans-te-Ver sleeps ${site.capacity.sleeps} inside the Suiderstrand reserve — ${site.capacity.bedrooms} en-suite bedrooms, Wi-Fi, a glassed-in sunroom and the beach a few metres from the door. Message Madelaine with your dates and your network.`}
        buttonLabel="Ask about a working week on WhatsApp"
        pageKey="blog"
      />
    </article>
  );
}
