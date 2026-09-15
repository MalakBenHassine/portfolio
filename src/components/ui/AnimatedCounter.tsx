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
 * Counts up to `value` the first time it scrolls into view.
 * The server renders the FINAL value (so crawlers, no-JS and screen readers always read the real
 * number, never "0" next to it). Only once hydrated, and only if the counter is still below the
 * fold, it is reset to 0 and counted up — written straight to the DOM, no re-render per frame.
 */
export function AnimatedCounter({ value, suffix = "", pad = 0, duration = 1.2, className }: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isArmedRef = useRef(false);
  const isInView = useInView(nodeRef, { once: true, margin: "0px 0px -60px 0px" });
  const prefersReducedMotion = useReducedMotion();

  // Arm the count-up only for counters the visitor has not seen yet.
  useEffect(() => {
    const node = nodeRef.current;
    if (!node || prefersReducedMotion || value === 0) return;
    if (node.getBoundingClientRect().top > window.innerHeight) {
      node.textContent = format(0, suffix, pad);
      isArmedRef.current = true;
    }
  }, [prefersReducedMotion, value, suffix, pad]);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !isInView || !isArmedRef.current) return;
    isArmedRef.current = false;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = format(Math.round(latest), suffix, pad);
      },
      onComplete() {
        node.textContent = format(value, suffix, pad);
      },
    });
    return () => {
      controls.stop();
      node.textContent = format(value, suffix, pad);
    };
  }, [isInView, value, suffix, pad, duration]);

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
        </motion.span>
      </span>
    );
  }

  return (
    <span ref={nodeRef} className={cn("tabular-nums", className)}>
      {format(value, suffix, pad)}
    </span>
  );
}
