import { StaggerItem } from "@/components/ui/Stagger";
import { TechIcon } from "@/components/ui/TechIcon";
import type { SkillItem } from "@/lib/types";

interface SkillChipProps {
  skill: SkillItem;
}

/** Technology tile: appears in sequence with its category, scales up, takes its brand color and reveals what it is used for on hover. */
export function SkillChip({ skill }: SkillChipProps) {
  return (
    <StaggerItem className="group/skill relative">
      <span className="group inline-flex items-center gap-2.5 rounded-xl border border-white/6 bg-white/[0.02] px-3 py-2 text-sm text-mist-200 transition-[transform,border-color,background-color] duration-300 group-hover/skill:-translate-y-0.5 group-hover/skill:scale-[1.05] group-hover/skill:border-white/15 group-hover/skill:bg-white/[0.05]">
        <TechIcon tech={skill.name} className="size-4 text-mist-400 group-hover/skill:text-(--brand)" brandOnHover={false} />
        {skill.name}
        <span className="sr-only">{` — ${skill.role}`}</span>
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 translate-y-1 rounded-lg border border-white/10 bg-ink-800 px-2.5 py-1.5 text-left whitespace-nowrap opacity-0 shadow-[0_10px_30px_-10px_rgb(0_0_0/0.8)] transition-[opacity,transform] duration-200 group-hover/skill:translate-y-0 group-hover/skill:opacity-100"
      >
        <span className="block text-xs font-medium text-snow">{skill.name}</span>
        <span className="block font-mono text-[11px] text-azure-200">{skill.role}</span>
      </span>
    </StaggerItem>
  );
}
