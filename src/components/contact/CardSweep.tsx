/** Light sweep across a colored card on hover (transform only). Place inside a `group` with overflow hidden. */
export function CardSweep() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
    />
  );
}
