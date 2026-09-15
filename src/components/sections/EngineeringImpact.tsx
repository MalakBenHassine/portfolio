import { BeforeAfterMetric } from "@/components/ui/BeforeAfterMetric";
import { RevealBlock, RevealGroup, RevealHeading } from "@/components/ui/RevealGroup";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StaggerItem, StaggerList } from "@/components/ui/Stagger";
import { TechBadge } from "@/components/ui/TechBadge";
import { Icon } from "@/components/ui/icons/Icon";
import { impactPillars, profile } from "@/data/profile";

function PillarMetric({ metric }: { metric: string }) {
  const [before, after] = metric.split("→").map((part) => part.trim());
  if (!after) return <>{metric}</>;
  return <BeforeAfterMetric before={before} after={after} />;
}

export function EngineeringImpact() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <SectionDivider />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(91_130_255/0.09),transparent)]"
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <RevealGroup className="max-w-4xl" stagger={0.14}>
          <RevealBlock>
            <p className="flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-mist-400 uppercase">
              <span className="text-azure-400">01</span>
              <span aria-hidden="true" className="h-px w-10 bg-linear-to-r from-azure-400/80 to-transparent" />
              Engineering impact
            </p>
          </RevealBlock>
          <RevealHeading
            id="impact-title"
            className="mt-6 text-4xl leading-[1.02] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl"
            stagger={0.12}
            text={[
              { text: "I don't just build features.", className: "text-mist-500", block: true },
              { text: "I build systems that ship.", className: "text-gradient pb-1", whole: true, block: true },
            ]}
          />
          <RevealBlock>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist-400 sm:text-lg">{profile.tagline}</p>
          </RevealBlock>
        </RevealGroup>

        <StaggerList
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
          ariaLabel="What I bring to a team"
        >
          {impactPillars.map((pillar, index) => (
            <StaggerItem key={pillar.title}>
              <SpotlightCard
                as="article"
                labelledBy={`impact-${index}`}
                className="group flex h-full flex-col p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgb(91_130_255/0.45)] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="relative grid size-10 place-items-center rounded-xl border border-white/8 bg-ink-850 text-azure-300 transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg] group-hover:border-azure-400/40 group-hover:shadow-[0_0_24px_-4px_rgb(91_130_255/0.55)]">
                    <Icon name={pillar.icon} className="size-5" />
                  </span>
                  <span className="font-mono text-[11px] text-mist-500 transition-colors duration-300 group-hover:text-azure-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 id={`impact-${index}`} className="mt-6 font-mono text-xs tracking-[0.2em] text-mist-400 uppercase">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-snow transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:text-azure-200">
                  <PillarMetric metric={pillar.metric} />
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mist-400">{pillar.proof}</p>
                <span
                  aria-hidden="true"
                  className="mt-6 block h-px origin-left scale-x-0 bg-linear-to-r from-azure-400/70 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-4" aria-label={`${pillar.title} technologies`}>
                  {pillar.tech.map((tech, techIndex) => (
                    <TechBadge key={tech} label={tech} index={techIndex} highlightOnGroupHover />
                  ))}
                </ul>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
