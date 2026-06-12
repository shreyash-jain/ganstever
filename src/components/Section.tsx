import { cn } from "@/lib/cn";

// Standard section shell for the single-flow home page: anchor id,
// eyebrow + display title + optional intro, consistent rhythm.
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = "shell",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: React.ReactNode;
  tone?: "shell" | "sand" | "sea";
  className?: string;
}) {
  const tones = {
    shell: "bg-shell",
    sand: "bg-sand/60",
    sea: "bg-sea-deep text-shell",
  } as const;
  const eyebrowColor = tone === "sea" ? "text-shell/70" : "text-dune";
  const titleColor = tone === "sea" ? "text-shell" : "text-sea-deep";
  const introColor = tone === "sea" ? "text-shell/85" : "text-ink/80";

  return (
    <section id={id} className={cn(tones[tone], className)}>
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-24 lg:px-8">
        {(eyebrow || title || intro) && (
          <div className="max-w-3xl">
            {eyebrow && (
              <p
                className={cn(
                  "text-xs font-medium uppercase tracking-[0.22em]",
                  eyebrowColor,
                )}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={cn(
                  "mt-3 font-display text-3xl leading-tight md:text-4xl lg:text-[2.75rem]",
                  titleColor,
                )}
              >
                {title}
              </h2>
            )}
            {intro && (
              <p className={cn("mt-5 text-base leading-relaxed md:text-lg", introColor)}>
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}