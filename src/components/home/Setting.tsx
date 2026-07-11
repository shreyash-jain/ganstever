import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { LightboxGallery } from "@/components/Lightbox";
import { site } from "@/lib/site";
import { img } from "@/lib/images";

const outings = [
  {
    title: "Walk out the door",
    distance: "0 km",
    body: "The house sits inside a coastal nature reserve — fynbos trails, dune paths and empty beach start at the garden wall.",
  },
  {
    title: "The southernmost tip of Africa",
    distance: `±${site.distances.southernmostTipKm} km`,
    body: "Stand where the Indian and Atlantic oceans officially meet, at the iconic map monument in Agulhas National Park.",
  },
  {
    title: "Cape Agulhas lighthouse",
    distance: `±${site.distances.lighthouseKm} km`,
    body: "South Africa's second-oldest working lighthouse (1849). Climb the ladders for the best view in the Overberg.",
  },
  {
    title: "The Meisho Maru shipwreck",
    distance: "On foot",
    body: "The rusting bow of a Japanese fishing trawler, wrecked in 1982, juts from the surf an easy coastal walk from Suiderstrand.",
  },
  {
    title: "Whales in season",
    distance: "Jun – Nov",
    body: "Southern right whales cruise this coast in winter and spring — watch them from the dunes with your morning coffee.",
  },
  {
    title: "Struisbaai harbour & beaches",
    distance: `±${site.distances.struisbaaiKm} km`,
    body: "A 14 km white-sand beach, a working harbour with fresh fish, and short-tail stingrays gliding between the boats.",
  },
] as const;

export function Setting() {
  return (
    <Section
      id="the-setting"
      eyebrow="The setting"
      title="A nature reserve out front, the bottom of Africa out back"
      intro="Suiderstrand is the quiet end of Cape Agulhas: no shops, no noise — just fynbos, beach and a handful of houses inside the reserve. Everything else is minutes away."
    >
      <LightboxGallery>
        <figure className="mt-12">
          <div className="cursor-zoom-in overflow-hidden rounded-3xl">
            <Image
              src={img.gardenBeachCurve.src}
              alt={img.gardenBeachCurve.alt}
              width={img.gardenBeachCurve.width}
              height={img.gardenBeachCurve.height}
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="aspect-[21/9] h-auto w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The view from the house — reserve, beach, sea
          </figcaption>
        </figure>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <figure className="cursor-zoom-in overflow-hidden rounded-2xl">
            <Image
              src={img.gardenSeaView.src}
              alt={img.gardenSeaView.alt}
              width={img.gardenSeaView.width}
              height={img.gardenSeaView.height}
              sizes="(min-width: 640px) 48vw, 100vw"
              className="aspect-[16/9] h-auto w-full object-cover"
            />
          </figure>
          <figure className="cursor-zoom-in overflow-hidden rounded-2xl">
            <Image
              src={img.fynbosSea.src}
              alt={img.fynbosSea.alt}
              width={img.fynbosSea.width}
              height={img.fynbosSea.height}
              sizes="(min-width: 640px) 48vw, 100vw"
              className="aspect-[16/9] h-auto w-full object-cover"
            />
          </figure>
        </div>
      </LightboxGallery>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {outings.map((o) => (
          <article
            key={o.title}
            className="rounded-2xl border border-black/5 bg-shell p-6 shadow-sm shadow-black/[0.02]"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-dune">
              {o.distance}
            </p>
            <h3 className="mt-2 font-display text-lg leading-snug text-sea-deep">
              {o.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{o.body}</p>
          </article>
        ))}
      </div>

      <p className="mt-8 text-base text-ink/80">
        Want more from down here?{" "}
        <Link
          href="/blog"
          className="font-medium text-sea underline-offset-4 hover:underline"
        >
          Read the journal →
        </Link>
      </p>
    </Section>
  );
}