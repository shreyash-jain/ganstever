import { Section } from "@/components/Section";
import { site } from "@/lib/site";

// Real guest reviews from the Booking.com listing (June 2026) — quoted
// with first names only. Refresh these as new reviews land.
const quotes = [
  {
    text: "The property is located on the beach with direct access to the sea. The property is lovely and spacious and each of the 5 bedrooms have an en-suite bathroom. It has great braai facilities as well as a pizza oven.",
    name: "Sian",
    country: "South Africa",
  },
  {
    text: "Views. Spaciousness. Proximity to sea. Indoor braai facilities. Full of character.",
    name: "Zaahier",
    country: "South Africa",
  },
  {
    text: "It's extremely spacious, and you have easy access to the beach.",
    name: "A Booking.com guest",
    country: "South Africa",
  },
] as const;

const scores = [
  { value: site.reviews.location.toFixed(1), label: "Location" },
  { value: site.reviews.valueForMoney.toFixed(1), label: "Value for money" },
  { value: `${site.reviews.score.toFixed(1)}/10`, label: "Overall score" },
] as const;

export function GuestWord() {
  return (
    <Section
      eyebrow="Don't take our word for it"
      title={`Guests score the location ${site.reviews.location.toFixed(1)} out of 10`}
      intro={`From ${site.reviews.count} verified reviews on ${site.reviews.source} — the people who've already braaied here.`}
    >
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {scores.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-black/5 bg-foam px-6 py-5"
          >
            <p className="font-display text-3xl leading-none text-sea-deep">
              {s.value}
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-sea">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {quotes.map((q) => (
          <figure
            key={q.name}
            className="flex flex-col justify-between rounded-2xl bg-sand/50 p-7"
          >
            <blockquote className="text-sm leading-relaxed text-ink/85">
              &ldquo;{q.text}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
              {q.name} · {q.country} · via {site.reviews.source}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}