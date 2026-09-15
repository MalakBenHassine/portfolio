import { getTitleParts } from "@/lib/headline";
import { cn } from "@/lib/cn";

interface JobTitleProps {
  className?: string;
  roleClassName?: string;
  focusClassName?: string;
  /** Also show the availability line (off in the Hero, where the status pill already shows it). */
  withAvailability?: boolean;
  availabilityClassName?: string;
}

/**
 * The professional headline on separate lines ("Software Engineer" / "Full-Stack · Applied AI · DevOps" /
 * availability), always read as the exact single formula: separators are kept for screen readers, crawlers and copy/paste.
 */
export function JobTitle({ className, roleClassName, focusClassName, withAvailability = false, availabilityClassName }: JobTitleProps) {
  const { role, focus, availability } = getTitleParts();
  return (
    <p className={className}>
      <span className={cn("block", roleClassName)}>{role}</span>
      {focus ? (
        <>
          <span className="sr-only">{" — "}</span>
          <span className={cn("block", focusClassName)}>{focus}</span>
        </>
      ) : null}
      {withAvailability && availability ? (
        <>
          <span className="sr-only">{" | "}</span>
          <span className={cn("block", availabilityClassName)}>{availability}</span>
        </>
      ) : null}
    </p>
  );
}
