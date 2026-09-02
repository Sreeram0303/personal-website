import { socialLinks } from "@/data/socialLinks";

export function SocialRail() {
  return (
    <div className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden w-16 items-center justify-center xl:flex">
      <div className="flex flex-col items-center gap-5">
        <div className="h-16 w-px bg-border" />
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="pointer-events-auto text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-accent hover:drop-shadow-[0_0_8px_rgba(94,234,212,0.6)]"
          >
            <link.icon className="h-5 w-5" />
          </a>
        ))}
        <div className="h-16 w-px bg-border" />
      </div>
    </div>
  );
}
