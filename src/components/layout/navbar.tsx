"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { profile } from "@/data/profile";
import { navLinks, navSectionIds } from "@/data/sections";
import { useActiveSection } from "@/hooks/use-active-section";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { easeOutExpo, motionNav } from "@/lib/motion";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(navSectionIds);
  const reduced = useReducedMotion();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#top"
          className="font-mono-tight text-sm font-semibold tracking-wide text-foreground"
          onClick={() => setOpen(false)}
        >
          {profile.initials}
          <span className="text-primary">.</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = link.href === `#${activeId}`;
            return (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground data-[active=true]:text-foreground"
                data-active={isActive}
              >
                {link.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-3 -bottom-[1px] h-px bg-primary"
                    transition={reduced ? { duration: 0 } : motionNav.indicator}
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:border-border-strong hover:bg-secondary md:inline-flex"
        >
          Let&apos;s talk
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </Container>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="overflow-hidden border-t border-border bg-background md:hidden"
            initial={reduced ? undefined : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: easeOutExpo }}
          >
            <Container className="flex flex-col py-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={reduced ? undefined : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="min-h-11 py-3 text-base text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                </motion.a>
              ))}
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
