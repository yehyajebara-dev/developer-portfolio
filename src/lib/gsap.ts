import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

/**
 * Registered once, on module load. GSAP is the cinematic scroll engine
 * (pinning/scrubbing the "Inside the System" sequence); every other
 * animation in the site stays on Motion — see `lib/motion.ts`.
 */
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);

export { gsap, ScrollTrigger, MotionPathPlugin, useGSAP };
