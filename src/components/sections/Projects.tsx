import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { profile } from "@/data/profile";

export function Projects() {
  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeading
        id="projects-title"
        eyebrow="03 · Projects"
        title="Selected work"
        description="Full-stack systems, applied AI and delivery pipelines — built to run in production, not just in a demo."
      />

      <Reveal>
        <ProjectGrid />
      </Reveal>

      <Reveal className="mt-10 flex justify-center">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-fog-400 transition-colors hover:text-mint-400"
        >
          <GithubIcon className="size-5" />
          More on GitHub
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </Reveal>
    </Section>
  );
}
