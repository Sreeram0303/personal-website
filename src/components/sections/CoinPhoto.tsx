"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  animate,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "framer-motion";
import { profile } from "@/data/profile";
import { OrbitingIcons } from "@/components/sections/OrbitingIcons";

const SPIN_DURATION_MS = 5200;

export function CoinPhoto() {
  const reduceMotion = useReducedMotion();
  const rotateY = useMotionValue(0);
  const spinning = useRef(!reduceMotion);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const [hovered, setHovered] = useState(false);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || !spinning.current) return;
    rotateY.set(rotateY.get() + (delta / SPIN_DURATION_MS) * 360);
  });

  function handleHoverStart() {
    if (reduceMotion) return;
    spinning.current = false;
    controls.current?.stop();
    const current = rotateY.get();
    const target = Math.ceil((current + 1) / 360) * 360;
    controls.current = animate(rotateY, target, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    });
    setHovered(true);
  }

  function handleHoverEnd() {
    if (reduceMotion) return;
    controls.current?.stop();
    setHovered(false);
    rotateY.set(rotateY.get() % 360);
    spinning.current = true;
  }

  return (
    <div className="relative flex h-88 items-center justify-center sm:h-105 lg:h-140 xl:h-148">
      <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,_rgba(94,234,212,0.16),_transparent_65%)]" />

      <OrbitingIcons />

      <motion.div
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        className="relative h-68 w-68 sm:h-80 sm:w-80 lg:h-86 lg:w-86 xl:h-92 xl:w-92"
        style={{ perspective: 1200 }}
      >
        <motion.div style={{ rotateY }} className="h-full w-full">
          <div
            className={`h-full w-full overflow-hidden rounded-full ring-1 ring-accent-dim shadow-[0_0_70px_-20px_rgba(94,234,212,0.4)] transition-[filter] duration-700 ease-out ${
              hovered || reduceMotion ? "grayscale-0" : "grayscale"
            }`}
          >
            <Image
              src={profile.photoUrl}
              alt={profile.name}
              width={640}
              height={640}
              priority
              className="h-full w-full scale-[1.42] object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
