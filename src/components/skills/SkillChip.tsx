import { StaggerItem } from "@/components/ui/Stagger";
import { TechIcon } from "@/components/ui/TechIcon";
import { getSkillContexts } from "@/lib/skillContext";
import { cn } from "@/lib/cn";
import type { SkillItem } from "@/lib/types";

interface SkillChipProps {
  skill: SkillItem;
  /** "proven": used on shipped work. "learning": in progress — dashed, muted, no brand color. */
  variant?: "proven" | "learning";
}

/**
 * Technology tile. On hover, tap or focus it lifts and shows usage → where it was used.
 * The name is written once; the details exist once as text (for screen readers and crawlers),
 * and the visual tooltip draws them from data attributes with CSS (.skill-tip), so nothing is duplicated.
 */
export function SkillChip({ skill, variant = "proven" }: SkillChipProps) {
  const isLearning = variant === "learning";
  const usedIn = isLearning ? [] : getSkillContexts(skill.name);
  const shownContexts = usedIn.slice(0, 3).join(" · ") + (usedIn.length > 3 ? ` +${usedIn.length - 3}` : "");
  const tooltipFooter = isLearning ? "In progress · 2026 training" : usedIn.length ? `Used in ${shownContexts}` : undefined;
  // Details for assistive technologies, attached with aria-describedby to a `hidden` element:
  // announced on focus, but never mixed into the page's visible/copied text.
  const detailId = `skill-${variant}-${skill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const detail = isLearning
    ? `${skill.role} (currently learning)`
    : `${skill.role}${usedIn.length ? `, used in ${usedIn.join(", ")}` : ""}`;

  return (
    <StaggerItem className="group/skill relative">
      <span
        tabIndex={0}
        aria-describedby={detailId}
        className={cn(
          "group inline-flex items-center gap-2.5 rounded-xl border px-3 py-2 text-sm transition-[transform,border-color,background-color,color] duration-200 group-hover/skill:-translate-y-0.5",
          isLearning
            ? "border-dashed border-white/15 bg-transparent text-mist-400 group-focus-within/skill:border-white/30 group-hover/skill:border-white/25 group-hover/skill:text-mist-200"
            : "border-white/6 bg-white/[0.02] text-mist-200 group-focus-within/skill:border-azure-400/40 group-hover/skill:border-white/15 group-hover/skill:bg-white/[0.05]",
        )}
      >
        <TechIcon
          tech={skill.name}
          className={cn("size-4", isLearning ? "text-mist-500" : "text-mist-400 group-hover/skill:text-(--brand)")}
          brandOnHover={false}
        />
        {skill.name}
      </span>
      <span id={detailId} hidden>
        {detail}
      </span>

      <span
        aria-hidden="true"
        data-role={skill.role}
        data-used={tooltipFooter}
        className="skill-tip pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[17rem] -translate-x-1/2 translate-y-1 rounded-lg border border-white/10 bg-ink-800 px-2.5 py-1.5 text-left opacity-0 shadow-[0_10px_30px_-10px_rgb(0_0_0/0.8)] transition-[opacity,transform] duration-150 group-focus-within/skill:translate-y-0 group-focus-within/skill:opacity-100 group-hover/skill:translate-y-0 group-hover/skill:opacity-100"
      />
    </StaggerItem>
  );
}
