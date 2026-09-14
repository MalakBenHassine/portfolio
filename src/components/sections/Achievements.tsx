import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContent, StaggerList } from "@/components/ui/Stagger";
import { stats } from "@/data/stats";

export function Achievements() {
  return (
    <Section id="achievements" labelledBy="achievements-title">
      <SectionHeading id="achievements-title" index="07" eyebrow="Achievements" title="By the numbers." />

      <StaggerList className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/6 bg-white/6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <li key={stat.label} className="bg-ink-950">
            <StaggerContent className="flex h-full flex-col p-7 sm:p-9">
              <p className="text-6xl font-semibold tracking-[-0.05em] sm:text-7xl">
                <span className="text-gradient">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
              </p>
              <p className="mt-6 font-medium text-snow">{stat.label}</p>
              {stat.detail ? <p className="mt-1 text-sm text-mist-400">{stat.detail}</p> : null}
            </StaggerContent>
          </li>
        ))}
      </StaggerList>
    </Section>
  );
}
