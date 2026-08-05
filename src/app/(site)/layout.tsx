import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { organizationLd, websiteLd } from "@/lib/jsonld";

/**
 * Layout for the PUBLIC site.
 *
 * `(site)` is a route group — the parentheses keep it out of the URL, so
 * pages here still live at "/" and "/blog/...". It exists so that everything
 * below can be scoped to the marketing pages and kept off /admin:
 *
 *   - the header, footer and WhatsApp button
 *   - the LodgingBusiness / WebSite JSON-LD
 *   - the Google Analytics tag
 *
 * Keeping the analytics tag here rather than in the root layout matters: the
 * owner opening /admin should not be recorded as a visit to her own site, or
 * the dashboard inflates its own numbers.
 *
 * This also means /admin needs no client-side pathname check to strip chrome —
 * it simply never inherits any.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <GoogleAnalytics />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd()) }}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
