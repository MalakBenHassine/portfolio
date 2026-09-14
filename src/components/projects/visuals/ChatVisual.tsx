import { VisualFrame } from "@/components/projects/visuals/VisualFrame";

/** HR assistant chat running on a local model. */
export function ChatVisual() {
  return (
    <VisualFrame title="hr-assistant · candidate chat" badge="Ollama">
      <div className="flex h-full flex-col justify-end gap-1.5">
        <div className="max-w-[70%] self-start rounded-lg rounded-bl-sm bg-white/[0.05] p-2">
          <span className="block h-1.5 w-24 max-w-full rounded-full bg-white/15" />
          <span className="mt-1 block h-1.5 w-16 rounded-full bg-white/10" />
        </div>
        <div className="max-w-[70%] self-end rounded-lg rounded-br-sm bg-azure-500/25 p-2">
          <span className="block h-1.5 w-20 max-w-full rounded-full bg-azure-200/50" />
        </div>
        <div className="max-w-[75%] self-start rounded-lg rounded-bl-sm bg-white/[0.05] p-2">
          <span className="block h-1.5 w-28 max-w-full rounded-full bg-white/15" />
          <span className="mt-1 block h-1.5 w-20 rounded-full bg-white/10" />
          <span className="mt-1 block h-1.5 w-12 rounded-full bg-iris-400/40" />
        </div>
        <div className="mt-1 flex items-center gap-1.5 rounded-md border border-white/8 px-2 py-1.5">
          <span className="h-1.5 flex-1 rounded-full bg-white/8" />
          <span className="size-3 rounded-full bg-azure-400/60" />
        </div>
      </div>
    </VisualFrame>
  );
}
