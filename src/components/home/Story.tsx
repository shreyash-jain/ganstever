import Image from "next/image";
import { Section } from "@/components/Section";
import { img } from "@/lib/images";

// Warm host voice, written — never "the property", never raw transcription.
const milestones = [
  { year: "1990", text: "My father buys the stand at Suiderstrand." },
  {
    year: "1991",
    text: "Building begins — and the house grows up alongside the children.",
  },
  {
    year: "30 years",
    text: "Christmases, school holidays and long weekends: the family's private hideout.",
  },
  {
    year: "2024",
    text: "The doors open, so other families can have what we've always had.",
  },
] as const;

export function Story() {
  return (
    <Section
      id="our-story"
      tone="sand"
      eyebrow="Our story"
      title="Built for one family. Opened to yours."
    >
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div className="prose-gv max-w-2xl">
          <p>
            The stand came first — bought by my father in 1990, when
            Suiderstrand was little more than fynbos, dunes and a gravel road
            that stops where the continent does. I started building the
            following year, and the house grew up with the family: more
            bedrooms as the children came, longer tables as the friends did.
          </p>
          <p>
            It stands alone inside a nature reserve, a few metres from the
            beach, and that wonderful isolation is the whole point. For three
            decades we kept it to ourselves — then, in 2024, we decided a
            place like this was too good not to share, and opened the doors.
          </p>
          <p>
            It is still our holiday home, and a stay here still works the way
            it always has: walk the trails, swim when the water lets you,
            braai until late — and leave already planning the next visit.
          </p>
          <p className="font-display text-lg text-sea-deep">
            — Madelaine, your host
          </p>

          <ol className="not-prose mt-10 space-y-4 border-l-2 border-dune/40 pl-6">
            {milestones.map((m) => (
              <li key={m.year} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[1.85rem] top-1.5 h-2.5 w-2.5 rounded-full bg-dune"
                />
                <p className="font-display text-xl text-dune-deep">{m.year}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/80">
                  {m.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <figure className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src={img.balconyBraaiSea.src}
              alt={img.balconyBraaiSea.alt}
              width={img.balconyBraaiSea.width}
              height={img.balconyBraaiSea.height}
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The balcony braai — thirty years of family suppers up here
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}