"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { easeOutExpo, inViewOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset in px before reveal. */
  y?: number;
  /** Starting scale before reveal (1 = no scale). */
  scale?: number;
  /** Start slightly blurred and sharpen into place. */
  blur?: boolean;
}

/** Fades, lifts, sharpens and optionally scales its children into place the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, y = 30, scale = 1, blur = true }: RevealProps) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y, scale, filter: blur ? "blur(4px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={inViewOnce}
      transition={{ duration: 0.7, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}
