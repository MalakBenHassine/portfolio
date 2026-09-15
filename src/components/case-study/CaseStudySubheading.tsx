import { RevealBlock, RevealGroup, RevealHeading } from "@/components/ui/RevealGroup";

interface CaseStudySubheadingProps {
  label: string;
  title: string;
}

export function CaseStudySubheading({ label, title }: CaseStudySubheadingProps) {
  return (
    <RevealGroup className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-1" stagger={0.1}>
      <RevealBlock>
        <span className="font-mono text-[11px] tracking-[0.2em] text-azure-400 uppercase">{label}</span>
      </RevealBlock>
      <RevealHeading as="h3" text={title} className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl" stagger={0.05} />
    </RevealGroup>
  );
}
