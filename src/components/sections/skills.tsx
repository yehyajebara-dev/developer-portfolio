"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { skillGroups } from "@/data/skills";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function Skills() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const active = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0];
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Engineering Stack"
          index="04"
          title="Organized by what it's for, not a wall of logos"
          description="Grouped the way the work actually breaks down — from business logic to the hardware it eventually touches."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-10">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {skillGroups.map((group) => {
              const isActive = group.id === activeId;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveId(group.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative shrink-0 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors duration-200 lg:shrink",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="skills-active-bg"
                      className="absolute inset-0 rounded-lg border border-border-strong bg-secondary"
                      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative">{group.title}</span>
                </button>
              );
            })}
          </div>

          <div className="min-h-[280px] rounded-2xl border border-border bg-card p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduced ? undefined : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-lg font-semibold text-foreground">{active.title}</h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">{active.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
