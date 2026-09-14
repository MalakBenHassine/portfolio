import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmailButton } from "@/components/contact/CopyEmailButton";
import { Reveal } from "@/components/ui/Reveal";
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
  "group flex items-center gap-4 rounded-2xl border border-white/6 bg-white/[0.02] p-4 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/12 hover:bg-white/[0.04]";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="divider-x absolute inset-x-0 top-0" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute bottom-[-30%] left-1/2 size-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(91_130_255/0.14),transparent)]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-mist-400 uppercase">
                <span className="text-azure-400">08</span>
                <span aria-hidden="true" className="h-px w-8 bg-linear-to-r from-azure-400/70 to-transparent" />
                Contact
              </p>
              <h2 id="contact-title" className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.04em] sm:text-6xl">
                Let&apos;s build something <span className="text-gradient">that ships.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-mist-400 sm:text-lg">
                I&apos;m open to full-time Software Engineering roles — full-stack, applied AI or DevOps — in Tunisia
                or internationally. Recruiters and engineering teams are welcome to reach out directly.
              </p>
            </Reveal>

            <StaggerList className="mt-10 space-y-3" ariaLabel="Contact channels">
              <StaggerItem>
                <div className={linkCardClasses}>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-mist-200 transition-colors group-hover:text-azure-300">
                    <MailIcon className="size-5" />
                  </span>
                  <a href={`mailto:${profile.email}`} className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] tracking-[0.18em] text-mist-500 uppercase">Email</span>
                    <span className="block text-[15px] [overflow-wrap:anywhere] text-snow sm:text-base">{profile.email}</span>
                  </a>
                  <CopyEmailButton email={profile.email} />
                </div>
              </StaggerItem>

              {socialLinks.map(({ label, value, href, Icon }) => (
                <StaggerItem key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={linkCardClasses}>
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-mist-200 transition-colors group-hover:text-azure-300">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] tracking-[0.18em] text-mist-500 uppercase">{label}</span>
                      <span className="block truncate text-snow">{value}</span>
                    </span>
                    <ArrowRightIcon className="size-4 text-mist-500 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-snow" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </StaggerItem>
              ))}

              <StaggerItem>
                <a href={profile.cvPath} download className={linkCardClasses}>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-mist-200 transition-colors group-hover:text-azure-300">
                    <DownloadIcon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] tracking-[0.18em] text-mist-500 uppercase">Resume</span>
                    <span className="block truncate text-snow">Download CV (PDF)</span>
                  </span>
                </a>
              </StaggerItem>
            </StaggerList>
          </div>

          <Reveal delay={0.1} className="lg:pt-24">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
