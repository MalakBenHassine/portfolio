import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        eyebrow="04 · Skills"
        title="Toolbox"
        description="The languages, frameworks and tooling I use across the full delivery cycle — from the data model to production monitoring."
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, index) => (
          <li key={group.name}>
            <Reveal delay={(index % 4) * 0.06} className="h-full">
              <div className="h-full rounded-2xl border border-night-700 bg-night-850/70 p-5 transition-colors hover:border-night-600">
                <h3 className="flex items-center gap-2 font-semibold text-fog-50">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-mint-400" />
                  {group.name}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${group.name} skills`}>
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md bg-night-700/60 px-2.5 py-1 text-sm text-fog-200"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
