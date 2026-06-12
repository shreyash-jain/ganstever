import Link from "next/link";
import { nav, site, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-sand/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-2xl tracking-tight text-sea-deep">
            Gans-te-Ver
          </p>
          <p className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-dune">
            Suiderstrand · Cape Agulhas
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/75">
            A family beach house inside a coastal nature reserve at the
            southernmost tip of Africa. Five en-suite bedrooms, ten beds-worth
            of family and friends, and the sea a few metres away.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Find your way
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ink/80">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-sea">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Talk to us
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ink/80">
            <li>
              <a
                href={whatsappLink("home")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sea"
              >
                WhatsApp {site.contact.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`tel:${site.contact.phonePrimary}`} className="hover:text-sea">
                Call {site.contact.phonePrimaryDisplay}
              </a>
            </li>
          </ul>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Also find us on
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-ink/70">
            <li>
              <a
                href={site.listings.bookingDotCom}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sea"
              >
                Booking.com
              </a>
            </li>
            <li>
              <a
                href={site.listings.saVenues}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sea"
              >
                SA-Venues
              </a>
            </li>
            <li>
              <a
                href={site.listings.safariNow}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sea"
              >
                SafariNow
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.fullName}. Built with love at
            the bottom of Africa.
          </p>
          <p>
            Self-catering · Sleeps {site.capacity.sleeps} ·{" "}
            {site.capacity.bedrooms} en-suite bedrooms
          </p>
        </div>
      </div>
    </footer>
  );
}