import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ id, index, eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const isCentered = align === "center";
  return (
    <Reveal className={cn("mb-14 max-w-3xl sm:mb-20", isCentered && "mx-auto text-center")}>
      <p
        className={cn(
          "flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-mist-400 uppercase",
          isCentered && "justify-center",
        )}
      >
        <span className="text-azure-400">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-linear-to-r from-azure-400/70 to-transparent" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-mist-400 sm:text-lg">{description}</p>
      ) : null}
    </Reveal>
  );
}
