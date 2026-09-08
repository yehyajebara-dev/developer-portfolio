"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { systemNodes, systemEdges, type SystemNodeId } from "@/data/system-journey";
import { cn } from "@/lib/utils";

const SCENE_LABELS = ["Approach", "Enter the machine", "System architecture", "Real systems"] as const;

function nodeById(id: SystemNodeId) {
  // Every edge id is drawn from `systemNodes`, so this always resolves.
  return systemNodes.find((n) => n.id === id)!;
}

/** Static fallback rendered for prefers-reduced-motion — no pin, no scrub, just the finished diagram. */
function StaticSystemDiagram() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl rounded-2xl border border-border bg-card/60 p-6">
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" aria-hidden="true">
        {systemEdges.map(([a, b], i) => {
          const from = nodeById(a);
          const to = nodeById(b);
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--color-border-strong)"
              strokeWidth={0.4}
              opacity={0.6}
            />
          );
        })}
        {systemNodes.map((node) => (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r={3.2} fill="var(--color-card)" stroke="var(--color-primary)" strokeWidth={0.6} />
          </g>
        ))}
      </svg>
      <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3">
        {systemNodes.map((node) => (
          <li key={node.id} className="font-mono-tight text-[11px] text-muted-foreground">
            <span className="text-foreground/80">{node.label}</span> — {node.sublabel}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SystemJourney() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const stageLabelRef = useRef<HTMLSpanElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };

          const scenes = gsap.utils.toArray<HTMLElement>("[data-scene]");
          const monitor = containerRef.current?.querySelector<HTMLElement>("[data-monitor]");
          const workstationExtras = containerRef.current?.querySelectorAll<HTMLElement>("[data-workstation-extra]");
          const diagramEls = containerRef.current?.querySelectorAll<HTMLElement>("[data-diagram-el]");
          const packets = containerRef.current?.querySelectorAll<HTMLElement>("[data-packet]");
          const projectCards = containerRef.current?.querySelectorAll<HTMLElement>("[data-project-card]");
          const diagramLabels = containerRef.current?.querySelectorAll<HTMLElement>("[data-diagram-label]");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: isMobile ? "+=300%" : "+=400%",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (progressFillRef.current) {
                  progressFillRef.current.style.transform = `scaleX(${self.progress})`;
                }
                const idx = Math.min(SCENE_LABELS.length - 1, Math.floor(self.progress * SCENE_LABELS.length));
                if (stageLabelRef.current && stageLabelRef.current.dataset.idx !== String(idx)) {
                  stageLabelRef.current.dataset.idx = String(idx);
                  stageLabelRef.current.textContent = SCENE_LABELS[idx];
                }
              },
            },
            defaults: { ease: "none" },
          });

          // Scene 1 -> 2: approach. Workstation grows and centers, headline recedes
          // fully (autoAlpha also flips visibility) well before the monitor's dramatic
          // scale-up begins, so the two layers never visibly overlap mid-scrub.
          tl.to(scenes[0], { autoAlpha: 0, filter: "blur(4px)", duration: 0.6 }, 0.2)
            .to(".sj-workstation", { scale: isMobile ? 1.3 : 1.6, y: isMobile ? -10 : -20, duration: 2 }, 0)
            .to(workstationExtras ?? [], { opacity: 0, duration: 0.8 }, 0.4);

          // Scene 2: enter the monitor — screen bezel expands to fill the stage, masking into scene 3.
          // All on-screen text (chrome + "entering system_" label) fades out early, while the
          // monitor is still small, so nothing text-shaped is ever stretched by the scale-up.
          // What's left growing to fill the viewport is a plain black rectangle — a clean mask,
          // not a crude "scale up a screenshot" effect.
          tl.to(".sj-scene-2-content", { autoAlpha: 0, duration: 0.4 }, 1.3);

          if (monitor) {
            tl.to(
              monitor,
              {
                scale: isMobile ? 9 : 14,
                duration: 2.2,
                ease: "power2.inOut",
              },
              1.6,
            );
          }

          // Scene 3: architecture diagram draws in — edges first, then nodes, then packets travel.
          tl.fromTo(
            ".sj-diagram-edge",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 1, stagger: 0.05 },
            3.2,
          );

          if (diagramEls && diagramEls.length) {
            tl.fromTo(
              diagramEls,
              { autoAlpha: 0, scale: 0.6, transformOrigin: "center" },
              { autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.08 },
              3.6,
            );
          }

          if (diagramLabels && diagramLabels.length) {
            tl.fromTo(diagramLabels, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, stagger: 0.06 }, 4.1);
          }

          if (packets && packets.length) {
            packets.forEach((packet, i) => {
              const pathEl = containerRef.current?.querySelector<SVGPathElement>(`#sj-path-${i}`);
              if (!pathEl) return;
              tl.fromTo(
                packet,
                { autoAlpha: 0 },
                {
                  autoAlpha: 1,
                  duration: 1.4,
                  repeat: 1,
                  ease: "power1.inOut",
                  motionPath: { path: pathEl, autoRotate: false },
                },
                4.6 + i * 0.15,
              );
            });
          }

          // Scene 4: architecture nodes with a project mapping morph into project preview cards.
          // These cards are real focusable links, so they animate on opacity only (never
          // autoAlpha/visibility) — a hidden `visibility` would drop them from the tab
          // order entirely and make them unreachable for keyboard users.
          tl.to(".sj-diagram-stage", { opacity: 0, duration: 1 }, 6.4);
          if (projectCards && projectCards.length) {
            tl.fromTo(
              projectCards,
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 },
              6.6,
            );
          }
          tl.to(".sj-scene-4-copy", { opacity: 1, y: 0, duration: 1 }, 6.6);
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [reduced] },
  );

  // A direct #hash link (e.g. /#capabilities) to a section after this pinned one can land in
  // the wrong place: the browser scrolls to the hash before ScrollTrigger has measured this
  // section's pin-spacer height, using a shorter document than the final layout. Once
  // ScrollTrigger has refreshed, re-scroll to the hash target so it resolves correctly.
  useEffect(() => {
    if (reduced || !window.location.hash) return;
    const id = window.location.hash.slice(1);
    const target = document.getElementById(id);
    if (!target || id === "system") return;

    const correct = () => target.scrollIntoView();
    const trigger = ScrollTrigger.getAll().find((st) => st.trigger === containerRef.current);
    if (trigger) {
      trigger.refresh();
    } else {
      ScrollTrigger.refresh();
    }
    const raf = requestAnimationFrame(correct);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  if (reduced) {
    return (
      <section id="system" className="relative border-t border-border py-20 sm:py-28" aria-label="Inside the system">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
          <p className="font-mono-tight text-xs uppercase tracking-[0.2em] text-primary">Inside the System</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            One engineer, every layer of the stack
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground">
            React and Laravel talk to a MySQL data layer, running on real servers and networks, reaching out to
            physical devices like ZKTeco biometric terminals and desktop POS hardware.
          </p>
        </div>
        <div className="mt-12 px-6 sm:px-8">
          <StaticSystemDiagram />
        </div>
      </section>
    );
  }

  return (
    <section
      id="system"
      ref={containerRef}
      className="relative isolate"
      aria-label="Inside the system — a cinematic scroll sequence through Yehya's stack"
    >
      {/* Pinned stage: everything below occupies one viewport, scenes crossfade via GSAP. */}
      <div className="relative h-screen w-full overflow-hidden bg-background">
        <div className="bg-grid bg-noise pointer-events-none absolute inset-0 opacity-60" />

        {/* Scroll progress rail for this sequence specifically. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-50 h-[3px] bg-border/40">
          <div ref={progressFillRef} className="h-full w-full origin-left scale-x-0 bg-primary" />
        </div>
        <div className="pointer-events-none absolute left-6 top-6 z-50 font-mono-tight text-[11px] uppercase tracking-[0.16em] text-muted-foreground sm:left-8 sm:top-8">
          Inside the System —{" "}
          <span ref={stageLabelRef} data-idx="0" className="text-primary">
            Approach
          </span>
        </div>

        {/* Scene 1 copy — sits below the workstation layer so once it fades (autoAlpha,
            ~1.1s into the timeline) the monitor scaling up on top of it never visually collides. */}
        <div data-scene className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          <div className="max-w-xl">
            <p className="font-mono-tight text-xs uppercase tracking-[0.2em] text-primary">Inside the System</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Every project starts at this desk
            </h2>
            <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              Scroll to move past the screen and into the systems running behind it.
            </p>
          </div>
        </div>

        {/* Workstation layer — approaches the viewer, then the monitor takes over the frame. */}
        <div className="sj-workstation absolute inset-0 z-20 flex items-center justify-center">
          <div className="relative aspect-[6/5] w-full max-w-xl [perspective:1400px]">
            <div data-workstation-extra className="absolute -left-4 top-1/3 h-24 w-24 rounded-full bg-signal/10 blur-3xl" />
            <div data-workstation-extra className="absolute -right-8 bottom-1/4 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

            <svg viewBox="0 0 520 440" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              <defs>
                <linearGradient id="sj-tower-body" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#232323" />
                  <stop offset="100%" stopColor="#121212" />
                </linearGradient>
              </defs>
              <ellipse cx={260} cy={392} rx={245} ry={24} fill="var(--color-border)" opacity={0.25} data-workstation-extra />
              <g data-workstation-extra>
                <rect x={372} y={186} width={50} height={192} rx={5} fill="url(#sj-tower-body)" stroke="var(--color-border-strong)" strokeWidth={1.5} />
                <circle cx={397} cy={330} r={11} fill="var(--color-primary)" />
              </g>
              <rect data-workstation-extra x={100} y={340} width={148} height={16} rx={4} fill="var(--color-card)" stroke="var(--color-border)" strokeWidth={1} />
              <path
                data-workstation-extra
                d="M 190 288 L 186 314 L 154 314"
                fill="none"
                stroke="var(--color-border-strong)"
                strokeWidth={6}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.85}
              />
            </svg>

            {/* The monitor is the mask into scene 2 — it scales up to swallow the frame. */}
            <div
              data-monitor
              className="sj-monitor absolute left-[38%] top-[20%] w-[52%] -translate-x-1/2 rounded-lg border border-border-strong bg-[#181818] p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
              style={{ aspectRatio: "16/10", transformOrigin: "50% 50%" }}
            >
              <div className="sj-monitor-bezel relative h-full w-full overflow-hidden rounded-[4px] bg-black">
                {/* Screen chrome + label fade out together, early and at a fixed (unscaled)
                    font size, before the monitor itself grows — so nothing text-shaped ever
                    gets stretched into illegible giant type. What's left scaling up is a
                    plain black rectangle, a clean mask into the architecture diagram. */}
                <div className="sj-scene-2-content absolute inset-0">
                  <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
                    <div className="flex gap-1.5" aria-hidden="true">
                      {[0, 1, 2].map((dot) => (
                        <span key={dot} className="h-1.5 w-1.5 rounded-full bg-white/20" />
                      ))}
                    </div>
                    <span className="font-mono-tight truncate pl-3 text-[8px] text-white/40 sm:text-[9px]">
                      system.status
                    </span>
                  </div>
                  <div className="sj-scene-2-label flex h-full flex-col items-center justify-center gap-1 pb-6">
                    <span className="font-mono-tight text-[10px] text-signal sm:text-xs">entering system_</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scene 3: architecture diagram, revealed once the monitor has consumed the frame. */}
        <div className="sj-diagram-stage absolute inset-0 z-30 flex items-center justify-center px-6 py-20">
          <div className="relative aspect-square w-full max-w-lg sm:max-w-xl">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              {systemEdges.map(([a, b], i) => {
                const from = nodeById(a);
                const to = nodeById(b);
                return (
                  <line
                    key={i}
                    className="sj-diagram-edge"
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="var(--color-border-strong)"
                    strokeWidth={0.4}
                    opacity={0}
                  />
                );
              })}
              {systemEdges.map(([a, b], i) => {
                const from = nodeById(a);
                const to = nodeById(b);
                const pathId = `sj-path-${i}`;
                return (
                  <path
                    key={pathId}
                    id={pathId}
                    d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                    fill="none"
                    stroke="none"
                  />
                );
              })}
              {systemEdges.map((_, i) => (
                <circle key={i} data-packet r={1.1} fill="var(--color-primary)" opacity={0} />
              ))}
              {systemNodes.map((node) => (
                <circle
                  key={node.id}
                  data-diagram-el
                  cx={node.x}
                  cy={node.y}
                  r={3.4}
                  fill="var(--color-card)"
                  stroke="var(--color-primary)"
                  strokeWidth={0.6}
                  opacity={0}
                />
              ))}
            </svg>
            {systemNodes.map((node) => (
              <div
                key={node.id}
                data-diagram-label
                className="absolute -translate-x-1/2 whitespace-nowrap text-center opacity-0"
                style={{ left: `${node.x}%`, top: `calc(${node.y}% + 20px)` }}
              >
                <p className="font-mono-tight text-[10px] font-medium text-foreground sm:text-xs">{node.label}</p>
                <p className="font-mono-tight text-[9px] text-muted-foreground sm:text-[10px]">{node.sublabel}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scene 4: architecture resolves into real project previews. */}
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-8 px-6 py-16">
          <div className="sj-scene-4-copy max-w-lg translate-y-4 text-center opacity-0">
            <p className="font-mono-tight text-xs uppercase tracking-[0.2em] text-primary">Real systems</p>
            <h3 className="mt-3 text-balance text-2xl font-semibold text-foreground sm:text-3xl">
              Not a diagram — shipped software
            </h3>
          </div>
          <div className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { id: "attendance-erp", name: "Attendance ERP", tag: "Laravel · ZKTeco" },
              { id: "desktop-pos", name: "Desktop POS", tag: "NativePHP · Electron" },
              { id: "ai-customer-service", name: "NexaBot AI", tag: "Laravel · React" },
              { id: "warranty-platform", name: "Warranty Platform", tag: "Laravel · MySQL" },
            ].map((p) => (
              <a
                key={p.id}
                href="#projects"
                data-project-card
                className={cn(
                  "flex flex-col justify-between rounded-xl border border-border bg-card/90 p-4 opacity-0 backdrop-blur-sm",
                  "transition-colors duration-200 hover:border-primary/50",
                )}
              >
                <span className="font-mono-tight text-[10px] uppercase tracking-[0.1em] text-signal">{p.tag}</span>
                <span className="mt-3 text-sm font-semibold text-foreground">{p.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
