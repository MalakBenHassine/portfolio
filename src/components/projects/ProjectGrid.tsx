"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { projectCategories, projects } from "@/data/projects";
import { cn } from "@/lib/cn";
import type { ProjectCategory } from "@/lib/types";

type ProjectFilterOption = "All" | ProjectCategory;

const filterOptions: readonly ProjectFilterOption[] = ["All", ...projectCategories];

function matchesFilter(categories: ProjectCategory[], filter: ProjectFilterOption): boolean {
  return filter === "All" || categories.includes(filter);
}

const filterCounts = Object.fromEntries(
  filterOptions.map((option) => [
    option,
    projects.filter((project) => matchesFilter(project.categories, option)).length,
  ]),
) as Record<ProjectFilterOption, number>;

export function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterOption>("All");

  const visibleProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project.categories, activeFilter)),
    [activeFilter],
  );

  return (
    <div>
      <ProjectFilter
        options={filterOptions}
        active={activeFilter}
        counts={filterCounts}
        onChange={setActiveFilter}
      />

      <p className="sr-only" aria-live="polite">
        {`Showing ${visibleProjects.length} ${visibleProjects.length === 1 ? "project" : "projects"}`}
      </p>

      <motion.ul layout className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleProjects.map((project) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={cn(project.featured && "md:col-span-2 lg:col-span-3")}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
