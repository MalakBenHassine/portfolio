"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Icon } from "@/components/ui/icons/Icon";
import { easeOutExpo, inViewOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { ArchitectureDiagram, ArchitectureNode } from "@/lib/types";

interface ArchitectureGridProps {
  diagram: ArchitectureDiagram;
}

/** Grid is 3 × 4 cells; the SVG uses a 300 × 400 box, so a cell center is ((col − ½) × 100, (row − ½) × 100). */
const center = (node: ArchitectureNode) => ({ x: (node.col - 0.5) * 100, y: (node.row - 0.5) * 100 });

/**
 * The AnalyseImpacte architecture as a system you can explore. Pointing at (desktop) or
 * tapping (touch) a component highlights it and its connections — data flows along the
 * active links — dims the rest, and lists its technologies in the side panel.
 */
export function ArchitectureGrid({ diagram }: ArchitectureGridProps) {
  const [selectedId, setSelectedId] = useState(diagram.nodes[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const focusId = hoveredId ?? selectedId;
  const isExploring = hoveredId !== null;
  const byId = new Map(diagram.nodes.map((node) => [node.id, node]));
  const focusNode = byId.get(focusId) ?? diagram.nodes[0];
  const neighbours = new Set(
    diagram.links.flatMap(([from, to]) => (from === focusId ? [to] : to === focusId ? [from] : [])),
  );

  return (
    <motion.div
      data-reveal
      className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={inViewOnce}
      transition={{ duration: 0.7, ease: easeOutExpo }}
    >
      <div className="surface relative rounded-2xl p-3 sm:p-5" onPointerLeave={() => setHoveredId(null)}>
        <div className="relative grid h-[23rem] grid-cols-3 grid-rows-4 sm:h-[26rem]">
          <svg aria-hidden="true" viewBox="0 0 300 400" preserveAspectRatio="none" className="absolute inset-0 size-full">
            {diagram.links.map(([fromId, toId]) => {
              const from = byId.get(fromId);
              const to = byId.get(toId);
              if (!from || !to) return null;
              const a = center(from);
              const b = center(to);
              const isActive = fromId === focusId || toId === focusId;
              return (
                <g key={`${fromId}-${toId}`}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    vectorEffect="non-scaling-stroke"
                    className={cn(
                      "transition-[stroke,opacity] duration-300",
                      isActive ? "stroke-azure-400/70" : "stroke-white/10",
                      isExploring && !isActive && "opacity-40",
                    )}
                    strokeWidth={1}
                  />
                  {/* Flow only while someone is actively exploring — no idle animation. */}
                  {isActive && isExploring ? (
                    <line
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      vectorEffect="non-scaling-stroke"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      className="link-flow stroke-azure-200"
                    />
                  ) : null}
                </g>
              );
            })}
          </svg>

          {diagram.nodes.map((node) => {
            const isFocus = node.id === focusId;
            const isNeighbour = neighbours.has(node.id);
            const isDimmed = isExploring && !isFocus && !isNeighbour;
            return (
              <div
                key={node.id}
                className="relative grid place-items-center p-1 sm:p-2"
                style={{ gridColumn: node.col, gridRow: node.row }}
              >
                <button
                  type="button"
                  aria-pressed={node.id === selectedId}
                  onClick={() => setSelectedId(node.id)}
                  onPointerEnter={(event) => event.pointerType === "mouse" && setHoveredId(node.id)}
                  onFocus={() => setHoveredId(node.id)}
                  onBlur={() => setHoveredId(null)}
                  className={cn(
                    "flex w-full max-w-[10.5rem] flex-col items-center gap-1.5 rounded-xl border bg-ink-900 px-1.5 py-2.5 text-center transition-[opacity,transform,border-color,box-shadow] duration-300 sm:flex-row sm:gap-2.5 sm:px-3 sm:text-left",
                    isFocus
                      ? "-translate-y-0.5 border-azure-400/60 shadow-[0_0_0_4px_rgb(91_130_255/0.1),0_16px_40px_-18px_rgb(91_130_255/0.7)]"
                      : isNeighbour
                        ? "border-azure-400/25"
                        : "border-white/10 hover:border-white/20",
                    isDimmed && "opacity-45",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-lg border transition-colors duration-300 sm:size-8",
                      isFocus ? "border-azure-400/40 text-azure-300" : "border-white/8 text-mist-400",
                    )}
                  >
                    <Icon name={node.icon} className="size-4" />
                  </span>
                  <span className={cn("text-[11px] leading-tight font-medium sm:text-sm", isFocus ? "text-snow" : "text-mist-200")}>
                    {node.title}
                  </span>
                </button>
              </div>
            );
          })}

          <p
            className="pointer-events-none flex items-end p-2 font-mono text-[10px] tracking-[0.14em] text-mist-500 uppercase"
            style={{ gridColumn: "1 / span 2", gridRow: 4 }}
          >
            <span className="pointer-fine:hidden">Tap a component</span>
            <span className="hidden pointer-fine:inline">Hover a component to trace its connections</span>
          </p>
        </div>
      </div>

      {/* Details of the component in focus */}
      <div className="surface relative overflow-hidden rounded-2xl p-6 sm:p-7" aria-live="polite">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-azure-300/60 to-transparent"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={focusNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: easeOutExpo }}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-azure-400/40 bg-ink-850 text-azure-300 shadow-[0_0_24px_-6px_rgb(91_130_255/0.6)]">
                <Icon name={focusNode.icon} className="size-5" />
              </span>
              <div>
                <h4 className="font-semibold text-snow">{focusNode.title}</h4>
                <p className="text-sm text-mist-400">{focusNode.role}</p>
              </div>
            </div>

            <ul className="mt-6 space-y-2.5">
              {focusNode.items.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.3, ease: easeOutExpo }}
                  className="flex items-center gap-2.5 text-sm text-mist-200"
                >
                  <span aria-hidden="true" className="font-mono text-xs text-azure-300">
                    →
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>

            <p className="mt-6 border-t border-white/6 pt-4 font-mono text-[11px] tracking-[0.12em] text-mist-500 uppercase">
              Connected to{" "}
              <span className="text-mist-300 normal-case tracking-normal">
                {[...neighbours].map((id) => byId.get(id)?.title).join(" · ")}
              </span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Full component list for search engines and assistive technologies. */}
      <ul className="sr-only">
        {diagram.nodes.map((node) => (
          <li key={node.id}>
            {node.title}: {node.items.join(", ")}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
