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

const post = getPost("two-oceans-meet-cape-agulhas-myth")!;

// Four ways to actually stand on the boundary. Rendered as the NumberedList.
// The lighthouse and the map monument are real, named landmarks — described
// in words only; no generated image in this post pretends to be either.
const waysToStandOnIt = [
  {
    title: "The Map of Africa at the tip",
    body: "A stone map of the whole continent, 30 metres round, laid out at the southernmost point. The oceans are named on it. It is the closest thing to a line you will get.",
  },
  {
    title: "The boardwalk from the lighthouse",
    body: "An easy walk along the rocks from the lighthouse car park to the marker. Flat, wind-blown and completely different from the cliffs at Cape Point.",
  },
  {
    title: "The walk from Suiderstrand",
    body: `Our side. About ${site.distances.southernmostTipKm} km by road, or a longer coastal walk east from the reserve. You arrive at the marker with sand on your feet and nobody else around.`,
  },
  {
    title: "Late afternoon, after the cars have gone",
    body: "The tip empties out after four. Sit on the rocks, look south, and remember there is nothing between you and Antarctica but water.",
  },
];

// FAQPage markup has to mirror what is on the page, so these render below
// as well as being emitted as structured data.
const faqs = [
  {
    q: "Do two oceans really meet at Cape Agulhas?",
    a: "Officially, yes. The International Hydrographic Organization draws the line between the Atlantic and Indian oceans at 20° east, and that line touches land at Cape Agulhas. You will not see a line in the water, though — there is none.",
  },
  {
    q: "Is it Cape Agulhas or Cape Point where the oceans meet?",
    a: "Cape Agulhas. Cape Point is about 150 km to the north-west and sits on the Atlantic side. Even South African Tourism's own website says the map boundary is at Agulhas.",
  },
  {
    q: "Can you see the two oceans meeting?",
    a: "No. The famous photo of two colours of water side by side is glacier meltwater in the Gulf of Alaska, not South Africa. Here the warm and cold water mix over hundreds of kilometres of open sea.",
  },
  {
    q: "Is Cape Agulhas the true southernmost tip of Africa?",
    a: "Yes — about 55 km further south than the Cape of Good Hope. There is a survey marker and the Map of Africa monument on the exact spot.",
  },
  {
    q: "Why is it called Agulhas?",
    a: "Agulhas means needles in Portuguese. Around 1500 a compass needle here pointed almost exactly at true north, which sailors found remarkable. The name has nothing to do with the two oceans.",
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
        eyebrow="Guide · Two oceans"
        title={post.title}
        intro="People ask us where do two oceans meet — Cape Agulhas or Cape Point? Here is the honest answer, and why you will not see a line in the water at either."
        byline={`By ${site.contact.hostName} & family`}
        datePublished={post.datePublished}
        readingMinutes={post.readingMinutes}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="prose-gv">
          <p>
            Every summer someone stands on our balcony, looks out to sea, and
            asks the same question. <em>So where is it? Where do they meet?</em>
          </p>
          <p>
            They mean the line. The one where the Indian Ocean stops and the
            Atlantic begins. Most people arrive expecting to see it &mdash; a
            change of colour, a seam in the water, something. We have been
            coming here since 1991 and we have never seen it. Nobody has. It
            is not there. But that does not mean the story is false. It just
            means the true version is more interesting than the postcard one.
          </p>
        </div>

        <TLDR
          label="The short version"
          items={[
            "Officially, the two oceans meet at Cape Agulhas — not at Cape Point.",
            "The boundary is a line on a map at 20° east, agreed in 1953. It is a convention, not a wall.",
            "In the real sea, warm Indian Ocean water and cold Atlantic water mix over hundreds of kilometres, and the mixing zone moves.",
            "The viral photo of two colours of water not mixing is from Alaska. It has nothing to do with South Africa.",
            "Cape Agulhas is the true southernmost tip of Africa, about 55 km further south than the Cape of Good Hope.",
          ]}
        />

        <StatGrid
          stats={[
            {
              value: "20°E",
              label: "the official dividing line",
              body: "Runs due south from Cape Agulhas to Antarctica.",
            },
            {
              value: "1953",
              label: "when the line was fixed",
              body: "By the International Hydrographic Organization, in Monaco.",
            },
            {
              value: "55 km",
              label: "further south than Cape Point",
              body: "About half a degree of latitude. Not close.",
            },
          ]}
        />

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Where the myth comes from
          </h2>
          <p>
            Cape Point is an hour from Cape Town. It has cliffs, a funicular, a
            restaurant and a steady stream of tour buses. For decades
            the signs and the tour guides there said the two oceans meet below
            you. It sounds right. The place looks like the end of the world.
          </p>
          <p>
            It is not, though. Cape Point sits on the Atlantic side, roughly 150
            km north-west of us in a straight line. In 2001 the argument got
            heated enough to make the{" "}
            <a
              href="https://mg.co.za/article/2001-06-20-row-over-where-atlantic-indian-oceans-meet/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              Mail &amp; Guardian
            </a>
            , with the Agulhas tourism office calling the Cape Point claim
            &ldquo;completely fallacious&rdquo; and Cape Town Tourism defending
            it. These days even{" "}
            <a
              href="https://www.southafrica.net/uk/en/travel/article/table-mountain-marine-protected-area-where-mighty-currents-mingle"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              South African Tourism&rsquo;s own website
            </a>{" "}
            admits the map boundary is at Agulhas. Old habits are slow to die,
            and the buses still go to Cape Point.
          </p>
          <p>
            Then there is the photo. You have probably seen it: a boat on dark
            blue water next to a wall of pale milky water, with a caption about
            two oceans that refuse to mix. That picture was taken in the{" "}
            <a
              href="https://www.adn.com/science/article/mythbusting-place-where-two-oceans-meet-gulf-alaska/2013/02/05/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              Gulf of Alaska
            </a>{" "}
            in 2007 by a scientist on a research trip. The pale water is
            meltwater from glaciers, full of fine rock dust. It mixes
            eventually. It is not two oceans, and it is definitely not here.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            The official answer: a line at 20 degrees east
          </h2>
          <p>
            Oceans do not come with edges, so in 1953 the{" "}
            <a
              href="https://iho.int/uploads/user/pubs/standards/s-23/S-23_Ed3_1953_EN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              International Hydrographic Organization
            </a>{" "}
            drew some. Its rule for the Indian Ocean&rsquo;s western edge is one
            sentence long: from Cape Agulhas at 20&deg; east, southward along
            that meridian to Antarctica. Everything west of that line is
            Atlantic. Everything east is Indian. The South African Navy&rsquo;s
            hydrographers use the same line. So does every serious atlas.
          </p>
          <p>
            Why Agulhas? Because it is the southernmost point of the continent,
            and the meridian that runs through it is a round number. That is
            all. It is a convention, the way a border between two farms is a
            convention. The sheep do not notice it. Neither does the water.
          </p>
        </div>

        <Callout eyebrow="The whole thing in one line">
          The line is real and it is here. You just cannot see it, because the
          sea has never read the map.
        </Callout>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            What the water is actually doing
          </h2>
          <p>
            This is the part the postcards skip, and it is better than the
            postcard.
          </p>
          <p>
            Down the east coast of Africa runs the Agulhas Current &mdash; warm,
            fast, one of the strongest currents on the planet. Up the west coast
            creeps the Benguela, cold water pulled up from the deep by the wind.
            Somewhere south of us they meet. But they do not meet at a line.
            The Agulhas Current gets to the bottom of Africa, runs out of coast,
            and{" "}
            <a
              href="https://os.copernicus.org/articles/21/93/2025/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              turns back on itself
            </a>{" "}
            in a huge loop, hundreds of kilometres across. Scientists call it
            the retroflection. The loop sits roughly between 16&deg; and 20&deg;
            east &mdash; sometimes west of us, sometimes right on the meridian
            &mdash; and it shifts with the seasons and the wind.
          </p>
          <p>
            Five or six times a year the loop pinches off a ring of warm Indian
            Ocean water, and that ring drifts west into the Atlantic at a few
            kilometres a day. So a bit of the Indian Ocean is always leaking
            into the Atlantic, and the place where warm meets cold is never in
            the same spot two weeks running. That is the true meeting of the
            oceans: not a seam, a slow churn out past the horizon.
          </p>
          <p>
            You will feel it before you see it. Swim at Struisbaai on one day
            and Suiderstrand on the next and the sea can be a different
            temperature. Locals will tell you the water &ldquo;turned&rdquo;
            overnight. That is the mixing zone wandering past.
          </p>
        </div>

        {/* TEMPORARY stand-in: swap to img.twoOceansEddies (and the caption
            "Warm and cold water do meet — as swirls, not a line") once the
            image is generated. agulhasReefSwell is a spare from the wrecks post. */}
        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.agulhasReefSwell.src}
            alt={img.agulhasReefSwell.alt}
            width={img.agulhasReefSwell.width}
            height={img.agulhasReefSwell.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The sea south of the tip &mdash; where the mixing actually happens
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Cape Agulhas vs Cape of Good Hope: which one should you visit?
          </h2>
          <p>
            Honestly? Both, if you have the time. They are not the same kind
            of place.
          </p>
          <p>
            Cape Point is dramatic. Tall cliffs, big surf, baboons in the car
            park, a proper day out from the city. If you want a photograph
            that looks like the edge of a continent, go there.
          </p>
          <p>
            Agulhas is flat. The rocks slope gently into the sea, the wind blows
            straight off Antarctica, and the tip itself is a stone marker and a
            map on the ground. Some people are underwhelmed. We understand
            that. But it is the real place &mdash; the actual bottom of Africa,
            the actual line on the actual chart &mdash; and it is quiet. Most
            afternoons you can have it to yourself. That is the trade: Cape
            Point has the drama, Agulhas has the truth.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            How to stand on the line
          </h2>
        </div>
      </div>

      <NumberedList variant="light" items={waysToStandOnIt} />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            One more myth: the name
          </h2>
          <p>
            People assume &ldquo;Agulhas&rdquo; has something to do with the
            currents. It does not. It is Portuguese for{" "}
            <a
              href="https://en.wikipedia.org/wiki/Cape_Agulhas"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              needles
            </a>
            . Around the year 1500, sailors noticed that a compass needle here
            pointed almost exactly at true north, with no correction needed.
            That was rare and useful, so the cape got named for it. The needle
            has long since drifted; the name stayed.
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
            The sea from our wall &mdash; the Atlantic, by a few kilometres
          </figcaption>
        </figure>

        <div className="prose-gv">
          <p>
            One last thing worth knowing: Suiderstrand sits just <em>west</em>{" "}
            of the tip, a few kilometres short of 20&deg;. So when you swim in
            front of{" "}
            <Link
              href="/#the-setting"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              the reserve
            </Link>
            , you are, on paper, in the Atlantic. Walk east past the marker
            and you cross into the Indian Ocean without getting your feet any
            wetter. It is a good thing to tell children. It is a better thing
            to tell adults who were sure it was Cape Point.
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
          thesis="Two oceans do meet at Cape Agulhas — on the chart, precisely; in the water, as a slow churn you can feel but never see."
          body={
            <>
              The tip is {site.distances.southernmostTipKm} km from our front
              door. See it on our{" "}
              <Link
                href="/blog/things-to-do-cape-agulhas"
                className="font-medium text-sea-deep underline-offset-4 hover:underline"
              >
                list of things to do around the tip
              </Link>
              , fit it into a{" "}
              <Link
                href="/blog/cape-agulhas-weekend-itinerary"
                className="font-medium text-sea-deep underline-offset-4 hover:underline"
              >
                48-hour weekend
              </Link>
              , or just{" "}
              <Link
                href="/#book"
                className="font-medium text-sea-deep underline-offset-4 hover:underline"
              >
                hold your dates
              </Link>{" "}
              and we will point you at the marker.
            </>
          }
        />

        <Sources
          items={[
            {
              label: "International Hydrographic Organization — Limits of Oceans and Seas, 3rd edition (1953)",
              href: "https://iho.int/uploads/user/pubs/standards/s-23/S-23_Ed3_1953_EN.pdf",
            },
            {
              label: "Mail & Guardian (2001) — Row over where Atlantic, Indian oceans meet",
              href: "https://mg.co.za/article/2001-06-20-row-over-where-atlantic-indian-oceans-meet/",
            },
            {
              label: "South African Tourism — Table Mountain MPA: where mighty currents mingle",
              href: "https://www.southafrica.net/uk/en/travel/article/table-mountain-marine-protected-area-where-mighty-currents-mingle",
            },
            {
              label: "Ocean Science (2025) — Long-term variability and trends in the Agulhas Leakage",
              href: "https://os.copernicus.org/articles/21/93/2025/",
            },
            {
              label: "Journal of Physical Oceanography (1988) — The retroflection of the Agulhas Current",
              href: "https://journals.ametsoc.org/view/journals/phoc/18/11/1520-0485_1988_018_1570_trotac_2_0_co_2.xml",
            },
            {
              label: "Anchorage Daily News — Mythbusting the place where two oceans meet",
              href: "https://www.adn.com/science/article/mythbusting-place-where-two-oceans-meet-gulf-alaska/2013/02/05/",
            },
            {
              label: "SAnews — Map of Africa monument opened at the southernmost tip (2019)",
              href: "https://www.sanews.gov.za/south-africa/monument-opened-southernmost-tip-africa",
            },
            {
              label: "Wikipedia — Cape Agulhas",
              href: "https://en.wikipedia.org/wiki/Cape_Agulhas",
            },
          ]}
        />
      </div>

      <WhatsAppCTA
        title="Stay on the line"
        body={`The southernmost tip is ${site.distances.southernmostTipKm} km from the stoep. Gans-te-Ver sleeps ${site.capacity.sleeps} inside the Suiderstrand reserve — ${site.capacity.bedrooms} en-suite bedrooms and, officially, the Atlantic in front of the house.`}
        buttonLabel="Check availability on WhatsApp"
        pageKey="blog"
      />
    </article>
  );
}
