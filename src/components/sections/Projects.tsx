"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, type CaseStudy } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

const AUTO_SCROLL_SPEED = 0.4; // px per frame
const RESUME_DELAY_MS = 1800;
const COPIES = 3;

const loopedProjects = Array.from({ length: COPIES }, (_, copy) =>
  projects.map((project) => ({ project, key: `${project.slug}-${copy}` })),
).flat();

export function Projects() {
  const [active, setActive] = useState<CaseStudy | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const scrollPosRef = useRef(0);
  const setWidthRef = useRef(0);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function resync() {
    if (scrollRef.current) scrollPosRef.current = scrollRef.current.scrollLeft;
  }

  function pause() {
    pausedRef.current = true;
  }

  function resume() {
    resync();
    pausedRef.current = false;
  }

  function pauseTemporarily() {
    pause();
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(resume, RESUME_DELAY_MS);
  }

  // measure one copy's width, start centered in the middle copy, and keep the
  // loop seamless by silently wrapping whenever the scroll drifts into an outer copy
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function measure() {
      setWidthRef.current = el!.scrollWidth / COPIES;
    }

    measure();
    el.scrollLeft = setWidthRef.current;
    scrollPosRef.current = el.scrollLeft;

    function onScroll() {
      const setWidth = setWidthRef.current;
      if (!setWidth || !el) return;
      if (el.scrollLeft >= setWidth * 2) {
        el.scrollLeft -= setWidth;
        scrollPosRef.current -= setWidth;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += setWidth;
        scrollPosRef.current += setWidth;
      }
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // manual wheel -> horizontal scroll, isolated from the page's own smooth scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      e.stopPropagation();
      el!.scrollLeft += e.deltaY;
      pauseTemporarily();
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // slow continuous auto-scroll, looping seamlessly forever
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frameId: number;

    function step() {
      const node = scrollRef.current;
      if (node && !pausedRef.current) {
        const next = scrollPosRef.current + AUTO_SCROLL_SPEED;
        scrollPosRef.current = next;
        node.scrollLeft = next;
      }
      frameId = requestAnimationFrame(step);
    }

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section id="work" className="mx-auto max-w-350 py-28">
      <div className="px-6 sm:px-10">
        <SectionHeading
          label="projects.map()"
          title="Built. Broken. Learned. Rebuilt."
          subtitle="A growing collection of things I've built — each one teaching me something I didn't know before."
        />
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={pauseTemporarily}
          className="flex gap-6 overflow-x-auto px-6 pb-4 scrollbar-none [-ms-overflow-style:none] sm:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {loopedProjects.map(({ project, key }) => (
            <ProjectCard key={key} project={project} onOpen={() => setActive(project)} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
