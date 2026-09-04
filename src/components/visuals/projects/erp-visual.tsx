"use client";

import { motion } from "motion/react";
import { Fingerprint } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { viewportOnce } from "@/lib/motion";

const STATUS = [
  "on", "on", "late", "on", "on", "off", "off",
  "on", "on", "on", "late", "on", "off", "off",
  "on", "over", "on", "on", "late", "off", "off",
  "on", "on", "on", "over", "on", "off", "off",
] as const;

const statusColor: Record<string, string> = {
  on: "bg-success/70",
  late: "bg-primary/80",
  over: "bg-signal/80",
  off: "bg-border",
};

export function ErpVisual() {
  const reduced = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-background/60 p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono-tight text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Attendance — Week 34
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono-tight text-[11px] text-signal">
          <Fingerprint aria-hidden="true" size={13} />
          ZKTeco UF200-S
        </span>
      </div>

      <motion.div
        initial={reduced ? undefined : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
        className="mt-3 h-px w-full bg-border-strong"
      />

      <motion.div
        className="mt-4 grid grid-cols-7 gap-1.5"
        initial={reduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={viewportOnce}
        variants={{ visible: { transition: { staggerChildren: 0.02 } } }}
      >
        {STATUS.map((status, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.3 }}
            className={`aspect-square rounded-[3px] ${statusColor[status]}`}
          />
        ))}
      </motion.div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 font-mono-tight text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-success/70" /> On time</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-primary/80" /> Late</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-signal/80" /> Overtime</span>
      </div>
    </div>
  );
}
