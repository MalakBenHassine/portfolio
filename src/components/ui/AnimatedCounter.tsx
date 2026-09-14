"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

const formatter = new Intl.NumberFormat("en-US");

/**
 * Counts up to `value` once visible. The number is written straight to the
 * DOM node (no React re-render per frame); screen readers get the final value.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.6,
  className,
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "0px 0px -60px 0px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !isInView) return;

    if (prefersReducedMotion || value === 0) {
      node.textContent = `${formatter.format(value)}${suffix}`;
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = `${formatter.format(Math.round(latest))}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, prefersReducedMotion, value, suffix, duration]);

  return (
    <span className={className}>
      <span ref={nodeRef} aria-hidden="true" className="tabular-nums">
        {`0${suffix}`}
      </span>
      <span className="sr-only">{`${formatter.format(value)}${suffix}`}</span>
    </span>
  );
}
