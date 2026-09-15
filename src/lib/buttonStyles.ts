import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-snow text-ink-950 hover:bg-white shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_10px_40px_-12px_rgb(91_130_255/0.6)] hover:shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_14px_50px_-10px_rgb(91_130_255/0.85)]",
  secondary:
    "border border-white/10 bg-white/[0.03] text-snow backdrop-blur hover:border-azure-400/60 hover:bg-white/[0.06]",
  ghost: "text-mist-300 hover:text-snow",
};

export function buttonClasses(variant: ButtonVariant = "primary", className?: string): string {
  return cn(
    "group relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full whitespace-nowrap px-6 py-2.5 text-sm font-medium transition-[color,background-color,border-color,box-shadow] duration-300",
    variantClasses[variant],
    className,
  );
}
