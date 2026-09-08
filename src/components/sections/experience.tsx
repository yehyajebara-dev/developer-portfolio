"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/data/experience";
import { education, training, languages } from "@/data/profile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionSignal, springSnappy, viewportOnce } from "@/lib/motion";

export function Experience() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 65%"],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section id="experience" className="border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          index="06"
          title="Eight years, four roles, one throughline"
          description="Overlapping dates are intentional — infrastructure work and software development have run in parallel, not in sequence."
        />

        <ol ref={timelineRef} className="relative mt-14 space-y-10 pl-8 sm:pl-10">
          <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-px bg-border" />
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-0 w-px origin-top bg-primary"
            style={{ scaleY: reduced ? 1 : lineProgress, height: "100%" }}
          />

          {experience.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 0.05}>
              <li className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[calc(2rem+5px)] top-1.5 sm:-left-[calc(2.5rem+5px)]"
                >
                  {!reduced ? (
                    <motion.span
                      className="absolute inset-0 -m-1.5 rounded-full bg-primary/50"
                      initial={{ opacity: 0.7, scale: 0.4 }}
                      whileInView={{ opacity: 0, scale: 1.8 }}
                      viewport={viewportOnce}
                      transition={{ duration: motionSignal.pulse.duration, ease: motionSignal.pulse.ease }}
                    />
                  ) : null}
                  <motion.span
                    className="relative block h-2.5 w-2.5 rounded-full border-2 border-background bg-primary"
                    initial={reduced ? undefined : { scale: 0.3 }}
                    whileInView={{ scale: 1 }}
                    viewport={viewportOnce}
                    transition={springSnappy}
                  />
                </span>

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold text-foreground">{entry.role}</h3>
                  <span className="text-sm text-muted-foreground">— {entry.organization}</span>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <p className="font-mono-tight text-xs text-muted-foreground">
                    {entry.start} — {entry.end}
                  </p>
                  {entry.current ? (
                    <span className="inline-flex items-center gap-1.5 font-mono-tight text-xs text-success">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />
                      Current
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{entry.summary}</p>

                <ul className="mt-4 space-y-1.5">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm text-foreground/85">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-border-strong" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-8 rounded-2xl border border-border bg-card p-6 sm:grid-cols-3 sm:p-8">
            <div>
              <h3 className="font-mono-tight text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Education
              </h3>
              {education.map((entry) => (
                <div key={entry.id} className="mt-3">
                  <p className="text-sm font-medium text-foreground">{entry.institution}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{entry.program}</p>
                  <p className="mt-1 text-xs text-muted-foreground/80">{entry.detail}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-mono-tight text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Training
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {training.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono-tight text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Languages
              </h3>
              <ul className="mt-3 space-y-1.5">
                {languages.map((lang) => (
                  <li key={lang.name} className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-foreground/85">{lang.name}</span>
                    <span className="text-xs text-muted-foreground">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
