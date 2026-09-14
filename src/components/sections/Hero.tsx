import { HeroBackground } from "@/components/hero/HeroBackground";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import { DownloadIcon } from "@/components/ui/icons/DownloadIcon";
import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { LinkedinIcon } from "@/components/ui/icons/LinkedinIcon";
import { MailIcon } from "@/components/ui/icons/MailIcon";
import { profile } from "@/data/profile";

const socialLinks = [
  { label: "LinkedIn profile (opens in a new tab)", href: profile.linkedin, Icon: LinkedinIcon, external: true },
  { label: "GitHub profile (opens in a new tab)", href: profile.github, Icon: GithubIcon, external: true },
  { label: `Send an email to ${profile.email}`, href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
];

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex items-center overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24 lg:min-h-[min(100svh,960px)] lg:pt-36"
    >
      <HeroBackground />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
        <div className="min-w-0">
          <Reveal y={10}>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.03] py-1.5 pr-4 pl-2 text-xs text-mist-300 sm:text-sm">
              <span aria-hidden="true" className="relative flex size-5 shrink-0 items-center justify-center rounded-full bg-ok-400/10">
                <span className="absolute size-2 animate-ping rounded-full bg-ok-400/60 motion-reduce:animate-none" />
                <span className="relative size-2 rounded-full bg-ok-400" />
              </span>
              <span>
                {profile.availability}
                <span className="hidden text-mist-400 sm:inline">
                  <span aria-hidden="true" className="mx-2 text-mist-500">
                    ·
                  </span>
                  {profile.workRegions}
                </span>
              </span>
            </p>
          </Reveal>

          <h1
            id="hero-title"
            className="mt-8 text-[2.9rem] leading-[0.98] font-semibold tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]"
          >
            <span className="block">{profile.firstName}</span>{" "}
            <span className="text-gradient block pb-1">Ben Hassine</span>
          </h1>

          <p className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-lg sm:text-xl">
            <span className="font-medium text-snow">{profile.role}</span>
            <span className="text-mist-500">—</span>
            {profile.specialties.map((specialty, index) => (
              <span key={specialty} className="inline-flex items-center gap-2.5 text-mist-300">
                {index > 0 ? (
                  <span aria-hidden="true" className="size-1 rounded-full bg-azure-400" />
                ) : null}
                {specialty}
              </span>
            ))}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist-400 sm:text-lg">{profile.headline}</p>

          <Reveal delay={0.1} y={14}>
            <p className="mt-8 inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-white/6 bg-white/[0.02] px-4 py-2.5 text-sm">
              <span className="font-mono text-[11px] tracking-wider text-mist-500 uppercase">Latest impact</span>
              <span className="font-mono text-mist-300 line-through decoration-mist-500">3–5 days</span>
              <ArrowRightIcon className="size-4 text-azure-400" />
              <span className="font-mono font-semibold text-snow">&lt; 10 minutes</span>
              <span className="text-mist-500">at Capgemini Engineering</span>
            </p>
          </Reveal>

          <Reveal delay={0.18} y={14}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton href="#projects">
                View My Work
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton href={profile.cvPath} variant="secondary" download>
                <DownloadIcon className="size-4" />
                Download CV
              </MagneticButton>

              <span aria-hidden="true" className="mx-2 hidden h-6 w-px bg-white/10 sm:block" />

              <ul className="flex items-center gap-1 pt-2 sm:pt-0" aria-label="Social links">
                {socialLinks.map(({ label, href, Icon, external }) => (
                  <li key={href}>
                    <a
                      href={href}
                      aria-label={label}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="grid size-11 place-items-center rounded-full text-mist-400 transition-[color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-white/[0.05] hover:text-snow"
                    >
                      <Icon className="size-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.25} y={30} scale={0.97} className="min-w-0">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
