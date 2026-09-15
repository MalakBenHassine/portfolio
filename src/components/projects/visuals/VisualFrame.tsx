import type { ReactNode } from "react";

interface VisualFrameProps {
  title: string;
  badge?: string;
  children: ReactNode;
}

/** Shared app-window chrome for the illustrative project previews. */
export function VisualFrame({ title, badge, children }: VisualFrameProps) {
  return (
    <div className="absolute inset-0 flex flex-col bg-ink-900">
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="absolute -top-1/3 right-0 size-2/3 rounded-full bg-[radial-gradient(closest-side,rgb(91_130_255/0.22),transparent)]" />
      <div className="relative m-4 mb-0 flex flex-1 flex-col overflow-hidden rounded-t-xl border border-b-0 border-white/10 bg-ink-950/90 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.9)]">
        <div className="flex items-center justify-between gap-2 border-b border-white/6 px-3 py-2">
          <span className="flex gap-1">
            <span className="size-1.5 rounded-full bg-white/15" />
            <span className="size-1.5 rounded-full bg-white/15" />
            <span className="size-1.5 rounded-full bg-white/15" />
          </span>
          {/* Illustration labels are drawn by CSS (data-decor): visible, but not part of the page text. */}
          <span className="truncate font-mono text-[10px] text-mist-500" data-decor={title} />
          {badge ? (
            <span className="rounded-full border border-azure-400/30 px-1.5 font-mono text-[10px] text-azure-300" data-decor={badge} />
          ) : (
            <span className="w-6" />
          )}
        </div>
        <div className="relative flex-1 p-3">{children}</div>
      </div>
    </div>
  );
}
