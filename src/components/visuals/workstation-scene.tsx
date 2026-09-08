"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { easeOutExpo, motionSignal } from "@/lib/motion";

type ScreenState = {
  id: string;
  kicker: string;
  lines: { text: string; tone?: "muted" | "signal" | "success" }[];
};

const SCREEN_STATES: ScreenState[] = [
  {
    id: "laravel",
    kicker: "app/Http/Controllers/AttendanceController.php",
    lines: [
      { text: "class AttendanceController extends Controller", tone: "muted" },
      { text: "  public function resolve(Punch $punch)" },
      { text: "  {" },
      { text: "    return $this->engine->apply($punch);", tone: "signal" },
      { text: "  }" },
    ],
  },
  {
    id: "mysql",
    kicker: "mysql> attendance_records",
    lines: [
      { text: "SELECT employee_id, shift_id,", tone: "muted" },
      { text: "  status, minutes_late" },
      { text: "FROM attendance_records" },
      { text: "WHERE date = CURDATE();", tone: "signal" },
      { text: "4,812 rows in 0.02s", tone: "success" },
    ],
  },
  {
    id: "engine",
    kicker: "attendance-engine :: processing",
    lines: [
      { text: "punch received  ZK-UF200-S", tone: "muted" },
      { text: "shift matched   09:00–18:00" },
      { text: "rule applied    late (12m)", tone: "signal" },
      { text: "status: RESOLVED", tone: "success" },
    ],
  },
  {
    id: "build",
    kicker: "~/erp-platform  build",
    lines: [
      { text: "$ php artisan optimize", tone: "muted" },
      { text: "✓ config cached" },
      { text: "✓ routes cached" },
      { text: "✓ build complete", tone: "success" },
    ],
  },
  {
    id: "hardware",
    kicker: "device-monitor :: 4 branches",
    lines: [
      { text: "sidon-hq        online", tone: "success" },
      { text: "beirut-branch   online", tone: "success" },
      { text: "tripoli-branch  online", tone: "success" },
      { text: "sync latency    ~180ms", tone: "signal" },
    ],
  },
];

const SCREEN_INTERVAL = 3400;

/** One-time boot sequence played before the terminal settles into its rotating states. */
const BOOT_LINES = [
  "booting yehya.dev",
  "loading full-stack systems",
  "connecting laravel backend",
  "mounting react interface",
  "linking devices and infrastructure",
  "status: ready",
];
const BOOT_LINE_INTERVAL = 420;

/** Pointer travel (px from centre) mapped onto the scene's tilt range. */
const POINTER_RANGE = [-60, 60];
const TILT_SPRING = { stiffness: 120, damping: 22 };
const TOWER_SPRING = { stiffness: 100, damping: 20 };

const toneClass: Record<NonNullable<ScreenState["lines"][number]["tone"]>, string> = {
  muted: "text-muted-foreground/70",
  signal: "text-primary",
  success: "text-success",
};

function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    if (lineCount >= BOOT_LINES.length) {
      const timeout = setTimeout(onComplete, 500);
      return () => clearTimeout(timeout);
    }
    const id = setTimeout(() => setLineCount((n) => n + 1), BOOT_LINE_INTERVAL);
    return () => clearTimeout(id);
  }, [lineCount, onComplete]);

  return (
    <div className="flex h-full flex-col justify-center gap-1.5 p-3">
      {BOOT_LINES.slice(0, lineCount).map((line, i) => (
        <motion.p
          key={line}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={`font-mono-tight text-[8.5px] leading-relaxed sm:text-[10px] ${
            i === lineCount - 1 && line === "status: ready" ? "text-success" : "text-muted-foreground/70"
          }`}
        >
          <span className="text-signal">{"> "}</span>
          {line}
        </motion.p>
      ))}
    </div>
  );
}

function TerminalScreen({ reduced, inView }: { reduced: boolean; inView: boolean }) {
  const [index, setIndex] = useState(0);
  const [booted, setBooted] = useState(reduced);

  // Reduced-motion users hold on the first state, so no timer is started at all.
  // Scrolled-off-screen visitors don't get a silent React re-render loop either —
  // the interval only runs while the hero is actually in view.
  useEffect(() => {
    if (reduced || !inView || !booted) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SCREEN_STATES.length), SCREEN_INTERVAL);
    return () => clearInterval(id);
  }, [reduced, inView, booted]);

  const state = SCREEN_STATES[reduced ? 0 : index];

  return (
    <div className="absolute inset-[6%] overflow-hidden rounded-[6px] bg-[#0a0a0a]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
        <div className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="h-1.5 w-1.5 rounded-full bg-white/20" />
          ))}
        </div>
        {booted ? (
          <span className="font-mono-tight truncate pl-3 text-[8px] text-white/40 sm:text-[9px]">{state.kicker}</span>
        ) : (
          <span className="font-mono-tight truncate pl-3 text-[8px] text-white/40 sm:text-[9px]">booting…</span>
        )}
      </div>
      {!booted ? (
        <BootScreen onComplete={() => setBooted(true)} />
      ) : (
        <div className="p-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.id}
              initial={reduced ? undefined : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
              className="space-y-1.5"
            >
              {state.lines.map((line, i) => (
                <p key={i} className={`font-mono-tight text-[8.5px] leading-relaxed sm:text-[10px] ${toneClass[line.tone ?? "muted"]}`}>
                  {line.text}
                </p>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      {/* screen sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(155deg, rgba(255,255,255,0.05) 0%, transparent 35%)" }}
      />
    </div>
  );
}

export function WorkstationScene() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const ry = useSpring(useTransform(px, POINTER_RANGE, [-4, 4]), TILT_SPRING);
  const rx = useSpring(useTransform(py, POINTER_RANGE, [3, -3]), TILT_SPRING);
  const towerX = useSpring(useTransform(px, POINTER_RANGE, [-3, 3]), TOWER_SPRING);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
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
      aria-hidden="true"
      className="relative mx-auto aspect-[6/5] w-full max-w-lg [perspective:1400px]"
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={reduced ? undefined : { rotateX: rx, rotateY: ry }}
        initial={reduced ? undefined : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.2 }}
        onViewportEnter={() => setInView(true)}
        onViewportLeave={() => setInView(false)}
      >
        <svg viewBox="0 0 520 440" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="ws-core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ws-tower-body" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#232323" />
              <stop offset="100%" stopColor="#121212" />
            </linearGradient>
            <linearGradient id="ws-tower-side" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#161616" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <linearGradient id="ws-desk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-border-strong)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--color-border)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Desk plane */}
          <ellipse cx={260} cy={392} rx={245} ry={24} fill="url(#ws-desk)" />

          {/* Data line: tower -> monitor */}
          <motion.path
            d="M 372 268 C 340 250, 300 240, 262 232"
            fill="none"
            stroke="var(--color-signal)"
            strokeWidth={1.5}
            strokeDasharray="3 6"
            opacity={0.5}
            initial={reduced ? undefined : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: easeOutExpo }}
          />

          {/* Data line: monitor -> keyboard (represents API/DB reach) */}
          <motion.path
            d="M 190 300 C 175 318, 165 330, 155 342"
            fill="none"
            stroke="var(--color-border-strong)"
            strokeWidth={1}
            strokeDasharray="2 5"
            opacity={0.4}
            initial={reduced ? undefined : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.75, ease: easeOutExpo }}
          />

          {/* PC Tower — clearly to the right of the monitor, own footprint on the desk */}
          <motion.g style={reduced ? undefined : { x: towerX }}>
            <circle cx={397} cy={330} r={46} fill="url(#ws-core-glow)" />
            {/* side face for a touch of depth */}
            <path d="M 422 190 L 442 200 L 442 368 L 422 378 Z" fill="url(#ws-tower-side)" stroke="var(--color-border-strong)" strokeWidth={1} />
            {/* front face */}
            <rect x={372} y={186} width={50} height={192} rx={5} fill="url(#ws-tower-body)" stroke="var(--color-border-strong)" strokeWidth={1.5} />
            <rect x={381} y={200} width={32} height={2.5} rx={1.25} fill="var(--color-border-strong)" opacity={0.7} />
            <rect x={381} y={208} width={32} height={2.5} rx={1.25} fill="var(--color-border-strong)" opacity={0.7} />
            <rect x={381} y={216} width={22} height={2.5} rx={1.25} fill="var(--color-border-strong)" opacity={0.5} />
            {!reduced ? (
              <motion.circle
                cx={397}
                cy={330}
                r={11}
                fill="var(--color-primary)"
                animate={{ opacity: [0.55, 1, 0.55], scale: [0.94, 1, 0.94] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: motionSignal.pulse.ease }}
              />
            ) : (
              <circle cx={397} cy={330} r={11} fill="var(--color-primary)" />
            )}
            <circle cx={397} cy={330} r={11} fill="none" stroke="var(--color-primary)" strokeWidth={1} opacity={0.6} />
            <circle cx={397} cy={330} r={17} fill="none" stroke="var(--color-primary)" strokeWidth={1} opacity={0.3} />
            {/* mesh vents below the core */}
            {[350, 357, 364].map((y) => (
              <rect key={y} x={385} y={y} width={24} height={2} rx={1} fill="var(--color-border-strong)" opacity={0.5} />
            ))}
          </motion.g>

          {/* Keyboard */}
          <rect x={100} y={340} width={148} height={16} rx={4} fill="var(--color-card)" stroke="var(--color-border)" strokeWidth={1} />
          {Array.from({ length: 11 }).map((_, i) => (
            <rect key={i} x={106 + i * 13} y={344} width={9} height={8} rx={1.5} fill="var(--color-border-strong)" opacity={0.5} />
          ))}

          {/* Monitor stand */}
          <path d="M 190 288 L 186 314 L 154 314" fill="none" stroke="var(--color-border-strong)" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
          <rect x={140} y={314} width={90} height={6} rx={3} fill="var(--color-border-strong)" opacity={0.6} />
        </svg>

        {/* Monitor body + screen (HTML layer so the terminal content stays crisp text) */}
        <div
          className="absolute left-[38%] top-[20%] w-[52%] -translate-x-1/2 rounded-lg border border-border-strong bg-[#181818] p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
          style={{ aspectRatio: "16/10" }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[4px] bg-black">
            <TerminalScreen reduced={reduced} inView={inView} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
