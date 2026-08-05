import Script from "next/script";
import { gaMeasurementId } from "@/lib/site";

/**
 * The gtag snippet, rendered only where we want visits recorded.
 *
 * Deliberately NOT in the root layout: /admin must not be measured, or the
 * dashboard inflates its own numbers. Used by the public site layout and by
 * the 404 page (a broken inbound link is worth knowing about).
 *
 * The measurement ID is public by design — it ships in the HTML of every page
 * — so it lives in lib/site.ts rather than in a secret. Nothing is requested
 * from Google while it is empty.
 */
export function GoogleAnalytics() {
  if (!gaMeasurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}');
        `}
      </Script>
    </>
  );
}
