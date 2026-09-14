import Image from "next/image";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TechBadge } from "@/components/ui/TechBadge";
import { BoltIcon } from "@/components/ui/icons/BoltIcon";
import { ExternalLinkIcon } from "@/components/ui/icons/ExternalLinkIcon";
import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const headingId = `project-${project.slug}`;

  return (
    <SpotlightCard
      as="article"
      labelledBy={headingId}
      className="group flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1"
    >
      {project.image ? (
        <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl border border-white/8">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <p className="font-mono text-[11px] text-mist-500">{project.categories.join(" · ")}</p>

      <h3 id={headingId} className="mt-3 text-xl font-semibold tracking-tight">
        {project.title}
      </h3>
      {project.subtitle ? <p className="mt-1 text-sm text-azure-300">{project.subtitle}</p> : null}
      <p className="mt-3 text-sm leading-relaxed text-mist-400">{project.description}</p>

      <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-white/6 bg-white/[0.02] px-3.5 py-3 text-sm text-mist-200">
        <BoltIcon className="mt-0.5 size-4 shrink-0 text-azure-400" />
        <span>
          <span className="sr-only">Result: </span>
          {project.result}
        </span>
      </p>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${project.title} tech stack`}>
        {project.tech.map((tech, index) => (
          <TechBadge key={tech} label={tech} index={index} />
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/6 pt-5">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-mist-300 transition-colors hover:text-snow"
            >
              {link.kind === "github" ? <GithubIcon className="size-4" /> : <ExternalLinkIcon className="size-4" />}
              {link.label}
              <span className="sr-only">{` — ${project.title} (opens in a new tab)`}</span>
            </a>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
}
