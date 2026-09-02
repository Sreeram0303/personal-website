import { Fragment } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { philosophyParagraphs, philosophyQuestions, philosophyFlow } from "@/data/philosophy";

export function Philosophy() {
  return (
    <section id="philosophy" className="mx-auto max-w-350 px-6 py-28 sm:px-10">
      <SectionHeading label="Philosophy" title="The same process, every time." />

      <Reveal>
        <div className="mb-14 flex flex-wrap items-center gap-x-3 gap-y-4 sm:mb-16">
          {philosophyFlow.map((step, i) => (
            <Fragment key={step}>
              <span className="group inline-flex cursor-default items-center rounded-full border border-border px-5 py-2.5 font-mono text-sm text-muted transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-[#04110d] hover:shadow-[0_0_20px_-2px_rgba(94,234,212,0.6)] sm:text-base">
                {step}
              </span>
              {i < philosophyFlow.length - 1 ? <span className="text-muted">→</span> : null}
            </Fragment>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-[1fr_1fr]">
        <Reveal>
          <Spotlight className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-background-elevated p-6 transition-colors duration-300 hover:border-accent-dim sm:p-8">
            <span className="font-mono text-3xl leading-none text-accent">&ldquo;</span>
            {philosophyParagraphs.map((p) => (
              <p key={p.lead} className="text-sm leading-relaxed text-muted sm:text-base">
                {p.lead}
                <span className="font-semibold text-foreground">{p.emphasis}</span>
              </p>
            ))}
          </Spotlight>
        </Reveal>

        <Reveal delay={0.1}>
          <Spotlight className="flex h-full flex-col rounded-2xl border border-border bg-background-elevated p-6 transition-colors duration-300 hover:border-accent-dim sm:p-8">
            <h3 className="mb-5 font-mono text-xs uppercase tracking-wider text-accent">
              Questions I ask before I trust a tool
            </h3>
            <ul className="flex flex-col gap-4">
              {philosophyQuestions.map((q, i) => (
                <li key={q.text} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent-dim font-mono text-[11px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-sm leading-relaxed sm:text-base ${
                      q.emphasis ? "font-semibold text-foreground" : "text-muted"
                    }`}
                  >
                    {q.text}
                  </span>
                </li>
              ))}
            </ul>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}
