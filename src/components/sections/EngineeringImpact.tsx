import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StaggerItem, StaggerList } from "@/components/ui/Stagger";
import { Icon } from "@/components/ui/icons/Icon";
import { impactPillars, profile } from "@/data/profile";

export function EngineeringImpact() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="divider-x absolute inset-x-0 top-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(91_130_255/0.09),transparent)]"
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-4xl">
          <p className="flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-mist-400 uppercase">
            <span className="text-azure-400">01</span>
            <span aria-hidden="true" className="h-px w-10 bg-linear-to-r from-azure-400/80 to-transparent" />
            Engineering impact
          </p>
          <h2 id="impact-title" className="mt-6 text-4xl leading-[1.02] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            <span className="block text-mist-500">I don&apos;t just build features.</span>
            <span className="text-gradient block pb-1">I build systems that ship.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist-400 sm:text-lg">{profile.tagline}</p>
        </Reveal>

        <StaggerList
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
          ariaLabel="What I bring to a team"
        >
          {impactPillars.map((pillar, index) => (
            <StaggerItem key={pillar.title}>
              <SpotlightCard
                as="article"
                labelledBy={`impact-${index}`}
                className="group flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl border border-white/8 bg-ink-850 text-azure-300 transition-[transform,border-color] duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg] group-hover:border-azure-400/40">
                    <Icon name={pillar.icon} className="size-5" />
                  </span>
                  <span className="font-mono text-[11px] text-mist-500">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 id={`impact-${index}`} className="mt-6 font-mono text-xs tracking-[0.2em] text-mist-400 uppercase">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-snow transition-colors duration-300 group-hover:text-azure-200">
                  {pillar.metric}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mist-400">{pillar.proof}</p>
                <span
                  aria-hidden="true"
                  className="mt-auto block h-px origin-left scale-x-0 bg-linear-to-r from-azure-400/70 to-transparent pt-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ marginTop: "1.5rem" }}
                />
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
