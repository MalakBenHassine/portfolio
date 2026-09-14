import type { SVGProps } from "react";

export function SparklesIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 3.5 13.6 8a3 3 0 0 0 1.9 1.9L20 11.5l-4.5 1.6a3 3 0 0 0-1.9 1.9L12 19.5 10.4 15a3 3 0 0 0-1.9-1.9L4 11.5l4.5-1.6A3 3 0 0 0 10.4 8L12 3.5Z" /><path d="M19 3v3M17.5 4.5h3" />
    </svg>
  );
}
