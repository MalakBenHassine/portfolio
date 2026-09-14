"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { terminalCommand, terminalLines } from "@/data/heroTerminal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { TerminalTone } from "@/data/heroTerminal";
import { cn } from "@/lib/cn";

const START_DELAY_MS = 600;
const CHAR_DELAY_MS = 38;
const LINE_DELAY_MS = 280;

const toneSymbol: Record<TerminalTone, string> = {
  info: "→",
  ok: "✓",
  ai: "◆",
  result: "▲",
};

const toneClasses: Record<TerminalTone, { symbol: string; value: string }> = {
  info: { symbol: "text-azure-400", value: "text-mist-400" },
  ok: { symbol: "text-ok-400", value: "text-ok-400/90" },
  ai: { symbol: "text-iris-400", value: "text-iris-400" },
  result: { symbol: "text-azure-300", value: "text-snow font-semibold" },
};

interface TerminalWindowProps {
  /** Pre-rendered stack icons shown on small screens (server-rendered to keep icon data out of the bundle). */
  stackIcons: ReactNode;
}

/** Illustrative terminal replaying the AnalyseImpacte delivery chain. Decorative: all facts are also in the page text. */
export function TerminalWindow({ stackIcons }: TerminalWindowProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [typedChars, setTypedChars] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  const commandLength = terminalCommand.length;
  const chars = prefersReducedMotion ? commandLength : typedChars;
  const lines = prefersReducedMotion ? terminalLines.length : visibleLines;
  const isComplete = lines >= terminalLines.length;

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (typedChars < commandLength) {
      const delay = typedChars === 0 ? START_DELAY_MS : CHAR_DELAY_MS;
      const timeout = window.setTimeout(() => setTypedChars((count) => count + 1), delay);
      return () => window.clearTimeout(timeout);
    }

    if (visibleLines < terminalLines.length) {
      const timeout = window.setTimeout(() => setVisibleLines((count) => count + 1), LINE_DELAY_MS);
      return () => window.clearTimeout(timeout);
    }
  }, [prefersReducedMotion, typedChars, visibleLines, commandLength]);

  return (
    <div className="glass relative overflow-hidden rounded-2xl shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.02)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-azure-300/50 to-transparent"
      />

      {/* Window chrome */}
      <div className="flex items-center justify-between gap-3 border-b border-white/6 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/12" />
            <span className="size-2.5 rounded-full bg-white/12" />
            <span className="size-2.5 rounded-full bg-white/12" />
          </span>
          <span className="truncate font-mono text-[11px] text-mist-400">~/analyseimpacte — deploy</span>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] transition-colors duration-500",
            isComplete ? "border-ok-400/25 text-ok-400" : "border-white/10 text-mist-400",
          )}
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              isComplete ? "bg-ok-400" : "animate-pulse bg-azure-400 motion-reduce:animate-none",
            )}
          />
          {isComplete ? "live" : "running"}
        </span>
      </div>

      {/* Output */}
      <div className="px-4 py-4 font-mono text-[11px] leading-[1.9] sm:px-5 sm:text-[12.5px]">
        <p className="text-snow">
          <span className="text-azure-400">$ </span>
          {terminalCommand.slice(0, chars)}
          {!isComplete && chars < commandLength ? (
            <span className="ml-px inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] animate-blink bg-azure-300 motion-reduce:animate-none" />
          ) : null}
        </p>

        <ul className="mt-1">
          {terminalLines.map((line, index) => {
            const isVisible = index < lines;
            const tone = toneClasses[line.tone];
            return (
              <motion.li
                key={line.label}
                initial={false}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={cn(
                  "flex items-center gap-2.5",
                  line.tone === "result" && "mt-1.5 rounded-md border border-azure-400/15 bg-azure-500/[0.07] px-2 py-0.5",
                )}
              >
                <span className={cn("w-3 shrink-0 text-center", tone.symbol)}>{toneSymbol[line.tone]}</span>
                <span className="min-w-0 flex-1 truncate text-mist-300">{line.label}</span>
                <span className={cn("shrink-0", tone.value)}>{line.value}</span>
              </motion.li>
            );
          })}
        </ul>

        <p className="mt-1 text-mist-400">
          <span className="text-azure-400">$ </span>
          {isComplete ? (
            <span className="ml-px inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] animate-blink bg-azure-300/80 motion-reduce:animate-none" />
          ) : null}
        </p>
      </div>

      {/* Stack strip (small screens, where the orbit is hidden) */}
      <div className="flex items-center justify-between gap-2 border-t border-white/6 px-4 py-3 lg:hidden">
        <span className="font-mono text-[10px] tracking-wider text-mist-500 uppercase">Stack</span>
        <span className="flex items-center gap-3 text-mist-400">{stackIcons}</span>
      </div>
    </div>
  );
}
