import Image from "next/image";
import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import { img } from "@/lib/images";

// Brief: clarity over cinema. One strong photo, the essentials readable
// in seconds, and an enquiry CTA that never needs hunting for.
const essentials = [
  `Sleeps ${site.capacity.sleeps}`,
  `${site.capacity.bedrooms} en-suite bedrooms`,
  "Inside a nature reserve",
  "Metres from the beach",
  "Cape Agulhas — Africa's southernmost tip",
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-12 md:pt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:px-8 lg:pb-24">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-dune">
            Self-catering holiday home · Suiderstrand, Western Cape
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-sea-deep sm:text-5xl lg:text-[3.4rem]">
            Our family&rsquo;s wild escape — now open to yours.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/80 md:text-lg">
            Gans-te-Ver is the beach house our family built in 1991 inside a
            coastal nature reserve at the southernmost tip of Africa. Ten of
            you, five en-suite bedrooms, a pizza oven, three braais — and the
            sea, a few metres beyond the garden wall.
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {essentials.map((e) => (
              <li
                key={e}
                className="rounded-full border border-sea/15 bg-foam px-3.5 py-1.5 text-xs font-medium text-sea-deep sm:text-sm"
              >
                {e}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={whatsappLink("book")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-sea px-6 py-3 text-sm font-medium text-shell transition-colors hover:bg-sea-deep"
            >
              Enquire on WhatsApp
            </a>
            <Link
              href="#the-house"
              className="inline-flex items-center rounded-full border border-sea/25 px-6 py-3 text-sm font-medium text-sea-deep transition-colors hover:bg-foam"
            >
              See the house
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">
            From {site.pricing.currencySymbol}
            {site.pricing.fromZAR.toLocaleString("en-ZA")} {site.pricing.unit}{" "}
            · minimum {site.policies.minNights} nights
          </p>
        </div>

        <figure className="relative">
          <div className="overflow-hidden rounded-3xl shadow-xl shadow-sea-deep/10">
            <Image
              src={img.heroOpenDoors.src}
              alt={img.heroOpenDoors.alt}
              width={img.heroOpenDoors.width}
              height={img.heroOpenDoors.height}
              priority
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            The lounge, thrown open to the Agulhas sea
          </figcaption>
        </figure>
      </div>
    </section>
  );
}