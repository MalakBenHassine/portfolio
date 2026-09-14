import type { EducationItem, FocusArea, IdentityFact, ImpactPillar, Profile } from "@/lib/types";

export const profile: Profile = {
  name: "Malak Ben Hassine",
  firstName: "Malak",
  role: "Software Engineer",
  specialties: ["Full-Stack", "Applied AI", "DevOps"],
  headline:
    "I build production-ready software, automate complex engineering workflows, and integrate AI where it creates real value.",
  tagline:
    "I turn multi-day manual engineering processes into automated pipelines that run in minutes.",
  email: "benhassinemalak4@gmail.com",
  location: "Based in Tunisia · Open to international",
  availability: "Open to Full-Time Opportunities",
  workRegions: "Tunisia & International",
  github: "https://github.com/MalakBenHassine",
  linkedin: "https://www.linkedin.com/in/malakbenhassine/",
  about: [
    "Software engineer who designs and delivers complete, production-ready systems — from the backend and user interface to the AI layer and the pipeline that deploys them.",
    "At Capgemini Engineering, I built AnalyseImpacte end-to-end for safety-critical aerospace software (DO-178C, DAL A). The application reduced a 3–5 day manual design-document update cycle to under 10 minutes, and ships through a 9-stage Jenkins pipeline with quality gates, security scanning and automatic rollback — validated by load testing and a 1,686-request OWASP ZAP security audit.",
    "I'm looking for a full-time role where I can own features from design to production, in Tunisia or internationally.",
  ],
  cvPath: "/cv/Malak-Ben-Hassine-CV.pdf",
};

export const identityFacts: IdentityFact[] = [
  {
    icon: "code",
    label: "Role",
    value: "Software Engineer",
    detail: "Full-Stack · Applied AI · DevOps",
  },
  {
    icon: "briefcase",
    label: "Latest experience",
    value: "Capgemini Engineering",
    detail: "Aerospace · Feb – Jun 2026",
  },
  {
    icon: "mapPin",
    label: "Location",
    value: "Tunisia",
    detail: "Open to international roles",
  },
  {
    icon: "graduation",
    label: "Education",
    value: "Software Engineering",
    detail: "Tek-Up University · 2026",
  },
];

export const focusAreas: FocusArea[] = [
  {
    icon: "code",
    title: "Full-Stack Engineering",
    items: ["Java", "Spring Boot", "Angular", "React", "Python"],
  },
  {
    icon: "sparkles",
    title: "Applied AI",
    items: ["LLMs", "Ollama", "RAG", "AI Automation"],
  },
  {
    icon: "infinity",
    title: "DevOps",
    items: ["Docker", "Jenkins", "CI/CD", "Monitoring"],
  },
  {
    icon: "shield",
    title: "Software Quality",
    items: ["Testing", "Security", "SonarQube", "OWASP"],
  },
];

export const impactPillars: ImpactPillar[] = [
  {
    icon: "bolt",
    title: "Automation",
    proof: "Turned a 3–5 day manual documentation workflow into a run of under 10 minutes.",
  },
  {
    icon: "sparkles",
    title: "AI Integration",
    proof: "Local LLM grounded by a deterministic AST parser, with anti-hallucination safeguards.",
  },
  {
    icon: "infinity",
    title: "CI/CD",
    proof: "9-stage Jenkins pipeline with quality gate, image registry and automatic rollback.",
  },
  {
    icon: "shield",
    title: "Security",
    proof: "JWT & RBAC, Trivy image scans and an OWASP ZAP audit of 1,686 attack requests.",
  },
  {
    icon: "beaker",
    title: "Testing",
    proof: "SonarQube analysis on every build, JMeter load tests with 50 concurrent users.",
  },
  {
    icon: "activity",
    title: "Monitoring",
    proof: "Prometheus metrics and Grafana dashboards, plus post-deploy smoke tests.",
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
