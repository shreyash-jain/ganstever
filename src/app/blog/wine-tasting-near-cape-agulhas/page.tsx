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

const post = getPost("wine-tasting-near-cape-agulhas")!;

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
        eyebrow="Guide · The Agulhas Wine Triangle"
        title={post.title}
        intro="The best wine tasting near Cape Agulhas is forty-five minutes inland, where the coldest wine ward in Africa makes Sauvignon Blanc out of sea wind and shale."
        byline={`By ${site.contact.hostName} & family`}
        datePublished={post.datePublished}
        readingMinutes={post.readingMinutes}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="prose-gv">
          <p>
            You don&rsquo;t expect a wine route at the bottom of Africa. The
            land down here is fynbos and wind and the long grey roll of the
            Southern Ocean &mdash; vineyards feel like they belong somewhere
            greener, somewhere further north. And yet about forty-five minutes
            inland from our gravel road, on the laterite flats around the old
            mission village of Elim, there is serious wine being grown: the
            coldest, southernmost wine ward on the continent.
          </p>
          <p>
            It is good precisely because of where it is. The same southeaster
            that has us reaching for a jersey on the stoep blows across these
            vineyards all summer, holding the grapes back, ripening them slowly
            over shale and clay. Cool and slow is what makes a Sauvignon Blanc
            taste of nettle and sea spray instead of sugar. We&rsquo;ll sequence
            the day for you &mdash; where to start, where to have lunch, what to
            bring home &mdash; but do one thing first: confirm each
            cellar&rsquo;s hours before you drive. Several keep short or shifting
            weeks, and the honest version of this guide is the one that tells
            you to phone ahead.
          </p>
        </div>

        <TLDR
          label="Activities to do"
          items={[
            "Elim is Africa's southernmost and coolest wine ward — and the best wine tasting near Cape Agulhas is here, about 45 minutes inland from Suiderstrand.",
            "The farms sit close enough together to do the Elim wine route in a day: eight of the Agulhas Wine Triangle's member cellars are in this one ward.",
            "Black Oystercatcher is the best single anchor — a tasting room, a restaurant and canoe or sundowner trips onto the Nuwejaars wetland, all on one farm.",
            "For the flagship, taste at Strandveld / First Sighting — their Sauvignon Blanc is the bottle we tell guests to take home.",
            "Hours vary, and several cellars close on Sundays — confirm each one before you go rather than trusting a printed time.",
          ]}
        />

        <StatGrid
          stats={[
            {
              value: "~45 min",
              label: "to the Elim cellars",
              body: "From Suiderstrand, inland through the fynbos to the wine ward around Elim — an easy drive each way.",
            },
            {
              value: "8",
              label: "cellars in the Elim ward",
              body: "Of fifteen Agulhas Wine Triangle members across five sub-regions, eight sit in Elim — close enough for a single day.",
            },
            {
              value: "2019",
              label: "the Agulhas Wine Triangle formed",
              body: "Growers at the bottom of the country banded together as a non-profit to put the southern tip on the wine map.",
            },
          ]}
        />

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            What the Agulhas Wine Triangle actually is
          </h2>
          <p>
            The name is real, and fairly new. The Agulhas Wine Triangle was
            formed in 2019 as a non-profit to put the growers at the bottom of
            the country on one map, and it now gathers fifteen member wineries
            across five sub-regions &mdash; Elim, Malgas, Cape Agulhas, Napier
            and the Klein Rivier. That is a wide net, and it is worth being
            honest about the scale: a single day will not drive all of it.
          </p>
          <p>
            So this is not a tour of the whole triangle. It is the Elim day.
            Eight of those cellars sit in the Elim ward alone, close enough
            together that South African Tourism says plainly you can explore
            them all in one day. We agree &mdash; and that is the day we send
            guests on.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Why the wine tastes of the wind
          </h2>
          <p>
            The ground in the Elim wine ward is not the decomposed granite of
            Stellenbosch or the slate of the Hemel-en-Aarde. Here it is laterite
            and shale: iron-rich, stony, stingy soil that makes the vines work
            for every grape. Add the southeaster, which barrels across these
            flats off two oceans for much of the growing season, and you get
            small berries, thick skins and a long, slow hang time in the cold.
          </p>
          <p>
            What lands in the glass is unmistakable. The Sauvignon Blanc is all
            nettle, green fig and gooseberry, with a saline edge the growers
            will tell you is the sea itself. The Semillon &mdash; often the
            quieter, more serious bottle on the table &mdash; adds wax, lemon
            and a bit of grip. These are not big, sunny wines. They are lean and
            cold and a little austere, in the best way, and they taste of
            nowhere else.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.elimVineyard.src}
            alt={img.elimVineyard.alt}
            width={img.elimVineyard.width}
            height={img.elimVineyard.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The Elim vineyards run low and wind-pruned over shale &mdash;
            cool-climate ground about forty-five minutes inland from the house
          </figcaption>
        </figure>

        <Callout eyebrow="The short version">
          The bottom of the continent grows wine &mdash; and almost nobody makes
          the forty-five-minute drive to taste it where the wind off two oceans
          made it.
        </Callout>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Wine tasting near Cape Agulhas: how we&rsquo;d build the day
          </h2>
          <p>
            Four stops is plenty. Taste slowly, eat properly in the middle, and
            leave room in the boot. This is the order we send guests in &mdash;
            with the standing caveat to ring ahead:
          </p>
        </div>
      </div>

      <NumberedList
        variant="grid"
        items={[
          {
            title: "Black Oystercatcher, Elim",
            body: "The natural heart of the day: a relaxed tasting room, a restaurant good enough to plan lunch around, and canoe or sundowner trips onto the Nuwejaars wetland — all on one farm. It tastes most days, weekends included, but confirm Mondays before you set out.",
          },
          {
            title: "Strandveld / First Sighting",
            body: "The flagship stop, and where the serious Sauvignon lives. Taste through the range, then buy the one bottle you'll wish you had more of at home. Hours shift with the season, so phone before you point the car at it.",
          },
          {
            title: "Land's End & Ghost Corner",
            body: "Southernmost-vineyard bragging rights. The Land's End vineyards sit about as far south as a grape grows on this continent, and the Ghost Corner Sauvignon and Semillon are the proof in the bottle.",
          },
          {
            title: "A Nuwejaars sundowner to close",
            body: "End on the water rather than at another counter: a late-afternoon trip onto the wetland, glass in hand, as the light goes. If you'd rather keep tasting, swap in a fourth Elim-ward cellar instead.",
          },
        ]}
      />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.sauvignonPour.src}
            alt={img.sauvignonPour.alt}
            width={img.sauvignonPour.width}
            height={img.sauvignonPour.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Cool-climate Sauvignon Blanc &mdash; lean, saline, and the bottle
            most guests end up taking home
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Before you go
          </h2>
          <p>
            Two honest warnings. First, hours: the cellars down here keep
            small-town weeks that change with the season, and several close on
            Sundays &mdash; so treat any time you read online, ours included, as
            a reason to phone rather than a promise. Second, The Berrio: it is an
            Elim-grown wine, but it is not a walk-in tasting room in Napier. It
            is shown by appointment at The Drift, Bruce Jack&rsquo;s farm, so
            plan it deliberately or leave it for next time. Build the day around
            Black Oystercatcher, confirm the rest, and you won&rsquo;t go wrong.
          </p>
          <p>
            The best part of a wine day at the bottom of Africa is the part
            nobody prints on a map: the drive home. Forty-five minutes back
            through the fynbos to{" "}
            <Link
              href="/#the-setting"
              className="font-medium text-sea underline-offset-4 hover:underline"
            >
              the reserve
            </Link>
            , the light going long over the dunes, a few bottles clinking in the
            boot. We have never regretted the detour inland, and we have never
            come back empty-handed.
          </p>
        </div>

        <figure className="my-10 overflow-hidden rounded-3xl">
          <Image
            src={img.balconyBraaiSea.src}
            alt={img.balconyBraaiSea.alt}
            width={img.balconyBraaiSea.width}
            height={img.balconyBraaiSea.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Bring a bottle home &mdash; the covered braai is where the day ends
          </figcaption>
        </figure>

        <ClosingBlock
          title="The honest summary"
          thesis="You came to the bottom of Africa for the sea. Drive forty-five minutes inland, and you'll leave with a case of wine you can't buy anywhere else."
          body={
            <>
              Taste slowly, eat at Black Oystercatcher, take home the Sauvignon,
              then open the first bottle on the stoep{" "}
              <Link
                href="/#book"
                className="font-medium text-sea-deep underline-offset-4 hover:underline"
              >
                back at the house
              </Link>{" "}
              as the whales go by. That&rsquo;s the whole itinerary.
            </>
          }
        />

        <Sources
          items={[
            {
              label: "Agulhas Wine Triangle — the growers' association",
              href: "https://agulhaswinetriangle.co.za/",
            },
            {
              label: "South African Tourism — the Elim wine route",
              href: "https://www.southafrica.net/gl/en/travel/article/the-elim-wine-route",
            },
            {
              label: "Strandveld Wines — tasting room",
              href: "https://strandveld.co.za/tasting-room/",
            },
            {
              label: "Discover Cape Agulhas — Black Oystercatcher restaurant",
              href: "https://discovercapeagulhas.co.za/destinations/elim/black-oystercatcher-restaurant/",
            },
            {
              label:
                "Decanter — the Agulhas Wine Triangle, South Africa's southernmost wines",
              href: "https://www.decanter.com/premium/agulhas-wine-triangle-south-africas-southernmost-wines-463070/",
            },
          ]}
        />
      </div>

      <WhatsAppCTA
        title="Make the southern tip your wine-day base"
        body="Gans-te-Ver sleeps ten inside the Suiderstrand reserve — five en-suite bedrooms and a covered braai built for exactly the kind of bottles you'll bring back from Elim. Message Madelaine to check your dates."
        buttonLabel="Check availability on WhatsApp"
        pageKey="blog"
      />
    </article>
  );
}
