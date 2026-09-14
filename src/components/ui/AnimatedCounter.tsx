"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

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

  return (
    <span className={className}>
      <span ref={nodeRef} aria-hidden="true" className="tabular-nums">
        {format(0, suffix, pad)}
      </span>
      <span className="sr-only">{format(value, suffix, 0)}</span>
    </span>
  );
}
