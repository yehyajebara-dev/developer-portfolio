"use client";

import { motion } from "motion/react";
import { HardDrive } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { viewportOnce } from "@/lib/motion";

const LINE_ITEMS = [
  { name: "Item #4821", price: "$12.00" },
  { name: "Item #1093", price: "$8.50" },
  { name: "Item #7745", price: "$21.00" },
];

export function PosVisual() {
  const reduced = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background/60">
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary/50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        <span className="font-mono-tight ml-2 text-[11px] text-muted-foreground">pos-desktop.exe — offline</span>
      </div>

      <div className="p-5">
        <motion.ul
          initial={reduced ? "visible" : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="space-y-2 font-mono-tight text-xs"
        >
          {LINE_ITEMS.map((item) => (
            <motion.li
              key={item.name}
              variants={{ hidden: { opacity: 0, x: reduced ? 0 : -10 }, visible: { opacity: 1, x: 0 } }}
              className="flex items-center justify-between border-b border-dashed border-border pb-2 text-foreground/80"
            >
              <span>{item.name}</span>
              <span className="text-muted-foreground">{item.price}</span>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono-tight text-sm font-semibold text-foreground">Total $41.50</span>
          <span className="inline-flex items-center gap-1.5 font-mono-tight text-[11px] text-signal">
            <HardDrive aria-hidden="true" size={13} />
            <motion.span
              animate={reduced ? { opacity: 0.8 } : { opacity: [0.4, 1, 0.4] }}
              transition={reduced ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              SQLite synced
            </motion.span>
          </span>
        </div>
      </div>
    </div>
  );
}
