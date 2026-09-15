import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

interface JobTitleProps {
  className?: string;
  roleClassName?: string;
  focusClassName?: string;
}

/**
 * The professional title, displayed on two lines ("Software Engineer" / "Full-Stack, DevOps & Applied AI")
 * but always read as the exact single formula — the em dash is kept for screen readers, crawlers and copy/paste.
 */
export function JobTitle({ className, roleClassName, focusClassName }: JobTitleProps) {
  const [role, focus] = profile.title.split(" — ");
  return (
    <p className={className}>
      <span className={cn("block", roleClassName)}>{role}</span>
      {focus ? (
        <>
          <span className="sr-only">{" — "}</span>
          <span className={cn("block", focusClassName)}>{focus}</span>
        </>
      ) : null}
    </p>
  );
}
