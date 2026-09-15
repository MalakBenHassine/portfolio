import type { Variants } from "framer-motion";

/*
 * One motion language for the whole site: opacity + a slight rise (and a very light scale for
 * cards), one easing curve, short durations. No blur, no rotation, no bounce.
 */

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const duration = {
  fast: 0.3,
  base: 0.6,
} as const;

/** Parent variant: reveals children one after another. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Default reveal for text, rows and badges. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: duration.base, ease: easeOutExpo } },
};

/** One word of a heading. Offset in em so it scales with the font size. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.35em" },
  show: { opacity: 1, y: "0em", transition: { duration: duration.base, ease: easeOutExpo } },
};

export const inViewOnce = { once: true, margin: "0px 0px -80px 0px" } as const;
