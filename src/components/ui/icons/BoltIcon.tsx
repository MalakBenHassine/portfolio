import type { SVGProps } from "react";

export function BoltIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M13 2.5 4.5 13.5H12L11 21.5l8.5-11H12l1-8Z" />
    </svg>
  );
}
