import { Reveal } from "./Reveal";
import { StaggerHeading } from "./StaggerHeading";

export function SectionHeading({
  label,
  title,
  subtitle,
  titleWordDelay,
}: {
  label: string;
  title: string;
  subtitle?: string;
  titleWordDelay?: number;
}) {
  return (
    <div className="mb-12 flex flex-col gap-3 sm:mb-16">
      <Reveal>
        <span className="font-mono text-sm text-accent">{label}</span>
      </Reveal>
      <StaggerHeading
        text={title}
        wordDelay={titleWordDelay}
        className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      />
      {subtitle ? (
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-base text-muted sm:text-lg">{subtitle}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
