import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-350 flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-mono text-xs text-muted">
          {profile.name} — Built with Next.js, React Three Fiber, Framer Motion.
        </p>
        <p className="font-mono text-xs text-muted">{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
