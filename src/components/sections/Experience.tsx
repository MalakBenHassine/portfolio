import { TimelineDot } from "@/components/experience/TimelineDot";
import { TimelineRail } from "@/components/experience/TimelineRail";
import { BeforeAfterMetric } from "@/components/ui/BeforeAfterMetric";
import { MetricText } from "@/components/ui/MetricText";
import { Reveal } from "@/components/ui/Reveal";
import { RevealBlock, RevealGroup, RevealHeading } from "@/components/ui/RevealGroup";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StaggerItem, StaggerList } from "@/components/ui/Stagger";
import { TechBadge } from "@/components/ui/TechBadge";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import { experience } from "@/data/experience";
import { cn } from "@/lib/cn";

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title" numeral="02">
      <SectionHeading
        id="experience-title"
        index="02"
        eyebrow="Experience"
        title="Where I've shipped."
        description="Three internships — from a first end-to-end application to an AI-assisted, fully industrialized system for safety-critical aerospace software."
      />

      <TimelineRail>
        <ol className="space-y-14">
          {experience.map((item) => {
            const headingId = `experience-${item.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
            return (
              <li
                key={`${item.company}-${item.period}`}
                className="relative pl-9 md:grid md:grid-cols-[190px_minmax(0,1fr)] md:gap-[50px] md:pl-0"
              >
                <TimelineDot featured={item.featured} className="top-1.5 left-0 md:left-[208px]" />

                <Reveal className="mb-4 md:mb-0 md:pt-0.5 md:text-right" y={12}>
                  <p className="font-mono text-sm text-mist-300">{item.period}</p>
                  <p className="mt-1 text-sm text-mist-500">{item.location}</p>
                  {item.featured ? (
                    <span className="mt-3 inline-flex rounded-full border border-azure-400/30 bg-azure-500/10 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-azure-300 uppercase">
                      Latest
                    </span>
                  ) : null}
                </Reveal>

                <Reveal delay={0.05} className="relative" y={item.featured ? 44 : 30} scale={item.featured ? 0.98 : 1}>
                  {item.featured ? (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(60%_60%_at_30%_20%,rgb(91_130_255/0.16),transparent_70%)]"
                    />
                  ) : null}
                  <SpotlightCard
                    as="article"
                    labelledBy={headingId}
                    className={cn(
                      "group overflow-hidden p-6 sm:p-8",
                      item.featured && "border-azure-400/20 shadow-[0_30px_100px_-40px_rgb(91_130_255/0.35)]",
                    )}
                  >
                    {item.featured ? (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-azure-300/70 to-transparent"
                      />
                    ) : null}

                    <header>
                      {item.featured ? (
                        // Strongest experience: company → role → project → domain → standard, one after another.
                        <RevealGroup stagger={0.15} delay={0.2}>
                          <RevealBlock>
                            <p className="mb-3 font-mono text-[11px] tracking-[0.2em] text-azure-300 uppercase">{item.company}</p>
                          </RevealBlock>
                          <RevealHeading
                            as="h3"
                            id={headingId}
                            text={item.role}
                            stagger={0.05}
                            className="text-2xl font-semibold tracking-tight sm:text-3xl"
                          />
                        </RevealGroup>
                      ) : (
                        <>
                          <h3 id={headingId} className="text-lg font-semibold tracking-tight sm:text-xl">
                            {item.role}
                          </h3>
                          <p className="mt-1.5 text-base font-medium text-azure-300">{item.company}</p>
                        </>
                      )}
                      {item.context ? (
                        <StaggerList
                          className="mt-4 flex flex-wrap gap-2"
                          stagger={item.featured ? 0.15 : 0.06}
                          delay={item.featured ? 0.75 : 0}
                          ariaLabel="Context"
                        >
                          {item.context.map((tag, tagIndex) => (
                            <StaggerItem
                              key={tag}
                              className={cn(
                                "rounded-full border px-2.5 py-1 font-mono text-[11px]",
                                item.featured && tagIndex === 0
                                  ? "border-azure-400/40 bg-azure-500/10 text-azure-200"
                                  : "border-white/8 bg-white/[0.03] text-mist-300",
                              )}
                            >
                              {tag}
                            </StaggerItem>
                          ))}
                        </StaggerList>
                      ) : null}
                      {item.impact ? (
                        <div className="mt-5 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-xl border border-azure-400/20 bg-azure-500/[0.06] px-4 py-2.5">
                          <span className="font-mono text-[10px] tracking-[0.18em] text-azure-300 uppercase">Impact</span>{" "}
                          <span className="text-lg font-semibold tracking-tight text-snow sm:text-xl">
                            <BeforeAfterMetric before={item.impact.before} after={item.impact.after} afterClassName="text-gradient" />
                          </span>{" "}
                          <span className="text-sm text-mist-400">{item.impact.label}</span>
                        </div>
                      ) : null}
                    </header>

                    <StaggerList className="mt-6 space-y-3" stagger={0.06}>
                      {item.highlights.map((highlight) => (
                        <StaggerItem key={highlight} className="flex gap-3 text-sm leading-relaxed text-mist-400 sm:text-[15px]">
                          <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-azure-400/70" />
                          <span>
                            <MetricText text={highlight} />
                          </span>
                        </StaggerItem>
                      ))}
                    </StaggerList>

                    <StaggerList
                      className="mt-7 flex flex-wrap gap-2 border-t border-white/6 pt-6"
                      stagger={0.05}
                      ariaLabel={`Technologies used at ${item.company}`}
                    >
                      {item.tech.map((tech, index) => (
                        <StaggerItem key={tech}>
                          <TechBadge label={tech} index={index} as="span" />
                        </StaggerItem>
                      ))}
                    </StaggerList>

                    {item.caseStudy ? (
                      <a
                        href={item.caseStudy.href}
                        className="group/cta mt-6 inline-flex items-center gap-2 rounded-full border border-azure-400/30 bg-azure-500/10 px-4 py-2 text-sm font-medium text-azure-200 transition-colors hover:border-azure-400/60 hover:text-snow"
                      >
                        {item.caseStudy.label}
                        <ArrowRightIcon className="size-4 rotate-90 transition-transform duration-300 group-hover/cta:translate-y-0.5" />
                      </a>
                    ) : null}
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
