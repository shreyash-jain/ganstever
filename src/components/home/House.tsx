import Image from "next/image";
import { Section } from "@/components/Section";
import { LightboxGallery } from "@/components/Lightbox";
import { img, type Img } from "@/lib/images";

const features = [
  {
    title: "Five en-suite double bedrooms",
    body: "Every bedroom has its own shower, toilet and basin — no morning queues, even with ten of you.",
  },
  {
    title: "A main suite with its own glassed-in sunroom",
    body: "Double bed, sitting corner, TV and fridge — opening onto a private sea-facing sunroom, newly enclosed with sliding glass windows and its own braai, so the view stays whatever the wind does.",
  },
  {
    title: "Two lounges, two long tables",
    body: "A six-seater beside the indoor braai and an eight-seater under the skylights — nobody eats on their lap.",
  },
  {
    title: "Pizza oven, indoor braai, Weber",
    body: "A wood-fired pizza oven by the big table, a double-hearth braai wall inside, and a Weber on the patio.",
  },
  {
    title: "A proper self-catering kitchen",
    body: "Gas stove and oven, double-door fridge-freezer, microwave and everything you need to feed a full house.",
  },
  {
    title: "The easy extras",
    body: "Free Wi-Fi, covered carport parking, child-friendly — and pets stay free, by prior arrangement.",
  },
] as const;

const gallery: { image: Img; label: string }[] = [
  { image: img.mainSuiteSunroom, label: "The main suite" },
  { image: img.sunroomSeaTable, label: "The top-floor sunroom" },
  { image: img.diningPizzaOven, label: "The pizza oven table" },
  { image: img.loungeMain, label: "The big lounge" },
  { image: img.diningIndoorBraai, label: "Supper by the indoor braai" },
  { image: img.kitchenMain, label: "The kitchen" },
  { image: img.sunroomSunset, label: "Sunset through the sliding glass" },
  { image: img.diningRoom, label: "The eight-seater" },
  { image: img.braaiWall, label: "The braai wall" },
  { image: img.bedroomEnsuite, label: "A double room + en-suite" },
  { image: img.bathroomEnsuite, label: "One of five bathrooms" },
  { image: img.patioWeber, label: "The patio" },
  { image: img.houseExterior, label: "The house itself" },
];

export function House() {
  return (
    <Section
      id="the-house"
      eyebrow="The house"
      title="Room for everyone, and a view from almost every room"
      intro="Five en-suite double bedrooms across a bright, open-plan beach house — built around long tables, big fires and the sea out the window."
    >
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <article
            key={f.title}
            className="rounded-2xl border border-black/5 bg-sand/50 p-6"
          >
            <h3 className="font-display text-lg leading-snug text-sea-deep">
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{f.body}</p>
          </article>
        ))}
      </div>

      <LightboxGallery>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map(({ image, label }) => (
            <figure key={image.src} className="group">
              <div className="cursor-zoom-in overflow-hidden rounded-2xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw"
                  className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">
                {label}
              </figcaption>
            </figure>
          ))}
        </div>
      </LightboxGallery>
      <p className="mt-6 text-sm text-muted">
        Tap any photo to view it full screen.
      </p>
    </Section>
  );
}