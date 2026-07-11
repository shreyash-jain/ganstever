// Photographs of Gans-te-Ver, served from Cloudinary.
//
// Originals live under the ganstever/ folder of the dprx4pret cloud and
// are uploaded by scripts/upload-to-cloudinary.py. Every URL goes through
// f_auto + q_auto so the CDN picks the optimal format and quality per
// device.
//
// Provenance: these are the owner's own photographs, pulled at full
// resolution from her Best Getaways gallery (scripts/fetch-bestgetaways.py)
// — never scraped from third parties. Replace one at a time as Madelaine's
// Drive uploads / a local shoot land, keeping the same public_ids.

import { cldImage } from "./cloudinary";

export type Img = { src: string; alt: string; width: number; height: number };

export const img = {
  // ---- Hero ------------------------------------------------------------
  // The lounge thrown fully open to the terrace: rattan chairs, fynbos
  // dunes and the turquoise Agulhas sea. The one photo that says
  // "the beach is right there".
  heroOpenDoors: {
    src: cldImage("lounge-sea-view", "f_auto,q_auto,c_limit,w_2000"),
    alt: "The lounge at Gans-te-Ver with its doors fully open to the terrace — two rattan armchairs facing the fynbos dunes and the turquoise sea at Suiderstrand.",
    width: 2400,
    height: 1800,
  },

  // ---- The setting: garden, dunes, beach, sea ---------------------------
  gardenBeachCurve: {
    src: cldImage("garden-beach-curve"),
    alt: "The view from Gans-te-Ver — the lawn and boundary wall giving way to nature-reserve fynbos, with the beach curving away toward Struisbaai.",
    width: 2400,
    height: 1800,
  },
  gardenSeaView: {
    src: cldImage("garden-sea-view"),
    alt: "Gans-te-Ver's garden meeting the coastal nature reserve — green fynbos, white sand patches and the open sea beyond, under a big blue sky.",
    width: 2400,
    height: 1800,
  },
  fynbosSea: {
    src: cldImage("fynbos-sea"),
    alt: "Coastal fynbos rolling from Gans-te-Ver's wall down to the sea at Suiderstrand — unbroken nature reserve between the house and the waterline.",
    width: 2400,
    height: 1800,
  },

  // ---- The house: exterior + arrival ------------------------------------
  houseExterior: {
    src: cldImage("house-exterior"),
    alt: "Gans-te-Ver from the side terrace — a double-storey beach house with floor-to-ceiling glass, white walls and the braai patio in front.",
    width: 2400,
    height: 1799,
  },
  arrivalCarport: {
    src: cldImage("arrival-carport"),
    alt: "Arriving at Gans-te-Ver — the paved driveway, double garage and big shaded carport, with milkwoods and neighbouring Suiderstrand houses beyond.",
    width: 2400,
    height: 1800,
  },

  // ---- Living + dining ---------------------------------------------------
  loungeMain: {
    src: cldImage("lounge-main"),
    alt: "The main open-plan lounge at Gans-te-Ver — a big corner couch around a soft blue rug, with the kitchen and its red gas stove behind.",
    width: 2400,
    height: 1799,
  },
  loungeSecond: {
    src: cldImage("lounge-second"),
    alt: "The second lounge at Gans-te-Ver — blue armchairs and a three-seater couch in the bright open-plan living space.",
    width: 2400,
    height: 1800,
  },
  diningRoom: {
    src: cldImage("dining-room"),
    alt: "The dining room at Gans-te-Ver under skylights — an eight-seater dark-wood table with a sideboard, off the open-plan living area.",
    width: 2400,
    height: 1799,
  },
  diningPizzaOven: {
    src: cldImage("dining-pizza-oven"),
    alt: "The eight-seater dining area at Gans-te-Ver with its brick pizza oven, firewood stacked below and sliding doors onto the sea-view terrace.",
    width: 2400,
    height: 1799,
  },
  diningIndoorBraai: {
    src: cldImage("dining-indoor-braai"),
    alt: "The six-seater dining table at Gans-te-Ver beside the indoor braai, with sliding doors opening to the terrace and the dunes beyond.",
    width: 2400,
    height: 1799,
  },
  braaiWall: {
    src: cldImage("braai-wall"),
    alt: "The braai wall at Gans-te-Ver — two built-in brick hearths with a grid and a winter's worth of firewood stacked beneath.",
    width: 2400,
    height: 1800,
  },

  // ---- Kitchen -----------------------------------------------------------
  kitchenMain: {
    src: cldImage("kitchen-main"),
    alt: "Gans-te-Ver's kitchen — white cabinetry, a red gas stove and oven, double-door fridge-freezer and everything needed for self-catering.",
    width: 2400,
    height: 1799,
  },
  kitchenWide: {
    src: cldImage("kitchen-wide"),
    alt: "The long kitchen counter at Gans-te-Ver — double sink, gas stove and double-door fridge against a timber-look feature wall.",
    width: 2400,
    height: 1800,
  },

  // ---- Bedrooms + bathrooms ----------------------------------------------
  mainSuiteSeaView: {
    src: cldImage("main-suite-sea-view"),
    alt: "The main suite at Gans-te-Ver — from the bed, the room opens straight onto the sea-view balcony with rattan chairs and its own fridge and TV.",
    width: 2400,
    height: 1800,
  },
  mainSuiteBalcony: {
    src: cldImage("main-suite-balcony"),
    alt: "The main suite at Gans-te-Ver opening onto its private balcony — glass balustrade, the dunes and the sea beyond the bed.",
    width: 2400,
    height: 1800,
  },
  mainSuiteSeating: {
    src: cldImage("main-suite-seating"),
    alt: "The main suite's sitting corner at Gans-te-Ver — cane armchairs in sea-blue around a glass table, with the double bed and pine wardrobe beyond.",
    width: 2400,
    height: 1800,
  },
  bedroomEnsuite: {
    src: cldImage("bedroom-ensuite"),
    alt: "A double bedroom at Gans-te-Ver with its en-suite walk-in shower alongside — crisp white linen, blinds and a pine chest of drawers.",
    width: 2400,
    height: 1800,
  },
  bathroomEnsuite: {
    src: cldImage("bathroom-ensuite"),
    alt: "One of five en-suite bathrooms at Gans-te-Ver — stone-tiled walk-in shower with a rain head, basin and a wooden-framed mirror.",
    width: 2400,
    height: 1798,
  },

  // ---- Balcony + terrace + patio ------------------------------------------
  balconyBraaiSea: {
    src: cldImage("balcony-braai-sea"),
    alt: "The covered balcony at Gans-te-Ver — slate tiles, a built-in braai and an uninterrupted view over the nature reserve to the sea.",
    width: 2400,
    height: 1799,
  },
  patioWeber: {
    src: cldImage("patio-weber"),
    alt: "The brick-paved patio at Gans-te-Ver — outdoor dining table, a stone bench and the Weber braai, with fynbos hills beyond the wall.",
    width: 2400,
    height: 1799,
  },

  // ---- AI-illustrative (cool-climate wine journal post) -------------------
  // NOT photographs of Gans-te-Ver, and never passed off as one specific
  // named farm. These two are generated for the Agulhas Wine Triangle post by
  // scripts/generate-images-gemini.py (Gemini image model) and then uploaded
  // to Cloudinary by scripts/upload-to-cloudinary.py, exactly like the photos
  // above. Until that pipeline runs with a GEMINI_API_KEY set, these public_ids
  // will 404 — swap to a property photo if you need to ship before generating.
  // Cover + OG image for the wine post. Wide 16:10 so it sits correctly in the
  // /blog index card (aspect-[16/10]) and the BlogHero fill.
  elimVineyardCover: {
    src: cldImage("elim-vineyard-cover", "f_auto,q_auto,c_limit,w_2000"),
    alt: "Wind-bent rows of cool-climate vines running to a low horizon under a wide grey Overberg sky — the Elim wine ward inland from Cape Agulhas.",
    width: 2000,
    height: 1250,
  },
  elimVineyard: {
    src: cldImage("elim-vineyard"),
    alt: "Low, wind-pruned cool-climate vineyards on stony shale soil under a grey, overcast Overberg sky — illustrative of the Elim wine ward inland from Cape Agulhas.",
    width: 1536,
    height: 1024,
  },
  sauvignonPour: {
    src: cldImage("sauvignon-pour"),
    alt: "A glass of pale, cool-climate Sauvignon Blanc being poured at a rustic tasting-room counter, with green vineyards soft in the background.",
    width: 1536,
    height: 1024,
  },

  // ---- Open Graph / share image -------------------------------------------
  ogDefault: {
    src: cldImage("lounge-sea-view", "f_auto,q_auto,c_fill,g_auto,ar_1200:630,w_1200"),
    alt: "Gans-te-Ver — a self-catering family beach house in Suiderstrand, Cape Agulhas.",
    width: 1200,
    height: 630,
  },
} as const;