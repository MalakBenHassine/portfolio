"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Hydration-safe reduced-motion preference: `false` during SSR and hydration,
 * then the real OS setting. Use it whenever the value changes rendered output.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
