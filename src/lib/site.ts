import type { NavItem } from "@/lib/types";

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  url: resolveSiteUrl(),
  title: "Malak Ben Hassine — Software Engineer",
  description:
    "Software Engineer (Full-Stack, Applied AI & DevOps). I turn multi-day manual engineering processes into automated pipelines that run in minutes.",
  keywords: [
    "Malak Ben Hassine",
    "Software Engineer",
    "Full-Stack Developer",
    "DevOps",
    "Applied AI",
    "Spring Boot",
    "Angular",
    "CI/CD",
    "Tunisia",
  ],
} as const;

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
