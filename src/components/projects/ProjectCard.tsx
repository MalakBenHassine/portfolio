import Image from "next/image";
import { ProjectVisual } from "@/components/projects/visuals/ProjectVisual";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TechBadge } from "@/components/ui/TechBadge";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import { BoltIcon } from "@/components/ui/icons/BoltIcon";
import { ExternalLinkIcon } from "@/components/ui/icons/ExternalLinkIcon";
import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import type { Project, ProjectLink } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

function LinkLabel({ link, title }: { link: ProjectLink; title: string }) {
  return (
    <>
      {link.kind === "github" ? <GithubIcon className="size-4" /> : <ExternalLinkIcon className="size-4" />}
      {link.label}
      <span className="sr-only">{` — ${title} (opens in a new tab)`}</span>
    </>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const headingId = `project-${project.slug}`;

  return (
    <SpotlightCard
      as="article"
      labelledBy={headingId}
      className="group flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_30px_80px_-40px_rgb(91_130_255/0.45)]"
    >
      <div data-cursor="View" className="relative aspect-[16/10] overflow-hidden border-b border-white/6">
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
        >
          {project.image ? (
            <Image
              src={project.image.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <ProjectVisual kind={project.visual} />
          )}
        </div>

        {/* Hover overlay with actions (mouse devices); touch devices keep the links under the card */}
        <div
          className="absolute inset-0 hidden items-end bg-linear-to-t from-ink-950/95 via-ink-950/50 to-transparent p-4 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 pointer-fine:flex"
        >
          <div className="flex translate-y-3 flex-wrap gap-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:translate-y-0 group-hover:translate-y-0">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-snow px-3.5 py-1.5 text-xs font-medium text-ink-950 transition-colors hover:bg-white"
              >
                <LinkLabel link={link} title={project.title} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11px] tracking-wide text-mist-500 uppercase">{project.categories.join(" · ")}</p>
        <h3 id={headingId} className="mt-2 flex items-center justify-between gap-3 text-xl font-semibold tracking-tight">
          {project.title}
          <ArrowRightIcon
            aria-hidden="true"
            className="size-4 shrink-0 -rotate-45 text-mist-500 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-azure-300"
          />
        </h3>
        {project.subtitle ? <p className="mt-1 text-sm text-azure-300">{project.subtitle}</p> : null}
        <p className="mt-3 text-sm leading-relaxed text-mist-400">{project.description}</p>

        <p className="mt-4 flex items-start gap-2.5 text-sm text-mist-200">
          <BoltIcon className="mt-0.5 size-4 shrink-0 text-azure-400" />
          <span>
            <span className="sr-only">Result: </span>
            {project.result}
          </span>
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5 pb-1" aria-label={`${project.title} tech stack`}>
          {project.tech.map((tech, index) => (
            <TechBadge key={tech} label={tech} index={index} />
          ))}
        </ul>

        {/* Always-visible links for touch devices */}
        <div className="mt-auto pt-5 pointer-fine:hidden">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/6 pt-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-mist-300 transition-colors hover:text-snow"
              >
                <LinkLabel link={link} title={project.title} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
