"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

interface DrawLineProps {
  className?: string;
  delay?: number;
  duration?: number;
}

/** Decorative line that draws from left to right when its parent motion group reveals. */
export function DrawLine({ className, delay = 0.15, duration = 0.8 }: DrawLineProps) {
  return (
    <motion.span
      data-reveal
      aria-hidden="true"
      className={className}
      style={{ transformOrigin: "left" }}
      variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration, delay, ease: easeOutExpo } } }}
    />
  );
}
