import type { ComponentType } from "react";
import { ChatVisual } from "@/components/projects/visuals/ChatVisual";
import { ClinicVisual } from "@/components/projects/visuals/ClinicVisual";
import { EventsVisual } from "@/components/projects/visuals/EventsVisual";
import { MatchingVisual } from "@/components/projects/visuals/MatchingVisual";
import { SchedulingVisual } from "@/components/projects/visuals/SchedulingVisual";
import type { ProjectVisualKind } from "@/lib/types";

const visuals: Record<ProjectVisualKind, ComponentType> = {
  matching: MatchingVisual,
  clinic: ClinicVisual,
  chat: ChatVisual,
  events: EventsVisual,
  scheduling: SchedulingVisual,
};

/** Illustrative, code-drawn preview for a project card (decorative). */
export function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  const Visual = visuals[kind];
  return <Visual />;
}
