"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuMenu, LuX } from "react-icons/lu";
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
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-350 items-center justify-between py-4 pl-6 pr-6 sm:pl-10 sm:pr-10 xl:pl-24">
        <SmoothLink
          href="#top"
          onClick={() => setOpen(false)}
          className="group font-mono text-sm tracking-tight text-foreground"
        >
          <span className="text-accent transition-colors group-hover:text-foreground">&lt;</span>
          Sreeram
          <span className="text-accent transition-colors group-hover:text-foreground"> /&gt;</span>
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
        <div className="flex items-center gap-3">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-4 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Resume
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent md:hidden"
          >
            {open ? <LuX className="h-4 w-4" /> : <LuMenu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border/60 md:hidden"
          >
            <ul className="flex flex-col px-6 py-2 sm:px-10">
              {links.map((link) => (
                <li key={link.href}>
                  <SmoothLink
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </SmoothLink>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
