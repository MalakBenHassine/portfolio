"use client";

import { motion } from "framer-motion";
import { easeOutExpo, inViewOnce, staggerContainer } from "@/lib/motion";

interface CodeLine {
  code: string;
  comment: string;
}

interface CodeWindowProps {
  filename: string;
  lines: CodeLine[];
  caption: string;
}

const LINE_STAGGER = 0.35;

/** Minimal editor window: lines appear one by one as if executed, then the grounded result is confirmed. */
export function CodeWindow({ filename, lines, caption }: CodeWindowProps) {
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

      <motion.div
        variants={staggerContainer(LINE_STAGGER, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        <ol className="overflow-x-auto px-4 pt-5 pb-3 font-mono text-[12px] leading-[2] sm:px-5 sm:text-[13px]">
          {lines.map((line, index) => (
            <motion.li
              data-reveal
              key={line.code}
              className="relative -mx-2 flex gap-4 rounded px-2 whitespace-pre"
              variants={{
                hidden: { opacity: 0, x: -8 },
                show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: easeOutExpo } },
              }}
            >
              {/* Execution highlight passes over each line once, as it is "run". */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded bg-iris-400/10"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: [0, 1, 0], transition: { duration: 0.9, times: [0, 0.2, 1], delay: 0.1 } },
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
        <motion.p
          data-reveal
          className="flex items-center gap-2 px-4 pb-4 font-mono text-[11px] text-ok-400 sm:px-5"
          variants={{
            hidden: { opacity: 0, y: 6 },
            show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOutExpo } },
          }}
        >
          <span aria-hidden="true">✓</span> Only content grounded in the source reaches the SDDD
          <span aria-hidden="true" className="inline-block h-3 w-1.5 animate-blink bg-ok-400/70 [animation-iteration-count:4]" />
        </motion.p>
      </motion.div>

      <figcaption className="border-t border-white/6 px-4 py-3 text-xs text-mist-500 sm:px-5">{caption}</figcaption>
    </figure>
  );
}
