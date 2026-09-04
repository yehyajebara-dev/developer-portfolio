"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { philosophy } from "@/data/profile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { viewportOnce } from "@/lib/motion";

export function Philosophy() {
  const reduced = useReducedMotion();

  return (
    <section className="border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="How I Work" index="06" title="Build. Solve. Grow." align="center" className="mx-auto" />

        <div className="relative mt-16">
          <motion.div
            aria-hidden="true"
            className="absolute left-0 right-0 top-4 hidden h-px origin-left bg-border-strong sm:block"
            initial={reduced ? undefined : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="grid gap-10 sm:grid-cols-3">
            {philosophy.map((step, index) => (
              <Reveal key={step.id} delay={index * 0.12}>
                <div className="text-center sm:text-left">
                  <span className="relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-strong bg-background font-mono-tight text-sm text-primary">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
