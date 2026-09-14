import type { SVGProps } from "react";

export function AwardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 14 -1.5 7 5-2.5 5 2.5-1.5-7" />
      <path d="m9.5 9 1.7 1.7L14.5 7.5" />
    </svg>
  );
}
