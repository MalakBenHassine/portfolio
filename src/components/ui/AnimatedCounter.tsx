"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { CheckIcon } from "@/components/ui/icons/CheckIcon";
import { cn } from "@/lib/cn";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  /** Zero-pad to this many digits (e.g. 2 → "03"). */
  pad?: number;
  duration?: number;
  className?: string;
}

const formatter = new Intl.NumberFormat("en-US");

function format(value: number, suffix: string, pad: number): string {
  const text = formatter.format(value);
  return `${pad > 0 ? text.padStart(pad, "0") : text}${suffix}`;
}

/**
 * Counts up to `value` once visible. The number is written straight to the
 * DOM node (no React re-render per frame); screen readers get the final value.
 */
export function AnimatedCounter({ value, suffix = "", pad = 0, duration = 1.6, className }: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "0px 0px -60px 0px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !isInView) return;

    if (prefersReducedMotion || value === 0) {
      node.textContent = format(value, suffix, pad);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = format(Math.round(latest), suffix, pad);
      },
    });
    return () => controls.stop();
  }, [isInView, prefersReducedMotion, value, suffix, pad, duration]);

  // A zero is a result, not a count: show it as-is and confirm it with a quiet success mark.
  if (value === 0) {
    return (
      <span className={cn("inline-flex items-center gap-[0.18em]", className)}>
        <span className="tabular-nums">{format(0, suffix, pad)}</span>
        <motion.span
          data-reveal
          aria-hidden="true"
          className="relative grid size-[0.42em] place-items-center rounded-full border border-ok-400/40 bg-ok-400/10 text-ok-400"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <CheckIcon className="size-[55%]" />
          <motion.span
            className="absolute inset-0 rounded-full border border-ok-400/60 motion-reduce:hidden"
            initial={{ opacity: 0, scale: 1 }}
            whileInView={{ opacity: [0.8, 0], scale: [1, 1.8] }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
          />
        </motion.span>
      </span>
    );
  }

  return (
    <span className={className}>
      <span ref={nodeRef} aria-hidden="true" className="tabular-nums">
        {format(0, suffix, pad)}
      </span>
      <span className="sr-only">{format(value, suffix, 0)}</span>
    </span>
  );
}
