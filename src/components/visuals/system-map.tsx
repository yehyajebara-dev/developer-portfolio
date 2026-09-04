"use client";

import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { easeOutExpo } from "@/lib/motion";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  core?: boolean;
};

const NODES: Node[] = [
  { id: "core", label: "YEHYA", x: 280, y: 230, core: true },
  { id: "laravel", label: "Laravel", x: 90, y: 90 },
  { id: "react", label: "React", x: 280, y: 50 },
  { id: "mysql", label: "MySQL", x: 470, y: 90 },
  { id: "api", label: "API", x: 500, y: 260 },
  { id: "zkteco", label: "ZKTeco", x: 400, y: 400 },
  { id: "nativephp", label: "NativePHP", x: 160, y: 400 },
  { id: "infra", label: "Infrastructure", x: 60, y: 260 },
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

export function SystemMap() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-40, 40], [6, -6]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(px, [-40, 40], [-6, 6]), { stiffness: 120, damping: 20 });

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
        </defs>

        <circle cx={280} cy={230} r={150} fill="url(#core-glow)" />

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
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatDelay: 1.8,
                  delay: 1.6 + i * 0.7,
                  ease: "easeInOut",
                }}
              />
            );
          })}

        {NODES.map((node, i) => (
          <motion.g
            key={node.id}
            initial={reduced ? undefined : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: node.core ? 0.1 : 0.3 + i * 0.05, ease: easeOutExpo }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.core ? 34 : 22}
              fill={node.core ? "var(--color-primary)" : "var(--color-card)"}
              stroke={node.core ? "var(--color-primary)" : "var(--color-border-strong)"}
              strokeWidth={1.5}
            />
            <text
              x={node.x}
              y={node.core ? node.y + 52 : node.y + (node.y < 230 ? -34 : 40)}
              textAnchor="middle"
              className="font-mono-tight"
              fontSize={node.core ? 13 : 11}
              fill={node.core ? "var(--color-foreground)" : "var(--color-muted-foreground)"}
              fontWeight={node.core ? 600 : 500}
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </motion.svg>
    </div>
  );
}
