import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { profile } from "@/data/profile";
import { projectCategories, projects } from "@/data/projects";

export function Projects() {
  const items = projects.map((project) => ({
    slug: project.slug,
    categories: project.categories,
    card: <ProjectCard project={project} />,
  }));

  return (
    <Section id="more-projects" labelledBy="projects-title">
      <SectionHeading
        id="projects-title"
        index="05"
        eyebrow="Projects"
        title="More things I've built."
        description="Full-stack platforms, applied AI and delivery pipelines — each with a concrete outcome."
      />

      <Reveal>
        <ProjectGrid items={items} categories={projectCategories} />
      </Reveal>

      <Reveal className="mt-12 flex justify-center">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-full border border-white/8 px-5 py-2.5 text-sm text-mist-300 transition-colors hover:border-white/15 hover:text-snow"
        >
          <GithubIcon className="size-4" />
          Explore all repositories on GitHub
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </Reveal>
    </Section>
  );
}
