"use client";

import { motion } from "framer-motion";
import { easeOutExpo, inViewOnce, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { WorkflowStep } from "@/lib/types";

interface DeliveryFlowProps {
  steps: WorkflowStep[];
}

const STAGGER = 0.12;

/** "From code to production": a vertical chain whose steps light up in order when scrolled into view. */
export function DeliveryFlow({ steps }: DeliveryFlowProps) {
  const lastIndex = steps.length - 1;

  return (
    <motion.ol
      className="relative"
      variants={staggerContainer(STAGGER, 0.15)}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      aria-label="From code to production"
    >
      <span aria-hidden="true" className="absolute top-5 bottom-5 left-[19px] w-px bg-white/8" />
      <motion.span
        data-reveal
        aria-hidden="true"
        className="absolute top-5 bottom-5 left-[19px] w-px origin-top bg-linear-to-b from-azure-300 via-azure-500 to-ok-400/80"
        variants={{
          hidden: { scaleY: 0 },
          show: { scaleY: 1, transition: { duration: STAGGER * steps.length + 0.4, ease: easeOutExpo } },
        }}
      />

      {steps.map((step, index) => {
        const isLast = index === lastIndex;
        return (
          <motion.li
            data-reveal
            key={step.title}
            className="relative flex items-center gap-4 py-2.5"
            variants={{
              hidden: { opacity: 0, x: -12 },
              show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOutExpo } },
            }}
          >
            <span
              className={cn(
                "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border bg-ink-900 font-mono text-[11px]",
                isLast ? "border-ok-400/50 text-ok-400 shadow-[0_0_0_6px_rgb(74_222_128/0.08)]" : "border-white/12 text-mist-300",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span className={cn("block font-mono text-xs tracking-[0.2em] uppercase", isLast ? "text-ok-400" : "text-snow")}>
                {step.title}
              </span>
              <span className="mt-0.5 block text-sm text-mist-400">{step.caption}</span>
            </span>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
