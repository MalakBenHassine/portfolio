"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
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

const ENTRANCE_STAGGER = 0.1;

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
};

function matchesFilter(categories: ProjectCategory[], filter: ProjectFilterOption): boolean {
  return filter === "All" || categories.includes(filter);
}

export function ProjectGrid({ items, categories }: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterOption>("All");
  const [hasFiltered, setHasFiltered] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const isInView = useInView(listRef, { once: true, margin: "0px 0px -80px 0px" });

  // Only offer categories that actually contain a project.
  const filterOptions = useMemo<readonly ProjectFilterOption[]>(
    () => ["All", ...categories.filter((category) => items.some((item) => item.categories.includes(category)))],
    [categories, items],
  );

  const filterCounts = useMemo(
    () =>
      Object.fromEntries(
        filterOptions.map((option) => [option, items.filter((item) => matchesFilter(item.categories, option)).length]),
      ) as Record<ProjectFilterOption, number>,
    [filterOptions, items],
  );

  const visibleItems = items.filter((item) => matchesFilter(item.categories, activeFilter));

  const changeFilter = (option: ProjectFilterOption) => {
    setHasFiltered(true);
    setActiveFilter(option);
  };

  return (
    <div>
      <motion.div
        data-reveal
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
      >
        <ProjectFilter options={filterOptions} active={activeFilter} counts={filterCounts} onChange={changeFilter} />
      </motion.div>

      <p className="sr-only" aria-live="polite">
        {`Showing ${visibleItems.length} ${visibleItems.length === 1 ? "project" : "projects"}`}
      </p>

      <motion.ul ref={listRef} layout className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleItems.map((item, index) => (
            <motion.li
              data-reveal
              key={item.slug}
              layout
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              exit={{ opacity: 0, scale: 0.94, filter: "blur(4px)", transition: { duration: 0.25, ease: easeOutExpo } }}
              transition={{
                duration: hasFiltered ? 0.4 : 0.7,
                // First entrance: cards arrive one after another. Filtering: all at once.
                delay: hasFiltered ? 0.05 : index * ENTRANCE_STAGGER,
                ease: easeOutExpo,
              }}
            >
              {item.card}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
