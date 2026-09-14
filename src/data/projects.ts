import type { Project, ProjectCategory } from "@/lib/types";

export const projectCategories: ProjectCategory[] = ["Full-Stack", "AI", "DevOps"];

export const projects: Project[] = [
  {
    slug: "analyseimpacte",
    title: "AnalyseImpacte",
    subtitle: "AI-assisted impact analysis · Capgemini Engineering",
    description:
      "AI-assisted impact analysis system for certified aeronautical software, cutting a 3-5 day manual process to under 10 minutes.",
    result: "3–5 days → under 10 minutes, shipped through a 9-stage CI/CD pipeline",
    categories: ["Full-Stack", "AI", "DevOps"],
    featured: true,
    tech: ["Java 21", "Spring Boot", "Angular", "SQLite", "Ollama", "Jenkins", "Docker", "Prometheus", "Grafana"],
    links: [{ kind: "case-study", label: "Read the case study", href: "#projects" }],
    note: "Client project — source code confidential",
  },
  {
    slug: "careermatch",
    title: "CareerMatch",
    subtitle: "AI-Powered RH Matching",
    description:
      "Semantic candidate-job matching engine reaching 90% scoring accuracy, auto-generating 10 personalized interview questions via Llama 3.2.",
    result: "90% scoring accuracy · 10 tailored interview questions per candidate",
    categories: ["AI"],
    tech: ["Python", "FastAPI", "Streamlit", "Qdrant", "Sentence-Transformers", "Ollama", "Docker Compose"],
    links: [
      { kind: "github", label: "Source code", href: "https://github.com/MalakBenHassine/CareerMatch" },
    ],
  },
  {
    slug: "assistant-medical-intelligent",
    title: "Assistant Médical Intelligent",
    subtitle: "Clinic SaaS · MedFlow",
    description:
      "Multi-tenant clinical management platform (patients, consultations, invoices, prescriptions) with an AI-assisted diagnosis endpoint.",
    result: "Multi-tenant SaaS with role-based dashboards and AI-assisted diagnosis",
    categories: ["Full-Stack", "AI"],
    tech: ["React", "Next.js", "Tailwind CSS", "Python", "Django", "PostgreSQL", "Scikit-learn", "Docker", "GitLab CI/CD"],
    links: [
      { kind: "github", label: "Frontend", href: "https://github.com/MalakBenHassine/Med-Flow-Front" },
      { kind: "github", label: "Backend", href: "https://github.com/MalakBenHassine/medflow-backend" },
    ],
  },
  {
    slug: "hr-platform-ai",
    title: "HR Platform with AI",
    subtitle: "Team project",
    description:
      "Automated resume screening via matching algorithm, HR chatbot for candidates, and employee wellbeing reporting tool.",
    result: "Automated resume screening, candidate chatbot and wellbeing reports",
    categories: ["Full-Stack", "AI"],
    tech: [".NET Core", "Angular", "SQL Server", "Entity Framework"],
    links: [{ kind: "github", label: "Source code", href: "https://github.com/MalakBenHassine/back-hr" }],
  },
];
