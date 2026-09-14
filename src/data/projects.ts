import type { Project, ProjectCategory } from "@/lib/types";

export const projectCategories: ProjectCategory[] = ["Full-Stack", "AI", "DevOps"];

/**
 * Personal and team projects with public source code on GitHub.
 * Internship work (AnalyseImpacte at Capgemini Engineering) lives in the Experience section.
 * Every claim below is verifiable in the linked repositories.
 */
export const projects: Project[] = [
  {
    slug: "careermatch",
    title: "CareerMatch",
    subtitle: "RAG-based HR matching engine",
    description:
      "Semantic candidate-to-job matching engine combining vector search and a local LLM, with automatic generation of personalized interview questions.",
    result: "90% scoring accuracy · 10 personalized interview questions per match (Llama 3.2)",
    categories: ["AI"],
    tech: ["Python", "FastAPI", "Sentence-Transformers", "Qdrant", "Ollama", "Streamlit", "Docker Compose"],
    links: [{ kind: "github", label: "Source code", href: "https://github.com/MalakBenHassine/CareerMatch" }],
  },
  {
    slug: "assistant-medical-intelligent",
    title: "Assistant Médical Intelligent",
    subtitle: "MedFlow · Clinic SaaS · Team project",
    description:
      "Multi-tenant clinic management platform: patient records, appointments, consultations, prescriptions and billing, with role-based dashboards for admins, doctors, receptionists and patients.",
    result: "Stripe payments, PDF invoices, JWT sessions via NextAuth, and a GitLab CI/CD pipeline building Docker images",
    categories: ["Full-Stack", "DevOps"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "NextAuth", "Django", "PostgreSQL", "Docker", "GitLab CI/CD"],
    links: [
      { kind: "github", label: "Frontend", href: "https://github.com/MalakBenHassine/Med-Flow-Front" },
      { kind: "github", label: "Backend", href: "https://github.com/MalakBenHassine/medflow-backend" },
    ],
  },
  {
    slug: "hr-platform-ai",
    title: "HR Platform with AI",
    subtitle: "ApricityHR · Team project",
    description:
      "AI-powered HR platform: automated resume screening with a matching algorithm, a candidate-facing HR chatbot, and employee well-being surveys and reports.",
    result: "HR assistant chatbot on a custom local LLM (Ollama, Llama 3) and PDF resume parsing with match scoring",
    categories: ["Full-Stack", "AI"],
    tech: [".NET Core", "C#", "Entity Framework", "SQL Server", "Ollama", "JWT", "Angular"],
    links: [{ kind: "github", label: "Backend source", href: "https://github.com/MalakBenHassine/back-hr" }],
  },
  {
    slug: "event-app",
    title: "Event-App",
    subtitle: "Event management · Team project",
    description:
      "Event management platform with participant registration and matching between users and events, built as an academic team project.",
    result: "Event and participant management, user–event matching, functional tests, Docker setup",
    categories: ["Full-Stack"],
    tech: ["PHP", "Symfony", "Twig", "JavaScript", "Docker"],
    links: [{ kind: "github", label: "Source code", href: "https://github.com/MalakBenHassine/Event-App" }],
  },
  {
    slug: "gestion-rdv",
    title: "Gestion-RDV",
    subtitle: "Appointment scheduling",
    description: "Appointment management application with server-rendered views and an MVC-style structure.",
    result: "Appointment creation and scheduling with controllers, models, routes and middlewares",
    categories: ["Full-Stack"],
    tech: ["Node.js", "Express", "EJS", "JavaScript"],
    links: [{ kind: "github", label: "Source code", href: "https://github.com/MalakBenHassine/Gestion-RDV" }],
  },
];
