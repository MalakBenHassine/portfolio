import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { LinkedinIcon } from "@/components/ui/icons/LinkedinIcon";
import { MailIcon } from "@/components/ui/icons/MailIcon";
import { profile } from "@/data/profile";

const contactLinks = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: MailIcon,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "in/malakbenhassine",
    href: profile.linkedin,
    Icon: LinkedinIcon,
    external: true,
  },
  {
    label: "GitHub",
    value: "MalakBenHassine",
    href: profile.github,
    Icon: GithubIcon,
    external: true,
  },
];

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title">
      <SectionHeading
        id="contact-title"
        eyebrow="06 · Contact"
        title="Let's build something that ships"
        description="I'm looking for a full-time role in full-stack engineering, DevOps or applied AI — in Tunisia or internationally. The fastest way to reach me is by email."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        <Reveal>
          <ul className="space-y-3">
            {contactLinks.map(({ label, value, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-night-700 bg-night-850/70 p-4 transition-colors hover:border-mint-400/50"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-night-700/70 text-fog-200 transition-colors group-hover:text-mint-400">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium tracking-wider text-fog-500 uppercase">
                      {label}
                    </span>
                    <span className="block truncate text-fog-50">{value}</span>
                  </span>
                  {external ? <span className="sr-only">(opens in a new tab)</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
