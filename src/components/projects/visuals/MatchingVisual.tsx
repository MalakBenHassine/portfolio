import { VisualFrame } from "@/components/projects/visuals/VisualFrame";

/** RAG matching: candidate ↔ job vectors converging on a match score. */
export function MatchingVisual() {
  return (
    <VisualFrame title="careermatch · semantic match" badge="RAG">
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-2">
        {["Candidate", "Job"].map((label, side) => (
          <div key={label} className={side === 0 ? "order-1 space-y-1.5" : "order-3 space-y-1.5"}>
            <p className="font-mono text-[10px] tracking-wider text-mist-500 uppercase" data-decor={label} />
            <span className="block h-1.5 w-full rounded-full bg-white/12" />
            <span className="block h-1.5 w-4/5 rounded-full bg-white/8" />
            <span className="block h-1.5 w-3/5 rounded-full bg-azure-400/40" />
            <span className="block h-1.5 w-2/3 rounded-full bg-white/8" />
          </div>
        ))}
        <div className="order-2 grid place-items-center">
          <div className="relative grid size-16 place-items-center rounded-full bg-[conic-gradient(var(--color-azure-400)_0_90%,rgb(255_255_255/0.08)_90%_100%)] p-[3px]">
            <div className="grid size-full place-items-center rounded-full bg-ink-950">
              <span className="font-mono text-xs font-semibold text-snow" data-decor="90%" />
            </div>
          </div>
          <span className="mt-1 font-mono text-[10px] text-mist-500" data-decor="match" />
        </div>
      </div>
    </VisualFrame>
  );
}
