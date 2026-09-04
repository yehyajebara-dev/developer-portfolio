"use client";

import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { viewportOnce } from "@/lib/motion";

const STAGES = ["Registered", "In Progress", "Verified", "Closed"];

export function WarrantyVisual() {
  const reduced = useReducedMotion();

  return (
    <div className="rounded-xl border border-border bg-background/60 p-5">
      <div className="flex items-center justify-between font-mono-tight text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        <span>Device Lifecycle</span>
        <span className="inline-flex items-center gap-1.5 text-signal">
          <ShieldCheck aria-hidden="true" size={13} />
          RBAC-protected
        </span>
      </div>

      <div className="relative mt-6 flex items-center justify-between">
        <motion.div
          className="absolute left-0 right-0 top-[7px] h-px bg-border-strong"
          initial={reduced ? undefined : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
        />
        {STAGES.map((stage, i) => (
          <motion.div
            key={stage}
            className="relative z-10 flex flex-col items-center gap-2"
            initial={reduced ? undefined : { opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.15 }}
          >
            <span
              className={`h-3.5 w-3.5 rounded-full border-2 border-background ${
                i === STAGES.length - 1 ? "bg-success" : "bg-primary"
              }`}
            />
            <span className="font-mono-tight max-w-[4.5rem] text-center text-[10px] text-muted-foreground">
              {stage}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
