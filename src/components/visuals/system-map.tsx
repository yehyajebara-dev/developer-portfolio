"use client";

import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { easeOutExpo, motionSignal } from "@/lib/motion";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  /** 0 = furthest back, 1 = closest to viewer. Drives size, glow and parallax amount. */
  depth: number;
  core?: boolean;
};

const NODES: Node[] = [
  { id: "core", label: "YEHYA", x: 280, y: 230, depth: 1, core: true },
  { id: "laravel", label: "Laravel", x: 90, y: 90, depth: 0.7 },
  { id: "react", label: "React", x: 280, y: 50, depth: 0.55 },
  { id: "mysql", label: "MySQL", x: 470, y: 90, depth: 0.65 },
  { id: "api", label: "API", x: 500, y: 260, depth: 0.5 },
  { id: "zkteco", label: "ZKTeco", x: 400, y: 400, depth: 0.75 },
  { id: "nativephp", label: "NativePHP", x: 160, y: 400, depth: 0.6 },
  { id: "infra", label: "Infrastructure", x: 60, y: 260, depth: 0.5 },
];

const EDGES: [string, string][] = [
  ["core", "laravel"],
  ["core", "react"],
  ["core", "mysql"],
  ["core", "api"],
  ["core", "zkteco"],
  ["core", "nativephp"],
  ["core", "infra"],
  ["laravel", "mysql"],
  ["api", "zkteco"],
  ["laravel", "infra"],
];

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function DepthNode({
  node,
  index,
  px,
  py,
  reduced,
}: {
  node: Node;
  index: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  reduced: boolean;
}) {
  // Foreground nodes (higher depth) drift further with the pointer than background ones —
  // the differential parallax is what reads as "layers" inside a single flat SVG.
  const amount = node.depth * 10;
  const dx = useTransform(px, [-60, 60], [-amount, amount]);
  const dy = useTransform(py, [-60, 60], [-amount, amount]);
  const r = node.core ? 34 : 18 + node.depth * 10;

  return (
    <motion.g
      style={reduced ? undefined : { x: dx, y: dy }}
      initial={reduced ? undefined : { opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: node.core ? 0.15 : 0.35 + index * 0.05, ease: easeOutExpo }}
    >
      {!node.core ? (
        <circle cx={node.x} cy={node.y} r={r + 5} fill="none" stroke="var(--color-border)" strokeWidth={1} opacity={0.5} />
      ) : null}
      <circle
        cx={node.x}
        cy={node.y}
        r={r}
        fill={node.core ? "url(#core-fill)" : "url(#node-fill)"}
        stroke={node.core ? "var(--color-primary)" : "var(--color-border-strong)"}
        strokeWidth={1.5}
      />
      <text
        x={node.x}
        y={node.core ? node.y + 52 : node.y + (node.y < 230 ? -r - 12 : r + 18)}
        textAnchor="middle"
        className="font-mono-tight"
        fontSize={node.core ? 13 : 11}
        fill={node.core ? "var(--color-foreground)" : "var(--color-muted-foreground)"}
        fontWeight={node.core ? 600 : 500}
      >
        {node.label}
      </text>
    </motion.g>
  );
}

export function SystemMap() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-40, 40], [6, -6]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(px, [-40, 40], [-6, 6]), { stiffness: 120, damping: 20 });
  const glowX = useSpring(useTransform(px, [-280, 280], [10, 90]), { stiffness: 90, damping: 22 });
  const glowY = useSpring(useTransform(py, [-230, 230], [10, 90]), { stiffness: 90, damping: 22 });
  const glowBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(280px circle at ${gx}% ${gy}%, color-mix(in srgb, var(--color-primary) 16%, transparent), transparent 65%)`,
  );

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set(e.clientX - rect.left - rect.width / 2);
    py.set(e.clientY - rect.top - rect.height / 2);
  }

  function onPointerLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative aspect-square w-full max-w-xl [perspective:1200px]"
    >
      {/* Cursor-follow light — pure CSS, additive, never touches layout */}
      {!reduced ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen"
          style={{ background: glowBackground }}
        />
      ) : null}

      <motion.svg
        viewBox="0 0 560 460"
        className="h-full w-full overflow-visible"
        style={reduced ? undefined : { rotateX: rx, rotateY: ry }}
      >
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="core-fill" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffcf85" />
            <stop offset="55%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="#b97a1f" />
          </radialGradient>
          <radialGradient id="node-fill" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="var(--color-border-strong)" />
            <stop offset="100%" stopColor="var(--color-card)" />
          </radialGradient>
        </defs>

        <circle cx={280} cy={230} r={150} fill="url(#core-glow)" />

        {/* Slow instrumentation dial — independent of pointer tilt, reads as "powered", not spinning */}
        {!reduced ? (
          <motion.circle
            cx={280}
            cy={230}
            r={188}
            fill="none"
            stroke="var(--color-signal)"
            strokeWidth={1}
            strokeDasharray="1 11"
            opacity={0.35}
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "280px 230px" }}
          />
        ) : null}

        {EDGES.map(([fromId, toId], i) => {
          const from = nodeById(fromId);
          const to = nodeById(toId);
          return (
            <motion.line
              key={`${fromId}-${toId}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--color-border-strong)"
              strokeWidth={1}
              initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4 + i * 0.06, ease: easeOutExpo }}
            />
          );
        })}

        {!reduced &&
          EDGES.slice(0, 4).map(([fromId, toId], i) => {
            const from = nodeById(fromId);
            const to = nodeById(toId);
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            return (
              <motion.circle
                key={`signal-${fromId}-${toId}`}
                cx={midX}
                cy={midY}
                r={2.5}
                fill="var(--color-primary)"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0], scale: [0.6, 1.3, 0.6] }}
                transition={{ ...motionSignal.orbit, repeat: Infinity, delay: 1.6 + i * 0.7 }}
              />
            );
          })}

        {NODES.map((node, i) => (
          <DepthNode key={node.id} node={node} index={i} px={px} py={py} reduced={reduced} />
        ))}
      </motion.svg>
    </div>
  );
}
