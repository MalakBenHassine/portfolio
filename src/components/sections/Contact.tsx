import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmailButton } from "@/components/contact/CopyEmailButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { StaggerItem, StaggerList } from "@/components/ui/Stagger";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import { DownloadIcon } from "@/components/ui/icons/DownloadIcon";
import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { LinkedinIcon } from "@/components/ui/icons/LinkedinIcon";
import { MailIcon } from "@/components/ui/icons/MailIcon";
import { profile } from "@/data/profile";

const socialLinks = [
  { label: "LinkedIn", value: "in/malakbenhassine", href: profile.linkedin, Icon: LinkedinIcon },
  { label: "GitHub", value: "MalakBenHassine", href: profile.github, Icon: GithubIcon },
];

const linkCardClasses =
  "group flex h-full items-center gap-4 rounded-2xl border border-white/6 bg-white/[0.02] p-4 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/12 hover:bg-white/[0.04]";

const iconClasses =
  "grid size-11 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-mist-200 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:text-azure-300";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden py-24 sm:py-36">
      <div aria-hidden="true" className="divider-x absolute inset-x-0 top-0" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute bottom-[-35%] left-1/2 size-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(91_130_255/0.16),transparent)]" />
      </div>
      <SectionNumeral value="05" className="top-10 right-2 sm:right-6 lg:right-[max(1.5rem,calc(50%-36rem))]" />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-5xl">
          <p className="flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-mist-400 uppercase">
            <span className="text-azure-400">05</span>
            <span aria-hidden="true" className="h-px w-10 bg-linear-to-r from-azure-400/80 to-transparent" />
            Contact
          </p>
          <h2
            id="contact-title"
            className="mt-6 text-[2.6rem] leading-[0.95] font-semibold tracking-[-0.045em] uppercase sm:text-7xl lg:text-8xl"
          >
            Let&apos;s build something <span className="text-gradient">that ships.</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-mist-300 sm:text-xl">
            Open to full-time Software Engineering opportunities in Tunisia and internationally.
          </p>
          <div className="mt-10">
            <MagneticButton href={`mailto:${profile.email}`} className="px-7 py-3 tracking-[0.08em] uppercase">
              Start a conversation
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <StaggerList className="grid grid-cols-1 content-start gap-3 sm:grid-cols-2 lg:grid-cols-1" ariaLabel="Contact channels">
            {socialLinks.map(({ label, value, href, Icon }) => (
              <StaggerItem key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={linkCardClasses}>
                  <span className={iconClasses}>
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] tracking-[0.18em] text-mist-500 uppercase">{label}</span>
                    <span className="block truncate text-snow">{value}</span>
                  </span>
                  <ArrowRightIcon className="size-4 shrink-0 text-mist-500 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-snow" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </StaggerItem>
            ))}

            <StaggerItem className="sm:col-span-2 lg:col-span-1">
              <div className={linkCardClasses}>
                <span className={iconClasses}>
                  <MailIcon className="size-5" />
                </span>
                <a href={`mailto:${profile.email}`} className="min-w-0 flex-1">
                  <span className="block font-mono text-[10px] tracking-[0.18em] text-mist-500 uppercase">Email</span>
                  <span className="block text-[15px] [overflow-wrap:anywhere] text-snow sm:text-base">{profile.email}</span>
                </a>
                <CopyEmailButton email={profile.email} />
              </div>
            </StaggerItem>

            <StaggerItem className="sm:col-span-2 lg:col-span-1">
              <a href={profile.cvPath} download className={linkCardClasses}>
                <span className={iconClasses}>
                  <DownloadIcon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[10px] tracking-[0.18em] text-mist-500 uppercase">Resume</span>
                  <span className="block truncate text-snow">Download CV (PDF)</span>
                </span>
                <ArrowRightIcon className="size-4 shrink-0 rotate-90 text-mist-500 transition-[color] duration-300 group-hover:text-snow" />
              </a>
            </StaggerItem>
          </StaggerList>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
