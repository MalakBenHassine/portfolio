import { StaggerContent, StaggerList } from "@/components/ui/Stagger";
import { Icon } from "@/components/ui/icons/Icon";
import { identityFacts } from "@/data/profile";

/** At-a-glance recruiter facts: role, latest experience, location, education. */
export function IdentityStrip() {
  return (
    <section aria-label="Profile at a glance" className="relative">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <StaggerList
          className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/6 bg-white/6 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.07}
        >
          {identityFacts.map((fact) => (
            <li key={fact.label} className="bg-ink-950">
              <StaggerContent className="flex items-start gap-4 p-5 sm:p-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/8 bg-ink-850 text-azure-300">
                  <Icon name={fact.icon} className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-mist-500 uppercase">{fact.label}</p>
                  <p className="mt-1 font-medium text-snow">{fact.value}</p>
                  <p className="mt-0.5 text-sm text-mist-400">{fact.detail}</p>
                </div>
              </StaggerContent>
            </li>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
