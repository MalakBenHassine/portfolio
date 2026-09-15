import { VisualFrame } from "@/components/projects/visuals/VisualFrame";

const blocks = [
  { col: 1, row: 1, span: 2, accent: true },
  { col: 3, row: 2, span: 1, accent: false },
  { col: 2, row: 3, span: 2, accent: false },
  { col: 4, row: 1, span: 1, accent: false },
  { col: 5, row: 2, span: 2, accent: true },
];

/** Weekly appointment calendar. */
export function SchedulingVisual() {
  return (
    <VisualFrame title="gestion-rdv · appointments" badge="Express">
      <div className="flex h-full flex-col gap-1.5">
        <div className="grid grid-cols-5 gap-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
            <span key={day} className="text-center font-mono text-[10px] text-mist-500" data-decor={day} />
          ))}
        </div>
        <div className="grid flex-1 grid-cols-5 grid-rows-4 gap-1 rounded-md bg-white/[0.02] p-1">
          {blocks.map((block) => (
            <span
              key={`${block.col}-${block.row}`}
              style={{ gridColumn: block.col, gridRow: `${block.row} / span ${block.span}` }}
              className={block.accent ? "rounded bg-azure-500/30 ring-1 ring-azure-400/40" : "rounded bg-white/[0.07]"}
            />
          ))}
        </div>
      </div>
    </VisualFrame>
  );
}
