"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site, whatsappLink } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-shell/85 backdrop-blur supports-[backdrop-filter]:bg-shell/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="flex flex-col leading-none"
        >
          <span className="font-display text-2xl tracking-tight text-sea-deep lg:text-[1.7rem]">
            Gans-te-Ver
          </span>
          <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-dune">
            Suiderstrand · Cape Agulhas
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-ink/80">
            {nav.slice(1, -1).map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="transition-colors hover:text-sea"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink("book")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-sea px-4 py-2 text-sm font-medium text-shell transition-colors hover:bg-sea-deep sm:inline-block"
          >
            Enquire on WhatsApp
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/10 text-ink transition-colors hover:bg-sand active:bg-sand lg:hidden"
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-px w-5 bg-current transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-px w-5 bg-current transition-transform ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-black/5 bg-shell lg:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-3">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-base font-medium text-ink/85 hover:text-sea"
                >
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={whatsappLink("book")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-sea px-4 py-2 text-sm font-medium text-shell"
              >
                Enquire on WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}