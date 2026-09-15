"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import { easeOutExpo, inViewOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface BeforeAfterMetricProps {
  before: string;
  after: string;
  /** Stacked card layout with visible BEFORE / AFTER labels; inline otherwise. */
  stacked?: boolean;
  className?: string;
  afterClassName?: string;
}

const strike = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.5, delay: 0.25, ease: easeOutExpo } },
};

const land = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.55, ease: easeOutExpo } },
};

/** Old value, struck through as it comes into view. Real text: it reads "3–5 days" in any context. */
function Before({ value, className }: { value: string; className?: string }) {
  return (
    <span className={cn("relative inline-block text-mist-500", className)}>
      {value}
      <motion.span
        data-reveal
        aria-hidden="true"
        variants={strike}
        style={{ transformOrigin: "left" }}
        className="absolute inset-x-[-2px] top-1/2 h-[1.5px] bg-mist-400"
      />
    </span>
  );
}

/**
 * "3–5 days → < 10 min". The text is exactly what is displayed — no hidden helper words — so it
 * reads cleanly for screen readers, crawlers and copy/paste. Only the strike line and the new value animate.
 */
export function BeforeAfterMetric({ before, after, stacked = false, className, afterClassName }: BeforeAfterMetricProps) {
  if (stacked) {
    return (
      <motion.span className={cn("flex flex-col gap-1.5", className)} initial="hidden" whileInView="show" viewport={inViewOnce}>
        <span className="flex items-baseline gap-2">
          <Before value={before} className="font-mono text-base font-normal tracking-normal" />{" "}
          <span className="font-mono text-[10px] font-normal tracking-[0.18em] text-mist-500 uppercase">Before</span>
        </span>{" "}
        <ArrowRightIcon className="size-4 rotate-90 text-azure-400" />
        <motion.span data-reveal variants={land} className="flex items-baseline gap-2">
          <span className={afterClassName}>{after}</span>{" "}
          <span className="font-mono text-[10px] font-normal tracking-[0.18em] text-mist-400 uppercase">After</span>
        </motion.span>
      </motion.span>
    );
  }

  return (
    <motion.span
      className={cn("inline-flex flex-wrap items-baseline gap-x-2", className)}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
    >
      <Before value={before} />{" "}
      <span className="text-azure-400">→</span>{" "}
      <motion.span data-reveal variants={land} className={cn("inline-block", afterClassName)}>
        {after}
      </motion.span>
    </motion.span>
  );
}
