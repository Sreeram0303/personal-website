import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { StaggerHeading } from "@/components/ui/StaggerHeading";
import { socialLinks } from "@/data/socialLinks";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-350 px-6 py-28 sm:px-10">
      <Reveal>
        <Spotlight className="grid gap-10 rounded-2xl border border-accent-dim bg-background-elevated p-8 transition-colors duration-300 hover:border-accent sm:p-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="flex flex-col gap-8">
            <span className="font-mono text-sm text-accent">socialLinks.map()</span>
            <StaggerHeading
              text="Building intelligent systems, and open to the next one worth building."
              className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl"
            />
          </div>

          <div className="grid w-full max-w-65 grid-cols-2 gap-3 justify-self-start lg:justify-self-end">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-border bg-background p-3 transition-all duration-300 ease-out hover:border-accent hover:shadow-[0_10px_24px_-10px_rgba(94,234,212,0.55)] hover:transform-[perspective(400px)_rotateX(8deg)_rotateY(-8deg)_scale(1.08)]"
              >
                <link.icon className="h-5 w-5 text-muted transition-colors duration-300 group-hover:text-accent" />
                <span className="font-mono text-[10px] text-muted transition-colors duration-300 group-hover:text-accent">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </Spotlight>
      </Reveal>
    </section>
  );
}
