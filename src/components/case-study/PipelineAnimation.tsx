"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PipelineStageRow, STAGE_ROW_HEIGHT } from "@/components/case-study/PipelineStageRow";
import type { StageStatus } from "@/components/case-study/PipelineStageRow";
import { CheckIcon } from "@/components/ui/icons/CheckIcon";
import { pipelineStages } from "@/data/pipeline";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/cn";

const START_DELAY_MS = 400;
const STAGE_DURATION_MS = 420;

/** The real 9-stage AnalyseImpacte Jenkins pipeline, replayed when scrolled into view. */
export function PipelineAnimation() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const totalStages = pipelineStages.length;
  const [completedStages, setCompletedStages] = useState(0);

  const completed = prefersReducedMotion ? totalStages : completedStages;
  const isStarted = prefersReducedMotion || isInView;
  const isDone = completed >= totalStages;

  useEffect(() => {
    if (!isInView || prefersReducedMotion || completedStages >= totalStages) return;
    const delay = completedStages === 0 ? START_DELAY_MS : STAGE_DURATION_MS;
    const timeout = window.setTimeout(() => setCompletedStages((count) => count + 1), delay);
    return () => window.clearTimeout(timeout);
  }, [completedStages, isInView, prefersReducedMotion, totalStages]);

  const getStatus = (index: number): StageStatus => {
    if (index < completed) return "passed";
    if (isStarted && index === completed) return "running";
    return "queued";
  };

  return (
    <figure
      ref={containerRef}
      aria-labelledby="pipeline-caption"
      className="relative h-full w-full overflow-hidden rounded-2xl border border-white/8 bg-ink-950/80"
    >
      <figcaption id="pipeline-caption" className="sr-only">
        The AnalyseImpacte Jenkins pipeline: nine stages from checkout to smoke tests, with automatic rollback.
      </figcaption>

      <div className="flex items-center justify-between gap-3 border-b border-white/6 px-4 py-3">
        <span className="truncate font-mono text-xs text-mist-400">
          Jenkinsfile · 9 stages <span className="text-mist-500">· replay</span>
        </span>
        <div className="flex shrink-0 items-center gap-2">
          {isDone && !prefersReducedMotion ? (
            <button
              type="button"
              onClick={() => setCompletedStages(0)}
              aria-label="Replay pipeline animation"
              className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[11px] text-mist-400 transition-colors hover:border-azure-400/50 hover:text-snow"
            >
              ↻ Replay
            </button>
          ) : null}
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px]",
              isDone ? "bg-ok-400/10 text-ok-400" : "bg-white/6 text-mist-300",
            )}
          >
            {isDone ? (
              <CheckIcon className="size-3" />
            ) : (
              <span
                aria-hidden="true"
                className={cn(
                  "size-1.5 rounded-full",
                  isStarted ? "animate-pulse bg-azure-400 motion-reduce:animate-none" : "bg-mist-500",
                )}
              />
            )}
            {isDone ? "PASSED" : isStarted ? "RUNNING" : "QUEUED"}
          </span>
        </div>
      </div>

      <div className="h-px bg-white/6" aria-hidden="true">
        <motion.div
          className="h-full origin-left bg-linear-to-r from-azure-400 to-ok-400"
          initial={false}
          animate={{ scaleX: completed / totalStages }}
          transition={{ duration: 0.35, ease: easeOutExpo }}
        />
      </div>

      <ol className="relative px-4 py-4 sm:px-5">
        <span aria-hidden="true" className="absolute top-[34px] bottom-[34px] left-[27px] w-px bg-white/8 sm:left-[31px]" />
        <motion.span
          aria-hidden="true"
          className="absolute top-[34px] bottom-[34px] left-[27px] w-px origin-top bg-ok-400/60 sm:left-[31px]"
          initial={false}
          animate={{ scaleY: Math.min(completed / (totalStages - 1), 1) }}
          transition={{ duration: 0.35, ease: easeOutExpo }}
        />
        {/* Light travelling along the pipeline towards the running stage */}
        <motion.span
          aria-hidden="true"
          className="absolute top-[30px] left-[24px] z-20 size-[7px] rounded-full bg-azure-200 shadow-[0_0_12px_3px_rgb(124_157_255/0.8)] sm:left-[28px]"
          initial={false}
          animate={{
            y: Math.min(completed, totalStages - 1) * STAGE_ROW_HEIGHT,
            opacity: isStarted && !isDone ? 1 : 0,
          }}
          transition={{ y: { duration: 0.35, ease: easeOutExpo }, opacity: { duration: 0.3 } }}
        />
        {pipelineStages.map((stage, index) => (
          <PipelineStageRow key={stage.name} index={index} stage={stage} status={getStatus(index)} />
        ))}
      </ol>

      <div className="border-t border-white/6 px-4 py-3 sm:px-5">
        <div className="relative h-6" aria-live="polite">
          <AnimatePresence initial={false} mode="wait">
            {isDone ? (
              <motion.p
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
                className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.18em] text-ok-400 uppercase"
              >
                <span className="grid size-5 place-items-center rounded-full bg-ok-400/15">
                  <CheckIcon className="size-3" />
                </span>
                Deployment successful
              </motion.p>
            ) : (
              <motion.p
                key="pending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono text-xs tracking-[0.18em] text-mist-500 uppercase"
              >
                {isStarted ? `Stage ${Math.min(completed + 1, totalStages)} / ${totalStages}` : "Waiting for trigger"}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <p className={cn("mt-2 font-mono text-[11px] transition-colors duration-500", isDone ? "text-mist-300" : "text-mist-500")}>
          <span aria-hidden="true" className={isDone ? "text-ok-400" : "text-azure-400"}>
            {isDone ? "✓" : "↺"}
          </span>{" "}
          Automatic rollback enabled
          <span className="text-mist-500"> · if deploy or smoke tests fail</span>
        </p>
      </div>
    </figure>
  );
}
