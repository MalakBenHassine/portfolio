import Image from "next/image";
import portrait from "../../../public/images/malak-profile.webp";
import { HeroReveal } from "@/components/hero/HeroReveal";
import { HeroTerminal } from "@/components/hero/HeroTerminal";
import { ParallaxLayer } from "@/components/hero/ParallaxLayer";
import { profile } from "@/data/profile";

/**
 * Professional portrait with a quiet editorial treatment: arch mask, indigo glow,
 * vignette and a bottom fade into the page. The photo itself is not altered.
 */
export function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-none">
      {/* Atmospheric glow — fades in with the portrait so font-swap reflow never counts as a visible layout shift. */}
      <HeroReveal delay={0.7} y={0} decorative className="pointer-events-none absolute -inset-10 -z-10">
        <div className="absolute inset-0">
          <ParallaxLayer depth={-8} className="absolute inset-0">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgb(91_130_255/0.28),rgb(160_143_255/0.08)_60%,transparent)]" />
          </ParallaxLayer>
        </div>
      </HeroReveal>

      {/* Short, early fade (transform + opacity only): keeps font-swap reflow from registering as layout shift. */}
      <HeroReveal delay={0.7} y={20} scale={0.97}>
        <ParallaxLayer depth={5}>
          <figure className="group/photo relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[14rem] rounded-b-[2rem] border border-white/10 bg-ink-900 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)] transition-[border-color,box-shadow] duration-500 group-hover/photo:border-azure-300/25 group-hover/photo:shadow-[0_40px_120px_-40px_rgb(91_130_255/0.45)]">
              <Image
                src={portrait}
                alt={profile.photo.alt}
                fill
                priority
                sizes="(min-width: 1280px) 440px, (min-width: 1024px) 36vw, (min-width: 640px) 416px, 352px"
                className="object-cover object-[50%_35%]"
              />
              {/* Vignette + fade into the page, above the photo only */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_35%,transparent_55%,rgb(5_6_10/0.55)_100%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent to-ink-950/85"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]"
              />
              {/* Soft rim light on hover — a light on the frame, the photo itself is untouched. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(80%_45%_at_50%_0%,rgb(163_188_255/0.14),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover/photo:opacity-100"
              />
            </div>
          </figure>
        </ParallaxLayer>
      </HeroReveal>

      {/* Floating proof points (tablet and up) */}
      <HeroReveal delay={0.95} y={12} className="absolute top-[6%] -left-8 hidden sm:block lg:-left-20">
        <ParallaxLayer depth={8}>
          <div className="glass rounded-2xl px-4 py-3 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.8)]">
            <p className="font-mono text-[10px] tracking-[0.18em] text-mist-500 uppercase">Latest experience</p>
            <p className="mt-1 text-sm font-medium text-snow">Capgemini Engineering</p>
            <p className="text-xs text-mist-400">Aerospace · DO-178C · DAL A</p>
          </div>
        </ParallaxLayer>
      </HeroReveal>

      {/* Live system: a short deploy run, docked over the bottom fade of the photo (never over the face). */}
      <HeroReveal delay={0.85} y={14} className="relative z-10 mx-auto -mt-8 w-[94%] sm:-mt-10 lg:w-[88%]">
        <HeroTerminal />
      </HeroReveal>
    </div>
  );
}
