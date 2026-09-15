import { SkillChip } from "@/components/skills/SkillChip";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StaggerItem, StaggerList } from "@/components/ui/Stagger";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import { learningSkills, skillGroups } from "@/data/skills";
import { cn } from "@/lib/cn";

export function Skills() {
  const hasOddCount = skillGroups.length % 2 === 1;

  return (
    <Section id="skills" labelledBy="skills-title" numeral="04">
      <SectionHeading
        id="skills-title"
        index="04"
        eyebrow="Skills"
        title="A connected engineering ecosystem."
        description="Skills applied on delivered projects, organized the way I use them — from the language and the backend, to the AI layer, the pipeline and the quality checks that guard production. Hover or tap a technology to see what I use it for."
      />

      <StaggerList className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {skillGroups.map((group, index) => {
          const isLast = index === skillGroups.length - 1;
          return (
            <StaggerItem
              key={group.name}
              className={cn(group.wide && "lg:col-span-2", isLast && hasOddCount && "md:col-span-2")}
            >
              <SpotlightCard as="article" labelledBy={`skills-${index}`} className="group/card flex h-full flex-col p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 id={`skills-${index}`} className="flex items-center gap-3 text-lg font-semibold tracking-tight">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-azure-400 transition-transform duration-300 group-hover/card:scale-150"
                    />
                    {group.name}
                  </h3>{" "}
                  <span className="font-mono text-xs text-mist-500">
                    {String(group.core.length + (group.more?.length ?? 0)).padStart(2, "0")}
                  </span>
                </div>

                <StaggerList className="mt-5 flex flex-wrap gap-2" stagger={0.04} delay={0.15} ariaLabel={group.name}>
                  {group.core.map((skill) => (
                    <SkillChip key={skill.name} skill={skill} />
                  ))}
                </StaggerList>

                {group.more ? (
                  <p className="mt-auto pt-5 text-sm leading-relaxed text-mist-500">
                    <span className="font-mono text-[11px] tracking-wider text-mist-400 uppercase">Also · </span>
                    {group.more.join(", ")}
                  </p>
                ) : null}
              </SpotlightCard>
            </StaggerItem>
          );
        })}
      </StaggerList>

      {/* In progress: kept apart so the list above only claims skills already used on delivered work. */}
      <Reveal className="mt-4">
        <section
          aria-labelledby="skills-learning"
          className="rounded-2xl border border-dashed border-white/12 bg-white/[0.015] p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 id="skills-learning" className="flex items-center gap-3 text-lg font-semibold tracking-tight">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-mist-500" />
              {learningSkills.title}
            </h3>{" "}
            {learningSkills.proof ? (
              <a
                href={learningSkills.proof.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-azure-300 transition-colors hover:text-snow"
              >
                {learningSkills.proof.label}
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] tracking-wider text-mist-400 uppercase">
                In progress
              </span>
            )}
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-mist-400">{learningSkills.note}</p>

          <StaggerList className="mt-5 flex flex-wrap gap-2" stagger={0.04} ariaLabel={learningSkills.title}>
            {learningSkills.core.map((skill) => (
              <SkillChip key={skill.name} skill={skill} />
            ))}
          </StaggerList>

          {learningSkills.more ? (
            <p className="pt-5 text-sm leading-relaxed text-mist-500">
              <span className="font-mono text-[11px] tracking-wider text-mist-400 uppercase">Also · </span>
              {learningSkills.more.join(", ")}
            </p>
          ) : null}
        </section>
      </Reveal>
    </Section>
  );
}
