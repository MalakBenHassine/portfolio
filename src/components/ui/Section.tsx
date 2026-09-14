import type { ReactNode } from "react";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { cn } from "@/lib/cn";

interface SectionProps {
  id: string;
  labelledBy: string;
  children: ReactNode;
  className?: string;
  /** Hairline gradient divider on top of the section. */
  divider?: boolean;
  /** Chapter number drawn huge in the background (e.g. "01"). */
  numeral?: string;
}

export function Section({ id, labelledBy, children, className, divider = true, numeral }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative isolate py-24 sm:py-32", numeral && "overflow-hidden", className)}
    >
      {divider ? <div aria-hidden="true" className="divider-x absolute inset-x-0 top-0" /> : null}
      {numeral ? <SectionNumeral value={numeral} className="top-10 right-2 sm:right-6 lg:right-[max(1.5rem,calc(50%-36rem))]" /> : null}
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
