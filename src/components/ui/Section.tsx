import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionProps {
  id: string;
  labelledBy: string;
  children: ReactNode;
  className?: string;
  /** Hairline gradient divider on top of the section. */
  divider?: boolean;
}

export function Section({ id, labelledBy, children, className, divider = true }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-24 sm:py-32", className)}>
      {divider ? <div aria-hidden="true" className="divider-x absolute inset-x-0 top-0" /> : null}
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
