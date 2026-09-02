import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { philosophyParagraphs, philosophyQuestions } from "@/data/philosophy";

export function Philosophy() {
  return (
    <section id="philosophy" className="mx-auto max-w-350 px-6 py-28 sm:px-10">
      <SectionHeading
        label="Philosophy"
        title="Understand → Design → Build → Debug → Improve"
        titleWordDelay={0.12}
      />

      <div className="grid gap-12 sm:grid-cols-[1fr_1fr]">
        <Reveal>
          <div className="flex flex-col gap-6">
            {philosophyParagraphs.map((p) => (
              <p
                key={p.lead}
                className="max-w-lg text-sm leading-relaxed text-muted sm:text-base"
              >
                {p.lead}
                <span className="font-semibold text-foreground">{p.emphasis}</span>
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-accent">
            Questions I ask before I trust a tool
          </h3>
          <ul className="flex flex-col gap-3">
            {philosophyQuestions.map((q) => (
              <li
                key={q.text}
                className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span className={q.emphasis ? "font-semibold text-foreground" : undefined}>
                  {q.text}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
