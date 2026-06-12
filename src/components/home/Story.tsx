import Image from "next/image";
import { Section } from "@/components/Section";
import { img } from "@/lib/images";

// Madelaine's words, lightly arranged — first person, never "the property".
const milestones = [
  { year: "1990", text: "My dad buys the stand at Suiderstrand." },
  {
    year: "1991",
    text: "I start building, with my firstborn son Izak just three months old.",
  },
  {
    year: "30 years",
    text: "Christmases, school holidays and long weekends — our family's private hideout.",
  },
  {
    year: "2024",
    text: "We open the doors, so other families can have what we've always had.",
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
            My dad bought this stand in 1990, and I started building the
            following year — my firstborn son, Izak, was three months old.
            For more than thirty years Gans-te-Ver was simply our family&rsquo;s
            holiday home: the place we escaped to, summer after summer, at the
            very bottom of Africa.
          </p>
          <p>
            It sits inside a nature reserve, wonderfully isolated, a few
            metres from the beach — and that isolation is exactly what I will
            always look for. In 2024 I finally opened it to guests, because I
            thought: let me give other people the same luxury. To be in the
            middle of nature, with the sea just there, and nothing you have
            to do about it.
          </p>
          <p>
            This is still my holiday home. Come relax, walk a few of the many
            trails, braai until late — and leave already planning your next
            visit. That&rsquo;s the whole idea.
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