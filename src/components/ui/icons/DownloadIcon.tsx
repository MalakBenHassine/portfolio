import type { SVGProps } from "react";

export function DownloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  );
}
