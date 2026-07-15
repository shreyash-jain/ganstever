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
import { articleLd, breadcrumbLd } from "@/lib/jsonld";
import { getPost } from "@/lib/posts";
import { site } from "@/lib/site";
import { img } from "@/lib/images";

const post = getPost("land-based-whale-watching-cape-agulhas")!;

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

      <BlogHero
        image={post.cover.src}
        alt={post.cover.alt}
        eyebrow="Guide · Whale season at the southern tip"
        title={post.title}
        intro="From June to November the southern rights come close enough to see from the sand — a shore-watcher's guide to land-based whale watching at Cape Agulhas."
        byline={`By ${site.contact.hostName} & family`}
        datePublished={post.datePublished}
        readingMinutes={post.readingMinutes}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="prose-gv">
          <p>
            In Hermanus, whale watching is an industry: boats, boards, a
            festival, a man with a kelp horn. Down here it is quieter than
            that. Every winter the southern right whales come up from the
            Southern Ocean to breed and calve in the shallow water along this
            coast, and from roughly June to November they pass Suiderstrand
            close enough to watch from the dunes &mdash; no boat, no ticket,
            no schedule except theirs.
          </p>
          <p>
            We should be honest before we hand you the binoculars: nobody can
            promise you a whale. Some days the sea is full of them and some
            days it is just sea. What we can promise is that this stretch of
            coast gives you as good a chance from dry land as anywhere in the
            country &mdash; and that the waiting, done from a dune with coffee,
            is no hardship at all. Here is where we stand, and when.
          </p>
        </div>

        <TLDR
          label="Activities to do"
          items={[
            "Southern right whales visit the Cape Agulhas coast from June to November — the peak months are August to October, when sightings are most dependable.",
            "You don't need a boat: Struisbaai whale watching happens off the beach and the harbour wall, and some seasons the whales drift within about 20 metres of the sand.",
            "Whale watching from the Agulhas lighthouse stretch is a walk — take the boardwalk toward the southernmost tip and scan the water off the rocks.",
            "At Suiderstrand we watch whales from the dunes in front of the house, and from the main-suite balcony with the doors open.",
            "July is early season, honestly: the first whales are arriving, but the months to bank on are August to October. Come in July for the storms and the pizza oven, and count a whale as a bonus.",
          ]}
        />

        <StatGrid
          stats={[
            {
              value: "Jun–Nov",
              label: "the whale window",
              body: "Southern rights migrate up from the Southern Ocean to breed and calve in the shelter of this coast, arriving early winter.",
            },
            {
              value: "Aug–Oct",
              label: "the honest peak",
              body: "Cows and calves settle inshore in late winter and spring — the months when a sighting stops being luck and starts being likely.",
            },
            {
              value: "~20 m",
              label: "as close as they come",
              body: "At Struisbaai the whales some seasons drift to within about twenty metres of the shore — closer than most boats are allowed to take you.",
            },
          ]}
        />

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Why the southern tip is a grandstand
          </h2>
          <p>
            Southern rights are coastal animals in winter. They come here for
            calm, shallow water to calve in, which means they hug the shore
            &mdash; often just beyond the backline &mdash; rather than passing
            far out at sea. Add a coastline of low dunes and rocky points that
            lift you a few metres above the water, and the whole southern tip
            becomes a viewing deck. The trick is not finding a boat; it is
            simply being somewhere with a long view of the sea, often enough
            for the odds to work.
          </p>
          <p>
            That is the real advantage of staying inside{" "}
            <Link
              href="/#the-setting"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              the reserve
            </Link>
            : the sea is in front of the house all day, so you are watching
            whenever the whales decide to arrive. We have broken off a braai
            mid-skottel for a breach. The binoculars live on the windowsill in
            season, and they get used more than the television.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Land-based whale watching at Cape Agulhas: where to stand
          </h2>
          <p>
            Four places, in the order we rate them. None needs a booking, and
            all of them are ordinary, beautiful walks even on a whale-less day:
          </p>
        </div>
      </div>

      <NumberedList
        variant="grid"
        items={[
          {
            title: "The dunes at Suiderstrand",
            body: "Our home ground. Walk out of the garden gate, cross the reserve, and take the nearest dune with a clear line at the sea. In season the whales hold station off this shore for hours — and the main-suite balcony works when the southeaster doesn't want you outside.",
          },
          {
            title: "Struisbaai beach and harbour wall",
            body: "Fifteen minutes away, and the closest encounters on this coast: some seasons the whales come within about twenty metres of the sand along Struisbaaiplaat. Scan from the harbour wall, then walk the beach north and keep an eye past the breakers.",
          },
          {
            title: "Below the lighthouse, L'Agulhas",
            body: "Take the boardwalk from the lighthouse toward the southernmost tip and watch the water off the rocks. It is the most dramatic backdrop of the four — two oceans, one whale — and pairs naturally with the lighthouse climb.",
          },
          {
            title: "The cliffs at Arniston",
            body: "Under an hour east, and the only true height on this list. The cliffs above the fishing village give you a gannet's view of the bay, and the whales read as whole animals rather than surfacing backs. Make a morning of it.",
          },
        ]}
      />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.southernRightShore.src}
            alt={img.southernRightShore.alt}
            width={img.southernRightShore.width}
            height={img.southernRightShore.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Southern rights calve in the shallows &mdash; which is why the
            shore, not a boat, is the best seat on this coast
          </figcaption>
        </figure>

        <Callout eyebrow="The short version">
          Down here you don&rsquo;t go whale watching. You put the kettle on,
          carry the binoculars to the dunes, and let the whales do the
          commuting.
        </Callout>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            The honest calendar
          </h2>
          <p>
            The first whales show up in June, and July is early season: they
            are arriving, not yet settled, and a sighting is a gift rather
            than a routine. August is when it turns &mdash; the cows and
            calves move inshore, and from then until October the question most
            mornings is not whether there are whales but how many. November is
            the long goodbye, with stragglers sometimes hanging on toward
            December.
          </p>
          <p>
            So if whales are the whole point of your trip, book August to
            October. But we will put in a word for the edges of the season.
            A July at this house is storm-watching from the window seat while
            a front comes through, the pizza oven earning its keep by
            mid-afternoon, and the reserve to yourself &mdash; and when the
            wind makes the coast unreasonable, the{" "}
            <Link
              href="/blog/wine-tasting-near-cape-agulhas"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              Elim wine ward
            </Link>{" "}
            is forty-five minutes inland and largely indifferent to weather.
            The first whale of winter, seen alone from a cold dune, beats a
            crowded peak-season sighting by some distance.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.stormSeaWinter.src}
            alt={img.stormSeaWinter.alt}
            width={img.stormSeaWinter.width}
            height={img.stormSeaWinter.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Early-season weather &mdash; the fronts that empty the coast are
            the same ones the first whales arrive behind
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            What to bring, and how to look
          </h2>
          <p>
            Binoculars, first and always &mdash; the difference between
            &ldquo;I think that was a whale&rdquo; and watching a calf practise
            breaching. Look for the blow: a V-shaped puff that hangs over the
            water a second longer than spray should. Then be patient; a
            surfacing whale keeps a rhythm, and once you have its interval you
            can follow it along the coast for an hour. Dress for wind whatever
            the forecast says, and give the animals their distance if you are
            on the water&rsquo;s edge &mdash; this is their nursery, not a
            show.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.mainSuiteBalcony.src}
            alt={img.mainSuiteBalcony.alt}
            width={img.mainSuiteBalcony.width}
            height={img.mainSuiteBalcony.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The main-suite balcony &mdash; where our own whale-watching happens,
            doors open, coffee in hand
          </figcaption>
        </figure>

        <ClosingBlock
          title="The honest summary"
          thesis="The best whale-watching platform at Cape Agulhas isn't a boat. It's a dune, a windowsill, a balcony — anywhere you can keep half an eye on the sea for long enough."
          body={
            <>
              Come between August and October if the whales must perform.
              Come in July if you like your coast wild and empty, and take
              the first blow of winter as it is meant: a private showing.
              Either way,{" "}
              <Link
                href="/#book"
                className="font-medium text-sea-deep underline-offset-4 hover:underline"
              >
                the house
              </Link>{" "}
              keeps the binoculars on the windowsill.
            </>
          }
        />

        <Sources
          items={[
            {
              label: "Cape Agulhas Tourism — southern right whales",
              href: "https://capeagulhastourism.co.za/southern-right-whales/",
            },
            {
              label: "SA-Venues — whale watching at Cape Agulhas",
              href: "https://www.sa-venues.com/attractionswc/cape-agulhas-whales.php",
            },
            {
              label: "IWC Whale Watching Handbook — responsible watching",
              href: "https://wwhandbook.iwc.int/",
            },
            {
              label: "SANParks — Agulhas National Park",
              href: "https://www.sanparks.org/parks/agulhas",
            },
          ]}
        />
      </div>

      <WhatsAppCTA
        title="Whale season from your own dunes"
        body="Gans-te-Ver sleeps ten inside the Suiderstrand reserve — five en-suite bedrooms, the sea in front of the house, and a balcony made for the August-to-October peak. Message Madelaine to hold your dates."
        buttonLabel="Check availability on WhatsApp"
        pageKey="blog"
      />
    </article>
  );
}
