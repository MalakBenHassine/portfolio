import { CheckIcon } from "@/components/ui/icons/CheckIcon";
import { cn } from "@/lib/cn";
import type { PipelineStage } from "@/lib/types";

export type StageStatus = "queued" | "running" | "passed";

interface PipelineStageRowProps {
  index: number;
  stage: PipelineStage;
  status: StageStatus;
}

const statusLabel: Record<StageStatus, string> = {
  queued: "queued",
  running: "running",
  passed: "passed",
};

export function PipelineStageRow({ index, stage, status }: PipelineStageRowProps) {
  return (
    <li className="relative flex h-9 items-center gap-3 sm:gap-4">
      <span
        aria-hidden="true"
        className={cn(
          "relative z-10 grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors duration-300",
          status === "passed" && "border-mint-400 bg-mint-400 text-night-950",
          status === "running" && "border-mint-400 bg-night-850",
          status === "queued" && "border-night-600 bg-night-850",
        )}
      >
        {status === "passed" ? <CheckIcon className="size-3" /> : null}
        {status === "running" ? (
          <span className="size-2 animate-ping rounded-full bg-mint-400 motion-reduce:animate-none" />
        ) : null}
      </span>

      <span className="font-mono text-[11px] text-fog-500 tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        className={cn(
          "min-w-0 flex-1 truncate text-sm transition-colors duration-300",
          status === "queued" ? "text-fog-500" : "text-fog-50",
        )}
      >
        {stage.name}
        {stage.parallel ? (
          <span className="ml-2 rounded border border-night-600 px-1 font-mono text-[10px] text-fog-400">
            parallel
          </span>
        ) : null}
        <span className="ml-2 hidden font-mono text-xs text-fog-500 sm:inline">
          {stage.tool}
        </span>
      </span>

      <span
        className={cn(
          "font-mono text-[11px] transition-colors duration-300",
          status === "passed" && "text-mint-400",
          status === "running" && "text-fog-200",
          status === "queued" && "text-fog-500",
        )}
      >
        {statusLabel[status]}
      </span>
    </li>
  );
}
