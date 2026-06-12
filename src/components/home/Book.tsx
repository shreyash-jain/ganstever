import { Section } from "@/components/Section";
import { site, whatsappLink } from "@/lib/site";

export function Book() {
  return (
    <Section
      id="book"
      tone="sea"
      eyebrow="Book your stay"
      title="The sea is already here. You're the missing part."
      intro="Message Madelaine directly on WhatsApp — she typically replies within minutes — or call if you'd rather talk it through."
    >
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl bg-shell/10 p-8 ring-1 ring-shell/15">
          <p className="font-display text-3xl text-shell md:text-4xl">
            From {site.pricing.currencySymbol}
            {site.pricing.fromZAR.toLocaleString("en-ZA")}
            <span className="ml-2 align-middle text-base font-sans text-shell/75">
              {site.pricing.unit}
            </span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-shell/80">
            {site.pricing.note} Minimum {site.policies.minNights} nights ·
            check-in {site.policies.checkIn} · check-out{" "}
            {site.policies.checkOut}.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={whatsappLink("book")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-dune px-6 py-3 text-sm font-medium text-shell transition-colors hover:bg-dune-deep"
            >
              Enquire on WhatsApp
            </a>
            <a
              href={`tel:${site.contact.phonePrimary}`}
              className="inline-flex items-center rounded-full border border-shell/30 px-6 py-3 text-sm font-medium text-shell transition-colors hover:bg-shell/10"
            >
              Call {site.contact.phonePrimaryDisplay}
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-shell/10 p-8 ring-1 ring-shell/15">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-shell/70">
            Prefer a booking site?
          </p>
          <p className="mt-3 text-sm leading-relaxed text-shell/80">
            Gans-te-Ver is also listed on the platforms below — same house,
            same beds, where guests rate us{" "}
            {site.reviews.score.toFixed(1)}/10 (and the location{" "}
            {site.reviews.location.toFixed(1)}). Booking directly on WhatsApp
            always gets you the best available rate and a human on the other
            side.
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            <li>
              <a
                href={site.listings.bookingDotCom}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-shell underline-offset-4 hover:underline"
              >
                Booking.com →
              </a>
            </li>
            <li>
              <a
                href={site.listings.saVenues}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-shell underline-offset-4 hover:underline"
              >
                SA-Venues →
              </a>
            </li>
            <li>
              <a
                href={site.listings.safariNow}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-shell underline-offset-4 hover:underline"
              >
                SafariNow →
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}