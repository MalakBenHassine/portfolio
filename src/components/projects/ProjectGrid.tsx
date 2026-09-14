"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { easeOutExpo } from "@/lib/motion";
import type { ProjectCategory } from "@/lib/types";

type ProjectFilterOption = "All" | ProjectCategory;

export interface ProjectGridItem {
  slug: string;
  categories: ProjectCategory[];
  /** Server-rendered card: keeps icons and static markup out of the client bundle. */
  card: ReactNode;
}

interface ProjectGridProps {
  items: ProjectGridItem[];
  categories: readonly ProjectCategory[];
}

function matchesFilter(categories: ProjectCategory[], filter: ProjectFilterOption): boolean {
  return filter === "All" || categories.includes(filter);
}

export function ProjectGrid({ items, categories }: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterOption>("All");

  const filterOptions = useMemo<readonly ProjectFilterOption[]>(() => ["All", ...categories], [categories]);

  const filterCounts = useMemo(
    () =>
      Object.fromEntries(
        filterOptions.map((option) => [option, items.filter((item) => matchesFilter(item.categories, option)).length]),
      ) as Record<ProjectFilterOption, number>,
    [filterOptions, items],
  );

  const visibleItems = items.filter((item) => matchesFilter(item.categories, activeFilter));

  return (
    <div>
      <ProjectFilter options={filterOptions} active={activeFilter} counts={filterCounts} onChange={setActiveFilter} />

      <p className="sr-only" aria-live="polite">
        {`Showing ${visibleItems.length} ${visibleItems.length === 1 ? "project" : "projects"}`}
      </p>

      <motion.ul layout className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleItems.map((item) => (
            <motion.li
              key={item.slug}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: easeOutExpo }}
            >
              {item.card}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
