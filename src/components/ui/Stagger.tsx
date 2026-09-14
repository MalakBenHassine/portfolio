"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

interface StaggerListProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  ariaLabel?: string;
}

/** A list whose <StaggerItem> children reveal one after another when scrolled into view. */
export function StaggerList({ children, className, stagger = 0.08, delay = 0, ariaLabel }: StaggerListProps) {
  return (
    <motion.ul
      className={className}
      aria-label={ariaLabel}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
    >
      {children}
    </motion.ul>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.li data-reveal className={className} variants={fadeUp}>
      {children}
    </motion.li>
  );
}

/** Animated content for a static list item (keeps the item's own background visible). */
export function StaggerContent({ children, className }: StaggerItemProps) {
  return (
    <motion.div data-reveal className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
