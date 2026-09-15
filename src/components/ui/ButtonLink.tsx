import type { ReactNode } from "react";
import { buttonClasses } from "@/lib/buttonStyles";
import type { ButtonVariant } from "@/lib/buttonStyles";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  download?: boolean;
  external?: boolean;
  className?: string;
}

/** Link styled as a button. Hover feedback is CSS only (background, border, icon movement). */
export function ButtonLink({ href, children, variant = "primary", download = false, external = false, className }: ButtonLinkProps) {
  return (
    <a
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={buttonClasses(variant, className)}
    >
      {children}
    </a>
  );
}
