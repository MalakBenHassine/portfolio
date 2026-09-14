import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GraduationIcon } from "@/components/ui/icons/GraduationIcon";
import { MapPinIcon } from "@/components/ui/icons/MapPinIcon";
import { education, focusAreas, profile } from "@/data/profile";

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeading id="about-title" eyebrow="01 · About" title="From code to production" />

      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-fog-200">
            {profile.about.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? "text-xl text-fog-50" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {focusAreas.map((area, index) => (
              <li
                key={area.title}
                className="rounded-xl border border-night-700 bg-night-850/70 p-4"
              >
                <span className="font-mono text-xs text-mint-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-semibold text-fog-50">{area.title}</p>
                <p className="mt-1 text-sm text-fog-400">{area.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <aside
            aria-label="Profile summary"
            className="rounded-2xl border border-night-700 bg-night-850/70 p-6"
          >
            <div className="flex items-center gap-4">
              {profile.photo ? (
                <Image
                  src={profile.photo.src}
                  alt={profile.photo.alt}
                  width={64}
                  height={64}
                  className="size-16 rounded-full object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="grid size-16 place-items-center rounded-full border border-mint-400/40 bg-mint-400/10 font-mono text-lg font-bold text-mint-300"
                >
                  MB
                </span>
              )}
              <div>
                <p className="font-semibold text-fog-50">{profile.name}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-fog-400">
                  <MapPinIcon className="size-4" />
                  {profile.location}
                </p>
              </div>
            </div>

            <h3 className="mt-8 flex items-center gap-2 text-sm font-semibold tracking-wider text-fog-400 uppercase">
              <GraduationIcon className="size-5 text-mint-400" />
              Education
            </h3>
            <ul className="mt-4 space-y-4">
              {education.map((item) => (
                <li key={item.school} className="border-l-2 border-night-600 pl-4">
                  <p className="font-semibold text-fog-50">{item.school}</p>
                  <p className="text-sm text-fog-200">{item.degree}</p>
                  <p className="mt-0.5 font-mono text-xs text-fog-500">{item.period}</p>
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
