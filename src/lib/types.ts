export type ProjectCategory = "Full-Stack" | "AI" | "DevOps";

export type IconName =
  | "code"
  | "sparkles"
  | "infinity"
  | "shield"
  | "bolt"
  | "beaker"
  | "activity"
  | "server"
  | "monitor"
  | "briefcase"
  | "mapPin"
  | "graduation"
  | "file"
  | "scan";

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface Profile {
  name: string;
  firstName: string;
  role: string;
  specialties: string[];
  /** Short value proposition shown in the Hero. */
  headline: string;
  /** Outcome-driven one-liner, reused in the Engineering Impact section and OG image. */
  tagline: string;
  email: string;
  location: string;
  availability: string;
  workRegions: string;
  github: string;
  linkedin: string;
  /** One entry per paragraph. */
  about: string[];
  /** Professional portrait under /public (shown in the Hero and About). */
  photo: ImageAsset & { width: number; height: number };
  /** Path under /public to the downloadable CV. */
  cvPath: string;
}

export interface IdentityFact {
  icon: IconName;
  label: string;
  value: string;
  detail: string;
}

export interface FocusArea {
  icon: IconName;
  title: string;
  items: string[];
}

export interface ImpactPillar {
  icon: IconName;
  title: string;
  /** Short headline metric shown large on the card. */
  metric: string;
  proof: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  /** Zero-pad the displayed number to this many digits (e.g. 3 → "03"). */
  pad?: number;
  label: string;
  detail?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  featured?: boolean;
  /** Short context tags (project, domain, standards). */
  context?: string[];
  highlights: string[];
  tech: string[];
  /** In-page link to a detailed case study of this experience. */
  caseStudy?: { label: string; href: `#${string}` };
}

export type ProjectLinkKind = "github" | "demo";

export interface ProjectLink {
  kind: ProjectLinkKind;
  label: string;
  href: string;
}

/** Illustrative, code-drawn preview styles shared by all project cards. */
export type ProjectVisualKind = "matching" | "clinic" | "chat" | "events" | "scheduling";

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  /** Measurable outcome or value delivered. */
  result: string;
  categories: ProjectCategory[];
  tech: string[];
  links: ProjectLink[];
  visual: ProjectVisualKind;
  /** Real screenshot; replaces the illustrative visual when provided. */
  image?: ImageAsset;
}

export interface CaseStudyResult {
  kind: "counter" | "before-after";
  value?: number;
  suffix?: string;
  before?: string;
  after?: string;
  label: string;
  detail: string;
}

export interface WorkflowStep {
  title: string;
  caption: string;
}

/** A step of the scroll-driven AnalyseImpacte workflow story. */
export interface StoryStep extends WorkflowStep {
  icon: IconName;
  /** One or two sentences shown while the step is active. */
  detail: string;
}

export interface ArchitectureLayer {
  icon: IconName;
  title: string;
  items: string[];
}

export interface CaseStudy {
  title: string;
  subtitle: string;
  context: string[];
  problem: string;
  solution: string;
  results: CaseStudyResult[];
  workflow: StoryStep[];
  architecture: ArchitectureLayer[];
  tech: string[];
  note: string;
}

export interface SkillItem {
  name: string;
  /** What I use it for — revealed on hover. */
  role: string;
}

export interface SkillGroup {
  name: string;
  core: SkillItem[];
  more?: string[];
  wide?: boolean;
}

export interface AiUseCase {
  title: string;
  context: string;
  detail: string;
  stack: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
}

export interface PipelineStage {
  name: string;
  tool: string;
  /** Backend and frontend jobs run in parallel within this stage. */
  parallel?: boolean;
}

export interface NavItem {
  label: string;
  href: `#${string}`;
  /** Section ids that mark this item as active. */
  sections: string[];
}
