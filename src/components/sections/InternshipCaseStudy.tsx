import { ArchitectureGrid } from "@/components/case-study/ArchitectureGrid";
import { CaseStudyResults } from "@/components/case-study/CaseStudyResults";
import { CaseStudySubheading } from "@/components/case-study/CaseStudySubheading";
import { PipelineAnimation } from "@/components/case-study/PipelineAnimation";
import { WorkflowDiagram } from "@/components/case-study/WorkflowDiagram";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StaggerItem, StaggerList } from "@/components/ui/Stagger";
import { TechBadge } from "@/components/ui/TechBadge";
import { BoltIcon } from "@/components/ui/icons/BoltIcon";
import { SparklesIcon } from "@/components/ui/icons/SparklesIcon";
import { analyseImpacte } from "@/data/caseStudy";

const AI_STEP_INDEX = analyseImpacte.workflow.findIndex((step) => step.title === "Local AI");

/** In-depth look at the flagship internship deliverable, attached to the Experience section. */
export function InternshipCaseStudy() {
  const study = analyseImpacte;

  return (
    <Section id="case-study" labelledBy="case-study-title" className="overflow-hidden" divider={false}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 left-1/2 -z-10 size-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(91_130_255/0.09),transparent)]"
      />

      <SectionHeading
        id="case-study-title"
        index="02"
        eyebrow="Experience · Internship case study"
        title={<span className="text-gradient pb-1">{study.title}</span>}
        description={study.subtitle}
      />

      <Reveal y={30} scale={0.98}>
        <SpotlightCard as="article" labelledBy="case-study-title" className="overflow-hidden p-6 sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-azure-300/60 to-transparent"
          />

          <ul className="flex flex-wrap gap-2" aria-label="Project context">
            {study.context.map((tag) => (
              <li key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-mist-300">
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="flex flex-col">
              <div className="grid grid-cols-1 gap-8">
                <div>
                  <h3 className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-mist-500 uppercase">
                    <BoltIcon className="size-4 text-mist-400" />
                    The problem
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-mist-300 sm:text-lg">{study.problem}</p>
                </div>
                <div className="rounded-2xl border border-azure-400/15 bg-azure-500/[0.05] p-5 sm:p-6">
                  <h3 className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-azure-300 uppercase">
                    <SparklesIcon className="size-4" />
                    The solution
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-snow sm:text-lg">{study.solution}</p>
                </div>
              </div>

              <div className="mt-auto pt-10">
                <h3 className="font-mono text-[11px] tracking-[0.2em] text-mist-500 uppercase">Tech stack</h3>
                <StaggerList className="group mt-4 flex flex-wrap gap-2" stagger={0.05} ariaLabel="AnalyseImpacte tech stack">
                  {study.tech.map((tech, index) => (
                    <StaggerItem key={tech}>
                      <TechBadge label={tech} index={index} as="span" />
                    </StaggerItem>
                  ))}
                </StaggerList>
                <p className="mt-5 text-xs text-mist-500">{study.note}</p>
              </div>
            </div>

            <PipelineAnimation />
          </div>
        </SpotlightCard>
      </Reveal>

      <div className="mt-20">
        <CaseStudySubheading label="Workflow" title="From a code change to production." />
        <SpotlightCard className="p-6 sm:p-10">
          <WorkflowDiagram steps={study.workflow} highlightIndex={AI_STEP_INDEX} />
        </SpotlightCard>
      </div>

      <div className="mt-20">
        <CaseStudySubheading label="Results" title="Measured, not claimed." />
        <CaseStudyResults results={study.results} />
      </div>

      <div className="mt-20">
        <CaseStudySubheading label="Architecture" title="A complete system, not just an interface." />
        <ArchitectureGrid layers={study.architecture} />
      </div>
    </Section>
  );
}
