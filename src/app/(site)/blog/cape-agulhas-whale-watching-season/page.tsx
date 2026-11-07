import type { Metadata } from "next";
import type { ReactNode } from "react";
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

const post = getPost("cape-agulhas-whale-watching-season")!;

const linkClass = "font-medium text-sea underline-offset-4 hover:underline";

// Every statistic carries its source inline on first mention, and the same
// URLs repeat in the Sources block. Kept here so the two can never drift apart.
const src = {
  survey2025:
    "https://www.capenature.co.za/uploads/files/Report-of-the-Southern-Right-Whale-Aerial-Surveys-2025.pdf",
  up2019:
    "https://www.up.ac.za/news/university-of-pretoria-survey-records-second-lowest-number-of-southern-right-whales-cape-24",
  up2020:
    "https://www.up.ac.za/news/initial-results-of-2020-annual-aerial-survey-indicate-female-southern-right-whales-continue",
  elwen: "https://repository.up.ac.za/handle/2263/29646",
  capeAgulhasTourism: "https://capeagulhastourism.co.za/southern-right-whales/",
  struisbaaiBoardwalk:
    "https://xplorio.com/agulhas/en/blog/great-outdoors/27927/whale-watching-at-the-southernmost-tip-of-africa",
  sanparks:
    "https://www.sanparks.org/parks/agulhas/what-to-do/activities/whale-watching",
  sanparksFees:
    "https://www.sanparks.org/wp-content/uploads/2026/02/daily_conservation_fees_2026_27.pdf",
  saTourism:
    "https://www.southafrica.net/gl/en/travel/article/come-greet-the-giants-southern-right-whale-conservation",
  landsEdge: "https://www.landsedge.co.za/stories/whale-watching-struisbaai-cape-agulhas",
  saVenues: "https://www.sa-venues.com/attractionswc/cape-agulhas-whales.php",
  dffe: "https://www.mosselbayadvertiser.com/News/Article/General/whale-watching-rules-for-boats-202309011002",
  dict: "https://dict.org.za/blog/understanding-whale-protection-regulations-and-uav-impact-on-marine-mammals/",
  hermanus: "https://hermanus-tourism.co.za/things-to-do/whale-and-shark-viewing/",
  gansbaai:
    "https://www.getyourguide.com/garden-route-l32178/hermanus-gansbaai-2-hour-boat-based-whale-watching-t65206/",
  orca: "https://orca.org.uk/species-sightings/whales/southern-right-whale",
  deHoopFees: "https://www.capenature.co.za/de-hoop-nature-reserve-tariffs",
  stingrays:
    "https://discovercapeagulhas.co.za/destinations/struisbaai/the-resident-stingrays",
};

function Src({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
    >
      {children}
    </a>
  );
}

// The brief's six questions. FAQPage markup has to mirror what a reader can
// actually see, so one array drives both the visible section and the JSON-LD.
const faqs = [
  {
    q: "What is the best month to see southern right whales in Cape Agulhas?",
    a: "September, if we have to pick one. It sits in the middle of the usual August-to-October peak, and it is when the 2025 count found Struisbaai second only to De Hoop for mothers with calves. No month comes with a guarantee.",
  },
  {
    q: "Can you see whales from the beach in Struisbaai?",
    a: "Often, yes, in season. The local tourism office says whales can be spotted very close to shore in the bay, and they have been recorded about 20 metres off Struisbaaiplaat. The beachfront boardwalk has benches, so you can wait in some comfort. Some days there is nothing to see.",
  },
  {
    q: "Are whale-watching boat tours available in Cape Agulhas?",
    a: "We could not confirm a whale-watching boat running from Struisbaai or Arniston for the coming season, so ask locally and ask to see a boat-based whale-watching permit. Boat trips do run from Hermanus, which has three permitted boats, and from Gansbaai. Both are about two hours' drive from us.",
  },
  {
    q: "Is whale watching free in Cape Agulhas?",
    a: "From Struisbaai's beach and boardwalk, yes. SANParks lists a daily conservation fee for Agulhas National Park and CapeNature publishes tariffs for De Hoop, so check the current rates before you go into either. Boat trips cost money, naturally.",
  },
  {
    q: "How long do southern right whales stay in South Africa?",
    a: "The season as a whole runs about six months, from roughly June to November, though no single whale is likely to stay for all of it. In recent years the University of Pretoria's Whale Unit has reported females keeping their time here shorter.",
  },
  {
    q: "What other wildlife can you see around Cape Agulhas?",
    a: "The stingrays at Struisbaai harbour are the famous ones. In Agulhas National Park, watch for bontebok and African black oystercatchers. The fynbos has sunbirds all year, and humpback whales turn up along the southern Cape coast in small numbers.",
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
        eyebrow="Guide · Planning a whale trip"
        title={post.title}
        intro="The Cape Agulhas whale watching season runs from about June to November. This is how we would plan a trip around it, and where the limits are."
        byline={`By ${site.contact.hostName} & family`}
        datePublished={post.datePublished}
        readingMinutes={post.readingMinutes}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="prose-gv">
          <p>
            On 6 September 2025 a light autogyro flew the coast from Hermanus
            to Witsand with a pilot and one observer on board, counting
            southern right whale mothers with calves. They{" "}
            <Src href={src.survey2025}>found 154 pairs</Src>. The biggest
            gathering was at Koppie Alleen in De Hoop. The next biggest was off
            Struisbaai, about fifteen minutes from our kitchen.
          </p>
          <p>
            Our family built this house in 1991 and we still couldn&rsquo;t
            tell you which day to come. Nobody can. We do have opinions about
            which weeks to book, how long to stay and whether you need a boat
            (on this stretch, probably not), and that is what this is. For the
            exact spots where we stand with the binoculars, see{" "}
            <Link
              href="/blog/land-based-whale-watching-cape-agulhas"
              className={linkClass}
            >
              our post on watching from the shore
            </Link>
            .
          </p>
        </div>

        <TLDR
          label="The short version"
          items={[
            "The Cape Agulhas whale watching season runs from about June to November. August to October is usually the strongest stretch, and for one trip we would aim at September.",
            "Whale watching near Agulhas starts at Struisbaai: on the September 2025 survey flight, only De Hoop had more mothers with calves between Hermanus and Witsand.",
            "Southern right whales come to South Africa to calve and nurse in sheltered water, so they often sit close to shore, and watching from the Struisbaai boardwalk costs nothing.",
            "Boats have to keep 300 metres from mothers with calves. We could not confirm a whale boat running from Struisbaai, so check before you count on one.",
            "Counts swing hard from year to year. Stay three nights if you can, and don't believe anyone who promises you a whale.",
          ]}
        />

        <StatGrid
          stats={[
            {
              value: "Jun–Nov",
              label: "the season",
              body: "Cape Agulhas Tourism's window. Other official sources start and end it a little differently.",
            },
            {
              value: "154",
              label: "pairs counted in a day",
              body: "Mothers with calves, Hermanus to Witsand, 6 September 2025. Struisbaai held the second-largest group.",
            },
            {
              value: "300 m",
              label: "the limit for boats",
              body: "How close current rules let a boat come to a mother and calf. At Struisbaaiplaat, whales have been recorded about 20 metres from the sand.",
            },
          ]}
        />

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            The Cape Agulhas whale watching season, month by month
          </h2>
          <p>
            Southern rights spend the summer feeding far to the south and come
            up to this coast in winter to calve and nurse in sheltered water.
            Scientists call them capital breeders. A mother is mostly living
            off what she stored before she arrived, and she has a calf to feed
            out of it.
          </p>
          <p>
            Nobody quite agrees on the dates.{" "}
            <Src href={src.capeAgulhasTourism}>Cape Agulhas Tourism</Src> says
            June to the end of November.{" "}
            <Src href={src.sanparks}>SANParks</Src>{" "}
            lists June to September on its Agulhas page. The University of Pretoria&rsquo;s Whale Unit
            works with June to December, and{" "}
            <Src href={src.saTourism}>South African Tourism</Src> calls August
            and September the peak. This is how we read all that:
          </p>
        </div>
      </div>

      <NumberedList
        variant="light"
        items={[
          {
            title: "June and July: the first arrivals",
            body: "The first whales are arriving and they haven't settled. You could easily spend a weekend looking at empty water. Come for the big weather and the quiet, and take any whale as a bonus.",
          },
          {
            title: "August: the mothers settle in",
            body: "Usually the month sightings stop feeling like luck. It is still properly cold, and the fronts keep coming through.",
          },
          {
            title: "September: where we would aim",
            body: "The middle of the peak, and the month of that 154-pair count. The fynbos is flowering and the days are getting longer. In 2027 Heritage Day falls on a Friday, so expect that long weekend to go first.",
          },
          {
            title: "October: good, with a question mark",
            body: "Still a strong month in most years. The Whale Unit flies its big annual survey around the start of October because most calves have been born by then and haven't yet left. The question mark is below.",
          },
          {
            title: "November: the long goodbye",
            body: "Some mothers and calves stay on into November. The beach is finally pleasant, so we would come for that and not book on the whales.",
          },
        ]}
      />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="prose-gv">
          <p>
            The question mark on October is a real one. In 2019 the Whale Unit
            counted{" "}
            <Src href={src.up2019}>131 pairs in August</Src> between Hermanus
            and Infanta, then only 95 in October along a far longer stretch of
            coast. In 2020 it saw something similar and said females were{" "}
            <Src href={src.up2020}>limiting their time</Src> in South African
            waters. So if you can only choose once, we would lean early.
          </p>
          <p>
            If you came here asking about the best time to see whales in South
            Africa generally, the answer barely changes. South African Tourism
            has the first southern rights arriving between Cape Town and Port
            Elizabeth in June and July, with the same peak.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            What the counts can and can&rsquo;t tell you
          </h2>
          <p>
            The flights go back to 1969, and they are the best numbers anyone
            has. Look at what they do from one year to the next on the same
            stretch of coast, Nature&rsquo;s Valley to Muizenberg:{" "}
            <Src href={src.up2019}>55 pairs in 2016, 536 in 2018, 95 in 2019</Src>{" "}
            and <Src href={src.survey2025}>128 in 2025</Src>.
          </p>
          <p>
            The researchers see a cycle of roughly five years in those swings.
            They link it to mothers taking longer between calves, often four or
            five years where it used to be three. The likely cause is a long
            way from here: less sea ice, less krill, thinner mothers. You
            won&rsquo;t know you&rsquo;re in a thin year until the season is
            already under way, so plan as if you might be.
          </p>
        </div>

        <Callout eyebrow="Our position">
          In 2016 the survey found 55 mothers with calves. Two years later it
          found 536. Anyone who promises you a whale is guessing, and that
          includes us.
        </Callout>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Where to see southern right whales near Cape Agulhas
          </h2>
          <p>
            The whales are choosy about where they sit.{" "}
            <Src href={src.elwen}>A University of Pretoria study</Src>{" "}
            found most of them in places sheltered from open-ocean swell and seasonal
            winds, over soft, gently sloping sea floors, with mothers and
            calves closer in and shallower than other whales. That describes
            Struisbaai&rsquo;s bay far better than it describes the rocks at
            the tip.
          </p>
          <p>
            It also explains the map from that 2025 flight. The dots bunch up
            at Struisbaai and run along the coast towards De Hoop, then almost
            stop as you round the tip towards us. That was one day. It&rsquo;s
            still why we send people to Struisbaai first, even though we have
            perfectly good dunes of our own.
          </p>
        </div>
      </div>

      <NumberedList
        variant="grid"
        items={[
          {
            title: "Struisbaai",
            body: "Start here. The beachfront boardwalk has benches, with parking at the harbour end and near the campsite. The tourism office says whales can be spotted very close to shore in the calm, shallow bay, and at Struisbaaiplaat they have been recorded about 20 metres from the sand.",
          },
          {
            title: "L'Agulhas and Suiderstrand",
            body: "Cape Agulhas Tourism reports frequent sightings off L'Agulhas and rates the lighthouse as a lookout. It is rockier and more exposed here, so we treat it as a walk we were doing anyway, binoculars along. Our own dunes work on the same logic: you are there all day, so the odds add up.",
          },
          {
            title: "Arniston, or Waenhuiskrans",
            body: "One village with two names, about an hour from us. The cliffs give you height, which helps you see a whole animal instead of a wet back. Pair it with the cave at low tide.",
          },
          {
            title: "De Hoop and Walker Bay, for a day out",
            body: "Neither is really nearby. Koppie Alleen in De Hoop had the biggest group in 2025, but it is well over two hours from our gate. De Kelders and Hermanus, on Walker Bay, are about two hours the other way. Make a full day of either.",
          },
        ]}
      />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="prose-gv">
          <p>
            Ask where to see whales in the Western Cape as a whole and De Hoop
            and Walker Bay are the right answer. The Whale Unit calls them two
            of this coast&rsquo;s main nursery grounds, and we won&rsquo;t
            pretend otherwise. What this end offers instead is quiet.
          </p>
        </div>

        <figure className="my-10">
          <Image
            src={img.whaleSeasonMotherCalf.src}
            alt={img.whaleSeasonMotherCalf.alt}
            width={img.whaleSeasonMotherCalf.width}
            height={img.whaleSeasonMotherCalf.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full rounded-3xl object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Illustrative: a mother and calf from the air, roughly the view the
            survey team gets
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            What makes southern right whales worth the drive
          </h2>
          <p>
            They are individuals, for a start. Each one has its own pattern of
            pale callosities on its head, which is how the Whale Unit tells
            them apart, and its catalogue holds{" "}
            <Src href={src.up2020}>more than 2,300 recognisable adults</Src>.
            Some calves are born{" "}
            <Src href={src.capeAgulhasTourism}>
              almost white with black speckles
            </Src>
            , and about 94% of those are male.
          </p>
          <p>
            An adult is{" "}
            <Src href={src.saTourism}>roughly the size of a bus</Src>{" "}
            and can weigh up to 60 tonnes by South African Tourism&rsquo;s figure,
            though the local tourism office quotes more. When whaling stopped
            in 1935 there may have been only about 300 left. The habit that
            brings them close to shore, staying in bays and sheltered water, is
            the same one that made them such easy targets.
          </p>
          <p>
            Set your expectations by what you&rsquo;ll mostly see, which is a
            blow and a dark back.{" "}
            <Src href={src.orca}>
              The blow is V-shaped and there is no dorsal fin
            </Src>
            , so at a distance the back can pass for a wet rock until it moves.
            Then, some days, you get the rest of it: a breach, a tail slapping
            the water again and again, a head lifted straight up for a look
            around. We have abandoned a braai mid-skottel for a breach. Other
            days it is just sea.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Shore or boat? The best ways to experience whale watching here
          </h2>
          <p>
            On most coasts a boat gets you closer. Here it often runs the other
            way, and the reason is in the regulations.{" "}
            <Src href={src.survey2025}>
              Current rules bar boats from approaching within 300 metres of a
              mother and calf
            </Src>
            , and mothers and calves are most of what is here. The 2025
            helicopter survey logged 42 pairs and only 3 other adults between
            Arniston Point and Kleinbaai, the stretch that includes Struisbaai,
            and the Whale Unit itself says the shortage of other adults limits
            what boats can offer. Whales have been recorded{" "}
            <Src href={src.landsEdge}>20 metres off the sand</Src> at
            Struisbaaiplaat, far closer than a tourist boat may legally take you
            to a mother and calf.
          </p>
          <p>
            So walk.{" "}
            <Src href={src.struisbaaiBoardwalk}>
              The boardwalk at Struisbaai
            </Src>{" "}
            is the easy one. The{" "}
            <Link href="/blog/things-to-do-cape-agulhas" className={linkClass}>
              Rasperpunt trail
            </Link>{" "}
            takes you along the rocks in the national park, and from{" "}
            <Link href="/#the-setting" className={linkClass}>
              the house
            </Link>{" "}
            you can walk the coast into the park with the binoculars round your
            neck.
          </p>
          <p>
            We would like to give you a clean answer on boats from Struisbaai
            and we can&rsquo;t.{" "}
            <Src href={src.saVenues}>One directory</Src>{" "}
            says the town was awarded a permit in 2010 and that Arniston runs trips too, and a
            holiday listing names an operator at the harbour. But we
            couldn&rsquo;t find a current whale trip on that operator&rsquo;s
            own site, or any boat running from Arniston. So ask at the harbour
            when you arrive and ask to see a boat-based whale-watching permit,
            because{" "}
            <Src href={src.dffe}>
              boats without one may not go closer than 300 metres to any whale
            </Src>
            . If a boat trip matters to you, plan on{" "}
            <Src href={src.hermanus}>Hermanus, which has three permitted boats</Src>
            , or <Src href={src.gansbaai}>Gansbaai</Src>. Both are about two
            hours from us.
          </p>
          <p>
            For photographs, bring the longest lens you own. The Whale Unit
            shoots from a helicopter 150 metres up with a 100&ndash;400 mm lens,
            and a phone on the beach will mostly give you a dot. Struisbaai&rsquo;s
            beach looks east and south-east, so the sun gets behind you in the
            afternoon. In the morning you are shooting into glare, the same
            thing the survey team plans its flying around. Leave the drone at
            home:{" "}
            <Src href={src.dict}>the 300 metres applies in the air as well</Src>
            .
          </p>
        </div>

        <figure className="my-10">
          <Image
            src={img.whaleSeasonTailSlap.src}
            alt={img.whaleSeasonTailSlap.alt}
            width={img.whaleSeasonTailSlap.width}
            height={img.whaleSeasonTailSlap.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full rounded-3xl object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Illustrative: a lifted tail seen from the dunes. Real ones are
            usually further off, which is why you bring binoculars
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Tips for planning your whale-watching trip
          </h2>
        </div>
      </div>

      <NumberedList
        variant="dark"
        items={[
          {
            title: "Pick the weeks, then add a day",
            body: "Late August to early October is our suggestion. Our minimum stay is two nights, but we would book three, because one cold front can take a whole day away. On 1 October 2025 the weather grounded the survey team itself at Arniston Point.",
          },
          {
            title: "Watch the wind and the sea",
            body: "Rain matters less than you would think. A calm, pale morning makes a blow easy to pick out, and a sea full of whitecaps hides it. Check a marine forecast the night before and keep a second plan ready.",
          },
          {
            title: "Bring binoculars and a camera",
            body: "One pair per person if you can, because everyone wants them at the same moment. A long lens if you have one.",
          },
          {
            title: "Dress for wind",
            body: "Layers, something windproof, shoes you can walk a beach in, and a hat that stays on. Whatever the forecast says, it is colder on a dune than you expect.",
          },
          {
            title: "Keep your distance",
            body: "From the beach that only means staying out of the water near them. The 300-metre rule covers every vessel, motorised or not, so kayaks and paddle skis count. This is a nursery, and the mothers here are running on stored energy.",
          },
        ]}
      />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Other things to do around Cape Agulhas
          </h2>
          <p>
            You will have days when the sea gives you nothing, and plenty here
            doesn&rsquo;t depend on a whale. The southernmost tip of Africa is
            about {site.distances.southernmostTipKm} km from our gate, and you
            can{" "}
            <Link
              href="/blog/two-oceans-meet-cape-agulhas-myth"
              className={linkClass}
            >
              read what really happens there
            </Link>{" "}
            before you go. The Cape Agulhas lighthouse has been lit since 1849
            and you can climb it (hours vary, so confirm before you go).
            Struisbaai&rsquo;s beach runs for some 14 kilometres and the harbour
            has <Src href={src.stingrays}>its famous stingrays</Src>. There are
            a few restaurants between the villages, and we would check
            they&rsquo;re open before you drive.
          </p>
          <p>
            Walk to{" "}
            <Link href="/blog/cape-agulhas-shipwrecks" className={linkClass}>
              the wreck of the Meisho Maru
            </Link>{" "}
            from Suiderstrand. If the wind turns unreasonable,{" "}
            <Link
              href="/blog/wine-tasting-near-cape-agulhas"
              className={linkClass}
            >
              the Elim cellars
            </Link>{" "}
            are forty-five minutes inland. We keep{" "}
            <Link href="/blog/things-to-do-cape-agulhas" className={linkClass}>
              a longer list
            </Link>{" "}
            and{" "}
            <Link
              href="/blog/cape-agulhas-weekend-itinerary"
              className={linkClass}
            >
              a ready-made 48 hours
            </Link>
            , and if you are coming from the city,{" "}
            <Link
              href="/blog/cape-town-to-cape-agulhas-road-trip"
              className={linkClass}
            >
              the drive
            </Link>{" "}
            has its own post.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Where to base a whale trip
          </h2>
          <p>
            If you only have one day from Cape Town, go to Hermanus. It is
            closer, and we would rather say so than have you spend five and a
            half hours in the car for one look at the sea. The southern tip
            rewards people who stay, because the odds improve with every hour
            someone is looking out of a window.
          </p>
          <p>
            That is the case for{" "}
            <Link href="/#the-house" className={linkClass}>
              our house
            </Link>
            . It sleeps ten in five en-suite bedrooms, inside the reserve at
            Suiderstrand, with the sea in front of it, the tip about{" "}
            {site.distances.southernmostTipKm} km along the coast and Struisbaai
            about fifteen minutes away by car. It is a lot of house for two
            people, and we would be the first to say so. For a family or a
            few friends sharing the cost it works well. Rates vary by season and
            group size, so{" "}
            <Link href="/#book" className={linkClass}>
              ask us for a quote
            </Link>
            .
          </p>
        </div>

        <figure className="my-10">
          <Image
            src={img.sunroomSeaTable.src}
            alt={img.sunroomSeaTable.alt}
            width={img.sunroomSeaTable.width}
            height={img.sunroomSeaTable.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full rounded-3xl object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The top-floor sunroom at the house, in our own photograph. On a
            cold morning it is where we would watch from
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
          title="If you remember one thing"
          thesis="Come in September, stay three nights, start at Struisbaai, and don't let anyone promise you a whale."
          body={
            <>
              That is the whole of our advice on the Cape Agulhas whale watching
              season. Put the southern tip on your South African itinerary with
              enough nights to make it fair, and if you are aiming at the
              Heritage Day weekend,{" "}
              <Link
                href="/#book"
                className="font-medium text-sea-deep underline-offset-4 hover:underline"
              >
                hold your dates
              </Link>{" "}
              early.
            </>
          }
        />

        <Sources
          items={[
            {
              label:
                "University of Pretoria Whale Unit — South African southern right whale aerial surveys, 2025 report",
              href: src.survey2025,
            },
            {
              label: "University of Pretoria — 2019 survey results",
              href: src.up2019,
            },
            {
              label: "University of Pretoria — 2020 survey results",
              href: src.up2020,
            },
            {
              label:
                "Elwen, University of Pretoria — environmental factors in southern right whale distribution",
              href: src.elwen,
            },
            {
              label: "Cape Agulhas Tourism — southern right whales",
              href: src.capeAgulhasTourism,
            },
            {
              label: "Cape Agulhas Tourism Promotion Office — the Struisbaai boardwalk",
              href: src.struisbaaiBoardwalk,
            },
            {
              label: "SANParks — whale watching at Agulhas National Park",
              href: src.sanparks,
            },
            {
              label: "SANParks — daily conservation fees, 2026/27",
              href: src.sanparksFees,
            },
            {
              label: "CapeNature — De Hoop Nature Reserve tariffs",
              href: src.deHoopFees,
            },
            {
              label: "South African Tourism — southern right whale conservation",
              href: src.saTourism,
            },
            {
              label: "Land's Edge — whale watching in Struisbaai from land",
              href: src.landsEdge,
            },
            {
              label: "SA-Venues — whale watching in Cape Agulhas",
              href: src.saVenues,
            },
            {
              label: "Mossel Bay Advertiser — the department's boat rules, 2023",
              href: src.dffe,
            },
            {
              label: "Dyer Island Conservation Trust — the 300-metre rule and drones",
              href: src.dict,
            },
            {
              label: "Hermanus Tourism — whale viewing and permitted boats",
              href: src.hermanus,
            },
            {
              label: "GetYourGuide — boat-based whale watching from Gansbaai",
              href: src.gansbaai,
            },
            {
              label: "ORCA — southern right whale identification",
              href: src.orca,
            },
            {
              label: "Discover Cape Agulhas — the Struisbaai stingrays",
              href: src.stingrays,
            },
          ]}
        />
      </div>

      <WhatsAppCTA
        title="Plan a coastal stay around the whales"
        body="Gans-te-Ver sleeps ten inside the Suiderstrand reserve, with five en-suite bedrooms, the sea in front of the house and Struisbaai a short drive away. Message Madelaine with your dates for availability and a quote."
        buttonLabel="Check availability on WhatsApp"
        pageKey="blog"
      />
    </article>
  );
}
