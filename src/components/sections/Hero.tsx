import { PipelineAnimation } from "@/components/hero/PipelineAnimation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import { DownloadIcon } from "@/components/ui/icons/DownloadIcon";
import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { LinkedinIcon } from "@/components/ui/icons/LinkedinIcon";
import { MailIcon } from "@/components/ui/icons/MailIcon";
import { profile } from "@/data/profile";

const socialLinks = [
  { label: "GitHub profile (opens in a new tab)", href: profile.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn profile (opens in a new tab)", href: profile.linkedin, Icon: LinkedinIcon, external: true },
  { label: `Send an email to ${profile.email}`, href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
];

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* Decorative background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-[480px] w-[900px] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(52_211_153/0.14),transparent)]" />
        <div className="absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(99_102_241/0.18),transparent)]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div className="min-w-0">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-night-600 bg-night-800/70 px-3 py-1.5 text-xs text-fog-200 sm:text-sm">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint-400 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-mint-400" />
              </span>
              {profile.availability} · {profile.workRegions}
            </p>
          </Reveal>

          <h1
            id="hero-title"
            className="mt-6 text-4xl leading-[1.05] font-bold tracking-tight text-fog-50 sm:text-6xl"
          >
            {profile.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-mint-400 sm:text-xl">{profile.title}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fog-200 sm:text-xl">
            {profile.tagline}
          </p>

          <p className="mt-6 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-mint-400/25 bg-mint-400/5 px-4 py-2.5 text-sm text-fog-200">
            <span className="font-mono font-semibold text-fog-50">3–5 days</span>
            <ArrowRightIcon className="size-4 text-mint-400" />
            <span className="font-mono font-semibold text-mint-400">&lt; 10 minutes</span>
            <span className="text-fog-400">on a certified aerospace workflow</span>
          </p>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#projects">
                View Projects
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href={profile.cvPath} variant="secondary" download>
                <DownloadIcon className="size-4" />
                Download CV
              </ButtonLink>
            </div>

            <ul className="mt-8 flex items-center gap-2" aria-label="Social links">
              {socialLinks.map(({ label, href, Icon, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    aria-label={label}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="grid size-11 place-items-center rounded-xl border border-night-700 bg-night-850/70 text-fog-400 transition-colors hover:border-mint-400/50 hover:text-mint-400"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="min-w-0">
          <PipelineAnimation />
        </Reveal>
      </div>
    </section>
  );
}
