"use client";

import { motion } from "motion/react";
import { Building2, Globe, Cpu, MonitorSmartphone, Network, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { capabilities } from "@/data/skills";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const icons = {
  "business-systems": Building2,
  "web-applications": Globe,
  "hardware-integration": Cpu,
  "desktop-software": MonitorSmartphone,
  infrastructure: Network,
  "security-data": ShieldCheck,
} as const;

const spans: Record<string, string> = {
  "business-systems": "lg:col-span-2 lg:row-span-2",
  "web-applications": "lg:col-span-2",
  "hardware-integration": "lg:col-span-1",
  "desktop-software": "lg:col-span-1",
  infrastructure: "lg:col-span-2",
  "security-data": "lg:col-span-2",
};

function PulseSignal() {
  const reduced = useReducedMotion();
  return (
    <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          className="h-6 w-1 rounded-full bg-primary/70"
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
    <section id="capabilities" className="border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What I Build"
          index="02"
          title="Six disciplines, one engineer"
          description="Most developers stop at the browser tab. I take systems the rest of the way — onto the servers, networks, and devices they actually run on."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-flow-dense lg:grid-cols-4">
          {capabilities.map((capability, index) => {
            const Icon = icons[capability.id as keyof typeof icons];
            const isFeature = capability.id === "business-systems";
            return (
              <Reveal key={capability.id} delay={index * 0.05} className={spans[capability.id]}>
                <article
                  className={cn(
                    "group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:border-border-strong sm:p-8",
                    isFeature && "bg-gradient-to-br from-card to-secondary/40",
                  )}
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary text-primary">
                    <Icon aria-hidden="true" size={20} />
                  </div>
                  <h3 className={cn("mt-5 font-semibold text-foreground", isFeature ? "text-xl" : "text-lg")}>
                    {capability.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{capability.description}</p>
                  <ul className="mt-5 space-y-2">
                    {capability.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  {isFeature ? <PulseSignal /> : null}
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
