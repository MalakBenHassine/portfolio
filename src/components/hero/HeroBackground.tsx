import type { CSSProperties } from "react";
import { ParallaxLayer } from "@/components/hero/ParallaxLayer";
import { ParticleField } from "@/components/hero/ParticleField";

/** Grid is drawn every 56px (see `bg-grid`): data pulses travel exactly along its lines. */
const GRID = 56;

const horizontalFlows = [
  { top: GRID * 4, delay: "1.5s", duration: "11s" },
  { top: GRID * 9, delay: "6s", duration: "13s" },
];
const verticalFlows = [{ left: GRID * 13, delay: "3.5s", duration: "12s" }];

/**
 * Hero backdrop: pointer-reactive grid, slowly drifting light, rare data pulses along the
 * grid and a particle field. Ambient motion is CSS-only, large screens only, off with reduced motion.
 */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 animate-fade-in overflow-hidden">
      <ParallaxLayer depth={-14} className="absolute -inset-8">
        <div className="bg-grid absolute inset-0" />
        <div className="grid-mask absolute inset-0 hidden lg:block">
          {horizontalFlows.map((flow) => (
            <span
              key={flow.top}
              className="data-flow data-flow-x absolute h-px"
              style={{ top: flow.top, "--flow-delay": flow.delay, "--flow-duration": flow.duration } as CSSProperties}
            />
          ))}
          {verticalFlows.map((flow) => (
            <span
              key={flow.left}
              className="data-flow data-flow-y absolute w-px"
              style={{ left: flow.left, "--flow-delay": flow.delay, "--flow-duration": flow.duration } as CSSProperties}
            />
          ))}
        </div>
      </ParallaxLayer>
      <div className="bg-dots absolute top-0 left-0 size-80 opacity-60" />

      <ParallaxLayer depth={70} className="absolute inset-0">
        <div className="hero-drift absolute inset-0">
          <div className="absolute top-[8%] right-[6%] size-[680px] rounded-full bg-[radial-gradient(closest-side,rgb(91_130_255/0.2),transparent)]" />
          <div className="absolute top-[45%] right-[28%] size-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(160_143_255/0.1),transparent)]" />
        </div>
      </ParallaxLayer>

      <ParticleField />

      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-b from-transparent to-ink-950" />
    </div>
  );
}
