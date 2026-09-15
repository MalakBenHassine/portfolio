import { DeliveryFlow } from "@/components/about/DeliveryFlow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StaggerItem, StaggerList } from "@/components/ui/Stagger";
import { DownloadIcon } from "@/components/ui/icons/DownloadIcon";
import { GraduationIcon } from "@/components/ui/icons/GraduationIcon";
import { Icon } from "@/components/ui/icons/Icon";
import { deliveryFlow, education, focusAreas, profile } from "@/data/profile";

export function About() {
  const [lead, ...paragraphs] = profile.about;

  return (
    <Section id="about" labelledBy="about-title" divider={false} numeral="01">
      <SectionHeading
        id="about-title"
        index="01"
        eyebrow="About"
        title={[
          { text: "From code" },
          { text: "to", className: "text-mist-500" },
          { text: "production.", className: "text-gradient" },
        ]}
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="text-xl leading-relaxed text-snow sm:text-2xl sm:leading-relaxed">{lead}</p>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-mist-400 sm:text-lg">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <div className="flex flex-col gap-6 border-t border-white/6 pt-8 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.18em] text-mist-500 uppercase">
                  <GraduationIcon className="size-4 text-azure-400" />
                  Education
                </h3>
                <ul className="mt-4 space-y-3">
                  {education.map((item) => (
                    <li key={item.school} className="text-sm">
                      <span className="font-medium text-snow">{item.school}</span>
                      <span className="text-mist-400"> — {item.degree}</span>
                      <span className="ml-2 font-mono text-xs text-mist-500">{item.period}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={profile.cvPath}
                download
                className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/10 px-4 py-2 text-sm text-mist-200 transition-colors hover:border-azure-400/50 hover:text-snow"
              >
                <DownloadIcon className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                Full CV
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={30}>
          <SpotlightCard className="p-6 sm:p-8">
            <p className="font-mono text-[11px] tracking-[0.2em] text-mist-500 uppercase">How I deliver</p>
            <div className="mt-5">
              <DeliveryFlow steps={deliveryFlow} />
            </div>
          </SpotlightCard>
        </Reveal>
      </div>

      <StaggerList className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" ariaLabel="Areas of expertise">
        {focusAreas.map((area, index) => (
          <StaggerItem key={area.title}>
            <SpotlightCard className="group h-full p-6 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl border border-white/8 bg-ink-850 text-mist-300 transition-[color,border-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:border-azure-400/40 group-hover:text-azure-300">
                  <Icon name={area.icon} className="size-5" />
                </span>
                <span className="font-mono text-xs text-mist-500">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-400">{area.items.join(" · ")}</p>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </StaggerList>
    </Section>
  );
}
