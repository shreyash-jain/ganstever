import { site } from "./site";
import { img } from "./images";

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${site.url}/#lodging`,
    name: site.name,
    alternateName: site.fullName,
    description: site.description,
    url: site.url,
    telephone: site.contact.phonePrimaryDisplay,
    image: [img.ogDefault.src],
    priceRange: `from ${site.pricing.currencySymbol}${site.pricing.fromZAR} ${site.pricing.unit}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    sameAs: [
      site.listings.bookingDotCom,
      site.listings.saVenues,
      site.listings.safariNow,
      site.listings.bestGetaways,
      site.listings.capeVenues,
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Sea views", value: true },
      { "@type": "LocationFeatureSpecification", name: "Five en-suite bedrooms", value: true },
      { "@type": "LocationFeatureSpecification", name: "Self-catering kitchen", value: true },
      { "@type": "LocationFeatureSpecification", name: "Pizza oven", value: true },
      { "@type": "LocationFeatureSpecification", name: "Indoor and outdoor braai", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Covered parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Inside a coastal nature reserve", value: true },
      { "@type": "LocationFeatureSpecification", name: "Direct beach access", value: true },
    ],
    checkinTime: site.policies.checkIn,
    checkoutTime: site.policies.checkOut,
    smokingAllowed: false,
    petsAllowed: "By prior arrangement",
    numberOfRooms: site.capacity.bedrooms,
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.tagline,
    inLanguage: "en-ZA",
    publisher: { "@id": `${site.url}/#lodging` },
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleLd(opts: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished: string; // ISO 8601
  dateModified?: string;
  authors?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    image: opts.image,
    url: `${site.url}${opts.path}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: (opts.authors ?? [site.contact.hostName]).map((name) => ({
      "@type": "Person",
      name,
    })),
    publisher: { "@id": `${site.url}/#lodging` },
    mainEntityOfPage: `${site.url}${opts.path}`,
  };
}