import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import { AwardIcon } from "@/components/ui/icons/AwardIcon";
import { certifications } from "@/data/certifications";

export function Certifications() {
  return (
    <Section id="certifications" labelledBy="certifications-title">
      <SectionHeading
        id="certifications-title"
        eyebrow="05 · Certifications"
        title="Certified"
      />

      <ul className="grid gap-4 md:grid-cols-2">
        {certifications.map((certification) => (
          <li key={certification.name}>
            <Reveal className="h-full">
              <article className="flex h-full items-start gap-5 rounded-2xl border border-night-700 bg-night-850/70 p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-mint-400/30 bg-mint-400/10 text-mint-400">
                  <AwardIcon className="size-6" />
                </span>
                <div>
                  <h3 className="font-semibold leading-snug text-fog-50">{certification.name}</h3>
                  <p className="mt-1 text-sm text-fog-400">
                    {certification.issuer} · <span className="font-mono">{certification.year}</span>
                  </p>
                  {certification.credentialUrl ? (
                    <a
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-mint-400 hover:text-mint-300"
                    >
                      Verify credential
                      <span className="sr-only">(opens in a new tab)</span>
                      <ArrowRightIcon className="size-4" />
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
