import { VisualFrame } from "@/components/projects/visuals/VisualFrame";

/** Grounded answer: streamed text, then the source cards it cites. */
export function CitationsVisual() {
  return (
    <VisualFrame title="knowpilot · answer with sources" badge="RAG">
      <div className="flex h-full flex-col gap-2">
        <div className="max-w-[70%] self-end rounded-lg rounded-br-sm bg-azure-500/25 p-2">
          <span className="block h-1.5 w-20 max-w-full rounded-full bg-azure-200/50" />
        </div>
        <div className="rounded-lg rounded-bl-sm bg-white/[0.05] p-2">
          <span className="block h-1.5 w-full rounded-full bg-white/15" />
          <span className="mt-1 block h-1.5 w-4/5 rounded-full bg-white/15" />
          <span className="mt-1 block h-1.5 w-2/5 rounded-full bg-white/10" />
        </div>
        {/* Source cards: each quotes the passage the answer came from. */}
        <div className="mt-auto grid grid-cols-2 gap-1.5">
          {["w-3/5", "w-4/5"].map((width) => (
            <div key={width} className="rounded-md border border-ok-400/25 bg-ok-400/[0.06] p-1.5">
              <span className="flex items-center gap-1">
                <span className="size-1.5 rounded-sm bg-ok-400/70" />
                <span className={`block h-1 rounded-full bg-ok-400/40 ${width}`} />
              </span>
              <span className="mt-1.5 block h-1 w-full rounded-full bg-white/10" />
              <span className="mt-1 block h-1 w-3/4 rounded-full bg-white/8" />
            </div>
          ))}
        </div>
      </div>
    </VisualFrame>
  );
}
