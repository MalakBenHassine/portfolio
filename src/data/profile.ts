import type { EducationItem, FocusArea, Profile } from "@/lib/types";

export const profile: Profile = {
  name: "Malak Ben Hassine",
  firstName: "Malak",
  title: "Software Engineer — Full-Stack, Applied AI & DevOps",
  tagline:
    "I turn multi-day manual engineering processes into automated pipelines that run in minutes.",
  email: "benhassinemalak4@gmail.com",
  location: "Based in Tunisia · Open to international",
  availability: "Open to full-time (CDI) roles",
  workRegions: "Tunisia & international",
  github: "https://github.com/MalakBenHassine",
  linkedin: "https://www.linkedin.com/in/malakbenhassine/",
  about:
    "Generalist software engineer working across three complementary axes: Full-Stack Engineering (Java/Spring Boot, Angular, Python), Applied AI & Automation (LLMs, RAG, production AI pipelines), and DevOps (CI/CD, containerization, monitoring). My flagship project, AnalyseImpacte, proves these three combine on a single system: it cut a manual 3-5 day process down to under 10 minutes, industrialized through a 9-stage CI/CD pipeline (100% success under load testing, zero critical vulnerabilities across 1,686 security tests).",
  cvPath: "/cv/Malak-Ben-Hassine-CV.pdf",
};

export const focusAreas: FocusArea[] = [
  {
    title: "Full-Stack Engineering",
    description: "Java/Spring Boot, Angular, Python",
  },
  {
    title: "Applied AI & Automation",
    description: "LLMs, RAG, production AI pipelines",
  },
  {
    title: "DevOps",
    description: "CI/CD, containerization, monitoring",
  },
];

export const education: EducationItem[] = [
  {
    school: "Tek-Up University",
    degree: "Software Engineering & Information Systems",
    period: "2023 – 2026",
  },
  {
    school: "ISET Kélibia",
    degree: "Information Systems Development",
    period: "2020 – 2023",
  },
];
