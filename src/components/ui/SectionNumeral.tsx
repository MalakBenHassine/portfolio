"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

interface SectionNumeralProps {
  value: string;
  className?: string;
}

/** Oversized, near-invisible chapter number with a slow scroll parallax. Decorative. */
export function SectionNumeral({ value, className }: SectionNumeralProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      // The digits are drawn by CSS (see [data-decor] in globals.css): decorative, so kept out of the page text.
      data-decor={value}
      style={prefersReducedMotion ? undefined : { y }}
      className={cn("text-numeral pointer-events-none absolute -z-10 select-none", className)}
    />
  );
}
