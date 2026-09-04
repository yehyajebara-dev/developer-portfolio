"use client";

import { useRef, type PointerEvent, type ReactElement } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionMicro } from "@/lib/motion";

/** Maximum displacement in px, so the pull stays a hint rather than a drag. */
const MAX_OFFSET = 8;

function clamp(value: number) {
  return Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, value));
}

/**
 * Subtly pulls its child toward the pointer on hover — capped displacement,
 * pointer-fine devices only. Wrap a single button/link child.
 */
export function Magnetic({ children, strength = 0.25 }: { children: ReactElement; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, motionMicro.magnetic);
  const springY = useSpring(y, motionMicro.magnetic);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(clamp((e.clientX - rect.left - rect.width / 2) * strength));
    y.set(clamp((e.clientY - rect.top - rect.height / 2) * strength));
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={reduced ? undefined : { x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
