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
  about: [
    "Software engineer who designs and delivers complete, production-ready systems — from the backend and user interface to the AI layer and the pipeline that deploys them.",
    "At Capgemini Engineering, I built AnalyseImpacte end-to-end for safety-critical aerospace software (DO-178C, DAL A). The application reduced a 3–5 day manual design-document update cycle to under 10 minutes, and ships through a 9-stage Jenkins pipeline with quality gates, security scanning and automatic rollback — validated by load testing and a 1,686-request OWASP ZAP security audit.",
    "I'm looking for a full-time role where I can own features from design to production, in Tunisia or internationally.",
  ],
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
