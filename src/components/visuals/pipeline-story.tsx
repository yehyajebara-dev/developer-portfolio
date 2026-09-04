"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Fingerprint, Cpu, Database, LayoutDashboard } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { motionDataFlow } from "@/lib/motion";

const RULES = ["Schedule", "Break", "Late", "Early", "Overtime", "Holiday", "Leave"];

const STAGES = [
  {
    id: "device",
    icon: Fingerprint,
    label: "Raw Biometric Punches",
    caption:
      "A multi-branch business needed accurate attendance data — not just clock-in times, but every daily IN/OUT punch from a ZKTeco UF200-S terminal, captured reliably across branches.",
  },
  {
    id: "engine",
    icon: Cpu,
    label: "Attendance Engine",
    caption:
      "Laravel applies the real rules on top of raw punches: shift matching, multiple daily punches, late/early thresholds, holiday and leave interaction, and edge cases like missed punches.",
  },
  {
    id: "database",
    icon: Database,
    label: "MySQL — Structured Records",
    caption:
      "Employees, schedules, and punch events resolve into a structured MySQL data model — with role-based access and full audit logging protecting who can view or adjust records.",
  },
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "HR Dashboard",
    caption:
      "The output is business logic, database engineering, and hardware integration combined into one platform — reporting HR actually uses, not raw device logs.",
  },
] as const;

type StageState = "done" | "active" | "pending";

function stageState(index: number, activeIndex: number): StageState {
  if (index < activeIndex) return "done";
  if (index === activeIndex) return "active";
  return "pending";
}

export function PipelineStory() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reduced) return;
    const next = Math.min(STAGES.length - 1, Math.floor(latest * STAGES.length));
    setActiveStage((prev) => (prev === next ? prev : next));
  });

  const effectiveStage = reduced ? STAGES.length - 1 : activeStage;

  return (
    <div ref={containerRef} className="relative">
      <div className="grid gap-10 lg:grid-cols-[360px_1fr] lg:items-start lg:gap-16">
        <div className="relative rounded-2xl border border-border bg-background/60 p-6 sm:p-7 lg:sticky lg:top-24">
          <div className="flex items-center justify-between font-mono-tight text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>Data Pipeline</span>
            <span className="text-signal">ZKTeco UF200-S</span>
          </div>

          <ol className="relative mt-7 space-y-9 pl-8">
            <div aria-hidden="true" className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />
            {!reduced ? (
              <motion.div
                aria-hidden="true"
                className="absolute left-[7px] top-1 w-px origin-top bg-primary"
                style={{ scaleY: scrollYProgress, height: "calc(100% - 8px)" }}
              />
            ) : null}

            {STAGES.map((stage, i) => {
              const state = stageState(i, effectiveStage);
              const isPending = state === "pending";
              const Icon = stage.icon;
              return (
                <li key={stage.id} className="relative">
                  <span
                    className={cn(
                      "absolute -left-8 top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background transition-colors duration-500",
                      isPending ? "bg-border-strong" : "bg-primary",
                    )}
                  />
                  <div
                    className={cn(
                      "flex items-center gap-2 transition-colors duration-500",
                      isPending ? "text-muted-foreground/60" : "text-foreground",
                    )}
                  >
                    <Icon aria-hidden="true" size={15} className={state === "active" ? "text-primary" : undefined} />
                    <span className="text-sm font-medium">{stage.label}</span>
                  </div>

                  {stage.id === "engine" ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {RULES.map((rule, ri) => (
                        <motion.span
                          key={rule}
                          animate={{ opacity: isPending ? 0.25 : 1 }}
                          transition={{ duration: motionDataFlow.stage.duration, delay: state === "active" ? ri * 0.06 : 0 }}
                          className="font-mono-tight rounded border border-border bg-secondary/60 px-1.5 py-0.5 text-[10px] text-foreground/80"
                        >
                          {rule}
                        </motion.span>
                      ))}
                    </div>
                  ) : null}

                  {stage.id === "database" ? (
                    <div className="mt-3 space-y-1.5">
                      {[0, 1, 2].map((row) => (
                        <motion.div
                          key={row}
                          className="h-1.5 rounded-full bg-border-strong"
                          style={{ transformOrigin: "left", width: `${100 - row * 18}%` }}
                          animate={{ scaleX: isPending ? 0 : 1 }}
                          transition={{ duration: 0.5, delay: row * 0.1 }}
                        />
                      ))}
                    </div>
                  ) : null}

                  {stage.id === "dashboard" ? (
                    <div className="mt-3 grid grid-cols-7 gap-1">
                      {Array.from({ length: 14 }).map((_, ci) => (
                        <motion.span
                          key={ci}
                          className={cn("aspect-square rounded-[2px]", ci % 5 === 0 ? "bg-primary/70" : "bg-success/60")}
                          animate={{ opacity: isPending ? 0.15 : 1, scale: isPending ? 0.6 : 1 }}
                          transition={{ duration: 0.4, delay: (ci % 7) * 0.03 }}
                        />
                      ))}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="flex flex-col gap-16 py-2 lg:gap-[28vh] lg:py-[6vh]">
          {STAGES.map((stage, i) => (
            <div key={stage.id} className="max-w-xl">
              <span className="font-mono-tight text-xs text-primary">Stage 0{i + 1}</span>
              <h4 className="mt-2 text-lg font-semibold text-foreground sm:text-xl">{stage.label}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{stage.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
