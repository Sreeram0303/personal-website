"use client";

import { useState } from "react";
import { socialLinks } from "@/data/socialLinks";

const RING_SIZE = 550;
const RADIUS = 247;
const DURATION = "24s";

export function OrbitingIcons() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-0 hidden xl:block">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent-dim/40"
        style={{ width: RING_SIZE, height: RING_SIZE }}
      >
        <div
          className="relative h-full w-full"
          style={{
            animation: `orbit-spin ${DURATION} linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {socialLinks.map((link, i) => {
            const angle = (360 / socialLinks.length) * i;
            return (
              <div
                key={link.label}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${RADIUS}px) rotate(${-angle}deg)`,
                }}
              >
                <div
                  style={{
                    animation: `counter-spin ${DURATION} linear infinite`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background-elevated/80 text-muted backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_-4px_rgba(94,234,212,0.65)]"
                  >
                    <link.icon className="h-6 w-6" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
