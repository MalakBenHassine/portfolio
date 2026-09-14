import { SkillChip } from "@/components/skills/SkillChip";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StaggerItem, StaggerList } from "@/components/ui/Stagger";
import { skillGroups } from "@/data/skills";
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
        description="Organized the way I use it — from the language and the backend, to the AI layer, the pipeline and the quality checks that guard production. Hover a technology to see what I use it for."
      />

      <StaggerList className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {skillGroups.map((group, index) => {
          const isLast = index === skillGroups.length - 1;
          return (
            <StaggerItem
              key={group.name}
              className={cn(group.wide && "lg:col-span-2", isLast && hasOddCount && "md:col-span-2 lg:col-span-2")}
            >
              <SpotlightCard as="article" labelledBy={`skills-${index}`} className="group/card flex h-full flex-col p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 id={`skills-${index}`} className="flex items-center gap-3 text-lg font-semibold tracking-tight">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-azure-400 transition-transform duration-300 group-hover/card:scale-150"
                    />
                    {group.name}
                  </h3>
                  <span className="font-mono text-xs text-mist-500">
                    {String(group.core.length + (group.more?.length ?? 0)).padStart(2, "0")}
                  </span>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.core.map((skill) => (
                    <SkillChip key={skill.name} skill={skill} />
                  ))}
                </ul>

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
    </Section>
  );
}
