"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { easeOutExpo, inViewOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface CodeLine {
  code: string;
  comment: string;
}

interface FlowNode {
  label: string;
  /** Index of the code line that produces this stage (it lights up when that line runs). */
  line: number;
}

interface CodeWindowProps {
  filename: string;
  lines: CodeLine[];
  /** The architecture the code implements, lit up in sync with the lines. */
  flow?: FlowNode[];
  result?: string;
  caption: string;
}

const START = 0.2;
const LINE_STAGGER = 0.4;
const lineDelay = (line: number) => START + line * LINE_STAGGER;

/**
 * Minimal editor window: lines run one by one, the stage each line implements lights up in the
 * flow below (AST → Facts → LLM → Validation → SDDD), then the grounded result is confirmed.
 */
export function CodeWindow({ filename, lines, flow = [], result, caption }: CodeWindowProps) {
  const resultDelay = lineDelay(lines.length) + 0.2;

  return (
    <figure className="overflow-hidden rounded-2xl border border-white/8 bg-ink-950/90 shadow-[0_40px_120px_-50px_rgb(91_130_255/0.45)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/6 px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/12" />
          <span className="size-2.5 rounded-full bg-white/12" />
          <span className="size-2.5 rounded-full bg-white/12" />
        </span>
        <span className="truncate font-mono text-[11px] text-mist-400">{filename}</span>
        <span className="rounded-full border border-iris-400/30 px-2 py-0.5 font-mono text-[10px] text-iris-400">local</span>
      </div>

      <motion.div initial="hidden" whileInView="show" viewport={inViewOnce}>
        <ol className="overflow-x-auto px-4 pt-5 pb-3 font-mono text-[12px] leading-[2] sm:px-5 sm:text-[13px]">
          {lines.map((line, index) => (
            <motion.li
              data-reveal
              key={line.code}
              className="relative -mx-2 flex gap-4 rounded px-2 whitespace-pre"
              variants={{
                hidden: { opacity: 0, x: -8 },
                show: { opacity: 1, x: 0, transition: { delay: lineDelay(index), duration: 0.45, ease: easeOutExpo } },
              }}
            >
              {/* Execution highlight passes over each line once, as it is "run". */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded bg-iris-400/10"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: [0, 1, 0], transition: { duration: 0.9, times: [0, 0.2, 1], delay: lineDelay(index) + 0.1 } },
                }}
              />
              <span aria-hidden="true" className="relative w-4 shrink-0 text-right text-mist-500/60 select-none">
                {index + 1}
              </span>
              <span className="relative min-w-0 text-mist-200">
                {line.code}
                {line.comment ? (
                  <span className="block text-mist-500 sm:inline sm:pl-4">{`# ${line.comment}`}</span>
                ) : null}
              </span>
            </motion.li>
          ))}
        </ol>

        {flow.length ? (
          <ol
            aria-label="Grounded generation flow"
            className="mx-4 flex flex-wrap items-center gap-y-2 rounded-xl border border-white/6 bg-white/[0.015] px-3 py-3 font-mono text-[10px] tracking-[0.12em] uppercase sm:mx-5"
          >
            {flow.map((node, index) => {
              const delay = lineDelay(node.line) + 0.3;
              const isLast = index === flow.length - 1;
              return (
                <Fragment key={node.label}>
                  {index > 0 ? (
                    <motion.li
                      aria-hidden="true"
                      className="mx-1.5"
                      variants={{
                        hidden: { color: "#7a8094" },
                        show: { color: "#7c9dff", transition: { delay: delay - 0.1, duration: 0.3 } },
                      }}
                    >
                      →
                    </motion.li>
                  ) : null}
                  {/* Idle stages stay readable (muted text), they only light up — never hidden. */}
                  <motion.li
                    className={cn("rounded-md border px-2 py-1", isLast ? "border-ok-400/40" : "border-iris-400/35")}
                    variants={{
                      hidden: { color: "#7a8094", borderColor: "rgba(255,255,255,0.08)" },
                      show: {
                        color: isLast ? "#4ade80" : "#d6d9e3",
                        borderColor: isLast ? "rgba(74,222,128,0.4)" : "rgba(160,143,255,0.35)",
                        transition: { delay, duration: 0.4 },
                      },
                    }}
                  >
                    {node.label}
                  </motion.li>
                </Fragment>
              );
            })}
          </ol>
        ) : null}

        {result ? (
          <motion.p
            data-reveal
            className="flex items-center gap-2 px-4 pt-3 pb-4 font-mono text-[11px] text-ok-400 sm:px-5"
            variants={{
              hidden: { opacity: 0, y: 6 },
              show: { opacity: 1, y: 0, transition: { delay: resultDelay, duration: 0.4, ease: easeOutExpo } },
            }}
          >
            <span aria-hidden="true">✓</span> {result}
            <span aria-hidden="true" className="inline-block h-3 w-1.5 animate-blink bg-ok-400/70 [animation-iteration-count:4]" />
          </motion.p>
        ) : null}
      </motion.div>

      <figcaption className="border-t border-white/6 px-4 py-3 text-xs text-mist-500 sm:px-5">{caption}</figcaption>
    </figure>
  );
}
