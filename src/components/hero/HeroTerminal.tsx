"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

/** Each stage: what is shown while it runs, its result, and how long it runs (ms). */
const stages = [
  { running: "Analyzing source code...", label: "Source code analyzed", ms: 450 },
  { running: "Detecting impact...", label: "Impact detected", ms: 550 },
  { running: "Preparing AI assistance...", label: "AI assistance ready", ms: 550 },
  { running: "Running quality gate...", label: "Quality gate passed", ms: 450 },
  { running: "Running security scan...", label: "Security scan passed", ms: 450 },
  { running: "Building Docker image...", label: "Docker image built", ms: 550 },
  { running: "Deploying...", label: "Deployment successful", ms: 550 },
];

/** Wait for the Hero intro to finish on first load; start sooner if reached later by scrolling. */
const INTRO_END_MS = 1150;

/**
 * A short, realistic `analyseimpacte deploy` run. Plays once when visible, never loops.
 * Every line is always in the DOM (fixed height, no layout shift); JavaScript only reveals them in order.
 */
export function HeroTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [started, setStarted] = useState(false);
  const [passed, setPassed] = useState(0);

  useEffect(() => {
    if (!isInView || started || prefersReducedMotion) return;
    const wait = Math.max(250, INTRO_END_MS - performance.now());
    const timeout = window.setTimeout(() => setStarted(true), wait);
    return () => window.clearTimeout(timeout);
  }, [isInView, started, prefersReducedMotion]);

  useEffect(() => {
    if (!started || passed >= stages.length) return;
    const timeout = window.setTimeout(() => setPassed((count) => count + 1), stages[passed].ms);
    return () => window.clearTimeout(timeout);
  }, [started, passed]);

  const completed = prefersReducedMotion ? stages.length : passed;
  const isRunning = !prefersReducedMotion && started && completed < stages.length;
  const isDone = completed >= stages.length;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Terminal: analyseimpacte deploy — source analyzed, impact detected, AI assistance ready, quality gate and security scan passed, Docker image built, deployment successful. Status: production ready."
      className="glass overflow-hidden rounded-2xl text-left font-mono shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)]"
    >
      <div aria-hidden="true" className="flex items-center gap-3 border-b border-white/6 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
        </span>
        <span className="truncate text-[10px] tracking-[0.14em] text-mist-500 uppercase">analyseimpacte · deploy</span>
        <span
          className={cn(
            "ml-auto rounded-full px-2 py-0.5 text-[9px] tracking-[0.14em] uppercase transition-colors duration-300",
            isDone ? "bg-ok-400/10 text-ok-400" : isRunning ? "bg-azure-400/10 text-azure-300" : "bg-white/6 text-mist-400",
          )}
        >
          {isDone ? "passed" : isRunning ? "running" : "queued"}
        </span>
      </div>

      <div aria-hidden="true" className="px-4 py-3 text-[11px] leading-[1.7]">
        <p className="text-mist-200">
          <span className="text-azure-300">$</span> analyseimpacte deploy
          {!started && !isDone ? <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-blink bg-mist-300" /> : null}
        </p>
        <ul>
          {stages.map((stage, index) => {
            const isPassed = index < completed;
            const isCurrent = isRunning && index === completed;
            return (
              <li
                key={stage.label}
                data-reveal
                className={cn(
                  "flex items-center gap-2 transition-[opacity,color] duration-200",
                  isPassed ? "text-mist-200 opacity-100" : isCurrent ? "text-mist-400 opacity-100" : "opacity-0",
                )}
              >
                <span className={cn("w-3 text-center", isPassed ? "text-ok-400" : "text-azure-300")}>
                  {isPassed ? "✓" : ">"}
                </span>{" "}
                {isPassed || !isCurrent ? stage.label : stage.running}
                {isCurrent ? (
                  <span className="ml-0.5 inline-block h-3 w-1.5 animate-blink bg-azure-300/80" aria-hidden="true" />
                ) : null}
              </li>
            );
          })}
        </ul>
        <p
          data-reveal
          className={cn(
            "mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-white/6 pt-2 transition-opacity duration-500",
            isDone ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="tracking-[0.12em] text-mist-400 uppercase">
            Status: <span className="font-semibold text-ok-400">Production ready</span>
          </span>{" "}
          <span className="text-mist-400">
            <span className="text-mist-500 line-through">3–5 days</span> → <span className="text-snow">&lt; 10 min</span>
          </span>
        </p>
      </div>
    </div>
  );
}
