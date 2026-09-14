"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
  labelledBy?: string;
}

/** Dark card whose border and glow follow the pointer (CSS variables only, no re-render). */
export function SpotlightCard({ children, className, as = "div", labelledBy }: SpotlightCardProps) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  const Component = as;
  return (
    <Component
      aria-labelledby={labelledBy}
      onPointerMove={handlePointerMove}
      className={cn("spotlight surface rounded-2xl", className)}
    >
      {children}
    </Component>
  );
}
