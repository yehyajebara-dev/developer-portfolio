import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary. Every animated component draws from this file
 * instead of inventing its own easing/duration/stagger — keeps the site
 * feeling like one deliberate system rather than scattered effects.
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
