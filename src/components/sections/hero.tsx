"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AmbientGlow } from "@/components/visuals/ambient-glow";
import { WorkstationScene } from "@/components/visuals/workstation-scene";
import { Magnetic } from "@/components/ui/magnetic";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";

const stack = ["Laravel", "PHP", "React", "Systems Integration"];

/** The workstation settles in slightly after the copy, as its own beat. */
const sceneEntrance: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.25 } },
};

export function Hero() {
  const reduced = useReducedMotion();
  const initial = reduced ? "visible" : "hidden";
  const sectionRef = useRef<HTMLElement>(null);

  // As the hero scrolls out of view, the workstation recedes rather than
  // just disappearing — a visual handoff cue into what follows.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
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
            {profile.availability}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-balance text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-4 text-lg font-medium text-foreground/90 sm:text-xl">
            Full-Stack Software Engineer
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-mono-tight mt-2 text-xs uppercase tracking-[0.14em] text-signal sm:text-sm"
          >
            {stack.join(" • ")}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-balance text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl"
          >
            {profile.heroHeadline}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
            Based in {profile.location}. {profile.availability}.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#projects"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
              >
                View systems
                <ArrowRight aria-hidden="true" size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-border-strong hover:bg-secondary"
              >
                <Mail aria-hidden="true" size={16} />
                Contact
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          initial={initial}
          animate="visible"
          variants={sceneEntrance}
          style={reduced ? undefined : { scale: sceneScale, opacity: sceneOpacity, y: sceneY }}
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <WorkstationScene />
        </motion.div>
      </Container>
    </section>
  );
}
