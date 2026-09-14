import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHeading
        id="experience-title"
        eyebrow="02 · Experience"
        title="Where I've shipped"
        description="Three internships, from a first end-to-end application to an AI-assisted, fully industrialized system for the aerospace industry."
      />

      <ol className="relative space-y-12 border-l border-night-600 pl-6 sm:ml-2 sm:pl-10">
        {experience.map((item, index) => (
          <li key={`${item.company}-${item.period}`} className="relative">
            <span
              aria-hidden="true"
              className={
                index === 0
                  ? "absolute top-1.5 -left-[31px] size-3.5 rounded-full border-2 border-mint-400 bg-night-900 ring-4 ring-mint-400/15 sm:-left-[47px]"
                  : "absolute top-1.5 -left-[31px] size-3.5 rounded-full border-2 border-night-600 bg-night-900 sm:-left-[47px]"
              }
            />
            <Reveal>
              <article className="rounded-2xl border border-night-700 bg-night-850/70 p-5 sm:p-7">
                <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-fog-50 sm:text-xl">{item.role}</h3>
                    <p className="mt-1 text-fog-200">
                      <span className="font-medium text-mint-400">{item.company}</span>
                      <span className="text-fog-500"> · {item.location}</span>
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-sm text-fog-400">{item.period}</p>
                </header>

                <ul className="mt-5 space-y-3">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-fog-200 sm:text-base">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-mint-400/70" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
