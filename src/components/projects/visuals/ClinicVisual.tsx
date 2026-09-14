import { VisualFrame } from "@/components/projects/visuals/VisualFrame";

const slots = [
  [1, 0, 1, 0, 0],
  [0, 1, 1, 0, 1],
  [1, 0, 0, 1, 0],
];

/** Clinic dashboard: sidebar, KPI tiles and an appointment grid. */
export function ClinicVisual() {
  return (
    <VisualFrame title="medflow · doctor dashboard" badge="SaaS">
      <div className="flex h-full gap-2.5">
        <div className="flex w-7 flex-col items-center gap-2 rounded-md bg-white/[0.03] py-2">
          <span className="size-3 rounded bg-azure-400/60" />
          <span className="size-3 rounded bg-white/10" />
          <span className="size-3 rounded bg-white/10" />
          <span className="size-3 rounded bg-white/10" />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="grid grid-cols-3 gap-1.5">
            {["w-3/5", "w-2/5", "w-4/5"].map((width, index) => (
              <div key={width} className="rounded-md border border-white/6 bg-white/[0.02] p-1.5">
                <span className={`block h-1 rounded-full bg-white/10 ${width}`} />
                <span className={`mt-1.5 block h-2 w-1/2 rounded-full ${index === 0 ? "bg-azure-400/60" : "bg-white/15"}`} />
              </div>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-5 gap-1">
            {slots.flatMap((row, rowIndex) =>
              row.map((filled, colIndex) => (
                <span
                  key={`${rowIndex}-${colIndex}`}
                  className={filled ? "rounded bg-azure-500/25 ring-1 ring-azure-400/30" : "rounded bg-white/[0.03]"}
                />
              )),
            )}
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}
