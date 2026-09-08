"use client";

import { useEffect } from "react";
import { motion, useSpring } from "motion/react";
import { storySections, storySectionIds } from "@/data/sections";
import { useActiveSection } from "@/hooks/use-active-section";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Percentage down the rail for the nth section marker. */
function railOffset(index: number) {
  return (index / (storySections.length - 1)) * 100;
}

/** Custom section-index rail, replacing the default scrollbar feel. Desktop only. */
export function ScrollRail() {
  const active = useActiveSection(storySectionIds);
  const reduced = useReducedMotion();
  const activeIndex = Math.max(0, storySections.findIndex((section) => section.id === active));

  const smoothTop = useSpring(0, { stiffness: 260, damping: 32 });

  useEffect(() => {
    smoothTop.set(railOffset(activeIndex));
  }, [activeIndex, smoothTop]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="relative h-64 w-[3px] rounded-full bg-border">
        {/* Filled track from the top down to the active marker, so the dot reads as the
            tip of one continuous element instead of a bright dot floating beside a faint line. */}
        <motion.div
          className="absolute inset-x-0 top-0 origin-top rounded-full bg-primary/40"
          style={{ height: reduced ? `${railOffset(activeIndex)}%` : smoothTop }}
        />
        <motion.div
          className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_3px_var(--color-background),0_0_10px_1px_var(--color-primary)]"
          style={{ top: reduced ? `${railOffset(activeIndex)}%` : smoothTop }}
        />

        {storySections.map((section, i) => (
          <div
            key={section.id}
            className="absolute left-1/2 flex -translate-x-1/2 items-center"
            style={{ top: `${railOffset(i)}%` }}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 -translate-y-1/2 rounded-full",
                i === activeIndex ? "bg-primary" : "bg-border-strong",
              )}
            />
            <span
              className={cn(
                "font-mono-tight absolute right-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] tracking-[0.1em] transition-opacity duration-300",
                i === activeIndex ? "text-primary opacity-100" : "opacity-0",
              )}
            >
              {section.index}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
