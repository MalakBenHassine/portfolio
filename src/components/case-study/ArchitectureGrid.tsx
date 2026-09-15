"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Icon } from "@/components/ui/icons/Icon";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { ArchitectureLayer } from "@/lib/types";

interface ArchitectureGridProps {
  layers: ArchitectureLayer[];
}

/**
 * The system as an interactive diagram: pointing at a layer brings it
 * forward — its components line up with connectors — while the other layers step back.
 */
export function ArchitectureGrid({ layers }: ArchitectureGridProps) {
  const [activeTitle, setActiveTitle] = useState<string | null>(null);

  return (
    <motion.ul
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="System architecture layers"
      variants={staggerContainer(0.07)}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      onPointerLeave={() => setActiveTitle(null)}
    >
      {layers.map((layer, index) => {
        const isActive = activeTitle === layer.title;
        const isDimmed = activeTitle !== null && !isActive;
        return (
          <motion.li data-reveal key={layer.title} variants={fadeUp}>
            <article
              aria-labelledby={`layer-${index}`}
              onPointerEnter={(event) => event.pointerType === "mouse" && setActiveTitle(layer.title)}
              className={cn(
                "surface relative h-full rounded-2xl p-6 transition-[opacity,transform,border-color,box-shadow,filter] duration-300",
                isActive && "-translate-y-1 border-azure-400/40! shadow-[0_24px_60px_-30px_rgb(91_130_255/0.55)]",
                isDimmed && "opacity-45 saturate-50",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-azure-300/80 to-transparent transition-opacity duration-300",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              />
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid size-10 place-items-center rounded-xl border bg-ink-850 transition-[color,border-color,transform,box-shadow] duration-300",
                    isActive
                      ? "-rotate-6 border-azure-400/50 text-azure-300 shadow-[0_0_24px_-4px_rgb(91_130_255/0.6)]"
                      : "border-white/8 text-mist-300",
                  )}
                >
                  <Icon name={layer.icon} className="size-5" />
                </span>
                <h4 id={`layer-${index}`} className="font-semibold text-snow">
                  {layer.title}
                </h4>
                <span className="ml-auto font-mono text-[11px] text-mist-500">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <ul className="relative mt-5 space-y-2">
                {layer.items.map((item, itemIndex) => (
                  <li
                    key={item}
                    className={cn(
                      "flex items-center gap-2.5 text-sm transition-[color,transform] duration-300",
                      isActive ? "translate-x-1 text-mist-200" : "text-mist-400",
                    )}
                    style={{ transitionDelay: isActive ? `${itemIndex * 50}ms` : "0ms" }}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-mono text-xs transition-colors duration-300",
                        isActive ? "text-azure-300" : "text-azure-400/50",
                      )}
                    >
                      →
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
