"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Icon } from "@/components/ui/icons/Icon";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { StoryStep } from "@/lib/types";

interface WorkflowStoryProps {
  /** Section subheading, pinned together with the diagram. */
  heading?: ReactNode;
  steps: StoryStep[];
  /** Index of the step to accent (the AI step). */
  highlightIndex?: number;
}

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * AnalyseImpacte, from a code change to production, told with the scroll.
 * Desktop: the card stays pinned while the scroll advances the current step; the rail
 * fills up to it and a detail panel explains it. Mobile: a vertical list whose steps
 * light up as they pass. Reduced motion: no pinning, every step shown in full.
 */
export function WorkflowStory({ heading, steps, highlightIndex }: WorkflowStoryProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = usePrefersReducedMotion();
  const lastIndex = steps.length - 1;

  const pinnedScroll = useScroll({ target: pinRef, offset: ["start 30%", "end end"] });
  const listScroll = useScroll({ target: listRef, offset: ["start 75%", "end 50%"] });
  const [currentIndex, setCurrentIndex] = useState(-1);

  const update = (next: number) => setCurrentIndex((current) => (current === next ? current : next));

  useMotionValueEvent(pinnedScroll.scrollYProgress, "change", (value) => {
    if (isDesktop) update(Math.min(lastIndex, Math.floor(value * steps.length * 0.999)));
  });
  useMotionValueEvent(listScroll.scrollYProgress, "change", (value) => {
    if (!isDesktop) update(value <= 0.001 ? -1 : Math.min(lastIndex, Math.floor(value * lastIndex + 0.02)));
  });

  const current = prefersReducedMotion ? lastIndex : currentIndex;
  const panelStep = steps[Math.max(0, current)];
  const railScale = Math.max(0, current) / lastIndex;

  return (
    <div ref={pinRef} className="workflow-pin relative lg:h-[250vh] lg:motion-reduce:h-auto">
      {/* Pinned roughly in the middle of the viewport (heading + card ≈ 32rem), never under the navbar. */}
      <div className="lg:sticky lg:top-[max(5.5rem,calc(50vh-16rem))] lg:motion-reduce:static">
        {heading}
        <SpotlightCard className="p-6 sm:p-10">
          <div className="mb-8 hidden items-center justify-between gap-4 lg:flex lg:motion-reduce:hidden" aria-hidden="true">
            <span className="font-mono text-[11px] tracking-[0.2em] text-mist-500 uppercase">
              AnalyseImpacte · change → production
            </span>
            <span className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-mist-400 uppercase">
              Step <span className="text-snow tabular-nums">{pad(Math.max(0, current) + 1)}</span> / {pad(steps.length)}
              <span className="relative h-px w-24 overflow-hidden bg-white/10">
                <motion.span
                  className="absolute inset-0 origin-left bg-linear-to-r from-azure-400 to-ok-400"
                  initial={false}
                  animate={{ scaleX: (Math.max(0, current) + 1) / steps.length }}
                  transition={{ duration: 0.4, ease: easeOutExpo }}
                />
              </span>
            </span>
          </div>

          <div className="relative">
            {/* Vertical rail (mobile / tablet) */}
            <span aria-hidden="true" className="absolute top-6 bottom-6 left-6 w-px bg-white/8 lg:hidden" />
            <motion.span
              data-reveal
              aria-hidden="true"
              className="absolute top-6 bottom-6 left-6 w-px origin-top bg-linear-to-b from-azure-400 to-iris-400/60 lg:hidden"
              initial={false}
              animate={{ scaleY: current < 0 ? 0 : railScale }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            />
            {/* Horizontal rail (desktop) */}
            <span aria-hidden="true" className="absolute top-6 right-[6.25%] left-[6.25%] hidden h-px bg-white/8 lg:block" />
            <motion.span
              data-reveal
              aria-hidden="true"
              className="absolute top-6 right-[6.25%] left-[6.25%] hidden h-px origin-left bg-linear-to-r from-azure-400 via-iris-400/80 to-azure-300 lg:block"
              initial={false}
              animate={{ scaleX: railScale }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            />

            <ol ref={listRef} className="relative grid grid-cols-1 gap-7 lg:grid-cols-8 lg:gap-3" aria-label="AnalyseImpacte workflow">
              {steps.map((step, index) => {
                const isDone = index < current;
                const isCurrent = index === current;
                const isReached = isDone || isCurrent;
                const isAccent = index === highlightIndex;
                return (
                  <li
                    key={step.title}
                    aria-current={isCurrent && !prefersReducedMotion ? "step" : undefined}
                    className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-4 lg:text-center"
                  >
                    <span
                      className={cn(
                        "relative z-10 grid size-12 shrink-0 place-items-center rounded-full border bg-ink-900 transition-[color,border-color,box-shadow,transform] duration-500",
                        !isReached && "border-white/10 text-mist-500",
                        isReached && !isAccent && "border-azure-400/60 text-azure-200",
                        isReached && isAccent && "border-iris-400/70 text-iris-400",
                        isCurrent && "scale-110",
                        isCurrent && !isAccent && "shadow-[0_0_0_6px_rgb(91_130_255/0.12),0_0_30px_-4px_rgb(91_130_255/0.6)]",
                        isCurrent && isAccent && "shadow-[0_0_0_6px_rgb(160_143_255/0.14),0_0_30px_-4px_rgb(160_143_255/0.6)]",
                      )}
                    >
                      {isCurrent && !prefersReducedMotion ? (
                        <motion.span
                          key={`pulse-${current}`}
                          aria-hidden="true"
                          className={cn("absolute inset-0 rounded-full border", isAccent ? "border-iris-400" : "border-azure-300")}
                          initial={{ scale: 1, opacity: 0.7 }}
                          animate={{ scale: 1.7, opacity: 0 }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                        />
                      ) : null}
                      <Icon
                        name={step.icon}
                        className={cn("size-5 transition-transform duration-500", isCurrent && "-rotate-6")}
                      />
                    </span>
                    <div className="pt-1 lg:pt-0">
                      <p className="font-mono text-[10px] tracking-[0.18em] text-mist-500">{pad(index + 1)}</p>
                      <h4
                        className={cn(
                          "mt-0.5 font-medium transition-colors duration-500 lg:text-sm",
                          isReached ? "text-snow" : "text-mist-400",
                        )}
                      >
                        {step.title}
                      </h4>
                      <p className="mt-1 text-sm leading-snug text-mist-400 lg:hidden lg:motion-reduce:block lg:motion-reduce:text-[12px]">
                        {step.caption}
                      </p>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-mist-400 lg:sr-only lg:motion-reduce:not-sr-only lg:motion-reduce:mt-2 lg:motion-reduce:text-[12px]">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Detail of the current step (desktop). The same text is in the list for assistive technologies. */}
          <div
            aria-hidden="true"
            className="relative mt-10 hidden min-h-[8.5rem] border-t border-white/6 pt-8 lg:block lg:motion-reduce:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={panelStep.title}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-8"
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
              >
                <span className="text-gradient text-6xl leading-none font-semibold tracking-[-0.05em] tabular-nums">
                  {pad(Math.max(0, current) + 1)}
                </span>
                <div>
                  <p
                    className={cn(
                      "font-mono text-[11px] tracking-[0.2em] uppercase",
                      Math.max(0, current) === highlightIndex ? "text-iris-400" : "text-azure-300",
                    )}
                  >
                    {panelStep.caption}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-snow">{panelStep.title}</p>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-mist-400">{panelStep.detail}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
