"use client";

import { motion, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useHeroPointer } from "@/components/hero/HeroPointer";

interface ParallaxLayerProps {
  children?: ReactNode;
  /** Maximum travel in px at the viewport edge. Negative values move against the pointer. */
  depth: number;
  className?: string;
}

/** Shifts its content slightly with the mouse (transform only). */
export function ParallaxLayer({ children, depth, className }: ParallaxLayerProps) {
  const pointer = useHeroPointer();
  const x = useTransform(pointer.x, (value) => value * depth);
  const y = useTransform(pointer.y, (value) => value * depth);

  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
