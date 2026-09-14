import { CheckIcon } from "@/components/ui/icons/CheckIcon";
import { cn } from "@/lib/cn";
import type { PipelineStage } from "@/lib/types";

export type StageStatus = "queued" | "running" | "passed";

/** Row height in px (h-9) — the travelling light moves by this step. */
export const STAGE_ROW_HEIGHT = 36;

interface PipelineStageRowProps {
  index: number;
  stage: PipelineStage;
  status: StageStatus;
}

export function PipelineStageRow({ index, stage, status }: PipelineStageRowProps) {
  return (
    <li className="relative flex h-9 items-center gap-3 sm:gap-4">
      <span
        aria-hidden="true"
        className={cn(
          "relative z-10 grid size-6 shrink-0 place-items-center rounded-full border transition-colors duration-300",
          status === "passed" && "border-ok-400/60 bg-ok-400/15 text-ok-400",
          status === "running" && "border-azure-400 bg-ink-900",
          status === "queued" && "border-white/12 bg-ink-900",
        )}
      >
        {status === "passed" ? <CheckIcon className="size-3" /> : null}
      </span>

      <span className="font-mono text-[11px] text-mist-500 tabular-nums">{String(index + 1).padStart(2, "0")}</span>

      <span
        className={cn(
          "min-w-0 flex-1 truncate font-mono text-xs tracking-[0.08em] uppercase transition-colors duration-300",
          status === "queued" ? "text-mist-500" : "text-snow",
        )}
      >
        {stage.name}
        {stage.parallel ? (
          <span className="ml-2 hidden rounded border border-white/10 px-1 text-[9px] tracking-normal text-mist-400 normal-case sm:inline">
            parallel
          </span>
        ) : null}
        <span className="ml-2 hidden tracking-normal text-mist-500 normal-case sm:inline">{stage.tool}</span>
      </span>

      <span
        className={cn(
          "inline-flex w-[4.5rem] items-center justify-end gap-1 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors duration-300",
          status === "passed" && "text-ok-400",
          status === "running" && "text-azure-300",
          status === "queued" && "text-mist-500",
        )}
      >
        {status}
        {status === "passed" ? <span aria-hidden="true">✓</span> : null}
      </span>
    </li>
  );
}
