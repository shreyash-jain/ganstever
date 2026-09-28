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

const post = getPost("elopement-cape-agulhas")!;

// The four places a small ceremony actually works out here — rendered as the
// NumberedList and emitted as ItemList JSON-LD from one source so the two
// can never drift apart.
const places = [
  {
    name: "The southernmost tip",
    description:
      "The Map of Africa monument inside Agulhas National Park, a flat boardwalk from the car park. It is public land and SANParks treats a ceremony there as an event: there is an application form, a fee and a permit, and you apply well ahead. Do not turn up with a marriage officer and hope. Early morning, before the day visitors and before the wind gets up, is the hour to ask for.",
  },
  {
    name: "The beach below the house",
    description:
      "A few metres from our door, inside the Suiderstrand reserve. Ten people standing on the sand for a quarter of an hour is a walk, not a wedding, and that is the scale that fits here. No arch, no chairs carried down, no speaker. If you want this one, tell us before you plan on it — the reserve has rules and so do we.",
  },
  {
    name: "The lighthouse",
    description:
      "Lit in 1849, still working, and about seven kilometres from the house. It is the photograph everyone wants and the one that survives the wind, because the tower gives you a wall to stand behind. The building and its grounds belong to other people; ask them, do not assume.",
  },
  {
    name: "Our table",
    description:
      "Not for the vows — for the part the law actually cares about. A marriage officer, the two of you and two witnesses signing a register at the dining table is a dinner, not an event. Then the pizza oven gets lit and the wedding breakfast happens under the skylights. Message Madelaine first; this is her house, and she decides.",
  },
];

// The questions that reach us once someone has read this far. FAQPage markup
// has to mirror what a reader can see, so all five are rendered below.
const faqs = [
  {
    q: "Is Gans-te-Ver a wedding venue?",
    a: "No, and this post is not trying to make it one. We do not host parties or events — the house sits in a quiet nature reserve with quiet hours from 22:00. What it is: a whole house for the ten people who actually need to be there, five kilometres from the southernmost tip of Africa. The ceremony happens out in the landscape. The house is where you come back to.",
  },
  {
    q: "How many people can we bring?",
    a: `Ten, because that is how many the house sleeps — ${site.capacity.bedrooms} en-suite bedrooms. That is also, we would argue, about the right number for a ceremony on this coast. Beyond ten you are not eloping any more, you are organising, and the wind starts winning.`,
  },
  {
    q: "Do we need a permit to marry at the tip?",
    a: "Yes. The monument is inside Agulhas National Park, and SANParks issues permits for events, filming and photography in its parks. There is an application, an assessment, an invoice, and the permit follows payment. Allow weeks, not days, and ask them directly what a ten-person ceremony counts as — we would rather you hear the conditions from them than from us.",
  },
  {
    q: "Can we get legally married here if we are not South African?",
    a: "People do, but the paperwork is the part to sort out before you book flights, not after. A registered marriage officer solemnises the marriage and two competent witnesses sign the register with you; Home Affairs has its own requirements when one or both of you hold a foreign passport. Find your marriage officer first and let them tell you exactly what to bring. Do not rely on a blog for this — including ours.",
  },
  {
    q: "Can we have music?",
    a: "At dinner, at dinner volume, yes. A speaker on the terrace at ten at night, no — the reserve's quiet hours run 22:00 to 07:00 and our neighbours are part of the reason the place is the way it is. If a first dance matters to you, have it at sunset with the doors open, and let the sea be the sound system after that.",
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
              name: "Where a small ceremony works at Cape Agulhas",
              path: `/blog/${post.slug}`,
              items: places,
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
        eyebrow="Guide · Small weddings"
        title={post.title}
        intro="An honest guide to an elopement at Cape Agulhas — the marriage officer, the permit, the wind, and why our house is the place you come back to rather than the venue."
        byline={`By ${site.contact.hostName} & family`}
        datePublished={post.datePublished}
        readingMinutes={post.readingMinutes}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="prose-gv">
          <p>
            South African law needs two witnesses. That is the whole guest
            list, legally speaking. Everyone after that is someone you chose.
          </p>
          <p>
            The southernmost tip of Africa turns out to be a good place to get
            married for a reason no brochure will print: it is very hard to
            invite two hundred people to it. There is one road in, a gravel
            stretch at the end, a wind that has opinions, and a national park
            where the point actually is. What is left, once all of that has done
            its filtering, is the two of you and the handful of people who
            would drive three hours to stand on a rock with you. We have been
            coming to this rock since {site.builtIn}. This is what a wedding
            here honestly looks like &mdash; and what it cannot be.
          </p>
        </div>

        <TLDR
          label="The short version"
          items={[
            "A private beach ceremony at the tip needs a SANParks permit; the monument sits inside Agulhas National Park.",
            "The law wants a registered marriage officer, two competent witnesses and a signed register. The certificate is handwritten, on the day, free.",
            `A micro wedding in the Overberg tops out at ten here — that is how many the house sleeps, across ${site.capacity.bedrooms} en-suite rooms.`,
            "This is a family-only wedding stay, not a venue. No parties, no marquee, no DJ, quiet hours from 22:00. That is the point, not the small print.",
            "The wind is real. Autumn is often the calmest window; whale season runs roughly June to November, if you want a second reason.",
          ]}
        />

        <StatGrid
          stats={[
            {
              value: "2",
              label: "witnesses the law requires",
              body: "Section 29 of the Marriage Act, and the same under the Civil Union Act. The register is signed immediately after the vows, by the two of you, the two of them and the officer.",
            },
            {
              value: `${site.capacity.sleeps}`,
              label: "people, and not one more",
              body: `${site.capacity.bedrooms} en-suite bedrooms, one long table, one kitchen. The size of the house is the size of the wedding — that is a feature.`,
            },
            {
              value: `${site.distances.southernmostTipKm} km`,
              label: "from our door to the tip",
              body: `The lighthouse is about ${site.distances.lighthouseKm} km. You can say your vows at the bottom of Africa and be back for coffee before the wind is properly awake.`,
            },
          ]}
        />

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Why elope at Cape Agulhas at all
          </h2>
          <p>
            Because it is the end. Not metaphorically &mdash; cartographically.
            Stand at the Map of Africa monument, opened in 2019 inside Agulhas
            National Park, and everything on the continent is behind you.
            Twenty degrees east, the line the hydrographers drew to divide the
            Atlantic from the Indian Ocean, runs through the rocks under your
            feet. There is no seam in the water, whatever the postcards say
            &mdash; we wrote a whole{" "}
            <Link
              href="/blog/two-oceans-meet-cape-agulhas-myth"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              piece on that myth
            </Link>
            . But there is an edge, and you can feel it.
          </p>
          <p>
            People get married at Cape Point because it is famous. People get
            married here because it is true. The lighthouse has been lit since
            1849. The coast is littered with the wrecks of ships that got the
            geography wrong. The fynbos comes down to the sand. Nobody sells
            you a ticket to the view.
          </p>
          <p>
            It is also, and we say this with love, a bit bleak. The sky is big
            and often grey. The town is small. If you want palm trees and a
            string quartet, Cape Agulhas will disappoint you within an hour.
            If you want to marry somewhere that does not look like every
            other elopement on the internet, read on.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            First, what this is not
          </h2>
          <p>
            Our own website says it, and we are not about to contradict it
            here: Gans-te-Ver does not host parties or events. The house
            stands inside a coastal nature reserve. There are neighbours who
            came for the same quiet you did. Quiet hours run{" "}
            {site.policies.quietHours}, and we mean them.
          </p>
          <p>
            So this is not a small wedding venue in the Western Cape sense
            &mdash; no coordinator, no dance floor, no bar. It is a family
            holiday that happens to contain a marriage. You stay here. You eat
            here. You walk down to the sea from here in the early morning and
            come back with sand on the hem. The ceremony itself happens out in
            the landscape, with a permit where a permit is needed, and the
            house is what you come home to afterwards. If that reads as a
            limitation, we are probably not your place. We think it is the
            reason you would come.
          </p>
        </div>

        <Callout eyebrow="The whole argument, in one line">
          The reason it is quiet here is the reason you would want to get
          married here. You cannot have one without the other.
        </Callout>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            The paperwork, in plain words
          </h2>
          <p>
            Three kinds of marriage are recognised in South Africa: civil
            marriages, customary marriages and civil unions. The first and the
            last are what a couple eloping here will use, and the mechanics are
            the same. A <strong>registered marriage officer</strong> &mdash; a
            Home Affairs official, a designated minister, or one of the private
            officers who do this for a living &mdash; solemnises the marriage
            in front of the two of you and{" "}
            <strong>at least two competent witnesses</strong>. Everyone signs
            the register immediately afterwards. The officer hands you a
            handwritten marriage certificate there and then, at no charge, and
            the marriage is registered with Home Affairs from there.
          </p>
          <p>
            One honest wrinkle. The Marriage Act, written in 1961, talks about
            solemnising a marriage in a church, a public office or a private
            dwelling-house &ldquo;with open doors&rdquo;. Beach weddings happen
            all over this country every weekend regardless, and how the vows
            on the sand and the signing at the table fit together is your
            marriage officer&rsquo;s professional call, not ours. Choose one who
            has done outdoor ceremonies before and let them lead.
          </p>
          <p>
            If either of you holds a foreign passport, this is the bit to
            settle first. Home Affairs has its own requirements for foreign
            nationals, and they change. Your marriage officer will know the
            current list; get it from them in writing before you book a single
            flight. The morning of a wedding is a bad time to be on the phone to a
            consulate.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.elopementFynbosBouquet.src}
            alt={img.elopementFynbosBouquet.alt}
            width={img.elopementFynbosBouquet.width}
            height={img.elopementFynbosBouquet.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Fynbos, not roses &mdash; the flowers that grow between the house
            and the sea, and hold up in the wind
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Where to actually say it
          </h2>
          <p>
            Four places, in the order we would suggest them. None of them is a
            venue. All of them belong to someone &mdash; the nation, the
            reserve, a lighthouse authority, or us &mdash; and each comes with
            a person to ask.
          </p>
        </div>
      </div>

      <NumberedList
        variant="light"
        items={places.map((p) => ({ title: p.name, body: p.description }))}
      />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            The wind, and when to come
          </h2>
          <p>
            We would be lying to you if we left this out. Cape Agulhas is
            windy. In summer the southeaster can blow for days, hard enough to
            take a veil to Struisbaai and a marriage officer&rsquo;s words with
            it. Early mornings are usually the calm part of any day here, which
            is why every suggestion above says &ldquo;early&rdquo;.
          </p>
          <p>
            Autumn &mdash; March into May &mdash; is often the gentlest stretch
            of the year: the wind tends to drop, the sea has had all summer to warm up,
            the light goes gold by five. Winter brings the cold fronts and, from
            about June to November, usually the southern right whales as well;
            if you want your vows with a whale blowing offshore, that is the
            window, though nobody, least of all us, can{" "}
            <Link
              href="/blog/land-based-whale-watching-cape-agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              promise you one
            </Link>
            . Spring is fynbos season and the wind starts up again. December
            is busy, warm and unreliable.
          </p>
          <p>
            Whatever month you choose, have an indoor plan you would actually
            be happy with. Ours is the top-floor sunroom: the sea-facing
            balcony was glassed in during 2026, and a southeaster watched from
            behind that glass, with the fire going below, is not a consolation
            prize. Some years it is the best view in the house.
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
            Sunset from the sunroom &mdash; the plan B that most people end up
            preferring to plan A
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            The dinner is the reception
          </h2>
          <p>
            This is a self-catering house, and for a wedding of ten that is
            the good news. There is one long table under the skylights, a
            brick pizza oven beside it, an indoor braai for when the weather
            turns and two more outside for when it does not. The kitchen has a
            proper gas stove and a fridge big enough for a week of celebrating.
            Cook, or bring someone from Struisbaai or Bredasdorp to cook for
            you &mdash; book them early, because out here nobody is waiting
            around for walk-in trade, and confirm everything the week before.
          </p>
          <p>
            What it costs is the other half of the argument. The whole house
            starts from {site.pricing.currencySymbol}
            {site.pricing.fromZAR.toLocaleString("en-ZA")} a night, for
            everybody, with a {site.policies.minNights}-night minimum. Rates
            move with the season and the size of your party, so treat that as
            a starting point and message us for your dates. Split across the
            people at the table it is not a wedding budget. It is a long
            weekend.
          </p>
          <p>
            And then &mdash; this is the bit people underestimate &mdash; you
            do not go anywhere. Nobody drives to a hotel. The flowers stay on
            the table for the whole stay. The next morning you walk down to
            the water, married, and the beach is empty, and the wind has not
            woken up yet.
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
            The table &mdash; eight seats, the pizza oven, and the doors onto
            the terrace. The reception, in other words.
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
          thesis="An elopement at the bottom of Africa is a family holiday with a marriage officer in it — and that is the best thing about it."
          body={
            <>
              Sort the paperwork first, ask SANParks about the tip, pick an
              early hour, and bring the ten people who would drive three hours
              for you. Then{" "}
              <Link
                href="/#book"
                className="font-medium text-sea-deep underline-offset-4 hover:underline"
              >
                message Madelaine
              </Link>{" "}
              before you plan anything at the house itself &mdash; it is her
              home, and a yes from her is where this actually starts.
            </>
          }
        />

        <Sources
          items={[
            {
              label:
                "South African Government — Getting married: the three recognised marriage types and the handwritten certificate",
              href: "https://www.gov.za/services/services-residents/relationships/getting-married",
            },
            {
              label:
                "Marriage Act 25 of 1961, sections 29 and 29A — two competent witnesses; signing the register",
              href: "https://en.wikisource.org/wiki/Marriage_Act,_1961",
            },
            {
              label:
                "DIRCO — Getting married in South Africa as a foreign national",
              href: "https://dirco.gov.za/washingtondc/getting-married-in-sa/",
            },
            {
              label: "SANParks — Events, filming and photography permits",
              href: "https://www.sanparks.org/contact/request/events-filming-photography",
            },
            {
              label: "SANParks — Agulhas National Park",
              href: "https://www.sanparks.org/parks/agulhas",
            },
            {
              label:
                "SAnews — Map of Africa monument opened at the southernmost tip (March 2019)",
              href: "https://www.sanews.gov.za/south-africa/monument-opened-southernmost-tip-africa",
            },
            {
              label:
                "South African History Online — the Cape Agulhas lighthouse begins operating, 1 March 1849",
              href: "https://sahistory.org.za/dated-event/cape-agulhas-lighthouse-begins-operating",
            },
          ]}
        />
      </div>

      <WhatsAppCTA
        title="Two of you, eight of yours, and the end of a continent"
        body={`Gans-te-Ver sleeps ${site.capacity.sleeps} inside the Suiderstrand reserve, ${site.distances.southernmostTipKm} km from the southernmost tip. Tell Madelaine what you have in mind — small, quiet and honest is exactly the kind of stay this house was built for.`}
        buttonLabel="Ask Madelaine on WhatsApp"
        pageKey="blog"
      />
    </article>
  );
}
