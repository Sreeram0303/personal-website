import type { IconType } from "react-icons";

export function SkillTag({ label, Icon }: { label: string; Icon: IconType }) {
  return (
    <span
      className="group inline-flex cursor-default items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-[#04110d] hover:shadow-[0_0_18px_-2px_rgba(94,234,212,0.6)]"
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-muted transition-colors duration-300 group-hover:text-[#04110d]" />
      {label}
    </span>
  );
}
