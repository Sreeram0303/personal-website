"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { useLenis } from "@/components/layout/SmoothScroll";

const NAV_OFFSET = 88;

type SmoothLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function SmoothLink({ href, onClick, children, ...rest }: SmoothLinkProps) {
  const lenis = useLenis();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented || !href.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -NAV_OFFSET, duration: 1.2 });
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
