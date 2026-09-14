"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PipelineStageRow } from "@/components/featured/PipelineStageRow";
import type { StageStatus } from "@/components/featured/PipelineStageRow";
import { CheckIcon } from "@/components/ui/icons/CheckIcon";
import { pipelineStages } from "@/data/pipeline";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

const START_DELAY_MS = 500;
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
      className="relative w-full overflow-hidden rounded-2xl border border-white/8 bg-ink-950/80"
    >
      <figcaption id="pipeline-caption" className="sr-only">
        The AnalyseImpacte Jenkins pipeline: nine stages from checkout to smoke tests, with automatic rollback.
      </figcaption>

      <div className="flex items-center justify-between gap-3 border-b border-white/6 px-4 py-3">
        <span className="truncate font-mono text-xs text-mist-400">Jenkinsfile · 9 stages</span>
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
            {isDone ? "Deployed" : isStarted ? "Running" : "Queued"}
          </span>
        </div>
      </div>

      <div className="h-px bg-white/6" aria-hidden="true">
        <motion.div
          className="h-full origin-left bg-linear-to-r from-azure-400 to-ok-400"
          initial={false}
          animate={{ scaleX: completed / totalStages }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <ol className="relative px-4 py-4 sm:px-5">
        <span aria-hidden="true" className="absolute top-[34px] bottom-[34px] left-[27px] w-px bg-white/8 sm:left-[31px]" />
        <motion.span
          aria-hidden="true"
          className="absolute top-[34px] bottom-[34px] left-[27px] w-px origin-top bg-ok-400/60 sm:left-[31px]"
          initial={false}
          animate={{ scaleY: Math.min(completed / (totalStages - 1), 1) }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        {pipelineStages.map((stage, index) => (
          <PipelineStageRow key={stage.name} index={index} stage={stage} status={getStatus(index)} />
        ))}
      </ol>

      <p className="border-t border-white/6 px-4 py-3 font-mono text-[11px] text-mist-500 sm:px-5">
        <span aria-hidden="true" className="text-azure-400">
          ↺
        </span>{" "}
        Automatic rollback if deploy or smoke tests fail
      </p>
    </figure>
  );
}
