import { CodeWindow } from "@/components/ai/CodeWindow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StaggerItem, StaggerList } from "@/components/ui/Stagger";
import { SparklesIcon } from "@/components/ui/icons/SparklesIcon";
import { aiPrinciples, aiUseCases, groundedGenerationFlow, groundedGenerationSnippet } from "@/data/appliedAi";

export function AppliedAI() {
  return (
    <Section id="applied-ai" labelledBy="applied-ai-title" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-[-10%] -z-10 size-[800px] rounded-full bg-[radial-gradient(closest-side,rgb(160_143_255/0.1),transparent)]"
      />

      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            id="applied-ai-title"
            index="04"
            eyebrow="Applied AI"
            className="mb-10 sm:mb-12"
            title={[{ text: "AI," }, { text: "but practical.", className: "text-gradient", whole: true }]}
            description="I use AI to solve engineering problems — running models locally, grounding them in real data, and wiring them into production workflows. Not prompts for the sake of it."
          />

          <StaggerList className="flex flex-wrap gap-2" stagger={0.05} ariaLabel="AI capabilities">
            {aiPrinciples.map((principle) => (
              <StaggerItem
                key={principle}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 font-mono text-[11px] tracking-wide text-mist-200 uppercase"
              >
                <SparklesIcon className="size-3 text-iris-400" />
                {principle}
              </StaggerItem>
            ))}
          </StaggerList>
        </div>

        <Reveal y={30} scale={0.98} className="lg:mt-24">
          <CodeWindow
            filename="grounded_generation.py"
            lines={groundedGenerationSnippet}
            flow={groundedGenerationFlow}
            result="Only grounded content reaches the SDDD"
            caption="Illustrative pseudocode of the grounding approach used in AnalyseImpacte."
          />
        </Reveal>
      </div>

      <StaggerList className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3" stagger={0.08} ariaLabel="AI use cases">
        {aiUseCases.map((useCase) => (
          <StaggerItem key={useCase.title}>
            <SpotlightCard as="article" className="group flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1">
              <p className="font-mono text-[10px] tracking-[0.18em] text-iris-400 uppercase">{useCase.context}</p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{useCase.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-400">{useCase.detail}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label={`${useCase.title} stack`}>
                {useCase.stack.map((item) => (
                  <li key={item} className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-mist-300">
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </StaggerList>
    </Section>
  );
}
