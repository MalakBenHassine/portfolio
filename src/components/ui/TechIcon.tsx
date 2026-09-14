import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { getTechIcon, getTechMonogram } from "@/lib/techIcons";

interface TechIconProps {
  tech: string;
  className?: string;
  /** Tint with the brand color when an ancestor with `group` is hovered. */
  brandOnHover?: boolean;
}

/** Technology logo (Simple Icons) with a monogram fallback. Decorative: the tech name is always rendered next to it. */
export function TechIcon({ tech, className, brandOnHover = true }: TechIconProps) {
  const icon = getTechIcon(tech);

  if (!icon) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "grid shrink-0 place-items-center rounded-[4px] border border-current/40 font-mono text-[0.45rem] leading-none font-semibold tracking-tighter",
          className,
        )}
      >
        {getTechMonogram(tech)}
      </span>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      style={{ "--brand": icon.color } as CSSProperties}
      className={cn(
        "shrink-0 transition-colors duration-300",
        brandOnHover && "group-hover:text-(--brand)",
        className,
      )}
    >
      <path d={icon.path} />
    </svg>
  );
}
