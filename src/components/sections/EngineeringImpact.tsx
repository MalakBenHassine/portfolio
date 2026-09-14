import { Reveal } from "@/components/ui/Reveal";
import { StaggerContent, StaggerList } from "@/components/ui/Stagger";
import { Icon } from "@/components/ui/icons/Icon";
import { impactPillars, profile } from "@/data/profile";

export function EngineeringImpact() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="divider-x absolute inset-x-0 top-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(91_130_255/0.08),transparent)]"
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-4xl">
          <p className="font-mono text-xs tracking-[0.2em] text-mist-400 uppercase">
            <span className="text-azure-400">02</span> — Engineering impact
          </p>
          <h2 id="impact-title" className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.04em] sm:text-6xl">
            <span className="block text-mist-500">I don&apos;t just build features.</span>
            <span className="text-gradient block pb-1">I build systems that ship.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist-400 sm:text-lg">{profile.tagline}</p>
        </Reveal>

        <StaggerList
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/6 bg-white/6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
          ariaLabel="What I bring to a team"
        >
          {impactPillars.map((pillar) => (
            <li key={pillar.title} className="group bg-ink-950 transition-colors duration-300 hover:bg-ink-900">
              <StaggerContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="text-azure-400 transition-transform duration-300 group-hover:scale-110">
                    <Icon name={pillar.icon} className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{pillar.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-mist-400">{pillar.proof}</p>
              </StaggerContent>
            </li>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
