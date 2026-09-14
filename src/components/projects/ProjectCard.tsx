import Image from "next/image";
import { TechBadge } from "@/components/ui/TechBadge";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import { CheckIcon } from "@/components/ui/icons/CheckIcon";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isFeatured = project.featured === true;
  const headingId = `project-${project.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-colors duration-300 sm:p-7",
        isFeatured
          ? "border-mint-400/35 bg-linear-to-br from-night-800 via-night-850 to-night-850 hover:border-mint-400/60"
          : "border-night-700 bg-night-850/70 hover:border-night-600",
      )}
    >
      {isFeatured ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(52_211_153/0.16),transparent)]"
        />
      ) : null}

      {project.image ? (
        <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl border border-night-700">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes={isFeatured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
            className="object-cover"
          />
        </div>
      ) : null}

      <div className={cn("relative flex flex-1 flex-col", isFeatured && "lg:grid lg:grid-cols-[1.25fr_1fr] lg:gap-10")}>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            {isFeatured ? (
              <span className="rounded-full bg-mint-400 px-2.5 py-0.5 text-xs font-semibold text-night-950">
                Featured
              </span>
            ) : null}
            {project.categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-night-600 px-2.5 py-0.5 text-xs text-fog-400"
              >
                {category}
              </span>
            ))}
          </div>

          <h3
            id={headingId}
            className={cn(
              "mt-4 font-bold tracking-tight text-fog-50",
              isFeatured ? "text-2xl sm:text-3xl" : "text-xl",
            )}
          >
            {project.title}
          </h3>
          {project.subtitle ? (
            <p className="mt-1 text-sm font-medium text-mint-400">{project.subtitle}</p>
          ) : null}
          <p
            className={cn(
              "mt-3 leading-relaxed text-fog-200",
              isFeatured ? "text-base sm:text-lg" : "text-sm sm:text-base",
            )}
          >
            {project.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
            {project.tech.map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
          </ul>

          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-mint-400 hover:text-mint-300"
            >
              View project<span className="sr-only">: {project.title} (opens in a new tab)</span>
              <ArrowRightIcon className="size-4" />
            </a>
          ) : null}
        </div>

        {project.highlights && project.highlights.length > 0 ? (
          <ul className="mt-8 grid gap-3 self-start sm:grid-cols-2 lg:mt-0 lg:grid-cols-1">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 rounded-xl border border-night-700 bg-night-900/60 p-3.5 text-sm text-fog-50"
              >
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint-400/15 text-mint-400">
                  <CheckIcon className="size-3" />
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
