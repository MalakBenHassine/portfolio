import type { ReactNode } from "react";

/**
 * Numbers (and their unit) that deserve emphasis for skimming readers,
 * e.g. "3-5 days", "9-stage", "100%", "1,686 OWASP ZAP attack requests".
 */
const METRIC_PATTERN = new RegExp(
  String.raw`(?<!Java )(?<![\w.-])\d[\d,]*(?:[-–]\d+)?%?(?![A-Za-z\d.])(?:[- ](?:days?|minutes|stages?|mode|severity levels|concurrent users|Scrum sprints|functional modules|OWASP ZAP attack requests|security tests))?`,
  "g",
);

interface MetricTextProps {
  text: string;
}

/** Renders text with key metrics emphasized. */
export function MetricText({ text }: MetricTextProps) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(METRIC_PATTERN)) {
    const start = match.index ?? 0;
    if (start > lastIndex) parts.push(text.slice(lastIndex, start));
    parts.push(
      <strong key={start} className="font-medium text-snow">
        {match[0]}
      </strong>,
    );
    lastIndex = start + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return <>{parts}</>;
}
