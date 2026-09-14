"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { buttonClasses } from "@/lib/buttonStyles";
import type { ButtonVariant } from "@/lib/buttonStyles";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  download?: boolean;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

const MAX_OFFSET_PX = 6;

/** Link styled as a button that leans slightly towards the cursor (mouse only, respects reduced motion). */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  download = false,
  external = false,
  className,
  ariaLabel,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 });

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(relativeX * MAX_OFFSET_PX * 2);
    y.set(relativeY * MAX_OFFSET_PX * 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      className={buttonClasses(variant, className)}
    >
      {children}
    </motion.a>
  );
}
