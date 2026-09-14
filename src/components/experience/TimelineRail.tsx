"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

interface TimelineRailProps {
  children: ReactNode;
}

/** Vertical rail that fills as the timeline scrolls through the viewport. */
export function TimelineRail({ children }: TimelineRailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="relative">
      <div aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-white/8 md:left-[215px]" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-linear-to-b from-azure-300 via-azure-500 to-iris-400/40 md:left-[215px]"
      />
      {children}
    </div>
  );
}
