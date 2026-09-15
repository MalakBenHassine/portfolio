import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { LinkedinIcon } from "@/components/ui/icons/LinkedinIcon";
import { MailIcon } from "@/components/ui/icons/MailIcon";
import { profile } from "@/data/profile";

const footerLinks = [
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedinIcon, external: true },
  { label: "GitHub", href: profile.github, Icon: GithubIcon, external: true },
  { label: "Email", href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-snow uppercase">{profile.name}</p>
          <p className="mt-4 text-lg font-medium text-snow">{profile.role}</p>
          <p className="mt-1 text-sm text-mist-400">Full-Stack · AI · DevOps</p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          {footerLinks.map(({ label, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-2 text-mist-400 transition-colors hover:text-snow"
              >
                <Icon className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span className="link-underline">{label}</span>
                {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between border-t border-white/6 px-5 py-6 font-mono text-xs text-mist-500 sm:px-8">
        <p>© {year}</p>
        <a href="#top" className="link-underline transition-colors hover:text-snow">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
