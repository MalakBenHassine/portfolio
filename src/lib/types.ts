export type ProjectCategory = "Full-Stack" | "AI" | "DevOps";

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface Profile {
  name: string;
  firstName: string;
  title: string;
  tagline: string;
  email: string;
  location: string;
  availability: string;
  workRegions: string;
  github: string;
  linkedin: string;
  about: string;
  /** Path under /public. Leave undefined to show the monogram instead. */
  photo?: ImageAsset;
  /** Path under /public to the downloadable CV. */
  cvPath: string;
}

export interface FocusArea {
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  detail?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  categories: ProjectCategory[];
  tech: string[];
  featured?: boolean;
  highlights?: string[];
  image?: ImageAsset;
  href?: string;
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
}

export interface PipelineStage {
  name: string;
  tool: string;
}

export interface NavItem {
  label: string;
  href: `#${string}`;
}
