import type { Project, ProjectCategory } from "@/lib/types";

export const projectCategories: ProjectCategory[] = ["Full-Stack", "AI", "DevOps"];

/**
 * Personal and team projects with public source code on GitHub.
 * Internship work (AnalyseImpacte at Capgemini Engineering) lives in the Experience section.
 *
 * Writing rules: lead with the outcome, keep numbers that exist in the CV or the repository,
 * active voice, and name only technologies and features present in the linked code.
 */
export const projects: Project[] = [
  {
    slug: "careermatch",
    visual: "matching",
    title: "CareerMatch",
    subtitle: "RAG-based HR matching engine",
    description:
      "Matched candidates to job postings with 90% scoring accuracy, combining semantic search (Sentence-Transformers embeddings in Qdrant) with a local LLM.",
    result: "Generated 10 personalized interview questions per match with Llama 3.2 on Ollama, served through a FastAPI API and a Streamlit interface.",
    categories: ["AI"],
    tech: ["Python", "FastAPI", "Sentence-Transformers", "Qdrant", "Ollama", "Streamlit", "Docker Compose"],
    links: [{ kind: "github", label: "Source code", href: "https://github.com/MalakBenHassine/CareerMatch" }],
  },
  {
    slug: "assistant-medical-intelligent",
    visual: "clinic",
    title: "Assistant Médical Intelligent",
    subtitle: "MedFlow · Clinic SaaS · Team project",
    description:
      "Developed a multi-tenant clinic management platform (patients, appointments, consultations, billing) with authentication and role-based access control via NextAuth.",
    result: "Separated access for 4 roles (admin, doctor, receptionist, patient) and automated Docker image builds with a GitLab CI/CD pipeline.",
    categories: ["Full-Stack", "DevOps"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "NextAuth", "Django", "PostgreSQL", "Docker", "GitLab CI/CD"],
    links: [
      { kind: "github", label: "Frontend", href: "https://github.com/MalakBenHassine/Med-Flow-Front" },
      { kind: "github", label: "Backend", href: "https://github.com/MalakBenHassine/medflow-backend" },
    ],
  },
  {
    slug: "hr-platform-ai",
    visual: "chat",
    title: "HR Platform with AI",
    subtitle: "ApricityHR · Team project",
    description:
      "Automated resume screening: parsed PDF CVs and ranked each application by an adequacy score, the percentage of required skills the candidate matches.",
    result: "Added a candidate-facing HR chatbot on a local LLM (Ollama, Llama 3) and employee well-being surveys, behind JWT authentication.",
    categories: ["Full-Stack", "AI"],
    tech: [".NET Core", "C#", "Entity Framework", "SQL Server", "Ollama", "JWT"],
    links: [{ kind: "github", label: "Backend source", href: "https://github.com/MalakBenHassine/back-hr" }],
  },
  {
    slug: "event-app",
    visual: "events",
    title: "Event-App",
    subtitle: "Event management · Team project",
    description:
      "Delivered an event management platform with participant registration and user–event matching, as a 4-person academic team.",
    result: "Covered reservations and users with PHPUnit unit and functional tests, and containerized the app with Docker Compose.",
    categories: ["Full-Stack"],
    tech: ["PHP", "Symfony", "Twig", "JavaScript", "Docker"],
    links: [{ kind: "github", label: "Source code", href: "https://github.com/MalakBenHassine/Event-App" }],
  },
  {
    slug: "gestion-rdv",
    visual: "scheduling",
    title: "Gestion-RDV",
    subtitle: "Appointment scheduling",
    description:
      "Built patient–doctor appointment booking: availability slots generated per doctor at a set interval, booked by patients and confirmed by doctors.",
    result: "Secured accounts with bcrypt-hashed passwords and JWT access and refresh tokens, on an Express, EJS and MongoDB stack.",
    categories: ["Full-Stack"],
    tech: ["Node.js", "Express", "EJS", "MongoDB", "JWT", "JavaScript"],
    links: [{ kind: "github", label: "Source code", href: "https://github.com/MalakBenHassine/Gestion-RDV" }],
  },
];
