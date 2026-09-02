"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { CoinPhoto } from "@/components/sections/CoinPhoto";
import { SmoothLink } from "@/components/ui/SmoothLink";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { StaggerHeading } from "@/components/ui/StaggerHeading";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="mx-auto grid w-full max-w-350 items-center gap-4 px-6 sm:px-10 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col gap-10">
          <TypewriterText
            text={`Hi, I'm Sreeram — ${profile.role}`}
            className="font-mono text-sm text-accent"
          />

          <StaggerHeading
            text={profile.tagline}
            as="h1"
            immediate
            wordDelay={0.09}
            className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="max-w-xl text-base text-muted sm:text-lg"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="flex flex-wrap gap-4"
          >
            <SmoothLink
              href="#work"
              className="rounded-full bg-accent px-6 py-3 font-mono text-sm text-[#04110d] transition-transform hover:scale-[1.03]"
            >
              View the work
            </SmoothLink>
            <SmoothLink
              href="#contact"
              className="rounded-full border border-border px-6 py-3 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </SmoothLink>
          </motion.div>
        </div>

        <CoinPhoto />
      </div>
    </section>
  );
}
