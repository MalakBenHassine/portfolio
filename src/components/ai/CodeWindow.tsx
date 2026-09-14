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

/** Minimal editor window whose lines type in (line by line) when scrolled into view. */
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

      <motion.ol
        className="overflow-x-auto px-4 py-5 font-mono text-[12px] leading-[2] sm:px-5 sm:text-[13px]"
        variants={staggerContainer(0.22, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        {lines.map((line, index) => (
          <motion.li
            data-reveal
            key={line.code}
            className="flex gap-4 whitespace-pre"
            variants={{
              hidden: { opacity: 0, x: -8 },
              show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: easeOutExpo } },
            }}
          >
            <span aria-hidden="true" className="w-4 shrink-0 text-right text-mist-500/60 select-none">
              {index + 1}
            </span>
            <span className="min-w-0 text-mist-200">
              {line.code}
              {line.comment ? (
                <span className="block text-mist-500 sm:inline sm:pl-4">{`# ${line.comment}`}</span>
              ) : null}
            </span>
          </motion.li>
        ))}
      </motion.ol>

      <figcaption className="border-t border-white/6 px-4 py-3 text-xs text-mist-500 sm:px-5">{caption}</figcaption>
    </figure>
  );
}
