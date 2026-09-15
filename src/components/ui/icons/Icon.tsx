import type { ComponentType, SVGProps } from "react";
import { ActivityIcon } from "@/components/ui/icons/ActivityIcon";
import { BeakerIcon } from "@/components/ui/icons/BeakerIcon";
import { BoltIcon } from "@/components/ui/icons/BoltIcon";
import { BriefcaseIcon } from "@/components/ui/icons/BriefcaseIcon";
import { CodeIcon } from "@/components/ui/icons/CodeIcon";
import { FileTextIcon } from "@/components/ui/icons/FileTextIcon";
import { GraduationIcon } from "@/components/ui/icons/GraduationIcon";
import { InfinityIcon } from "@/components/ui/icons/InfinityIcon";
import { MapPinIcon } from "@/components/ui/icons/MapPinIcon";
import { MonitorIcon } from "@/components/ui/icons/MonitorIcon";
import { ScanIcon } from "@/components/ui/icons/ScanIcon";
import { ServerIcon } from "@/components/ui/icons/ServerIcon";
import { ShieldCheckIcon } from "@/components/ui/icons/ShieldCheckIcon";
import { SparklesIcon } from "@/components/ui/icons/SparklesIcon";
import type { IconName } from "@/lib/types";

const icons: Record<IconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  activity: ActivityIcon,
  beaker: BeakerIcon,
  bolt: BoltIcon,
  briefcase: BriefcaseIcon,
  code: CodeIcon,
  file: FileTextIcon,
  graduation: GraduationIcon,
  infinity: InfinityIcon,
  mapPin: MapPinIcon,
  monitor: MonitorIcon,
  scan: ScanIcon,
  server: ServerIcon,
  shield: ShieldCheckIcon,
  sparkles: SparklesIcon,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

/** Renders a line icon from data (content files reference icons by name). */
export function Icon({ name, ...props }: IconProps) {
  const Component = icons[name];
  return <Component {...props} />;
}
