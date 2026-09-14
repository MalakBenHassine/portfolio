"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PipelineStageRow } from "@/components/hero/PipelineStageRow";
import type { StageStatus } from "@/components/hero/PipelineStageRow";
import { CheckIcon } from "@/components/ui/icons/CheckIcon";
import { pipelineStages } from "@/data/pipeline";
import { cn } from "@/lib/cn";

const START_DELAY_MS = 700;
const STAGE_DURATION_MS = 480;

export function PipelineAnimation() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion() ?? false;

  const totalStages = pipelineStages.length;
  const [completedStages, setCompletedStages] = useState(0);

  const completed = prefersReducedMotion ? totalStages : completedStages;
  const isStarted = prefersReducedMotion || isInView;
  const isDone = completed >= totalStages;

  // Advance one stage at a time.
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
      className="relative w-full overflow-hidden rounded-2xl border border-night-700 bg-night-850/90 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.7)]"
    >
      <figcaption id="pipeline-caption" className="sr-only">
        Illustration of the AnalyseImpacte Jenkins pipeline: nine stages from checkout to
        smoke tests, with automatic rollback. AnalyseImpacte turns a 3 to 5 day manual
        design-document update cycle into under 10 minutes.
      </figcaption>

      {/* Window chrome */}
      <div className="flex items-center justify-between gap-3 border-b border-night-700 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-night-600" />
            <span className="size-2.5 rounded-full bg-night-600" />
            <span className="size-2.5 rounded-full bg-night-600" />
          </span>
          <span className="truncate font-mono text-xs text-fog-400">
            analyseimpacte / Jenkinsfile
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {isDone && !prefersReducedMotion ? (
            <button
              type="button"
              onClick={() => setCompletedStages(0)}
              aria-label="Re-run pipeline animation"
              className="rounded-md border border-night-600 px-2 py-0.5 font-mono text-[11px] text-fog-400 transition-colors hover:border-mint-400/60 hover:text-mint-300"
            >
              ↻ Re-run
            </button>
          ) : null}
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium",
              isDone ? "bg-mint-400/15 text-mint-300" : "bg-night-700 text-fog-200",
            )}
          >
            {isDone ? (
              <CheckIcon className="size-3" />
            ) : (
              <span
                aria-hidden="true"
                className={cn(
                  "size-1.5 rounded-full",
                  isStarted ? "animate-pulse bg-mint-400 motion-reduce:animate-none" : "bg-fog-500",
                )}
              />
            )}
            {isDone ? "Deployed" : isStarted ? "Running" : "Queued"}
          </span>
        </div>
      </div>

      {/* Overall progress */}
      <div className="h-0.5 bg-night-700" aria-hidden="true">
        <motion.div
          className="h-full origin-left bg-mint-400"
          initial={false}
          animate={{ scaleX: completed / totalStages }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Stages */}
      <ol className="relative px-4 py-4 sm:px-5">
        <span
          aria-hidden="true"
          className="absolute top-[34px] bottom-[34px] left-[27px] w-px bg-night-600 sm:left-[31px]"
        />
        <motion.span
          aria-hidden="true"
          className="absolute top-[34px] bottom-[34px] left-[27px] w-px origin-top bg-mint-400 sm:left-[31px]"
          initial={false}
          animate={{ scaleY: Math.min(completed / (totalStages - 1), 1) }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        {pipelineStages.map((stage, index) => (
          <PipelineStageRow
            key={stage.name}
            index={index}
            stage={stage}
            status={getStatus(index)}
          />
        ))}
      </ol>

      <p className="border-t border-night-700 px-4 py-2.5 font-mono text-[11px] text-fog-500 sm:px-5">
        <span aria-hidden="true" className="text-mint-400">↺</span> Automatic rollback if deploy
        or smoke tests fail
      </p>

      {/* Business outcome delivered by the application */}
      <div className="border-t border-night-700 bg-night-900/60 px-4 py-4 sm:px-5">
        <p className="text-[11px] font-medium tracking-wider text-fog-500 uppercase">
          Design-document update cycle
        </p>
        <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
          <div>
            <p className="text-xs text-fog-400">Manual</p>
            <p
              className={cn(
                "text-lg font-bold transition-colors duration-500 sm:text-xl",
                isDone ? "text-fog-500 line-through decoration-2" : "text-fog-50",
              )}
            >
              3–5 days
            </p>
          </div>
          <span aria-hidden="true" className="pb-1 font-mono text-fog-500">
            →
          </span>
          <div className="text-right">
            <p className="text-xs text-fog-400">With AnalyseImpacte</p>
            <p
              className={cn(
                "font-mono text-lg font-bold text-mint-400 transition-opacity duration-500 sm:text-xl",
                isDone ? "opacity-100" : "opacity-30",
              )}
            >
              &lt; 10 min
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
