"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface TimelineDotProps {
  featured?: boolean;
  className?: string;
}

/** Timeline node that pops in when the rail reaches it; the featured node sends out a single ring. */
export function TimelineDot({ featured = false, className }: TimelineDotProps) {
  return (
    <motion.span
      data-reveal
      aria-hidden="true"
      className={cn(
        "absolute grid size-[15px] place-items-center rounded-full border bg-ink-950",
        featured ? "border-azure-400 shadow-[0_0_0_5px_rgb(91_130_255/0.15)]" : "border-white/20",
        className,
      )}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -35% 0px" }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
    >
      {featured ? (
        <>
          <span className="size-1.5 rounded-full bg-azure-300" />
          <motion.span
            className="absolute inset-0 rounded-full border border-azure-300 motion-reduce:hidden"
            initial={{ scale: 1, opacity: 0 }}
            whileInView={{ scale: [1, 2.6], opacity: [0.8, 0] }}
            viewport={{ once: true, margin: "0px 0px -35% 0px" }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </>
      ) : null}
    </motion.span>
  );
}
