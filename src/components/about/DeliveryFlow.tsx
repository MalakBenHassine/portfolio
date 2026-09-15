"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";
import type { WorkflowStep } from "@/lib/types";

interface DeliveryFlowProps {
  steps: WorkflowStep[];
}

/**
 * "From code to production": the connecting line draws itself with the scroll position
 * and each step lights up when the line reaches it. Steps stay readable at all times.
 */
export function DeliveryFlow({ steps }: DeliveryFlowProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const lastIndex = steps.length - 1;

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 85%", "end 55%"] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [reachedIndex, setReachedIndex] = useState(-1);

  // Only re-renders when the reached step changes, not on every scroll frame.
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = value <= 0.001 ? -1 : Math.min(lastIndex, Math.floor(value * lastIndex + 0.02));
    setReachedIndex((current) => (current === next ? current : next));
  });

  const reached = prefersReducedMotion ? lastIndex : reachedIndex;

  return (
    <ol ref={listRef} className="relative" aria-label="From code to production">
      <span aria-hidden="true" className="absolute top-5 bottom-5 left-[19px] w-px bg-white/8" />
      <motion.span
        data-reveal
        aria-hidden="true"
        style={{ scaleY: prefersReducedMotion ? 1 : lineProgress }}
        className="absolute top-5 bottom-5 left-[19px] w-px origin-top bg-linear-to-b from-azure-300 via-azure-500 to-ok-400/80"
      />

      {steps.map((step, index) => {
        const isLast = index === lastIndex;
        const isReached = index <= reached;
        const isCurrent = index === reached && !isLast;
        return (
          <li key={step.title} className="relative flex items-center gap-4 py-2.5">
            <span
              className={cn(
                "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border bg-ink-900 font-mono text-[11px] transition-[color,border-color,box-shadow] duration-500",
                !isReached && "border-white/10 text-mist-500",
                isReached && !isLast && "border-azure-400/60 text-azure-200",
                isReached && isLast && "border-ok-400/60 text-ok-400 shadow-[0_0_0_6px_rgb(74_222_128/0.1)]",
                isCurrent && "shadow-[0_0_0_6px_rgb(91_130_255/0.12),0_0_24px_-2px_rgb(91_130_255/0.5)]",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>{" "}
            <span
              className={cn(
                "min-w-0 transition-transform duration-500",
                isReached ? "translate-x-0" : "-translate-x-1",
              )}
            >
              <span
                className={cn(
                  "block font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-500",
                  isReached ? (isLast ? "text-ok-400" : "text-snow") : "text-mist-500",
                )}
              >
                {step.title}
              </span>{" "}
              <span className="mt-0.5 block text-sm text-mist-400">{step.caption}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
