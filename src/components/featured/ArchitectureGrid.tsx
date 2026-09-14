import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StaggerItem, StaggerList } from "@/components/ui/Stagger";
import { Icon } from "@/components/ui/icons/Icon";
import type { ArchitectureLayer } from "@/lib/types";

interface ArchitectureGridProps {
  layers: ArchitectureLayer[];
}

export function ArchitectureGrid({ layers }: ArchitectureGridProps) {
  return (
    <StaggerList className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06} ariaLabel="System architecture layers">
      {layers.map((layer) => (
        <StaggerItem key={layer.title}>
          <SpotlightCard className="group h-full p-6 transition-transform duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-white/8 bg-ink-850 text-mist-300 transition-colors duration-300 group-hover:border-azure-400/40 group-hover:text-azure-300">
                <Icon name={layer.icon} className="size-5" />
              </span>
              <h4 className="font-semibold text-snow">{layer.title}</h4>
            </div>
            <ul className="mt-5 space-y-2">
              {layer.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-mist-400">
                  <span aria-hidden="true" className="size-1 rounded-full bg-azure-400/70" />
                  {item}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </StaggerItem>
      ))}
    </StaggerList>
  );
}
