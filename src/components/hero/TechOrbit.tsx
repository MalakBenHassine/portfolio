"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { easeOutExpo } from "@/lib/motion";

export interface OrbitNode {
  tech: string;
  x: number;
  y: number;
  /** Pre-rendered (server) icon, keeps icon data out of the client bundle. */
  icon: ReactNode;
}

interface TechOrbitProps {
  nodes: OrbitNode[];
}

const CENTER = 50;

/** Technology nodes connected to the terminal (large screens only). */
export function TechOrbit({ nodes }: TechOrbitProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="orbit-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(124 157 255)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="rgb(160 143 255)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {nodes.map(({ tech, x, y }, index) => (
          <motion.line
            key={tech}
            x1={x}
            y1={y}
            x2={CENTER}
            y2={CENTER}
            stroke="url(#orbit-line)"
            strokeWidth={1}
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.9 + index * 0.12, ease: easeOutExpo }}
          />
        ))}
      </svg>

      {nodes.map(({ tech, x, y, icon }, index) => (
        <motion.div
          key={tech}
          className="absolute"
          style={{ left: `${x}%`, top: `${y}%` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 + index * 0.12, ease: easeOutExpo }}
        >
          <div
            className="flex -translate-x-1/2 -translate-y-1/2 animate-float items-center gap-2 rounded-full border border-white/8 bg-ink-850/95 py-1.5 pr-3 pl-1.5 shadow-[0_8px_30px_-10px_rgb(0_0_0/0.8)] motion-reduce:animate-none"
            style={{ animationDelay: `${index * -1.1}s` }}
          >
            <span className="grid size-6 place-items-center rounded-full bg-white/6 text-mist-200">{icon}</span>
            <span className="font-mono text-[11px] text-mist-300">{tech}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
