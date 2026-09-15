import { profile } from "@/data/profile";

/**
 * The professional title (`profile.title`), split into its display parts:
 * "Software Engineer — Full-Stack · Applied AI · DevOps | Open to full-time opportunities (Tunisia & international)"
 *   role         → "Software Engineer"
 *   focus        → "Full-Stack · Applied AI · DevOps"
 *   availability → "Open to full-time opportunities (Tunisia & international)"
 *   regions      → "Tunisia & international" (the part in parentheses, hidden on narrow screens)
 * Every place that shows part of the title reads it from here, so the wording can never drift.
 */
export function getTitleParts(title: string = profile.title) {
  const [role, rest = ""] = title.split(" — ");
  const [focus = "", availability = ""] = rest.split(" | ");
  const regionsMatch = availability.match(/^(.*?)\s*\((.*)\)$/);
  return {
    role,
    focus,
    availability,
    availabilityShort: regionsMatch ? regionsMatch[1] : availability,
    regions: regionsMatch ? regionsMatch[2] : "",
  };
}
