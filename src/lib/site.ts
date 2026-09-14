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
  title: "Malak Ben Hassine — Software Engineer | Full-Stack · AI · DevOps",
  description:
    "Software Engineer (Full-Stack, Applied AI & DevOps) building production-ready systems. Built AnalyseImpacte at Capgemini Engineering: a 3–5 day aerospace documentation workflow cut to under 10 minutes, shipped through a 9-stage CI/CD pipeline.",
  keywords: [
    "Malak Ben Hassine",
    "Software Engineer",
    "Full-Stack Developer",
    "Applied AI Engineer",
    "DevOps Engineer",
    "Spring Boot",
    "Angular",
    "LLM",
    "CI/CD",
    "Jenkins",
    "Docker",
    "Capgemini Engineering",
    "Tunisia",
  ],
} as const;

export const navItems: NavItem[] = [
  { label: "Home", href: "#top", sections: ["top"] },
  { label: "About", href: "#about", sections: ["about", "impact"] },
  { label: "Experience", href: "#experience", sections: ["experience", "case-study"] },
  { label: "Projects", href: "#projects", sections: ["projects"] },
  { label: "Skills", href: "#skills", sections: ["skills", "achievements"] },
  { label: "Contact", href: "#contact", sections: ["contact"] },
];
