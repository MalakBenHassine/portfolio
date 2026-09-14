import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/data/stats";

export function Stats() {
  return (
    <section aria-labelledby="stats-title" className="relative py-8 sm:py-12">
      <h2 id="stats-title" className="sr-only">
        Key numbers
      </h2>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-night-700 bg-night-700 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col bg-night-850 p-5 sm:p-8">
                <dt className="order-2 mt-2 text-sm leading-snug text-fog-400 sm:text-base">
                  {stat.label}
                  {stat.detail ? (
                    <span className="mt-1 block font-mono text-xs text-fog-500">
                      {stat.detail}
                    </span>
                  ) : null}
                </dt>
                <dd className="order-1 text-4xl font-bold tracking-tight text-mint-400 sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
