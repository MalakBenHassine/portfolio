import { TimelineRail } from "@/components/experience/TimelineRail";
import { MetricText } from "@/components/ui/MetricText";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TechBadge } from "@/components/ui/TechBadge";
import { experience } from "@/data/experience";
import { cn } from "@/lib/cn";

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHeading
        id="experience-title"
        index="03"
        eyebrow="Experience"
        title="Where I've shipped."
        description="Three internships — from a first end-to-end application to an AI-assisted, fully industrialized system for safety-critical aerospace software."
      />

      <TimelineRail>
        <ol className="space-y-14">
          {experience.map((item) => {
            const headingId = `experience-${item.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
            return (
              <li key={`${item.company}-${item.period}`} className="relative pl-9 md:grid md:grid-cols-[190px_minmax(0,1fr)] md:gap-[50px] md:pl-0">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border bg-ink-950 md:left-[208px]",
                    item.featured ? "border-azure-400 shadow-[0_0_0_5px_rgb(91_130_255/0.15)]" : "border-white/20",
                  )}
                >
                  {item.featured ? <span className="size-1.5 rounded-full bg-azure-300" /> : null}
                </span>

                <Reveal className="mb-4 md:mb-0 md:pt-0.5 md:text-right" y={12}>
                  <p className="font-mono text-sm text-mist-300">{item.period}</p>
                  <p className="mt-1 text-sm text-mist-500">{item.location}</p>
                  {item.featured ? (
                    <span className="mt-3 inline-flex rounded-full border border-azure-400/30 bg-azure-500/10 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-azure-300 uppercase">
                      Latest
                    </span>
                  ) : null}
                </Reveal>

                <Reveal delay={0.05}>
                  <SpotlightCard
                    as="article"
                    labelledBy={headingId}
                    className={cn("group overflow-hidden p-6 sm:p-8", item.featured && "border-azure-400/15")}
                  >
                    {item.featured ? (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-azure-300/60 to-transparent"
                      />
                    ) : null}

                    <header>
                      <h3 id={headingId} className={cn("font-semibold tracking-tight", item.featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl")}>
                        {item.role}
                      </h3>
                      <p className="mt-1.5 text-base font-medium text-azure-300">{item.company}</p>
                      {item.context ? (
                        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Context">
                          {item.context.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-mist-300"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </header>

                    <ul className="mt-6 space-y-3">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-mist-400 sm:text-[15px]">
                          <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-azure-400/70" />
                          <span>
                            <MetricText text={highlight} />
                          </span>
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-7 flex flex-wrap gap-2 border-t border-white/6 pt-6" aria-label={`Technologies used at ${item.company}`}>
                      {item.tech.map((tech, index) => (
                        <TechBadge key={tech} label={tech} index={index} />
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </TimelineRail>
    </Section>
  );
}
