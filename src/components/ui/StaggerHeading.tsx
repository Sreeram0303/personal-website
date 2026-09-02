"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
const SCRAMBLE_FRAMES = 10;
const FRAME_MS = 28;

function ScrambleWord({
  word,
  active,
  delay,
}: {
  word: string;
  active: boolean;
  delay: number;
}) {
  const [display, setDisplay] = useState(word);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      setDisplay(word);
      return;
    }

    const timeout = setTimeout(() => {
      setVisible(true);

      let frame = 0;
      const interval = setInterval(() => {
        frame++;
        const revealCount = Math.ceil((frame / SCRAMBLE_FRAMES) * word.length);
        setDisplay(
          word
            .split("")
            .map((char, i) =>
              i < revealCount ? char : CHARS[Math.floor(Math.random() * CHARS.length)],
            )
            .join(""),
        );

        if (frame >= SCRAMBLE_FRAMES) {
          clearInterval(interval);
          setDisplay(word);
        }
      }, FRAME_MS);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [active, delay, word]);

  return (
    <motion.span
      className="relative inline-block"
      initial={{ opacity: 0, y: 14 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* invisible, holds the final word's width so the scrambling overlay below can't reflow siblings */}
      <span className="invisible">{word}</span>
      <span className="absolute inset-0">{display}</span>
    </motion.span>
  );
}

export function StaggerHeading({
  text,
  className,
  wordDelay = 0.1,
  as = "h2",
  immediate = false,
}: {
  text: string;
  className?: string;
  wordDelay?: number;
  as?: "h1" | "h2";
  immediate?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");
  const Tag = as;
  const active = immediate || inView;

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <ScrambleWord word={word} active={active} delay={i * wordDelay} />
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
