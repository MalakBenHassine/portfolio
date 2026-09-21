import type { CSSProperties } from "react";
import { analyseImpacte } from "@/data/caseStudy";
import { experience } from "@/data/experience";
import { impactPillars } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/cn";
import { getSpriteIcons, getTechIcon } from "@/lib/techIcons";

interface TechIconProps {
  tech: string;
  className?: string;
  /** Tint with the brand color when an ancestor with `group` is hovered. */
  brandOnHover?: boolean;
}

const GENERIC_ID = "ti-generic";

/**
 * Technology logo, referenced from the page sprite (<TechIconSprite />) so each logo's path is sent
 * once instead of on every badge. Technologies without a logo get a neutral glyph with no text
 * (letters would read as "SS SQL Server"). Decorative: the tech name is always rendered next to it.
 */
export function TechIcon({ tech, className, brandOnHover = true }: TechIconProps) {
  const icon = getTechIcon(tech);

  if (!icon) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("shrink-0", className)}>
        <use href={`#${GENERIC_ID}`} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      style={{ "--brand": icon.color } as CSSProperties}
      className={cn("shrink-0 transition-colors duration-300", brandOnHover && "group-hover:text-(--brand)", className)}
    >
      <use href={`#${icon.id}`} />
    </svg>
  );
}

/** Every technology name that can render a <TechIcon> on the page. */
const pageTechs = [
  ...skillGroups.flatMap((group) => group.core.map((skill) => skill.name)),
  ...projects.flatMap((project) => project.tech),
  ...experience.flatMap((item) => item.tech),
  ...analyseImpacte.tech,
  ...impactPillars.flatMap((pillar) => pillar.tech),
];

/** Hidden SVG sprite: one <symbol> per logo used on the page. Render once per page. */
export function TechIconSprite() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute size-0 overflow-hidden">
      <defs>
        {getSpriteIcons(pageTechs).map((icon) => (
          <symbol key={icon.id} id={icon.id} viewBox="0 0 24 24">
            <path d={icon.path} />
          </symbol>
        ))}
        <symbol id={GENERIC_ID} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <rect x="4.5" y="4.5" width="15" height="15" rx="3.5" opacity={0.55} />
          <path d="m10 9.5-2.5 2.5 2.5 2.5M14 9.5l2.5 2.5-2.5 2.5" />
        </symbol>
      </defs>
    </svg>
  );
}
