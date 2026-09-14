interface TechBadgeProps {
  label: string;
}

export function TechBadge({ label }: TechBadgeProps) {
  return (
    <li className="rounded-md border border-night-600/80 bg-night-850 px-2.5 py-1 font-mono text-xs text-fog-200">
      {label}
    </li>
  );
}
