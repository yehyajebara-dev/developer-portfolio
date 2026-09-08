"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlowCard } from "@/components/ui/glow-card";
import { AmbientGlow } from "@/components/visuals/ambient-glow";
import { CapabilityGlyph } from "@/components/visuals/capability-glyph";
import { capabilities } from "@/data/skills";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { CapabilityId } from "@/types";

const spans: Record<CapabilityId, string> = {
  "business-systems": "lg:col-span-2",
  "web-applications": "lg:col-span-2",
  "hardware-integration": "lg:col-span-1",
  "desktop-software": "lg:col-span-1",
  infrastructure: "lg:col-span-2",
  "security-data": "lg:col-span-2",
};

function PulseSignal() {
  const reduced = useReducedMotion();
  return (
    <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          className="h-5 w-1 rounded-full bg-primary/70"
          initial={{ scaleY: 0.3, opacity: 0.4 }}
          animate={reduced ? { scaleY: 0.6, opacity: 0.7 } : { scaleY: [0.3, 1, 0.4], opacity: [0.4, 1, 0.5] }}
          transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
          style={{ transformOrigin: "bottom" }}
        />
      ))}
    </div>
  );
}

export function Capabilities() {
  return (
    <section id="capabilities" className="relative border-t border-border py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <AmbientGlow className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" size={560} />
      </div>

      <Container className="relative">
        <SectionHeading
          eyebrow="What I Build"
          index="03"
          title="Six disciplines, one engineer"
          description="Most developers stop at the browser tab. I take systems the rest of the way — onto the servers, networks, and devices they actually run on."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-flow-dense lg:grid-cols-4">
          {capabilities.map((capability, index) => {
            const isFeature = capability.id === "business-systems";
            return (
              <Reveal key={capability.id} delay={index * 0.06} className={cn("h-full", spans[capability.id])}>
                <GlowCard
                  className={cn(
                    "h-full transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_-24px_var(--color-primary)]",
                    isFeature && "bg-gradient-to-br from-card to-secondary/40",
                  )}
                >
                  <article className="flex h-full flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary text-primary transition-transform duration-300 group-hover:scale-110 group-hover:border-primary/40">
                        <CapabilityGlyph id={capability.id} />
                      </div>
                      <span className="font-mono-tight text-[11px] text-muted-foreground/50">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className={cn("mt-4 font-semibold text-foreground", isFeature ? "text-lg" : "text-base")}>
                      {capability.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{capability.description}</p>
                    <ul className="mt-4 space-y-1.5">
                      {capability.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    {isFeature ? <PulseSignal /> : null}

                    <div aria-hidden="true" className="mt-auto pt-5">
                      <span className="block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-primary/40 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    </div>
                  </article>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
