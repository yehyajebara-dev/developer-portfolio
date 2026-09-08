"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { BuildSolveGrowVisual } from "@/components/visuals/build-solve-grow";
import { philosophy } from "@/data/profile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const BOUNDARY_1 = 0.33;
const BOUNDARY_2 = 0.66;

/** Which of the three acts a given scroll progress falls into. */
function actForProgress(progress: number) {
  if (progress < BOUNDARY_1) return 0;
  if (progress < BOUNDARY_2) return 1;
  return 2;
}

function StaticPhilosophy() {
  return (
    <div className="relative mt-16">
      <div className="absolute left-0 right-0 top-4 hidden h-px bg-border-strong sm:block" />
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
  );
}

function ScrollPhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeAct, setActiveAct] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = actForProgress(latest);
    setActiveAct((prev) => (prev === next ? prev : next));
  });

  // Continuous per-act progress for the SVG animation internals (clamped outside their own range).
  const build = useTransform(scrollYProgress, [0, BOUNDARY_1], [0, 1]);
  const solve = useTransform(scrollYProgress, [BOUNDARY_1, BOUNDARY_2], [0, 1]);
  const grow = useTransform(scrollYProgress, [BOUNDARY_2, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[280vh]">
      <div className="sticky top-24 grid gap-10 sm:grid-cols-2 sm:items-center sm:gap-16">
        <div className="relative min-h-[180px]">
          {philosophy.map((step, i) => (
            <div
              key={step.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-500 ease-out",
                activeAct === i ? "opacity-100" : "opacity-0",
              )}
            >
              <span className="font-mono-tight text-xs text-primary">0{i + 1}</span>
              <h3 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">{step.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">{step.description}</p>
            </div>
          ))}
        </div>

        <BuildSolveGrowVisual build={build} solve={solve} grow={grow} activeAct={activeAct} />
      </div>
    </div>
  );
}

export function Philosophy() {
  const reduced = useReducedMotion();

  return (
    <section id="how-i-work" className="border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="How I Work" index="07" title="Build. Solve. Grow." align="center" className="mx-auto" />
        {reduced ? <StaticPhilosophy /> : <ScrollPhilosophy />}
      </Container>
    </section>
  );
}
