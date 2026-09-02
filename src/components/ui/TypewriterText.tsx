"use client";

import { useEffect, useState } from "react";

const TYPE_MS_PER_CHAR = 35;
const TYPE_MS_JITTER = 30;

function nextDelay(char: string) {
  const jitter = Math.random() * TYPE_MS_JITTER;
  const pause = char === " " ? 40 : /[,—]/.test(char) ? 120 : 0;
  return TYPE_MS_PER_CHAR + jitter + pause;
}

export function TypewriterText({
  text,
  className,
  startDelay = 0,
}: {
  text: string;
  className?: string;
  startDelay?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }

    let tickTimeout: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const startTimeout = setTimeout(() => {
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        i++;
        setCount(i);
        if (i >= text.length) return;
        tickTimeout = setTimeout(tick, nextDelay(text[i - 1]));
      };
      tick();
    }, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(startTimeout);
      if (tickTimeout) clearTimeout(tickTimeout);
    };
  }, [text, startDelay]);

  return (
    <span className={className}>
      {text.slice(0, count)}
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[1em] w-0.5 animate-pulse bg-accent align-baseline"
      />
    </span>
  );
}
