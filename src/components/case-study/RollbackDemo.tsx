"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

type Scenario = "success" | "failure";
type Outcome = "ok" | "fail";

interface DemoStep {
  label: string;
  detail: string;
  outcome: Outcome;
}

/** Mirrors the Jenkinsfile logic: stage 06 keeps a rollback tag, stages 08–09 restore it if the deploy fails. */
const scenarios: Record<Scenario, { steps: DemoStep[]; result: string }> = {
  success: {
    steps: [
      { label: "Backup previous", detail: "rollback tag saved", outcome: "ok" },
      { label: "Deploy", detail: "new images started", outcome: "ok" },
      { label: "Smoke tests", detail: "passed", outcome: "ok" },
      { label: "Production", detail: "new version live", outcome: "ok" },
    ],
    result: "Deployment successful",
  },
  failure: {
    steps: [
      { label: "Backup previous", detail: "rollback tag saved", outcome: "ok" },
      { label: "Deploy", detail: "new images started", outcome: "ok" },
      { label: "Smoke tests", detail: "failed", outcome: "fail" },
      { label: "Automatic rollback", detail: "redeploy rollback tag", outcome: "ok" },
      { label: "Previous version", detail: "restored", outcome: "ok" },
    ],
    result: "Previous version restored",
  },
};

const STEP_MS = 650;
const ROWS = 5;

/**
 * Controlled demonstration of the pipeline's automatic rollback. Plays the normal run once when
 * visible; the visitor can replay it or trigger the failure scenario. Clearly labelled as a simulation.
 */
export function RollbackDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [scenario, setScenario] = useState<Scenario>("success");
  const [resolved, setResolved] = useState(0);
  const [runId, setRunId] = useState(0);

  const { steps, result } = scenarios[scenario];
  const isStarted = runId > 0 || isInView;
  const done = prefersReducedMotion ? steps.length : resolved;
  const isFinished = done >= steps.length;

  useEffect(() => {
    if (!isStarted || prefersReducedMotion || resolved >= steps.length) return;
    const timeout = window.setTimeout(() => setResolved((count) => count + 1), STEP_MS);
    return () => window.clearTimeout(timeout);
  }, [isStarted, prefersReducedMotion, resolved, steps.length, runId]);

  const run = (next: Scenario) => {
    setScenario(next);
    setResolved(0);
    setRunId((id) => id + 1);
  };

  return (
    <div ref={ref} className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-950/80">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/6 px-4 py-3">
        <span className="font-mono text-xs text-mist-400">Rollback · simulation</span>
        <div role="group" aria-label="Choose a scenario" className="flex gap-1 rounded-full border border-white/8 p-0.5">
          {(["success", "failure"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={scenario === option}
              onClick={() => run(option)}
              className={cn(
                "rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] uppercase transition-colors duration-200",
                scenario === option
                  ? option === "failure"
                    ? "bg-rose-400/15 text-rose-300"
                    : "bg-ok-400/15 text-ok-400"
                  : "text-mist-400 hover:text-snow",
              )}
            >
              {option === "success" ? "Normal run" : "Failure scenario"}
            </button>
          ))}
        </div>
      </div>

      <ol className="flex-1 px-4 py-4 sm:px-5" aria-label="Rollback scenario steps">
        {Array.from({ length: ROWS }, (_, index) => {
          const step = steps[index];
          if (!step) return <li key={`empty-${index}`} aria-hidden="true" className="h-11" />;
          const isResolved = index < done;
          const isRunning = isStarted && !isResolved && index === done && !prefersReducedMotion;
          const failed = isResolved && step.outcome === "fail";
          const isRollbackPath = scenario === "failure" && index >= 3;
          return (
            <li key={`${scenario}-${step.label}`} className="relative flex h-11 items-center gap-3">
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-8 left-[11px] h-6 w-px transition-colors duration-300",
                    isResolved ? (failed || isRollbackPath ? "bg-rose-400/40" : "bg-ok-400/50") : "bg-white/10",
                  )}
                />
              ) : null}
              <span
                aria-hidden="true"
                className={cn(
                  "relative grid size-6 shrink-0 place-items-center rounded-full border font-mono text-[11px] transition-colors duration-300",
                  !isResolved && !isRunning && "border-white/12 text-mist-500",
                  isRunning && "border-azure-400 text-azure-300",
                  isResolved && !failed && "border-ok-400/60 bg-ok-400/15 text-ok-400",
                  failed && "border-rose-400/60 bg-rose-400/15 text-rose-300",
                )}
              >
                {isResolved ? (failed ? "✕" : "✓") : null}
                {isRunning ? (
                  <span className="absolute -inset-px animate-spin rounded-full border border-transparent border-t-azure-200" />
                ) : null}
              </span>
              <span
                className={cn(
                  "min-w-0 flex-1 truncate font-mono text-xs tracking-[0.08em] uppercase transition-colors duration-300",
                  isResolved || isRunning ? (isRollbackPath ? "text-rose-200" : "text-snow") : "text-mist-500",
                )}
              >
                {step.label}
              </span>
              <span
                className={cn(
                  "font-mono text-[10px] transition-colors duration-300",
                  isResolved ? (failed ? "text-rose-300" : "text-ok-400") : isRunning ? "text-azure-300" : "text-mist-500",
                )}
              >
                {isResolved ? step.detail : isRunning ? "running" : "queued"}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="border-t border-white/6 px-4 py-3 sm:px-5">
        <div className="h-6" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {isFinished ? (
              <motion.p
                key={`${scenario}-done`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-xs font-semibold tracking-[0.16em] text-ok-400 uppercase"
              >
                ✓ {result}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
        <p className="mt-1 text-[11px] text-mist-500">
          Illustrates the pipeline&apos;s rollback logic — a demonstration, not a live system.
        </p>
      </div>
    </div>
  );
}
