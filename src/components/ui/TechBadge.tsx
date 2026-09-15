import { TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/cn";

interface TechBadgeProps {
  label: string;
  /** Index used to stagger the hover lift inside a `group` card. */
  index?: number;
  /** Render as a list item (default) or as an inline element inside another wrapper. */
  as?: "li" | "span";
  /** Light up (border + brand-colored logo) when the parent `group` card is hovered. */
  highlightOnGroupHover?: boolean;
}

export function TechBadge({ label, index = 0, as = "li", highlightOnGroupHover = false }: TechBadgeProps) {
  const Component = as;
  return (
    <Component
      style={{ transitionDelay: `${index * 25}ms` }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.025] px-2.5 py-1 text-xs text-mist-300 transition-[transform,border-color,color,background-color] duration-300 group-hover:-translate-y-0.5 group-hover:border-white/12 group-hover:text-mist-200 hover:border-azure-400/40! hover:bg-azure-400/[0.06] hover:text-snow!",
        highlightOnGroupHover && "group-hover:border-azure-400/35! group-hover:bg-azure-400/[0.06] group-hover:text-snow!",
      )}
    >
      <TechIcon tech={label} className="size-3.5 text-mist-400" brandOnHover={highlightOnGroupHover} />
      {label}
    </Component>
  );
}
