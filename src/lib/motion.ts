import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary. Every animated component draws from this file
 * instead of inventing its own easing/duration/stagger — keeps the site
 * feeling like one deliberate system rather than scattered effects.
 *
 * Families (semantic, not just tokens):
 * - dataFlow: pipeline/architecture animation — directional, sequential
 * - signal: status/pulse indicators — restrained, only when meaningful
 * - nav: navigation state changes — instant-feeling, precise
 * - micro: buttons/links — small, physical
 */

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutQuart = [0.25, 1, 0.5, 1] as const;

export const springSnappy: Transition = { type: "spring", stiffness: 420, damping: 32, mass: 0.7 };
export const springSoft: Transition = { type: "spring", bounce: 0.2, visualDuration: 0.5 };

export const revealDistance = 20;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: revealDistance },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: easeOutQuart } },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const viewportOnce = { once: true, margin: "-80px" } as const;

/** Semantic motion families — use these instead of inventing new numbers. */
export const motionDataFlow = {
  stage: { duration: 0.45, ease: easeOutQuart },
};

export const motionSignal = {
  /** Timeline dot ping. `pulse.duration` is the fade; `orbit` the slower looping travel. */
  pulse: { duration: 1.8, ease: "easeInOut" as const },
  orbit: { duration: 2.2, repeatDelay: 1.8, ease: "easeInOut" as const },
};

export const motionNav = {
  indicator: { type: "spring", stiffness: 400, damping: 35 } satisfies Transition,
  /** Tab/segment background that slides between options. */
  segment: { type: "spring", stiffness: 380, damping: 34 } satisfies Transition,
  /** Panel swap when the selected tab changes. */
  panel: { duration: 0.25, ease: easeOutExpo },
};

export const motionMicro = {
  magnetic: { type: "spring", stiffness: 150, damping: 15, mass: 0.3 } satisfies Transition,
};
