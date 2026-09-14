import type { Project, ProjectCategory } from "@/lib/types";

export const projectCategories: ProjectCategory[] = ["Full-Stack", "AI", "DevOps"];

export const projects: Project[] = [
  {
    slug: "analyseimpacte",
    title: "AnalyseImpacte",
    subtitle: "Flagship project · Capgemini Engineering",
    description:
      "AI-assisted impact analysis system for certified aeronautical software, cutting a 3-5 day manual process to under 10 minutes.",
    categories: ["AI", "DevOps"],
    featured: true,
    highlights: [
      "3–5 days → under 10 minutes",
      "9-stage Jenkins CI/CD pipeline",
      "100% success under JMeter load testing",
      "0 critical vulnerabilities across 1,686 security tests",
    ],
    tech: [
      "Java 21",
      "Spring Boot",
      "Angular",
      "SQLite",
      "Ollama",
      "Jenkins",
      "Docker",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    slug: "careermatch",
    title: "CareerMatch",
    subtitle: "AI-Powered RH Matching",
    description:
      "Semantic candidate-job matching engine reaching 90% scoring accuracy, auto-generating 10 personalized interview questions via Llama 3.2.",
    categories: ["AI"],
    tech: [
      "Python",
      "FastAPI",
      "Streamlit",
      "Qdrant",
      "Sentence-Transformers",
      "Ollama",
      "Docker Compose",
    ],
  },
  {
    slug: "assistant-medical-intelligent",
    title: "Assistant Médical Intelligent",
    subtitle: "Clinic SaaS",
    description:
      "Multi-tenant clinical management platform (patients, consultations, invoices, prescriptions) with an AI-assisted diagnosis endpoint.",
    categories: ["Full-Stack", "AI"],
    tech: [
      "React",
      "Tailwind CSS",
      "Python",
      "Django",
      "PostgreSQL",
      "Scikit-learn",
      "Docker",
      "GitLab CI/CD",
    ],
  },
  {
    slug: "hr-platform-ai",
    title: "HR Platform with AI",
    description:
      "Automated resume screening via matching algorithm, HR chatbot for candidates, and employee wellbeing reporting tool.",
    categories: ["Full-Stack", "AI"],
    tech: [".NET Core", "Angular", "SQL Server", "Entity Framework"],
  },
];
