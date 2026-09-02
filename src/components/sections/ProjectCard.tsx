"use client";

import { SiGithub } from "react-icons/si";
import { Tag } from "@/components/ui/Tag";
import { Spotlight } from "@/components/ui/Spotlight";
import type { CaseStudy } from "@/data/projects";

export function ProjectCard({
  project,
  onOpen,
}: {
  project: CaseStudy;
  onOpen: () => void;
}) {
  return (
    <Spotlight
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="flex w-80 shrink-0 cursor-pointer flex-col rounded-2xl border border-border bg-background-elevated p-6 transition-colors duration-300 hover:border-accent-dim sm:w-95 sm:p-8"
    >
      <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
      <p className="mt-2 text-sm text-muted sm:text-base">{project.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
        {project.stack.length > 4 ? <Tag>{`+${project.stack.length - 4}`}</Tag> : null}
      </div>

      <div className="mt-6 flex items-center justify-between">
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${project.name} on GitHub`}
            className="text-muted transition-colors hover:text-accent"
          >
            <SiGithub className="h-5 w-5" />
          </a>
        ) : (
          <span />
        )}
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-accent">
          Read the case study
          <span aria-hidden>→</span>
        </span>
      </div>
    </Spotlight>
  );
}
