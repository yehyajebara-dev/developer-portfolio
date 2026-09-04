"use client";

import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AmbientGlow } from "@/components/visuals/ambient-glow";
import { SystemMap } from "@/components/visuals/system-map";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";

const secondaryExpertise = ["Laravel / PHP", "React", "Business Systems", "Systems Integration", "IT Infrastructure"];

export function Hero() {
  const reduced = useReducedMotion();
  const initial = reduced ? "visible" : "hidden";

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="bg-grid bg-noise pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <AmbientGlow className="right-[-120px] top-[-80px]" color="var(--color-primary)" size={520} />
      <AmbientGlow className="left-[-160px] top-[220px]" color="var(--color-signal)" size={420} />

      <Container className="relative grid gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-8">
        <motion.div variants={staggerContainer(0.09, 0.1)} initial={initial} animate="visible">
          <motion.p
            variants={fadeUp}
            className="font-mono-tight inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
            {profile.heroKicker}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]"
          >
            {profile.heroHeadline}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.positioning}. Based in {profile.location} — {profile.availability.toLowerCase()}.
          </motion.p>

          <motion.ul variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
            {secondaryExpertise.map((skill) => (
              <li
                key={skill}
                className="font-mono-tight rounded-md border border-border bg-secondary/60 px-2.5 py-1 text-xs text-foreground/80"
              >
                {skill}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
            >
              View systems
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

        <motion.div
          initial={reduced ? "visible" : "hidden"}
          animate="visible"
          variants={{ hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.25 } } }}
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <SystemMap />
        </motion.div>
      </Container>
    </section>
  );
}
