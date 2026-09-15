import type { CSSProperties } from "react";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { HeroPointerProvider } from "@/components/hero/HeroPointer";
import { HeroReveal } from "@/components/hero/HeroReveal";
import { Portrait } from "@/components/hero/Portrait";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import { DownloadIcon } from "@/components/ui/icons/DownloadIcon";
import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { LinkedinIcon } from "@/components/ui/icons/LinkedinIcon";
import { MailIcon } from "@/components/ui/icons/MailIcon";
import { profile } from "@/data/profile";

const handleFrom = (url: string) => new URL(url).pathname.replace(/^\/|\/$/g, "");

const secondaryLinks = [
  { label: "LinkedIn", hint: handleFrom(profile.linkedin), href: profile.linkedin, Icon: LinkedinIcon, external: true },
  { label: "GitHub", hint: `@${handleFrom(profile.github)}`, href: profile.github, Icon: GithubIcon, external: true },
  { label: "Email", hint: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
];

/*
 * Intro choreography (seconds, CSS only, ~1s): navbar + background 0 → availability 0.1 → accent rule 0.3 →
 * role 0.25 → description 0.35 → CTAs 0.5 → links 0.6 → portrait 0.7 → terminal 0.85 (its deploy run starts ~1.15).
 * The name is static; role and description (the mobile LCP) are instant below lg and never start transparent.
 */
export function Hero() {
  return (
    <HeroPointerProvider>
      <section
        id="top"
        aria-labelledby="hero-title"
        className="relative isolate flex items-center overflow-hidden pt-28 pb-20 sm:pt-36 lg:min-h-[min(100svh,980px)] lg:pb-24"
      >
        <HeroBackground />

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
          <div className="min-w-0">
            <HeroReveal delay={0.1} y={10}>
              <p className="inline-flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.03] py-1.5 pr-4 pl-2">
                <span aria-hidden="true" className="relative flex size-5 shrink-0 items-center justify-center rounded-full bg-ok-400/10">
                  <span className="absolute size-2 animate-ping rounded-full bg-ok-400/50 [animation-iteration-count:3] motion-reduce:hidden" />
                  <span className="relative size-2 rounded-full bg-ok-400" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-mist-200 uppercase sm:text-[11px]">
                  {profile.availability}
                  <span className="hidden text-mist-500 sm:inline"> · {profile.workRegions}</span>
                </span>
              </p>
            </HeroReveal>

            {/* The name is static on purpose: it is the LCP and the first thing a recruiter must read. */}
            <h1
              id="hero-title"
              tabIndex={-1}
              className="mt-8 outline-none text-[2.55rem] leading-[0.95] font-semibold tracking-[-0.045em] uppercase sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]"
            >
              <span className="block">{profile.firstName}</span>{" "}
              <span className="text-gradient block pb-1">Ben Hassine</span>
            </h1>
            <span
              aria-hidden="true"
              className="hero-rule mt-5 block h-px w-24 bg-linear-to-r from-azure-400 to-transparent"
              style={{ "--delay": "0.3s" } as CSSProperties}
            />

            {/* Role and description are the LCP on mobile: shown instantly there, gentle rise on large screens. */}
            <HeroReveal delay={0.25} y={10} fade={false} largeScreensOnly>
              <p className="mt-7 text-2xl font-medium tracking-tight text-snow sm:text-3xl">{profile.role}</p>
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm tracking-[0.08em] text-mist-300 uppercase sm:text-base">
                {profile.specialties.map((specialty, index) => (
                  <span key={specialty} className="inline-flex items-center gap-3">
                    {index > 0 ? (
                      <>
                        <span aria-hidden="true" className="size-1 rounded-full bg-azure-400" />
                        <span className="sr-only">{" · "}</span>
                      </>
                    ) : null}
                    {specialty}
                  </span>
                ))}
              </p>
            </HeroReveal>

            <HeroReveal delay={0.35} y={10} fade={false} largeScreensOnly>
              <p className="mt-7 max-w-[34rem] text-base leading-relaxed text-mist-400 sm:text-lg">{profile.headline}</p>
            </HeroReveal>

            <HeroReveal delay={0.5} y={12}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="#projects" className="uppercase tracking-[0.08em]">
                  View My Work
                  <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </ButtonLink>
                <ButtonLink href={profile.cvPath} variant="secondary" download className="uppercase tracking-[0.08em]">
                  <DownloadIcon className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  Download CV
                </ButtonLink>
              </div>
            </HeroReveal>

            <HeroReveal delay={0.6} y={8}>
              <ul className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3" aria-label="Contact links">
                {secondaryLinks.map(({ label, hint, href, Icon, external }) => (
                  <li key={label} className="relative">
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group peer inline-flex min-h-11 items-center gap-2 text-sm text-mist-400 transition-colors duration-200 hover:text-snow"
                    >
                      <Icon className="size-4 transition-transform duration-200 group-hover:scale-[1.08] group-hover:text-azure-300" />
                      <span className="link-underline">{label}</span>
                      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                    </a>
                    {/* Hover hint drawn by CSS from data-decor, so it does not repeat in the page text. */}
                    <span
                      aria-hidden="true"
                      data-decor={hint}
                      className="pointer-events-none absolute bottom-full left-0 mb-1 hidden translate-y-1 rounded-md border border-white/10 bg-ink-800 px-2 py-1 font-mono text-[11px] whitespace-nowrap text-mist-200 opacity-0 shadow-[0_10px_30px_-10px_rgb(0_0_0/0.8)] transition-[opacity,transform] duration-200 peer-hover:translate-y-0 peer-hover:opacity-100 peer-focus-visible:translate-y-0 peer-focus-visible:opacity-100 pointer-fine:block"
                    />
                  </li>
                ))}
              </ul>
            </HeroReveal>
          </div>

          <div className="min-w-0 lg:pl-4">
            <Portrait />
          </div>
        </div>
      </section>
    </HeroPointerProvider>
  );
}
