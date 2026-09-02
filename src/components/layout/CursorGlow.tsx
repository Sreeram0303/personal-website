"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const SIZE = 560;

export function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);
  const springX = useSpring(x, { stiffness: 150, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 150, damping: 22, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(fine && !reduceMotion);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    function handleMove(e: MouseEvent) {
      x.set(e.clientX - SIZE / 2);
      y.set(e.clientY - SIZE / 2);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40"
      style={{
        x: springX,
        y: springY,
        width: SIZE,
        height: SIZE,
        background:
          "radial-gradient(circle, rgba(94,234,212,0.16) 0%, rgba(94,234,212,0.06) 35%, transparent 70%)",
        filter: "blur(8px)",
        mixBlendMode: "screen",
      }}
    />
  );
}
