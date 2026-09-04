"use client";

import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero() {
  const reduced = useReducedMotion();
  const initial = reduced ? "visible" : "hidden";

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

      <Container className="relative">
        <motion.div variants={container} initial={initial} animate="visible" className="max-w-3xl">
          <motion.p
            variants={item}
            className="font-mono-tight inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary"
          >
            {profile.heroKicker}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p variants={item} className="mt-4 text-lg font-medium text-foreground/90 sm:text-xl">
            {profile.positioning}
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.heroHeadline}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
            >
              View projects
              <ArrowRight aria-hidden="true" size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-border-strong hover:bg-secondary"
            >
              <Mail aria-hidden="true" size={16} />
              Contact
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
