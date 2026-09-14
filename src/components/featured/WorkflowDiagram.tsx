"use client";

import { motion } from "framer-motion";
import { easeOutExpo, fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { WorkflowStep } from "@/lib/types";

interface WorkflowDiagramProps {
  steps: WorkflowStep[];
  /** Index of the step to accent (e.g. the AI step). */
  highlightIndex?: number;
}

const STEP_STAGGER = 0.14;

/** End-to-end workflow: horizontal on desktop, vertical on smaller screens. Steps appear progressively. */
export function WorkflowDiagram({ steps, highlightIndex }: WorkflowDiagramProps) {
  const railTransition = { duration: STEP_STAGGER * steps.length + 0.3, delay: 0.1, ease: easeOutExpo };

  return (
    <div className="relative">
      {/* Vertical rail (mobile / tablet) */}
      <span aria-hidden="true" className="absolute top-6 bottom-6 left-6 w-px bg-white/8 lg:hidden" />
      <motion.span
        aria-hidden="true"
        className="absolute top-6 bottom-6 left-6 w-px origin-top bg-linear-to-b from-azure-400 to-iris-400/60 lg:hidden"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={inViewOnce}
        transition={railTransition}
      />
      {/* Horizontal rail (desktop) */}
      <span aria-hidden="true" className="absolute top-6 right-[7%] left-[7%] hidden h-px bg-white/8 lg:block" />
      <motion.span
        aria-hidden="true"
        className="absolute top-6 right-[7%] left-[7%] hidden h-px origin-left bg-linear-to-r from-azure-400 via-iris-400/80 to-azure-300 lg:block"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={inViewOnce}
        transition={railTransition}
      />

      <motion.ol
        className="relative grid grid-cols-1 gap-7 lg:grid-cols-7 lg:gap-3"
        variants={staggerContainer(STEP_STAGGER, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        {steps.map((step, index) => {
          const isHighlighted = index === highlightIndex;
          return (
            <motion.li
              key={step.title}
              variants={fadeUp}
              className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-4 lg:text-center"
            >
              <span
                className={cn(
                  "relative z-10 grid size-12 shrink-0 place-items-center rounded-full border bg-ink-900 font-mono text-sm",
                  isHighlighted
                    ? "border-iris-400/60 text-iris-400 shadow-[0_0_0_6px_rgb(160_143_255/0.1)]"
                    : "border-white/12 text-mist-200",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="pt-1.5 lg:pt-0">
                <h4 className="font-medium text-snow">{step.title}</h4>
                <p className="mt-1 text-sm leading-snug text-mist-400 lg:text-[13px]">{step.caption}</p>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  );
}
