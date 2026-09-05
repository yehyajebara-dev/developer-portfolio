"use client";

import type { ReactElement } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { easeOutExpo } from "@/lib/motion";
import type { CapabilityId } from "@/types";

/** One glyph per capability pillar, so the ids stay in lockstep with the data. */
export type GlyphId = CapabilityId;

type GlyphProps = { reduced: boolean };

/** One-shot reveal transition shared by every glyph's line-drawing strokes. */
function draw(reduced: boolean, delay = 0) {
  if (reduced) {
    return { initial: undefined, animate: { pathLength: 1, opacity: 1 } };
  }
  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 0.8, delay, ease: easeOutExpo },
  };
}

function BusinessSystemsGlyph({ reduced }: GlyphProps) {
  const nodes: [number, number][] = [
    [6, 20],
    [20, 8],
    [20, 32],
    [34, 20],
  ];
  return (
    <>
      <motion.path d="M6 20 L20 8 M6 20 L20 32 M20 8 L34 20 M20 32 L34 20" fill="none" stroke="currentColor" strokeWidth={1.2} className="text-border-strong" {...draw(reduced)} />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 3 ? 3.5 : 2.5} fill={i === 3 ? "var(--color-primary)" : "currentColor"} className={i === 3 ? undefined : "text-muted-foreground"} />
      ))}
    </>
  );
}

function WebApplicationsGlyph({ reduced }: GlyphProps) {
  return (
    <>
      <rect x={4} y={6} width={32} height={22} rx={2.5} fill="none" stroke="currentColor" strokeWidth={1.2} className="text-border-strong" />
      <line x1={4} y1={12} x2={36} y2={12} stroke="currentColor" strokeWidth={1} className="text-border-strong" />
      <circle cx={8} cy={9} r={0.9} fill="currentColor" className="text-muted-foreground" />
      {!reduced ? (
        <motion.circle cx={20} cy={20} r={4} fill="var(--color-primary)" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
      ) : (
        <circle cx={20} cy={20} r={4} fill="var(--color-primary)" />
      )}
    </>
  );
}

function HardwareIntegrationGlyph({ reduced }: GlyphProps) {
  return (
    <>
      <rect x={4} y={14} width={10} height={12} rx={1.5} fill="none" stroke="currentColor" strokeWidth={1.2} className="text-border-strong" />
      <circle cx={9} cy={20} r={2} fill="none" stroke="currentColor" strokeWidth={1} className="text-muted-foreground" />
      <motion.path d="M16 20 L26 20" fill="none" stroke="var(--color-signal)" strokeWidth={1.3} strokeDasharray="2 3" {...draw(reduced)} />
      <rect x={26} y={12} width={10} height={16} rx={1.5} fill="none" stroke="currentColor" strokeWidth={1.2} className="text-border-strong" />
      <rect x={29} y={16} width={4} height={2} fill="var(--color-primary)" />
      <rect x={29} y={20} width={4} height={2} fill="currentColor" className="text-muted-foreground" />
    </>
  );
}

function DesktopSoftwareGlyph() {
  return (
    <>
      <rect x={5} y={7} width={30} height={19} rx={2} fill="none" stroke="currentColor" strokeWidth={1.2} className="text-border-strong" />
      <line x1={5} y1={12} x2={35} y2={12} stroke="currentColor" strokeWidth={1} className="text-border-strong" />
      <rect x={9} y={16} width={22} height={2} rx={1} fill="currentColor" className="text-muted-foreground" />
      <rect x={9} y={20} width={14} height={2} rx={1} fill="var(--color-primary)" opacity={0.7} />
      <rect x={16} y={29} width={8} height={2} rx={1} fill="currentColor" className="text-border-strong" />
    </>
  );
}

function InfrastructureGlyph({ reduced }: GlyphProps) {
  const spokes: [number, number][] = [
    [8, 10],
    [32, 10],
    [8, 30],
    [32, 30],
  ];
  return (
    <>
      {spokes.map(([x, y], i) => (
        <motion.line key={i} x1={20} y1={20} x2={x} y2={y} stroke="currentColor" strokeWidth={1} className="text-border-strong" {...draw(reduced, i * 0.08)} />
      ))}
      {spokes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.2} fill="currentColor" className="text-muted-foreground" />
      ))}
      <circle cx={20} cy={20} r={4} fill="var(--color-primary)" />
    </>
  );
}

function SecurityDataGlyph({ reduced }: GlyphProps) {
  return (
    <>
      <path d="M20 6 L32 11 V19 C32 27 27 31 20 34 C13 31 8 27 8 19 V11 Z" fill="none" stroke="currentColor" strokeWidth={1.2} className="text-border-strong" />
      {/* draw() already resolves to the finished stroke when reduced. */}
      <motion.path d="M14 19 L18 23 L27 14" fill="none" stroke="var(--color-primary)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...draw(reduced, 0.2)} />
    </>
  );
}

const glyphs: Record<GlyphId, (props: GlyphProps) => ReactElement> = {
  "business-systems": BusinessSystemsGlyph,
  "web-applications": WebApplicationsGlyph,
  "hardware-integration": HardwareIntegrationGlyph,
  "desktop-software": DesktopSoftwareGlyph,
  infrastructure: InfrastructureGlyph,
  "security-data": SecurityDataGlyph,
};

/** Small animated line-diagram standing in for each capability's icon — a miniature of its own system shape. */
export function CapabilityGlyph({ id }: { id: GlyphId }) {
  const reduced = useReducedMotion();
  const Glyph = glyphs[id];
  return (
    <svg viewBox="0 0 40 40" className="h-6 w-6" aria-hidden="true">
      <Glyph reduced={reduced} />
    </svg>
  );
}
