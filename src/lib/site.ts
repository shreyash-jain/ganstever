export const site = {
  name: "Gans-te-Ver",
  fullName: "Gans-te-Ver Suiderstrand",
  tagline: "Our family's wild escape — now open to yours.",
  description:
    "Gans-te-Ver is a self-catering holiday home in Suiderstrand at Cape Agulhas, the southernmost tip of Africa. Five en-suite bedrooms sleeping ten, inside a coastal nature reserve and a few metres from the beach — sea views from almost every room, a pizza oven, indoor and outdoor braais, and walking trails straight from the door. Built by our family in 1991, opened to guests in 2024.",
  url: "https://ganstever.com",
  locale: "en_ZA",
  region: "Western Cape, South Africa",
  address: {
    street: "Suiderstrand",
    city: "Suiderstrand, Cape Agulhas",
    region: "Western Cape",
    postalCode: "7287",
    country: "South Africa",
    countryCode: "ZA",
  },
  // Approximate Suiderstrand coordinates — refine with the exact erf GPS
  // once Madelaine confirms.
  geo: { lat: -34.7903, lng: 19.9442 },
  contact: {
    // ⚠️ Confirm this is the right WhatsApp number for Gans-te-Ver before
    // launch (Madelaine's SA number vs the +258 Mozambique number, which
    // belongs with Izmaan Lodge).
    phonePrimary: "+27823744676",
    phonePrimaryDisplay: "+27 82 374 4676",
    whatsapp: "+27823744676",
    whatsappDisplay: "+27 82 374 4676",
    hostName: "Madelaine",
  },
  // The owner's live listings — used as sameAs signals in structured data
  // and linked from the booking section until direct booking takes over.
  listings: {
    bookingDotCom:
      "https://www.booking.com/hotel/za/ganstever-suiderstrand-western-cape.html",
    saVenues: "https://www.sa-venues.com/visit/gansteversuiderstrand",
    safariNow:
      "https://www.safarinow.com/go/gansteversuiderstrand-self-catering-suiderstrand",
    bestGetaways: "https://www.bestgetaways.co.za/go/gans-te-versuiderstrand",
    capeVenues: "https://www.cape-venues.co.za/accommodation/suiderstrand.php",
  },
  policies: {
    checkIn: "14:00",
    checkOut: "10:00",
    minNights: 2,
    pets: "By prior arrangement",
    smoking: false,
  },
  // SA-Venues listing, June 2026: from R1,300 per night for the whole
  // house, seasonal. Numbers anchor trust — keep the "from" honest.
  pricing: {
    fromZAR: 1300,
    currencySymbol: "R",
    unit: "per night, whole house",
    note: "Rates vary by season and group size — message us for an exact quote.",
  },
  capacity: {
    sleeps: 10,
    bedrooms: 5,
    ensuiteBathrooms: 5,
    beds: "Five double beds — every bedroom is en-suite",
  },
  hostedSince: 2024,
  builtIn: 1991,
  // Travel numbers anchor trust — distances are approximate road distances.
  distances: {
    capeTownHours: "2h45",
    capeTownKm: 230,
    lighthouseKm: 7,
    southernmostTipKm: 9,
    struisbaaiKm: 12,
    bredasdorpKm: 37,
    beachMetres: "a few metres",
  },
  keywords: [
    "Suiderstrand accommodation",
    "Cape Agulhas self-catering",
    "L'Agulhas holiday home",
    "southernmost tip of Africa accommodation",
    "Agulhas National Park accommodation",
    "large family beach house Western Cape",
    "self-catering sleeps 10 Overberg",
    "pet friendly accommodation Cape Agulhas",
    "whale watching accommodation Western Cape",
    "beach house weekend from Cape Town",
  ],
} as const;

// Primary nav — the home page is a single flow, so most items are anchors.
// Hrefs start with "/" so they also work from /blog pages.
export const nav = [
  { href: "/", label: "Home" },
  { href: "/#our-story", label: "Our Story" },
  { href: "/#the-house", label: "The House" },
  { href: "/#the-setting", label: "The Setting" },
  { href: "/#practical", label: "Good to Know" },
  { href: "/blog", label: "Journal" },
  { href: "/#book", label: "Book" },
] as const;

// Pre-filled WhatsApp messages per page/section.
// Use whatsappLink(pageKey) to build the URL.
export const whatsappMessages = {
  home: "Hi Madelaine, I found Gans-te-Ver online and would love to enquire about a stay.",
  book: "Hi Madelaine, we'd love to stay at Gans-te-Ver. Could you check availability for our dates?",
  story:
    "Hi Madelaine, I loved the story of Gans-te-Ver — I'd like to enquire about a stay.",
  blog: "Hi Madelaine, I just read your journal — we'd love to come and see Suiderstrand for ourselves.",
} as const;

export type WhatsAppKey = keyof typeof whatsappMessages;

export function whatsappLink(key: WhatsAppKey = "home"): string {
  const number = site.contact.whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent(whatsappMessages[key]);
  return `https://wa.me/${number}?text=${text}`;
}