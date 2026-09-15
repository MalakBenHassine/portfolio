"use client";

import { motion } from "framer-motion";
import { easeOutExpo, inViewOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface BeforeAfterMetricProps {
  before: string;
  after: string;
  /** Stack "before" above "after" instead of inline. */
  stacked?: boolean;
  className?: string;
  afterClassName?: string;
}

/**
 * "3–5 days → < 10 min": the old value is struck through as it comes into view,
 * then the new value lands. Text is real text throughout (visible without JavaScript).
 */
export function BeforeAfterMetric({ before, after, stacked = false, className, afterClassName }: BeforeAfterMetricProps) {
  return (
    <motion.span
      className={cn(stacked ? "flex flex-col" : "inline-flex flex-wrap items-baseline gap-x-2", className)}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
    >
      <span className={cn("relative inline-block self-start", stacked && "font-mono text-sm font-normal tracking-normal")}>
        <span className="text-mist-500">{before}</span>
        <motion.span
          data-reveal
          aria-hidden="true"
          className="absolute inset-x-[-2px] top-1/2 h-[1.5px] origin-left bg-mist-400"
          variants={{
            hidden: { scaleX: 0, opacity: 1 },
            show: { scaleX: 1, transition: { duration: 0.5, delay: 0.25, ease: easeOutExpo } },
          }}
        />
        <span className="sr-only"> (before)</span>
      </span>
      {stacked ? null : (
        <motion.span
          data-reveal
          aria-hidden="true"
          className="inline-block text-azure-400"
          variants={{
            hidden: { opacity: 0, x: -6 },
            show: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.55, ease: easeOutExpo } },
          }}
        >
          →
        </motion.span>
      )}
      <motion.span
        data-reveal
        className={cn("inline-block", afterClassName)}
        variants={{
          hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
          show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, delay: 0.7, ease: easeOutExpo } },
        }}
      >
        {after}
        <span className="sr-only"> (after)</span>
      </motion.span>
    </motion.span>
  );
}
