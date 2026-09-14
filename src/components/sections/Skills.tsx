import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StaggerItem, StaggerList } from "@/components/ui/Stagger";
import { TechIcon } from "@/components/ui/TechIcon";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/cn";

export function Skills() {
  const hasOddCount = skillGroups.length % 2 === 1;

  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        index="05"
        eyebrow="Skills"
        title="The toolbox behind the work."
        description="Organized the way I use it: from the language and the backend, to the AI layer, the pipeline and the quality checks that guard production."
      />

      <StaggerList className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {skillGroups.map((group, index) => {
          const isLast = index === skillGroups.length - 1;
          return (
            <StaggerItem
              key={group.name}
              className={cn(group.wide && "lg:col-span-2", isLast && hasOddCount && "md:col-span-2 lg:col-span-2")}
            >
              <SpotlightCard as="article" labelledBy={`skills-${index}`} className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 id={`skills-${index}`} className="text-lg font-semibold tracking-tight">
                    {group.name}
                  </h3>
                  <span className="font-mono text-xs text-mist-500">
                    {String(group.core.length + (group.more?.length ?? 0)).padStart(2, "0")}
                  </span>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.core.map((skill) => (
                    <li
                      key={skill}
                      className="group inline-flex items-center gap-2.5 rounded-xl border border-white/6 bg-white/[0.02] px-3 py-2 text-sm text-mist-200 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-white/14 hover:bg-white/[0.04]"
                    >
                      <TechIcon tech={skill} className="size-4 text-mist-400" />
                      {skill}
                    </li>
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
