import { CheckIcon } from "@/components/ui/icons/CheckIcon";
import { cn } from "@/lib/cn";
import type { PipelineStage } from "@/lib/types";

export type StageStatus = "queued" | "running" | "passed";

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
        {status === "running" ? (
          <span className="size-2 animate-ping rounded-full bg-azure-400 motion-reduce:animate-none" />
        ) : null}
      </span>

      <span className="font-mono text-[11px] text-mist-500 tabular-nums">{String(index + 1).padStart(2, "0")}</span>

      <span
        className={cn(
          "min-w-0 flex-1 truncate text-sm transition-colors duration-300",
          status === "queued" ? "text-mist-500" : "text-snow",
        )}
      >
        {stage.name}
        {stage.parallel ? (
          <span className="ml-2 rounded border border-white/10 px-1 font-mono text-[10px] text-mist-400">parallel</span>
        ) : null}
        <span className="ml-2 hidden font-mono text-xs text-mist-500 sm:inline">{stage.tool}</span>
      </span>

      <span
        className={cn(
          "font-mono text-[11px] transition-colors duration-300",
          status === "passed" && "text-ok-400",
          status === "running" && "text-azure-300",
          status === "queued" && "text-mist-500",
        )}
      >
        {status}
      </span>
    </li>
  );
}
