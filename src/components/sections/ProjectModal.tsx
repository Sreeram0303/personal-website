"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Tag } from "@/components/ui/Tag";
import { useLenis } from "@/components/layout/SmoothScroll";
import type { CaseStudy } from "@/data/projects";

const caseFields: { key: keyof CaseStudy; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "whyItMatters", label: "Why it matters" },
  { key: "architecture", label: "Architecture" },
  { key: "role", label: "My role" },
];

export function ProjectModal({
  project,
  onClose,
}: {
  project: CaseStudy | null;
  onClose: () => void;
}) {
  const lenis = useLenis();

  useEffect(() => {
    if (!project) return;

    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [project, lenis, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="relative max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border bg-background-elevated p-6 sm:p-10"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              ✕
            </button>

            <h3 className="pr-10 text-2xl font-semibold text-foreground sm:text-3xl">
              {project.name}
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">{project.tagline}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>

            <div className="mt-8 grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
              {caseFields.map((field) => (
                <div key={field.key}>
                  <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">
                    {field.label}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted sm:text-base">
                    {project[field.key] as string}
                  </p>
                </div>
              ))}

              <div className="sm:col-span-2">
                <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">
                  Technical decisions
                </h4>
                <ul className="flex flex-col gap-2">
                  {project.decisions.map((decision) => (
                    <li
                      key={decision}
                      className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">
                  Challenges
                </h4>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  {project.challenges}
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">
                  Outcome
                </h4>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  {project.outcome}
                </p>
              </div>

              <div className="sm:col-span-2">
                <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">
                  What it taught me
                </h4>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  {project.learnings}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
