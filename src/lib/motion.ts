import type { Variants } from "framer-motion";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Parent variant: reveals children one after another. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Small items (badges, list rows): opacity + lift only, cheap enough to use by the dozen. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOutExpo } },
};

/** Larger blocks and headings: opacity + lift + blur → sharp. */
export const blurUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: easeOutExpo } },
};

/** One word of a heading. Offset in em so it scales with the font size. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.4em", filter: "blur(6px)" },
  show: { opacity: 1, y: "0em", filter: "blur(0px)", transition: { duration: 0.75, ease: easeOutExpo } },
};

export const inViewOnce = { once: true, margin: "0px 0px -80px 0px" } as const;
