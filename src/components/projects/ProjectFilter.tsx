import { cn } from "@/lib/cn";

interface ProjectFilterProps<T extends string> {
  options: readonly T[];
  active: T;
  counts: Record<T, number>;
  onChange: (option: T) => void;
}

export function ProjectFilter<T extends string>({
  options,
  active,
  counts,
  onChange,
}: ProjectFilterProps<T>) {
  return (
    <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={cn(
              "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
              isActive
                ? "border-mint-400 bg-mint-400 text-night-950"
                : "border-night-600 bg-night-850 text-fog-200 hover:border-mint-400/50 hover:text-fog-50",
            )}
          >
            {option}
            <span
              className={cn(
                "rounded-full px-1.5 font-mono text-xs",
                isActive ? "bg-night-950/15" : "bg-night-700 text-fog-400",
              )}
            >
              {counts[option]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
