import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { LinkedinIcon } from "@/components/ui/icons/LinkedinIcon";
import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-night-700/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-fog-500 sm:flex-row sm:px-8">
        <p>
          © {year} {profile.name}. Built with Next.js, Tailwind CSS & Framer Motion.
        </p>
        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className="grid size-10 place-items-center rounded-lg text-fog-400 transition-colors hover:text-mint-400"
          >
            <GithubIcon className="size-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in a new tab)"
            className="grid size-10 place-items-center rounded-lg text-fog-400 transition-colors hover:text-mint-400"
          >
            <LinkedinIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
