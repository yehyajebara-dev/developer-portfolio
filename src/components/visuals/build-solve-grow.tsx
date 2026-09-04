"use client";

import { useTransform, motion, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

const SCATTER_POINTS = [
  { sx: 20, sy: 30, gx: 90, gy: 60 },
  { sx: 160, sy: 15, gx: 150, gy: 60 },
  { sx: 260, sy: 40, gx: 210, gy: 60 },
  { sx: 40, sy: 120, gx: 90, gy: 110 },
  { sx: 200, sy: 140, gx: 150, gy: 110 },
  { sx: 280, sy: 100, gx: 210, gy: 110 },
  { sx: 70, sy: 190, gx: 90, gy: 160 },
  { sx: 180, sy: 200, gx: 150, gy: 160 },
  { sx: 250, sy: 175, gx: 210, gy: 160 },
];

const TANGLED_PATH =
  "M40,150 C70,40 110,220 150,110 C170,50 190,200 210,120 C230,60 250,180 270,100";
const CLEAN_PATH = "M40,110 L90,110 L140,110 L190,110 L240,110 L270,110";

const RADIAL_NODES = [0, 60, 120, 180, 240, 300].map((deg) => (deg * Math.PI) / 180);

function ScatterPoint({
  point,
  index,
  progress,
}: {
  point: (typeof SCATTER_POINTS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const local = useTransform(progress, [index * 0.05, Math.min(1, index * 0.05 + 0.5)], [0, 1]);
  const x = useTransform(local, [0, 1], [point.sx, point.gx]);
  const y = useTransform(local, [0, 1], [point.sy, point.gy]);
  const opacity = useTransform(local, [0, 0.15, 1], [0.35, 1, 1]);
  return <motion.circle r={7} fill="var(--color-primary)" style={{ x, y, opacity }} />;
}

function BuildAct({ progress }: { progress: MotionValue<number> }) {
  return (
    <svg viewBox="0 0 300 220" className="h-full w-full" aria-hidden="true">
      {SCATTER_POINTS.map((p, i) => (
        <ScatterPoint key={i} point={p} index={i} progress={progress} />
      ))}
    </svg>
  );
}

function SolveAct({ progress }: { progress: MotionValue<number> }) {
  const tangledOpacity = useTransform(progress, [0, 0.45], [1, 0]);
  const dashOffset = useTransform(progress, [0.1, 0.85], [340, 0]);
  const cleanOpacity = useTransform(progress, [0.1, 0.3], [0, 1]);

  return (
    <svg viewBox="0 0 300 220" className="h-full w-full" aria-hidden="true">
      <motion.path d={TANGLED_PATH} style={{ opacity: tangledOpacity }} fill="none" stroke="var(--color-border-strong)" strokeWidth={2} />
      <motion.path
        d={CLEAN_PATH}
        strokeDasharray={340}
        style={{ strokeDashoffset: dashOffset, opacity: cleanOpacity }}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

function RadialNode({
  angle,
  index,
  radius,
  progress,
  linesOpacity,
}: {
  angle: number;
  index: number;
  radius: MotionValue<number>;
  progress: MotionValue<number>;
  linesOpacity: MotionValue<number>;
}) {
  const x = useTransform(radius, (r) => Math.cos(angle) * r);
  const y = useTransform(radius, (r) => Math.sin(angle) * r);
  const nodeOpacity = useTransform(progress, [index * 0.08, index * 0.08 + 0.3], [0, 1]);
  return (
    <motion.g>
      <motion.line x1={0} y1={0} x2={x} y2={y} stroke="var(--color-border-strong)" strokeWidth={1} style={{ opacity: linesOpacity }} />
      <motion.circle
        cx={0}
        cy={0}
        r={5}
        fill="var(--color-card)"
        stroke="var(--color-border-strong)"
        strokeWidth={1.5}
        style={{ x, y, opacity: nodeOpacity }}
      />
    </motion.g>
  );
}

function GrowAct({ progress }: { progress: MotionValue<number> }) {
  const radius = useTransform(progress, [0, 1], [0, 88]);
  const coreScale = useTransform(progress, [0, 0.3], [1, 1.15]);
  const linesOpacity = useTransform(progress, [0, 0.25], [0, 1]);

  return (
    <svg viewBox="-150 -110 300 220" className="h-full w-full" aria-hidden="true">
      {RADIAL_NODES.map((angle, i) => (
        <RadialNode key={i} angle={angle} index={i} radius={radius} progress={progress} linesOpacity={linesOpacity} />
      ))}
      <motion.circle r={16} fill="var(--color-primary)" style={{ scale: coreScale }} />
    </svg>
  );
}

export function BuildSolveGrowVisual({
  build,
  solve,
  grow,
  activeAct,
}: {
  build: MotionValue<number>;
  solve: MotionValue<number>;
  grow: MotionValue<number>;
  activeAct: number;
}) {
  // Acts crossfade via plain CSS opacity classes rather than a MotionValue —
  // see the note in philosophy.tsx on why the discrete `activeAct` drives this.
  const acts = [
    { Act: BuildAct, progress: build },
    { Act: SolveAct, progress: solve },
    { Act: GrowAct, progress: grow },
  ];

  return (
    <div className="relative h-64 w-full sm:h-80">
      {acts.map(({ Act, progress }, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-500 ease-out",
            activeAct === i ? "opacity-100" : "opacity-0",
          )}
        >
          <Act progress={progress} />
        </div>
      ))}
    </div>
  );
}
