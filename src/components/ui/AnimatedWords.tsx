"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { wordReveal } from "@/lib/motion";
import { cn } from "@/lib/cn";

export interface WordSegment {
  text: string;
  className?: string;
  /** Reveal the segment as a single unit (keeps a gradient continuous across its words). */
  whole?: boolean;
  /** Start the segment on its own line. */
  block?: boolean;
}

export type HeadingText = string | WordSegment[];

interface AnimatedWordsProps {
  text: HeadingText;
}

function Word({ children, className }: { children: string; className?: string }) {
  return (
    <motion.span data-reveal variants={wordReveal} className={cn("inline-block", className)}>
      {children}
    </motion.span>
  );
}

/**
 * Heading text revealed word by word. Must sit inside a motion parent that uses
 * `staggerContainer` variants — the parent sets the rhythm. Real spaces are kept
 * between words, so the text reads and wraps normally.
 */
export function AnimatedWords({ text }: AnimatedWordsProps) {
  const segments = typeof text === "string" ? [{ text }] : text;

  return segments.map((segment, segmentIndex) => {
    const words = segment.whole ? [segment.text] : segment.text.split(" ");
    const content = words.map((word, wordIndex) => (
      <Fragment key={`${word}-${wordIndex}`}>
        {wordIndex > 0 ? " " : null}
        <Word className={segment.className}>{word}</Word>
      </Fragment>
    ));

    const key = `${segment.text}-${segmentIndex}`;
    if (segment.block) {
      return (
        <span key={key} className="block">
          {content}
        </span>
      );
    }
    return (
      <Fragment key={key}>
        {segmentIndex > 0 ? " " : null}
        {content}
      </Fragment>
    );
  });
}
