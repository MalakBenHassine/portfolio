"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** True on desktop-class devices (mouse/trackpad) when motion is allowed — gate pointer-driven effects on it. */
export function useFinePointer(): boolean {
  const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const prefersReducedMotion = usePrefersReducedMotion();
  return hasFinePointer && !prefersReducedMotion;
}
