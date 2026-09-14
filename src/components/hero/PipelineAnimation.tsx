"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PipelineStageRow } from "@/components/hero/PipelineStageRow";
import type { StageStatus } from "@/components/hero/PipelineStageRow";
import { CheckIcon } from "@/components/ui/icons/CheckIcon";
import { pipelineStages } from "@/data/pipeline";
import { cn } from "@/lib/cn";

const START_DELAY_MS = 700;
const STAGE_DURATION_MS = 480;
const FINAL_LABEL = "< 10 min";
/** Illustrative build clock: ticks up to 9:59 while the stages run. */
const CLOCK_END_SECONDS = 599;

function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function PipelineAnimation() {
  const containerRef = useRef<HTMLElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion() ?? false;

  const totalStages = pipelineStages.length;
  const [completedStages, setCompletedStages] = useState(0);
  const [runId, setRunId] = useState(0);

  const completed = prefersReducedMotion ? totalStages : completedStages;
  const isStarted = prefersReducedMotion || isInView;
  const isDone = completed >= totalStages;

  // Advance one stage at a time.
  useEffect(() => {
    if (!isInView || prefersReducedMotion || completedStages >= totalStages) return;
    const delay = completedStages === 0 ? START_DELAY_MS : STAGE_DURATION_MS;
    const timeout = window.setTimeout(() => setCompletedStages((count) => count + 1), delay);
    return () => window.clearTimeout(timeout);
  }, [completedStages, isInView, prefersReducedMotion, totalStages, runId]);

  // Build clock, synced with the stage run.
  useEffect(() => {
    const clock = clockRef.current;
    if (!clock) return;
    if (prefersReducedMotion) {
      clock.textContent = FINAL_LABEL;
      return;
    }
    if (!isInView) return;

    clock.textContent = formatClock(0);
    const runSeconds = (START_DELAY_MS + STAGE_DURATION_MS * (totalStages - 1)) / 1000;
    const controls = animate(0, CLOCK_END_SECONDS, {
      duration: runSeconds,
      ease: "linear",
      onUpdate(latest) {
        clock.textContent = formatClock(latest);
      },
      onComplete() {
        clock.textContent = FINAL_LABEL;
      },
    });
    return () => controls.stop();
  }, [isInView, prefersReducedMotion, runId, totalStages]);

  const rerun = () => {
    setCompletedStages(0);
    setRunId((id) => id + 1);
  };

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
        Illustration of the AnalyseImpacte 9-stage CI/CD pipeline running end to end,
        turning a 3 to 5 day manual process into an automated run of under 10 minutes.
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
            analyseimpacte / jenkins pipeline
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {isDone && !prefersReducedMotion ? (
            <button
              type="button"
              onClick={rerun}
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
            {isDone ? "Passed" : isStarted ? "Running" : "Queued"}
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

      {/* Outcome */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t border-night-700 bg-night-900/60 px-4 py-4 sm:px-5">
        <div>
          <p className="text-[11px] font-medium tracking-wider text-fog-500 uppercase">
            Manual process
          </p>
          <p
            className={cn(
              "mt-1 text-lg font-bold transition-colors duration-500 sm:text-xl",
              isDone ? "text-fog-500 line-through decoration-2" : "text-fog-50",
            )}
          >
            3–5 days
          </p>
        </div>
        <span aria-hidden="true" className="font-mono text-fog-500">
          →
        </span>
        <div className="text-right">
          <p className="text-[11px] font-medium tracking-wider text-fog-500 uppercase">
            Automated
          </p>
          <p className="mt-1 text-lg font-bold text-mint-400 sm:text-xl">
            <span ref={clockRef} className="font-mono tabular-nums">
              00:00
            </span>
          </p>
        </div>
      </div>
    </figure>
  );
}
