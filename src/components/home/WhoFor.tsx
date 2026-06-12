import { Section } from "@/components/Section";
import { site } from "@/lib/site";

const groups = [
  {
    title: "The whole-family December",
    body: "Grandparents, cousins, toddlers — ten beds across five en-suite rooms means everyone comes, and nobody shares a bathroom. The lawn handles cricket; the pizza oven handles supper.",
  },
  {
    title: "Ten friends, zero schedule",
    body: "Two lounges so the early sleepers and the card players never clash, two long tables for the long dinners, and a beach with nobody on it for the morning after.",
  },
  {
    title: "The long weekend escape",
    body: `${site.distances.capeTownHours} from Cape Town and you're somewhere that feels like the edge of the world — because it literally is. Arrive Friday, reset completely, home by Monday.`,
  },
] as const;

export function WhoFor() {
  return (
    <Section
      tone="sand"
      eyebrow="Who it's for"
      title="Built for big tables and slow days"
      intro={`The house sleeps ${site.capacity.sleeps} without anyone drawing the short straw — that's what thirty years of our own family holidays taught us to build.`}
    >
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {groups.map((g) => (
          <article
            key={g.title}
            className="rounded-2xl bg-shell p-7 shadow-sm shadow-black/[0.03]"
          >
            <h3 className="font-display text-xl leading-snug text-sea-deep">
              {g.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">{g.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}