import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-snow text-ink-950 hover:bg-white shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_10px_40px_-12px_rgb(91_130_255/0.6)]",
  secondary:
    "border border-white/10 bg-white/[0.03] text-snow backdrop-blur hover:border-azure-400/50 hover:bg-white/[0.06]",
  ghost: "text-mist-300 hover:text-snow",
};

export function buttonClasses(variant: ButtonVariant = "primary", className?: string): string {
  return cn(
    "group relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-200",
    variantClasses[variant],
    className,
  );
}
