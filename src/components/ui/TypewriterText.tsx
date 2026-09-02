"use client";

import { useEffect, useState } from "react";

const TYPE_MS_PER_CHAR = 35;

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

    let intervalId: ReturnType<typeof setInterval> | undefined;
    const startTimeout = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        i++;
        setCount(i);
        if (i >= text.length && intervalId) {
          clearInterval(intervalId);
        }
      }, TYPE_MS_PER_CHAR);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, startDelay]);

  return (
    <span className={className}>
      {text.slice(0, count)}
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-accent align-middle"
      />
    </span>
  );
}
