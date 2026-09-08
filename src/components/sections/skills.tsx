"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionNav } from "@/lib/motion";
import { cn } from "@/lib/utils";

const relatedProjectIds: Record<string, string[]> = {
  backend: ["attendance-erp", "warranty-platform"],
  frontend: ["ai-customer-service"],
  database: ["attendance-erp", "desktop-pos"],
  desktop: ["desktop-pos"],
  infrastructure: [],
  integration: ["attendance-erp"],
  tools: [],
};

export function Skills() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  // activeId only ever comes from a group's own id, so this always resolves.
  const active = skillGroups.find((group) => group.id === activeId)!;
  const relatedProjects = relatedProjectIds[active.id] ?? [];
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Engineering Stack"
          index="05"
          title="Organized by what it's for, not a wall of logos"
          description="Grouped the way the work actually breaks down — from business logic to the hardware it eventually touches."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {skillGroups.map((group, index) => {
              const isActive = group.id === activeId;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveId(group.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors duration-200 lg:shrink",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="skills-active-bg"
                      className="absolute inset-0 rounded-lg border border-border-strong bg-secondary"
                      transition={reduced ? { duration: 0 } : motionNav.segment}
                    />
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="relative hidden h-6 w-1 shrink-0 overflow-hidden rounded-full bg-border lg:block"
                  >
                    <span
                      className={cn("absolute inset-x-0 top-0 rounded-full bg-primary transition-all duration-500", !isActive && "opacity-40")}
                      style={{ height: `${((index + 1) / skillGroups.length) * 100}%` }}
                    />
                  </span>
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
                transition={motionNav.panel}
              >
                <h3 className="text-lg font-semibold text-foreground">{active.title}</h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">{active.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>

                {relatedProjects.length ? (
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="font-mono-tight text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      Used in
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {relatedProjects.map((id) => {
                        const project = projects.find((p) => p.id === id);
                        if (!project) return null;
                        return (
                          <a
                            key={id}
                            href="#projects"
                            className="font-mono-tight rounded-md border border-primary/30 bg-primary/5 px-2 py-1 text-xs text-primary transition-colors duration-200 hover:bg-primary/10"
                          >
                            {project.name}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
