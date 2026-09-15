import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { BeforeAfterMetric } from "@/components/ui/BeforeAfterMetric";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StaggerItem, StaggerList } from "@/components/ui/Stagger";
import type { CaseStudyResult } from "@/lib/types";

interface CaseStudyResultsProps {
  results: CaseStudyResult[];
}

export function CaseStudyResults({ results }: CaseStudyResultsProps) {
  return (
    <StaggerList className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" ariaLabel="Results">
      {results.map((result) => (
        <StaggerItem key={result.label}>
          <SpotlightCard className="flex h-full flex-col p-6">
            <p className="text-4xl font-semibold tracking-[-0.04em] sm:text-[2.6rem]">
              {result.kind === "before-after" ? (
                <BeforeAfterMetric before={result.before ?? ""} after={result.after ?? ""} stacked afterClassName="text-gradient" />
              ) : (
                <span className="text-gradient">
                  <AnimatedCounter value={result.value ?? 0} suffix={result.suffix} />
                </span>
              )}
            </p>
            <p className="mt-auto pt-5 font-medium text-snow">{result.label}</p>
            <p className="mt-1 text-sm text-mist-400">{result.detail}</p>
          </SpotlightCard>
        </StaggerItem>
      ))}
    </StaggerList>
  );
}
