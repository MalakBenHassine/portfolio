import { VisualFrame } from "@/components/projects/visuals/VisualFrame";

/** Event listing with cover blocks and registration pills. */
export function EventsVisual() {
  return (
    <VisualFrame title="event-app · upcoming events" badge="Symfony">
      <div className="grid h-full grid-cols-3 gap-2">
        {[
          "from-azure-500/40 to-iris-400/20",
          "from-iris-400/35 to-azure-600/15",
          "from-azure-400/30 to-white/5",
        ].map((gradient, index) => (
          <div key={gradient} className="flex flex-col overflow-hidden rounded-md border border-white/6 bg-white/[0.02]">
            <span className={`block h-1/2 bg-linear-to-br ${gradient}`} />
            <div className="flex flex-1 flex-col justify-between p-1.5">
              <span className="block h-1.5 w-4/5 rounded-full bg-white/15" />
              <span className="block h-1 w-1/2 rounded-full bg-white/8" />
              <span
                className={`mt-1 block h-2.5 w-3/4 rounded-full ${index === 1 ? "bg-azure-400/60" : "border border-white/12"}`}
              />
            </div>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}
