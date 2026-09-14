"use client";

import { useMotionValue, useSpring } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";

interface HeroPointerValue {
  /** Smoothed pointer position, from -0.5 (left/top) to 0.5 (right/bottom). */
  x: MotionValue<number>;
  y: MotionValue<number>;
}

const HeroPointerContext = createContext<HeroPointerValue | null>(null);

/** Tracks the mouse for Hero parallax. Inactive on touch devices and with reduced motion. */
export function HeroPointerProvider({ children }: { children: ReactNode }) {
  const isEnabled = useFinePointer();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!isEnabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      rawX.set(event.clientX / window.innerWidth - 0.5);
      rawY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [isEnabled, rawX, rawY]);

  return <HeroPointerContext.Provider value={{ x, y }}>{children}</HeroPointerContext.Provider>;
}

export function useHeroPointer(): HeroPointerValue {
  const context = useContext(HeroPointerContext);
  if (!context) throw new Error("useHeroPointer must be used inside <HeroPointerProvider>");
  return context;
}
