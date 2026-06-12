import { Section } from "@/components/Section";
import { site } from "@/lib/site";

// Exported so the page can feed the same answers into FAQPage JSON-LD.
export const faqs = [
  {
    q: "How do we get to Gans-te-Ver?",
    a: `From Cape Town it's about ${site.distances.capeTownKm} km (±${site.distances.capeTownHours}): N2 to Caledon, then through Bredasdorp to Struisbaai and L'Agulhas, and follow the coastal road to Suiderstrand. The last stretch is an easy gravel road — fine for any car.`,
  },
  {
    q: "What does self-catering mean here?",
    a: "You bring the food, the house does the rest: a full kitchen with gas stove and oven, double-door fridge-freezer, microwave, plus the pizza oven and braais. Do your big shop in Bredasdorp on the way in — the small shops and restaurants of L'Agulhas and Struisbaai are 10–15 minutes away.",
  },
  {
    q: "What are the check-in and check-out times?",
    a: `Check-in from ${site.policies.checkIn}, check-out by ${site.policies.checkOut}. Minimum stay is ${site.policies.minNights} nights. We'll send simple arrival directions on WhatsApp before you travel.`,
  },
  {
    q: "Can we bring our dog?",
    a: "Pets are welcome by prior arrangement — the house stands inside a nature reserve, so please check with Madelaine first and keep dogs off the fynbos and dunes.",
  },
  {
    q: "Is the house good for children?",
    a: "Very — a walled lawn, a child-friendly layout and a beach a few metres away. The Agulhas coast is wild ocean, though, so children should always be supervised on the rocks and in the water.",
  },
] as const;

export function Practical() {
  return (
    <Section
      id="practical"
      eyebrow="Good to know"
      title="The practical bits, answered straight"
    >
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h3 className="font-display text-xl text-sea-deep">Getting here</h3>
          <ol className="mt-5 space-y-4 border-l-2 border-dune/40 pl-6 text-sm leading-relaxed text-ink/80">
            <li className="relative">
              <span aria-hidden className="absolute -left-[1.85rem] top-1 h-2.5 w-2.5 rounded-full bg-dune" />
              Take the N2 from Cape Town over Sir Lowry&rsquo;s Pass to
              Caledon, then the R316 through Napier to Bredasdorp.
            </li>
            <li className="relative">
              <span aria-hidden className="absolute -left-[1.85rem] top-1 h-2.5 w-2.5 rounded-full bg-dune" />
              Stock up in Bredasdorp (the last big supermarkets), then follow
              the R319 to Struisbaai and L&rsquo;Agulhas.
            </li>
            <li className="relative">
              <span aria-hidden className="absolute -left-[1.85rem] top-1 h-2.5 w-2.5 rounded-full bg-dune" />
              Keep going along the coast past the lighthouse — the easy gravel
              road into the reserve ends at Suiderstrand,{" "}
              {site.distances.capeTownHours} after you left the city.
            </li>
          </ol>
          <p className="mt-6 text-sm text-muted">
            Exact directions and a pin come with your booking confirmation on
            WhatsApp.
          </p>
        </div>

        <div>
          <h3 className="font-display text-xl text-sea-deep">
            Questions every group asks
          </h3>
          <dl className="mt-5 space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl bg-sand/50 p-6">
                <dt className="font-medium text-sea-deep">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink/80">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}