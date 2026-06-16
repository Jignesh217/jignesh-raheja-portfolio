/**
 * Shared Framer Motion variants.
 *
 * Subtle, performant fade/slide reveals. Kept centralised so motion stays
 * consistent across sections. All transforms are GPU-friendly (opacity + y).
 */

import type { Variants } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: easeOut } },
};

/** Parent container that staggers its children's reveals. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/** Shared viewport config so sections reveal once, slightly before fully in view. */
export const viewportOnce = { once: true, margin: "-80px" } as const;
