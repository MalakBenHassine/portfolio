import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StaggerItem, StaggerList } from "@/components/ui/Stagger";
import { DownloadIcon } from "@/components/ui/icons/DownloadIcon";
import { GraduationIcon } from "@/components/ui/icons/GraduationIcon";
import { Icon } from "@/components/ui/icons/Icon";
import { MapPinIcon } from "@/components/ui/icons/MapPinIcon";
import { education, focusAreas, profile } from "@/data/profile";

export function About() {
  const [lead, ...paragraphs] = profile.about;

  return (
    <Section id="about" labelledBy="about-title" divider={false}>
      <SectionHeading
        id="about-title"
        index="01"
        eyebrow="About"
        title={
          <>
            From code <span className="text-mist-500">to</span> production.
          </>
        }
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal>
          <p className="text-xl leading-relaxed text-snow sm:text-2xl sm:leading-relaxed">{lead}</p>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-mist-400 sm:text-lg">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <aside aria-label="Profile summary" className="surface rounded-2xl p-6">
            <div className="flex items-center gap-4">
              {profile.photo ? (
                <Image
                  src={profile.photo.src}
                  alt={profile.photo.alt}
                  width={64}
                  height={64}
                  className="size-16 rounded-2xl object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="relative grid size-16 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-ink-850 font-mono text-lg font-semibold text-snow"
                >
                  <span className="absolute inset-0 bg-linear-to-br from-azure-500/30 via-transparent to-iris-400/20" />
                  <span className="relative">MB</span>
                </span>
              )}
              <div className="min-w-0">
                <p className="font-semibold text-snow">{profile.name}</p>
                <p className="mt-0.5 text-sm text-mist-400">{profile.role}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-mist-500">
                  <MapPinIcon className="size-3.5" />
                  {profile.location}
                </p>
              </div>
            </div>

            <h3 className="mt-8 flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.18em] text-mist-500 uppercase">
              <GraduationIcon className="size-4 text-azure-400" />
              Education
            </h3>
            <ul className="mt-4 space-y-4">
              {education.map((item) => (
                <li key={item.school} className="border-l border-white/10 pl-4">
                  <p className="font-medium text-snow">{item.school}</p>
                  <p className="text-sm text-mist-400">{item.degree}</p>
                  <p className="mt-0.5 font-mono text-xs text-mist-500">{item.period}</p>
                </li>
              ))}
            </ul>

            <a
              href={profile.cvPath}
              download
              className="mt-8 flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm text-mist-200 transition-colors hover:border-azure-400/40 hover:text-snow"
            >
              Download full CV
              <DownloadIcon className="size-4" />
            </a>
          </aside>
        </Reveal>
      </div>

      <StaggerList className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" ariaLabel="Areas of expertise">
        {focusAreas.map((area, index) => (
          <StaggerItem key={area.title}>
            <SpotlightCard className="group h-full p-6 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl border border-white/8 bg-ink-850 text-mist-300 transition-colors duration-300 group-hover:border-azure-400/40 group-hover:text-azure-300">
                  <Icon name={area.icon} className="size-5" />
                </span>
                <span className="font-mono text-xs text-mist-500">0{index + 1}</span>
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
