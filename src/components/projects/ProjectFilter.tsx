"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface ProjectFilterProps<T extends string> {
  options: readonly T[];
  active: T;
  counts: Record<T, number>;
  onChange: (option: T) => void;
}

export function ProjectFilter<T extends string>({ options, active, counts, onChange }: ProjectFilterProps<T>) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="inline-flex max-w-full gap-0.5 overflow-x-auto rounded-full border border-white/8 bg-white/[0.02] p-1 [scrollbar-width:none] sm:gap-1"
    >
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={cn(
              "relative inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm whitespace-nowrap transition-colors sm:gap-2 sm:px-4",
              isActive ? "text-ink-950" : "text-mist-400 hover:text-snow",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="project-filter-pill"
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-snow"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            ) : null}
            <span className="relative font-medium">{option}</span>
            <span className={cn("relative font-mono text-[11px]", isActive ? "text-ink-700" : "text-mist-500")}>
              {counts[option]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
