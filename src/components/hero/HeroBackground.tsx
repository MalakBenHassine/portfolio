/** Decorative Hero backdrop: engineering grid, dot matrix and slowly drifting light. */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="bg-dots absolute top-0 left-0 size-80 opacity-70" />
      <div className="absolute -top-[18%] left-[38%] size-[720px] animate-drift rounded-full bg-[radial-gradient(closest-side,rgb(91_130_255/0.2),transparent)] motion-reduce:animate-none" />
      <div
        className="absolute top-[35%] -right-[12%] size-[560px] animate-drift rounded-full bg-[radial-gradient(closest-side,rgb(160_143_255/0.12),transparent)] motion-reduce:animate-none"
        style={{ animationDelay: "-9s" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-b from-transparent to-ink-950" />
    </div>
  );
}
