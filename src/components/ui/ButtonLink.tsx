import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  download?: boolean;
  external?: boolean;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-mint-400 text-night-950 hover:bg-mint-300 shadow-[0_0_0_1px_rgb(52_211_153/0.4),0_8px_30px_-8px_rgb(52_211_153/0.55)]",
  secondary:
    "border border-night-600 bg-night-800/60 text-fog-50 hover:border-mint-400/60 hover:bg-night-700/70",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  download = false,
  external = false,
  className,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-200",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}
