import type { EducationItem, FocusArea, IdentityFact, ImpactPillar, Profile, WorkflowStep } from "@/lib/types";

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
  photo: {
    src: "/images/malak-profile.webp",
    alt: "Portrait of Malak Ben Hassine, Software Engineer",
    width: 1268,
    height: 1240,
  },
  cvPath: "/cv/Malak-Ben-Hassine-CV.pdf",
};

/** "From code to production" — the delivery chain visualized in the About section. */
export const deliveryFlow: WorkflowStep[] = [
  { title: "Code", caption: "Java · Python · TypeScript" },
  { title: "Backend", caption: "Spring Boot · REST APIs · JWT/RBAC" },
  { title: "AI", caption: "Local LLMs · RAG · grounded generation" },
  { title: "CI/CD", caption: "Jenkins · Docker · Nexus" },
  { title: "Security", caption: "SonarQube · Trivy · OWASP ZAP" },
  { title: "Monitoring", caption: "Prometheus · Grafana" },
  { title: "Production", caption: "Smoke tests · automatic rollback" },
];

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
    metric: "3–5 days → < 10 min",
    proof: "Turned a manual, multi-day documentation workflow into an automated run.",
  },
  {
    icon: "sparkles",
    title: "AI Integration",
    metric: "AST + local LLM",
    proof: "Generation grounded by a deterministic parser, with anti-hallucination safeguards.",
  },
  {
    icon: "infinity",
    title: "CI/CD",
    metric: "9-stage Jenkins pipeline",
    proof: "Quality gate, image registry and automatic rollback on every delivery.",
  },
  {
    icon: "shield",
    title: "Security",
    metric: "OWASP ZAP + Trivy",
    proof: "1,686 attack requests audited, container images scanned, JWT & RBAC.",
  },
  {
    icon: "beaker",
    title: "Testing",
    metric: "JMeter + SonarQube",
    proof: "100% success with 50 concurrent users, static analysis on every build.",
  },
  {
    icon: "activity",
    title: "Monitoring",
    metric: "Prometheus + Grafana",
    proof: "Live system and container metrics, plus post-deploy smoke tests.",
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
