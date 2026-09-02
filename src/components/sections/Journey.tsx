import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { journey } from "@/data/journey";

export function Journey() {
  return (
    <section id="journey" className="mx-auto max-w-350 px-6 py-28 sm:px-10">
      <SectionHeading
        label="journey.map()"
        title="From graduation to whatever's next."
        subtitle="Not a resume. A route — each stop a checkpoint, the last one not reached yet."
      />

      <div className="relative">
        <svg
          className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full md:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M 22 4 C 22 12, 78 12, 78 20 S 22 28, 22 36 S 78 44, 78 52 S 22 60, 22 68 S 78 76, 78 84 S 50 90, 50 96"
            stroke="var(--color-accent)"
            strokeOpacity="0.45"
            strokeWidth="0.35"
            strokeDasharray="1.6 2.2"
            strokeLinecap="round"
          />
        </svg>

        <div className="flex flex-col gap-14 md:gap-6">
          {journey.map((stop, i) => {
            const isLast = i === journey.length - 1;
            const align = isLast
              ? "md:justify-center"
              : i % 2 === 0
                ? "md:justify-start"
                : "md:justify-end";

            return (
              <Reveal
                key={stop.id}
                delay={i * 0.05}
                className={`flex ${align} ${isLast ? "mt-6 md:mt-16" : ""}`}
              >
                <div className={`w-full md:w-[46%] ${isLast ? "md:w-[58%]" : ""}`}>
                  <Spotlight
                    className={`rounded-2xl p-6 transition-colors duration-300 sm:p-8 ${
                      stop.aspirational
                        ? "border border-dashed border-accent-dim bg-background hover:border-accent"
                        : "border border-border bg-background-elevated hover:border-accent-dim"
                    }`}
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs ${
                          stop.aspirational
                            ? "border border-dashed border-accent text-accent"
                            : "bg-accent text-[#04110d]"
                        }`}
                      >
                        {stop.marker}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-wider text-muted">
                        {stop.period}
                      </span>
                      {stop.current ? (
                        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                          current
                        </span>
                      ) : null}
                    </div>

                    <h3
                      className={`text-lg font-semibold sm:text-xl ${
                        stop.aspirational ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {stop.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                      {stop.description}
                    </p>
                    {stop.link ? (
                      <a
                        href={stop.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block font-mono text-xs text-accent underline decoration-accent-dim underline-offset-4 hover:decoration-accent"
                      >
                        {stop.link.label} →
                      </a>
                    ) : null}
                  </Spotlight>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
