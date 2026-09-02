"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { SmoothLink } from "@/components/ui/SmoothLink";

const links = [
  { label: "Journey", href: "#journey" },
  { label: "Work", href: "#work" },
  { label: "Toolset", href: "#toolset" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-350 items-center justify-between px-6 py-4 sm:px-10">
        <SmoothLink href="#top" className="font-mono text-sm tracking-tight text-foreground">
          Sreeram
        </SmoothLink>
        <ul className="hidden gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <SmoothLink
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </SmoothLink>
            </li>
          ))}
        </ul>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-border px-4 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Resume
        </a>
      </nav>
    </motion.header>
  );
}
