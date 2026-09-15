import { CardSweep } from "@/components/contact/CardSweep";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmailButton } from "@/components/contact/CopyEmailButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { RevealBlock, RevealGroup, RevealHeading } from "@/components/ui/RevealGroup";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { StaggerItem, StaggerList } from "@/components/ui/Stagger";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import { DownloadIcon } from "@/components/ui/icons/DownloadIcon";
import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { LinkedinIcon } from "@/components/ui/icons/LinkedinIcon";
import { MailIcon } from "@/components/ui/icons/MailIcon";
import { profile } from "@/data/profile";

const socialLinks = [
  {
    label: "LinkedIn",
    detail: "Connect with me on LinkedIn",
    href: profile.linkedin,
    Icon: LinkedinIcon,
    colors: "from-[#0a66c2] to-[#084e96] shadow-[0_18px_40px_-20px_rgb(10_102_194/0.8)]",
  },
  {
    label: "GitHub",
    detail: "Explore my code on GitHub",
    href: profile.github,
    Icon: GithubIcon,
    colors: "from-[#4b5260] to-[#24292f] shadow-[0_18px_40px_-20px_rgb(0_0_0/0.8)]",
  },
];

/** Brand-colored channel card: white text on a gradient, lift + light sweep on hover. */
const channelCardClasses =
  "group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl bg-linear-to-br p-5 text-white transition-transform duration-300 hover:-translate-y-1";

const channelIconClasses =
  "relative grid size-11 shrink-0 place-items-center rounded-xl bg-white/15 transition-transform duration-300 group-hover:scale-105";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden py-24 sm:py-36">
      <SectionDivider />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute bottom-[-35%] left-1/2 size-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(91_130_255/0.16),transparent)]" />
      </div>
      <SectionNumeral value="05" className="top-10 right-2 sm:right-6 lg:right-[max(1.5rem,calc(50%-36rem))]" />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Final reveal: eyebrow → headline word by word → promise → call to action. */}
        <RevealGroup className="max-w-5xl" stagger={0.18}>
          <RevealBlock>
            <p className="flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-mist-400 uppercase">
              <span className="text-azure-400">05</span>
              <span aria-hidden="true" className="h-px w-10 bg-linear-to-r from-azure-400/80 to-transparent" />
              Contact
            </p>
          </RevealBlock>
          <RevealHeading
            id="contact-title"
            stagger={0.09}
            className="mt-6 text-[2.6rem] leading-[0.95] font-semibold tracking-[-0.045em] uppercase sm:text-7xl lg:text-8xl"
            text={[{ text: "Let's build something" }, { text: "that ships.", className: "text-gradient", whole: true }]}
          />
          <RevealBlock>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-mist-300 sm:text-xl">
              Open to full-time Software Engineering opportunities in Tunisia and internationally.
            </p>
          </RevealBlock>
          <RevealBlock className="mt-10">
            <MagneticButton href={`mailto:${profile.email}`} className="px-7 py-3 tracking-[0.08em] uppercase">
              Start a conversation
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
          </RevealBlock>
        </RevealGroup>

        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <h3 className="mb-5 text-xl font-semibold tracking-tight">Connect with me</h3>
            <StaggerList
              className="grid grid-cols-1 content-start gap-3 sm:grid-cols-2 lg:grid-cols-1"
              stagger={0.12}
              ariaLabel="Contact channels"
            >
              {socialLinks.map(({ label, detail, href, Icon, colors }) => (
                <StaggerItem key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={`${channelCardClasses} ${colors}`}>
                    <CardSweep />
                    <span className={channelIconClasses}>
                      <Icon className="size-5" />
                    </span>
                    <span className="relative min-w-0 flex-1">
                      <span className="block font-semibold">{label}</span>
                      <span className="block text-sm text-white/90">{detail}</span>
                    </span>
                    <ArrowRightIcon className="relative size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </StaggerItem>
              ))}

              <StaggerItem className="sm:col-span-2 lg:col-span-1">
                <div
                  className={`${channelCardClasses} from-azure-600 to-[#5a3fd1] shadow-[0_18px_40px_-20px_rgb(91_130_255/0.8)]`}
                >
                  <CardSweep />
                  <span className={channelIconClasses}>
                    <MailIcon className="size-5" />
                  </span>
                  <a href={`mailto:${profile.email}`} className="relative min-w-0 flex-1">
                    <span className="block font-semibold">Email</span>
                    <span className="block text-sm [overflow-wrap:anywhere] text-white/90">{profile.email}</span>
                  </a>
                  <span className="relative">
                    <CopyEmailButton email={profile.email} tone="onColor" />
                  </span>
                </div>
              </StaggerItem>

              <StaggerItem className="sm:col-span-2 lg:col-span-1">
                <a
                  href={profile.cvPath}
                  download
                  className={`${channelCardClasses} from-[#0f766e] to-[#0b4f4a] shadow-[0_18px_40px_-20px_rgb(15_118_110/0.8)]`}
                >
                  <CardSweep />
                  <span className={channelIconClasses}>
                    <DownloadIcon className="size-5" />
                  </span>
                  <span className="relative min-w-0 flex-1">
                    <span className="block font-semibold">Resume</span>
                    <span className="block text-sm text-white/90">Download my CV (PDF)</span>
                  </span>
                  <ArrowRightIcon className="relative size-4 shrink-0 rotate-90 transition-transform duration-300 group-hover:translate-y-1" />
                </a>
              </StaggerItem>
            </StaggerList>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
