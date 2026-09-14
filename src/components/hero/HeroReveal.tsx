import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface HeroRevealProps {
  children: ReactNode;
  /** Seconds after first paint. The whole Hero intro stays under ~2s. */
  delay: number;
  className?: string;
  y?: number;
  scale?: number;
  /** Fade in from transparent. Disable for LCP candidates so they count as painted immediately. */
  fade?: boolean;
  /** Only animate on large screens (for text that is the LCP element on mobile). */
  largeScreensOnly?: boolean;
  /** Purely visual wrapper: hide from assistive technologies. */
  decorative?: boolean;
}

/**
 * On-load entrance for the Hero intro. Pure CSS (see `.hero-rise` in globals.css), transform/opacity only:
 * it starts at first paint, never waits for JavaScript, and is disabled with reduced motion.
 */
export function HeroReveal({
  children,
  delay,
  className,
  y = 18,
  scale = 1,
  fade = true,
  largeScreensOnly = false,
  decorative = false,
}: HeroRevealProps) {
  const style = {
    "--delay": `${delay}s`,
    "--rise": `${y}px`,
    "--from-scale": scale,
    "--from-opacity": fade ? 0 : 1,
  } as CSSProperties;

  return (
    <div
      aria-hidden={decorative || undefined}
      className={cn("hero-rise", largeScreensOnly && "hero-rise-lg-only", className)}
      style={style}
    >
      {children}
    </div>
  );
}
