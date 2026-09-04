"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Card with a cursor-following radial highlight, driven via CSS vars (no re-renders). */
export function GlowCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    ref.current.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-border-strong",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-primary) 10%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
