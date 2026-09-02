import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { skillGroups } from "@/data/skills";
import { SkillTag } from "@/components/sections/SkillTag";
import { skillIcons } from "@/components/sections/skillIcons";

export function Skills() {
  return (
    <section id="toolset" className="mx-auto max-w-350 px-6 py-28 sm:px-10">
      <SectionHeading label="Toolset" title="The tools behind the things I build." />

      <div className="grid gap-8 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.05}>
            <Spotlight className="rounded-2xl border border-border p-6 transition-colors duration-300 hover:border-accent-dim sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">{group.label}</h3>
              <p className="mt-1 text-sm text-muted">{group.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <SkillTag key={item} label={item} Icon={skillIcons[item]} />
                ))}
              </div>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
