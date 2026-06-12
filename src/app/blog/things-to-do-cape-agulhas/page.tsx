import type { Metadata } from "next";
import Image from "next/image";
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

const post = getPost("things-to-do-cape-agulhas")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.excerpt,
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
        eyebrow="Guide · Suiderstrand & Cape Agulhas"
        title={post.title}
        intro="The southernmost tip of Africa is not on the way to anywhere — you come here on purpose. Here's what fills the days once you've arrived, from a family that has holidayed on this coast since 1991."
        byline={`By ${site.contact.hostName} & family`}
        datePublished={post.datePublished}
        readingMinutes={post.readingMinutes}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="prose-gv">
          <p>
            Suiderstrand is the quiet end of an already quiet coast: a
            handful of houses inside a coastal nature reserve, seven
            kilometres of gravel past the L&rsquo;Agulhas lighthouse, where
            the road simply stops. People sometimes ask what there is to
            &ldquo;do&rdquo; down here. The honest answer is: exactly as much
            as you want. The continent ends at the bottom of the garden, a
            national park starts at the door, and everything below is within
            twenty minutes of the stoep.
          </p>
        </div>

        <TLDR
          items={[
            "Stand at the official southernmost tip of Africa, where the Indian and Atlantic oceans meet — the map monument is a 10-minute drive or a beautiful coastal walk.",
            "Climb the Cape Agulhas lighthouse (lit in 1849 — South Africa's second-oldest still working) for the best view in the Overberg.",
            "Walk to the Meisho Maru 38 shipwreck straight from Suiderstrand — the rusting bow has sat in the surf since 1982.",
            "June to November, southern right whales cruise past — you can watch them from the dunes with your coffee.",
            "Struisbaai, 15 minutes away, has a working harbour, famously tame stingrays and a white-sand beach that runs 14 unbroken kilometres.",
          ]}
        />

        <StatGrid
          stats={[
            {
              value: site.distances.capeTownHours,
              label: "from Cape Town",
              body: "N2 to Caledon, through Napier and Bredasdorp, and down to the coast — an easy, pretty drive.",
            },
            {
              value: "1849",
              label: "lighthouse first lit",
              body: "Only Green Point in Cape Town has been warning ships longer. You can climb to the top.",
            },
            {
              value: "14 km",
              label: "of Struisbaai beach",
              body: "Often called the longest uninterrupted white-sand beach in the Southern Hemisphere.",
            },
          ]}
        />

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Start where the map ends
          </h2>
          <p>
            The southernmost tip of Africa sits inside Agulhas National Park,
            between L&rsquo;Agulhas and Suiderstrand — which means staying at
            Gans-te-Ver puts you on its doorstep. A boardwalk leads to the
            iconic monument: a giant relief map of Africa laid out in stone,
            marking the official meeting point of the Indian and Atlantic
            oceans. Come at golden hour, when the tour buses are long gone
            and the light goes soft over Africa&rsquo;s last rocks.
          </p>
          <p>
            This is also the place to understand the name of the coast.
            Portuguese sailors called it Cabo das Agulhas — &ldquo;Cape of
            Needles&rdquo; — because their compass needles showed no
            deviation here, true north and magnetic north aligned. Five
            hundred years later it is still a navigator&rsquo;s landmark, and
            still magnificently indifferent to passing ships.
          </p>
        </div>

        <Callout eyebrow="The local secret">
          You don&rsquo;t have to drive to the tip. From Suiderstrand you can
          walk the coast into the park — sea on one side, fynbos on the
          other, and a very good chance of having it entirely to yourself.
        </Callout>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Walks that start at the front door
          </h2>
          <p>
            Gans-te-Ver stands inside the reserve, so the walking starts the
            moment you close the garden gate. These are the ones we send
            every guest on first:
          </p>
        </div>
      </div>

      <NumberedList
        variant="grid"
        items={[
          {
            title: "The shipwreck walk",
            body: "An easy stroll along the Suiderstrand shore to the Meisho Maru 38, a Japanese fishing trawler that ran aground in 1982. Its rusted bow still rises out of the surf — bring a camera at low tide.",
          },
          {
            title: "Rasperpunt trail",
            body: "A roughly 5.5 km circuit through Agulhas National Park's coastal fynbos and along the rocks, passing the wreck. Watch for bontebok and the African black oystercatcher.",
          },
          {
            title: "Spookdraai trail",
            body: "The 'ghost bend' loop above L'Agulhas — about an hour and a half of easy walking with huge views over both the village and the meeting point of two oceans.",
          },
          {
            title: "The beach, any direction",
            body: "Rock pools, shell grit, washed-up treasures and almost nobody else. The reserve beaches in front of the house are the kind children remember for decades.",
          },
        ]}
      />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
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
            The reserve between the house and the sea — this is the commute
            to the beach
          </figcaption>
        </figure>

        <div className="prose-gv">
          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            The lighthouse, the harbour and the rays
          </h2>
          <p>
            Ten minutes back along the coast, the red-and-white Cape Agulhas
            lighthouse has been warning ships off the southern rocks since
            1849. Climb the ladders to the lantern room for the best view in
            the district, then have a toasted sandwich at the café below —
            this is also where the official &ldquo;you are at the tip of
            Africa&rdquo; photographs begin.
          </p>
          <p>
            Fifteen minutes further is Struisbaai: a working fishing harbour
            with turquoise water that looks borrowed from an island brochure.
            Buy fish straight off the boats in season, then look over the
            harbour wall — the short-tail stingrays that glide between the
            hulls are a local institution (the most famous, Parrie, has been
            greeting visitors for years). The beach beyond runs white and
            unbroken for some 14 kilometres toward Arniston.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            Whale season and the wild calendar
          </h2>
          <p>
            From roughly June to November, southern right whales move along
            this coast to calve and court — and Suiderstrand&rsquo;s dunes
            are a private grandstand. We have watched whales breach from the
            braai, mid-skottel. Bring binoculars; you will use them more than
            your phone. Year-round, the reserve&rsquo;s fynbos hums with
            sunbirds, and the rock pools at low tide are an aquarium without
            the entry fee.
          </p>

          <h2 className="font-display text-2xl text-sea-deep md:text-3xl">
            When the southeaster howls
          </h2>
          <p>
            Even wind has its uses here: it is the excuse for the pizza oven.
            But if you want an outing, drive inland — the Moravian mission
            village of Elim (about 40 minutes) is all whitewashed cottages,
            thatch and a working watermill; Bredasdorp has the Shipwreck
            Museum, which makes sudden sense of this coastline&rsquo;s
            nickname, the Graveyard of Ships; and De Mond Nature Reserve,
            toward Arniston, hides one of the prettiest estuary walks in the
            Overberg.
          </p>
        </div>

        <ClosingBlock
          title="The honest summary"
          thesis="Cape Agulhas doesn't perform for visitors. It just carries on being the end of Africa — and lets you stand there."
          body="That's the real itinerary: walk to a shipwreck before breakfast, stand where two oceans meet before lunch, watch whales from the dunes before supper. Then braai, sleep, repeat."
        />

        <Sources
          items={[
            {
              label: "SANParks — Agulhas National Park",
              href: "https://www.sanparks.org/parks/agulhas",
            },
            {
              label: "Cape Agulhas Tourism — L'Agulhas, Struisbaai & Suiderstrand",
              href: "https://www.discovercapeagulhas.co.za/",
            },
            {
              label: "SA-Venues — Things to do in the Cape Agulhas area",
              href: "https://www.sa-venues.com/things-to-do/westerncape/bytown/lagulhas/",
            },
          ]}
        />
      </div>

      <WhatsAppCTA
        title="Stay where the walking starts"
        body="Gans-te-Ver sleeps ten inside the Suiderstrand reserve — five en-suite bedrooms, a pizza oven and the beach a few metres away. Message Madelaine to check your dates."
        buttonLabel="Check availability on WhatsApp"
        pageKey="blog"
      />
    </article>
  );
}
