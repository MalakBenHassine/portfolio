import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { DrawLine } from "@/components/ui/DrawLine";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContent, StaggerList } from "@/components/ui/Stagger";
import { stats } from "@/data/stats";

export function Achievements() {
  return (
    <Section id="achievements" labelledBy="achievements-title">
      <SectionHeading id="achievements-title" index="04" eyebrow="Achievements" title="By the numbers." />

      <StaggerList
        stagger={0.15}
        className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/6 bg-white/6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <li key={stat.label} className="group bg-ink-950 transition-colors duration-300 hover:bg-ink-900">
            <StaggerContent className="flex h-full flex-col p-7 sm:p-9">
              {/* One continuous line runs through the cells, drawn cell by cell as the numbers arrive. */}
              <span aria-hidden="true" className="-mx-7 mb-8 flex items-center sm:-mx-9">
                <DrawLine className="block h-px w-7 bg-azure-400/40 sm:w-9" delay={0.05} duration={0.3} />
                <span className="size-2 shrink-0 rounded-full bg-azure-400 shadow-[0_0_0_4px_rgb(91_130_255/0.15),0_0_14px_rgb(91_130_255/0.7)] transition-transform duration-300 group-hover:scale-125" />
                <DrawLine className="block h-px flex-1 bg-linear-to-r from-azure-400/70 to-azure-400/20" delay={0.25} />
              </span>
              <p className="text-6xl font-semibold tracking-[-0.05em] transition-transform duration-500 group-hover:-translate-y-1 sm:text-7xl">
                <span className="text-gradient">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} pad={stat.pad} />
                </span>
              </p>
              <p className="mt-6 font-mono text-xs tracking-[0.18em] text-snow uppercase">{stat.label}</p>
              {stat.detail ? <p className="mt-2 text-sm text-mist-400">{stat.detail}</p> : null}
            </StaggerContent>
          </li>
        ))}
      </StaggerList>
    </Section>
  );
}
