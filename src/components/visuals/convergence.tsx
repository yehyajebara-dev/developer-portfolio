"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { viewportOnce } from "@/lib/motion";

const ANGLES = [20, 65, 110, 160, 200, 250, 295, 335];

export function Convergence() {
  const reduced = useReducedMotion();

  return (
    <svg viewBox="0 0 400 200" className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-40 w-full max-w-lg" aria-hidden="true">
      {ANGLES.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 200 + Math.cos(rad) * 190;
        const y = 100 + Math.sin(rad) * 90;
        return (
          <motion.line
            key={angle}
            x1={x}
            y1={y}
            x2={200}
            y2={100}
            stroke="var(--color-border-strong)"
            strokeWidth={1}
            initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          />
        );
      })}
      <motion.circle
        cx={200}
        cy={100}
        r={5}
        fill="var(--color-primary)"
        initial={reduced ? undefined : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
      {!reduced ? (
        <motion.circle
          cx={200}
          cy={100}
          r={5}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={1}
          style={{ transformOrigin: "200px 100px" }}
          initial={{ opacity: 0, scale: 1 }}
          whileInView={{ opacity: [0.6, 0], scale: [1, 5.2] }}
          viewport={viewportOnce}
          transition={{ duration: 2.4, repeat: Infinity, delay: 1, ease: "easeOut" }}
        />
      ) : null}
    </svg>
  );
}
