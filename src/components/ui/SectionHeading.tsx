"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { AnimatedWords } from "@/components/ui/AnimatedWords";
import type { HeadingText } from "@/components/ui/AnimatedWords";
import { easeOutExpo, fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  id: string;
  index: string;
  eyebrow: string;
  /** Revealed word by word. */
  title: HeadingText;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

/** Editorial section header: "01 — ABOUT", then the title word by word, then the lead. */
export function SectionHeading({ id, index, eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  const isCentered = align === "center";
  return (
    <motion.div
      className={cn("mb-14 max-w-3xl sm:mb-20", isCentered && "mx-auto text-center", className)}
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
    >
      <motion.p
        data-reveal
        variants={fadeUp}
        className={cn(
          "flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-mist-400 uppercase",
          isCentered && "justify-center",
        )}
      >
        <span className="text-azure-400">{index}</span>
        <motion.span
          data-reveal
          aria-hidden="true"
          className="h-px w-10 origin-left bg-linear-to-r from-azure-400/80 to-transparent"
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease: easeOutExpo } } }}
        />
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={staggerContainer(0.07)}
        id={id}
        className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl"
      >
        <AnimatedWords text={title} />
      </motion.h2>
      {description ? (
        <motion.p data-reveal variants={fadeUp} className="mt-5 text-base leading-relaxed text-mist-400 sm:text-lg">
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
