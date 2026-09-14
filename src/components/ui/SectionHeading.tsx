import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl sm:mb-16">
      <p className="mb-3 font-mono text-sm tracking-wide text-mint-400">{eyebrow}</p>
      <h2
        id={id}
        className="text-3xl font-bold tracking-tight text-fog-50 sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-fog-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
