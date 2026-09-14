import { Reveal } from "@/components/ui/Reveal";

interface CaseStudySubheadingProps {
  label: string;
  title: string;
}

export function CaseStudySubheading({ label, title }: CaseStudySubheadingProps) {
  return (
    <Reveal className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-1" y={12}>
      <span className="font-mono text-[11px] tracking-[0.2em] text-azure-400 uppercase">{label}</span>
      <h3 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{title}</h3>
    </Reveal>
  );
}
