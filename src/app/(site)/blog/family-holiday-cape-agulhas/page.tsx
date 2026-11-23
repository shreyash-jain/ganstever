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

const post = getPost("family-holiday-cape-agulhas")!;

// The questions that actually arrive on WhatsApp before a big-family
// booking. FAQPage markup mirrors what a reader can see below.
const faqs = [
  {
    q: "What should you actually look for in a self-catering house for ten?",
    a: "Enough bedrooms that nobody shares a bed who wouldn't choose to, bathrooms that don't turn into a queue, a kitchen built for more than two people cooking at once, and somewhere for the group to sit together that isn't the same room everyone sleeps near. The kitchen and the doors matter more than the view, though the view is what sells it.",
  },
  {
    q: "Is a self-catering house cheaper than booking several hotel rooms?",
    a: `Usually, for a group this size, because you're paying for one roof instead of several keys. Our whole-house rate starts from ${site.pricing.currencySymbol}${site.pricing.fromZAR.toLocaleString("en-ZA")} a night and moves with the season — ${site.pricing.note.toLowerCase()} Compare that total against ten hotel beds plus restaurant bills for every meal, and a self-catering week usually wins, though a lot depends on how many of the ten are adults.`,
  },
  {
    q: "How much should we budget for groceries for ten people?",
    a: "More than it looks on paper, and less than ten people eating out every night. Do one large shop before you arrive, keep a running list on your phone for top-ups, and plan on braai nights and the pizza oven doing the heavy lifting rather than ten separate hot meals cooked from scratch.",
  },
  {
    q: "Can grandparents and small children comfortably share one house?",
    a: "That's the actual argument for a house over a hotel floor: a cot in one room doesn't wake someone two doors down, and a bedroom with its own bathroom means nobody is negotiating a shared one at six in the morning. Tell us ages and any mobility needs when you enquire and we'll be straight about what does and doesn't suit — stairs are a real feature of this house.",
  },
  {
    q: "Do we need to book activities before we arrive?",
    a: "Not for most of what's near Suiderstrand — the tip, the lighthouse grounds and the beach don't need a booking. A SANParks visit to the wider national park is worth checking in advance, and anything with an operator (boat-based whale trips, a specific restaurant) is worth a message first, because hours and availability vary by season and we won't pretend otherwise.",
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd(faqs)),
        }}
      />

      <BlogHero
        image={post.cover.src}
        alt={post.cover.alt}
        eyebrow="Guide · Planning a family holiday"
        title={post.title}
        intro="Here is how we would actually plan a family holiday at Cape Agulhas for ten people — the budget, the groceries, the packing list, and the honest case against renting a self-catering house at all."
        byline={`By ${site.contact.hostName} & family`}
        datePublished={post.datePublished}
        readingMinutes={post.readingMinutes}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="prose-gv">
          <p>
            Ten people and one kitchen sounds like the hard part. It isn&rsquo;t.
            The hard part is the conversation that happens before anyone packs
            a bag &mdash; who&rsquo;s paying for what, whose turn it is to
            cook, and whether Gran can manage the stairs. A house built for
            ten, with five bedrooms that each close their own door, doesn&rsquo;t
            solve that conversation. It just makes it a shorter one.
          </p>
          <p>
            Three generations of our own family have shared one roof here
            since {site.builtIn}, long before we opened the doors to anyone
            else in {site.hostedSince}, so this isn&rsquo;t a theory. It&rsquo;s
            the plan we&rsquo;d actually give a friend who rang up and asked
            how to organise a family holiday Cape Agulhas-bound for ten &mdash;
            not a listicle, a plan.
          </p>
        </div>

        <TLDR
          label="The short version"
          items={[
            `A self-catering house for ten usually costs less than ten hotel beds plus restaurant bills, because you're paying for one roof, not several keys — ours starts from ${site.pricing.currencySymbol}${site.pricing.fromZAR.toLocaleString("en-ZA")} a night and moves with the season.`,
            "Budget in three pieces, not one: the accommodation split, the grocery run, and a buffer for the day someone forgets sunscreen or the fridge needs restocking twice.",
            `Shop big once, in Bredasdorp (${site.distances.bredasdorpKm} km out) or Struisbaai (${site.distances.struisbaaiKm} km) — the nearest proper supermarket after the gravel road is a drive, not a walk.`,
            `${site.capacity.bedrooms} en-suite bedrooms means ${site.capacity.bedrooms} doors that close, which matters more on a family holiday than a couple's weekend — ask anyone who's queued for a bathroom with grandparents and toddlers in the house.`,
            "Plan one activity a day, not five. The southernmost tip, the lighthouse grounds and a shipwreck are all a short drive away; whales are a possibility from June to November, never a promise.",
          ]}
        />

        <StatGrid
          stats={[
            {
              value: `Sleeps ${site.capacity.sleeps}`,
              label: `in ${site.capacity.bedrooms} en-suite rooms`,
              body: "Every bedroom has its own bathroom — the detail that matters most when three generations share a roof for a week.",
            },
            {
              value: site.distances.capeTownHours,
              label: "from Cape Town",
              body: `${site.distances.capeTownKm} km, mostly N2 and backroads — long enough to need a grocery stop on the way, short enough for a long weekend.`,
            },
            {
              value: `${site.pricing.currencySymbol}${site.pricing.fromZAR.toLocaleString("en-ZA")}`,
              label: "a night, whole house",
              body: "No per-person rate, because there's no way to rent half a kitchen. Rates move with the season — message us for your dates.",
            },
          ]}
        />

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Choosing a house that actually fits the whole family
          </h2>
          <p>
            Start with bedrooms and bathrooms, not the photos of the view.
            Here that means {site.capacity.bedrooms}
            {" "}double bedrooms, each with
            its own en-suite bathroom &mdash; so a bad night&rsquo;s sleep for
            one grandparent doesn&rsquo;t become everyone&rsquo;s problem, and
            a shower before breakfast isn&rsquo;t a queue. Two lounges and a
            dining table under skylights mean the group can actually eat
            together without the kitchen counter doing double duty as a dining
            room.
          </p>
          <p>
            The kitchen itself is the part people underestimate. A gas stove
            and oven, a double-door fridge-freezer, and enough counter space
            for two people to cook at once &mdash; that is the difference
            between a self-catering holiday that works and one that turns into
            a logistics exercise three times a day. Add a wood-fired pizza
            oven and both an indoor and an outdoor braai, and dinner stops
            being the thing everyone dreads organising.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.diningRoom.src}
            alt={img.diningRoom.alt}
            width={img.diningRoom.width}
            height={img.diningRoom.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The dining room under skylights &mdash; the table that actually
            fits everyone at once.
          </figcaption>
        </figure>

        <Callout eyebrow="What a house does that a hotel floor doesn't">
          The best thing a self-catering house does for ten people isn&rsquo;t
          the extra bedroom. It&rsquo;s the extra door.
        </Callout>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Budgeting for a group of ten
          </h2>
          <p>
            Work out the money before you discuss the dates, not after.
            Splitting a whole-house rate ten ways is simple arithmetic; the
            part that actually needs planning is everything around it &mdash;
            groceries, fuel, activities, and the inevitable thing nobody
            budgeted for. We split it into four pieces below, because one
            number for &ldquo;the holiday&rdquo; always turns out to be wrong.
          </p>
        </div>
      </div>

      <NumberedList
        variant="grid"
        items={[
          {
            title: "The accommodation split",
            body: `Work out the whole-house total for your dates first, then divide by however many are actually paying — not by ten if two are toddlers. There's no per-person rate here, because a kitchen doesn't rent out in halves.`,
          },
          {
            title: "The grocery run",
            body: "Groceries for ten people for a week cost more than you expect and less than ten people eating out every night. One big shop before you arrive, a running list on your phone after.",
          },
          {
            title: "Fuel and activities",
            body: `Budget the drive both ways — ${site.distances.capeTownKm} km each way from Cape Town — plus whatever the wider area costs: a national park visit, a boat trip, fuel for day drives.`,
          },
          {
            title: "The buffer",
            body: "Keep something back for the ordinary thing that goes wrong — a forgotten adaptor, a second grocery top-up, a round of ice creams nobody planned for. There's always one.",
          },
        ]}
      />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Meals and groceries before you arrive
          </h2>
          <p>
            Do the big shop in Bredasdorp, {site.distances.bredasdorpKm} km out
            and the fullest supermarket on the way in, or in Struisbaai,{" "}
            {site.distances.struisbaaiKm} km from the house, which is smaller
            but closer and has fresh fish worth buying rather than describing.
            After that, the nearest proper shop is a drive, not a walk, so a
            second trip costs you an hour you probably wanted on the beach.
          </p>
          <p>
            Lean on the kitchen you&rsquo;re paying for rather than fighting
            it. A braai night and a pizza-oven night can each feed ten off one
            fire, with far less washing-up than ten individual plates cooked
            separately. Keep one or two simple breakfasts the whole group can
            serve themselves &mdash; nobody wants to run a short-order kitchen
            on the first morning of a holiday.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Things the whole family can actually do
          </h2>
          <p>
            Plan one outing a day, not five. The southernmost tip of Africa is{" "}
            {site.distances.southernmostTipKm} km away and the lighthouse
            grounds are {site.distances.lighthouseKm}
            {" "}km &mdash; both short
            enough to do with young children and older relatives in the same
            car. Our{" "}
            <Link
              href="/blog/things-to-do-cape-agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              guide to the area
            </Link>{" "}
            covers the rest, including the shipwreck you can walk to.
          </p>
          <p>
            Between June and November there are usually southern right whales
            along this coast, watchable from the dunes without a boat or a
            schedule &mdash; our{" "}
            <Link
              href="/blog/land-based-whale-watching-cape-agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              land-based whale watching guide
            </Link>{" "}
            has the honest odds by month, because nobody can promise a
            sighting. Outside the season, the{" "}
            <Link
              href="/blog/agulhas-national-park-visitor-guide"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              Agulhas National Park
            </Link>{" "}
            is worth the whole family&rsquo;s morning on its own. If two
            nights is all you have rather than a week, our{" "}
            <Link
              href="/blog/cape-agulhas-weekend-itinerary"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              48-hour itinerary
            </Link>{" "}
            is the shorter version of this same plan.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.kitchenWide.src}
            alt={img.kitchenWide.alt}
            width={img.kitchenWide.width}
            height={img.kitchenWide.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The kitchen that makes self-catering for ten actually workable.
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            A packing list for a house, not a hotel
          </h2>
          <p>
            Self-catering means you pack for a kitchen as well as a holiday.
            Four categories cover most of what people forget.
          </p>
        </div>
      </div>

      <NumberedList
        variant="light"
        items={[
          {
            title: "Beach and clothing",
            body: "Swimwear, towels, sunscreen and hats for everyone, and something warm for the evenings — the wind here doesn't check the forecast.",
          },
          {
            title: "Kitchen extras",
            body: "Any dietary-specific ingredients you won't find in Bredasdorp, reusable containers for leftovers, and anything a specific recipe needs that a general kitchen won't stock.",
          },
          {
            title: "Entertainment for every age",
            body: "Cards, a couple of board games, books, and whatever keeps the youngest occupied on a wet-weather afternoon — there's no television lineup to fall back on here.",
          },
          {
            title: "Documents and the ordinary first-aid kit",
            body: "ID for every adult, any regular medication, a basic first-aid kit, and a note of the nearest pharmacy — Bredasdorp, not the gravel road.",
          },
        ]}
      />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Fitting three generations under one roof
          </h2>
          <p>
            The house was built in {site.builtIn}
            {" "}for a family that didn&rsquo;t
            want to be in one room all day, and that turns out to be exactly
            the floor plan a multi-generational holiday needs: two lounges, a
            dining room, and bedrooms with doors that actually close. Give the
            main suite to whoever needs the easiest access, keep the
            schedule loose rather than packed, and let the quiet hours (
            {site.policies.quietHours}) do the job they&rsquo;re there for
            &mdash; an early night for the kids doesn&rsquo;t have to mean one
            for everyone else.
          </p>
          <p>
            One honest note on stairs: this is a double-storey house, and we
            say so plainly to anyone enquiring for a parent or grandparent
            with limited mobility, so you can decide before you book rather
            than after you arrive.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Self-catering house versus a block of hotel rooms
          </h2>
          <p>
            Neither is wrong. The comparison just depends on what the group
            actually wants from the week.
          </p>
        </div>

        <div className="not-prose my-10 overflow-hidden rounded-2xl border border-black/5">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-sand/70 text-xs font-medium uppercase tracking-[0.14em] text-dune-deep">
                <th className="px-5 py-4">What matters</th>
                <th className="px-5 py-4">Self-catering house</th>
                <th className="px-5 py-4">Several hotel rooms</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              <tr>
                <td className="px-5 py-4 font-medium text-sea-deep">
                  Shared time
                </td>
                <td className="px-5 py-4 text-ink/80">
                  One kitchen and lounge the whole group actually uses
                </td>
                <td className="px-5 py-4 text-ink/80">
                  Separate rooms; shared time happens in a lobby or restaurant
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-sea-deep">Meals</td>
                <td className="px-5 py-4 text-ink/80">
                  Cook what you like, when you like, for the cost of groceries
                </td>
                <td className="px-5 py-4 text-ink/80">
                  Fixed by whatever&rsquo;s nearby, at restaurant prices, every meal
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-sea-deep">
                  Privacy
                </td>
                <td className="px-5 py-4 text-ink/80">
                  Five separate doors, still under one roof
                </td>
                <td className="px-5 py-4 text-ink/80">
                  Full privacy per room, no shared space without leaving it
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-sea-deep">Cost</td>
                <td className="px-5 py-4 text-ink/80">
                  One bill, split by the group, no per-person mark-up
                </td>
                <td className="px-5 py-4 text-ink/80">
                  Priced per room, then multiplied by every meal out
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="prose-gv">
          <p>
            Where the self-catering case is weakest: a group that genuinely
            wants to be left alone from each other for most of the day, or one
            where nobody wants to cook at all. Where it&rsquo;s strongest:
            exactly the group this house was built for &mdash; people who want
            to be together more than they want to be waited on.
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
          thesis="A house for ten doesn't make the planning disappear. It just gives the planning somewhere sensible to land."
          body={
            <>
              Budget in pieces, shop once before the gravel road, pack for a
              kitchen as well as a beach, and keep the schedule loose. Tell us
              the ages and dates when you{" "}
              <Link
                href="/#book"
                className="font-medium text-sea-deep underline-offset-4 hover:underline"
              >
                ask about your dates
              </Link>{" "}
              &mdash; we&rsquo;d rather talk you out of a week that won&rsquo;t
              suit the group than have you find out on arrival.
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
              label: "Gans-te-Ver Suiderstrand — Booking.com listing",
              href: site.listings.bookingDotCom,
            },
          ]}
        />
      </div>

      <WhatsAppCTA
        title="Planning a family holiday for ten?"
        body={`Gans-te-Ver sleeps ${site.capacity.sleeps} inside the Suiderstrand reserve — ${site.capacity.bedrooms} en-suite bedrooms, a full kitchen, a pizza oven and the beach a few metres from the door. Message Madelaine with your dates and ages.`}
        buttonLabel="Ask about a family stay on WhatsApp"
        pageKey="blog"
      />
    </article>
  );
}
