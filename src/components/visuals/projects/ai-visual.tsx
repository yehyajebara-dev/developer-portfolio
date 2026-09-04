"use client";

import { motion } from "motion/react";
import { Bot, User } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { viewportOnce } from "@/lib/motion";

export function AiVisual() {
  const reduced = useReducedMotion();

  return (
    <div className="rounded-xl border border-border bg-background/60 p-5">
      <div className="flex items-center justify-between font-mono-tight text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        <span>Conversation #204</span>
        <span className="text-signal">EN / AR — RTL ready</span>
      </div>

      <motion.div
        className="mt-4 space-y-2.5"
        initial={reduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={viewportOnce}
        variants={{ visible: { transition: { staggerChildren: 0.18 } } }}
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: reduced ? 0 : 8 }, visible: { opacity: 1, y: 0 } }}
          className="flex max-w-[80%] items-center gap-2 rounded-lg rounded-bl-sm border border-border bg-secondary/60 px-3 py-2"
        >
          <Bot aria-hidden="true" size={14} className="shrink-0 text-signal" />
          <span className="text-xs text-foreground/80">Checking warranty status for device #A102…</span>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: reduced ? 0 : 8 }, visible: { opacity: 1, y: 0 } }}
          className="ml-auto flex max-w-[70%] items-center gap-2 rounded-lg rounded-br-sm border border-primary/40 bg-primary/10 px-3 py-2"
        >
          <span className="text-xs text-foreground/90">Escalated to human agent</span>
          <User aria-hidden="true" size={14} className="shrink-0 text-primary" />
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: reduced ? 0 : 8 }, visible: { opacity: 1, y: 0 } }}
          className="flex max-w-[85%] items-center gap-2 rounded-lg rounded-bl-sm border border-border bg-secondary/60 px-3 py-2"
        >
          <User aria-hidden="true" size={14} className="shrink-0 text-foreground" />
          <span className="text-xs text-foreground/80">Takeover logged — reviewing order history</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
