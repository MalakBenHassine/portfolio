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
 * availability), always read as the exact single formula. The separators ("—", "|") sit at the END of the
 * previous line and are visually collapsed (.text-sep), so copied or extracted text reads
 * "Software Engineer — Full-Stack · Applied AI · DevOps | Open to…" instead of a lone "—" on its own line.
 */
export function JobTitle({ className, roleClassName, focusClassName, withAvailability = false, availabilityClassName }: JobTitleProps) {
  const { role, focus, availability } = getTitleParts();
  const showAvailability = withAvailability && Boolean(availability);

  return (
    <p className={className}>
      <span className={cn("block", roleClassName)}>
        {role}
        {focus ? <span className="text-sep">{" — "}</span> : null}
      </span>
      {focus ? (
        <span className={cn("block", focusClassName)}>
          {focus}
          {showAvailability ? <span className="text-sep">{" | "}</span> : null}
        </span>
      ) : null}
      {showAvailability ? <span className={cn("block", availabilityClassName)}>{availability}</span> : null}
    </p>
  );
}
