"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { duration, easeOutExpo, inViewOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset in px before reveal. */
  y?: number;
  /** Starting scale before reveal (1 = no scale). */
  scale?: number;
}

/** Fades, lifts and optionally scales its children into place the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, y = 24, scale = 1 }: RevealProps) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={inViewOnce}
      transition={{ duration: duration.base, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}
