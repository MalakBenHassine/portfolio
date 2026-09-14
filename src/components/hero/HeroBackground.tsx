import { ParallaxLayer } from "@/components/hero/ParallaxLayer";
import { ParticleField } from "@/components/hero/ParticleField";

/** Hero backdrop: pointer-reactive grid, light and particle field. Purely decorative. */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 animate-fade-in overflow-hidden">
      <ParallaxLayer depth={-14} className="absolute -inset-8">
        <div className="bg-grid absolute inset-0" />
      </ParallaxLayer>
      <div className="bg-dots absolute top-0 left-0 size-80 opacity-60" />

      <ParallaxLayer depth={70} className="absolute inset-0">
        <div className="absolute top-[8%] right-[6%] size-[680px] rounded-full bg-[radial-gradient(closest-side,rgb(91_130_255/0.2),transparent)]" />
        <div className="absolute top-[45%] right-[28%] size-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(160_143_255/0.1),transparent)]" />
      </ParallaxLayer>

      <ParticleField />

      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-b from-transparent to-ink-950" />
    </div>
  );
}
