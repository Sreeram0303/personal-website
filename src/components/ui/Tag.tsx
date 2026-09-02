import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full border border-border px-3 py-1 font-mono text-xs text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
