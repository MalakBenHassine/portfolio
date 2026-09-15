"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { AnimatedWords } from "@/components/ui/AnimatedWords";
import type { HeadingText } from "@/components/ui/AnimatedWords";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /** Seconds between direct children. */
  stagger?: number;
  delay?: number;
}

/** Choreographs its <RevealBlock> / <RevealHeading> children in order, once, when scrolled into view. */
export function RevealGroup({ children, className, stagger = 0.14, delay = 0 }: RevealGroupProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
    >
      {children}
    </motion.div>
  );
}

interface RevealBlockProps {
  children: ReactNode;
  className?: string;
}

export function RevealBlock({ children, className }: RevealBlockProps) {
  return (
    <motion.div data-reveal variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

interface RevealHeadingProps {
  id?: string;
  text: HeadingText;
  className?: string;
  as?: "h2" | "h3";
  /** Seconds between words. */
  stagger?: number;
}

/** Heading revealed word by word as one step of a <RevealGroup>. */
export function RevealHeading({ id, text, className, as = "h2", stagger = 0.07 }: RevealHeadingProps) {
  const Component = as === "h2" ? motion.h2 : motion.h3;
  return (
    <Component id={id} className={className} variants={staggerContainer(stagger)}>
      <AnimatedWords text={text} />
    </Component>
  );
}
