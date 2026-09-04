"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { NavLink } from "@/types";

const links: NavLink[] = [
  { label: "What I Build", href: "#capabilities" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const reduced = useReducedMotion();

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const section of sections) observer.observe(section);

    function onScroll() {
      if (window.scrollY < 200) setActive("");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
          {links.map((link) => {
            const isActive = active === link.href;
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
                    transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 35 }}
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
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <Container className="flex flex-col py-2">
              {links.map((link, i) => (
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
