import type { ExperienceItem } from "@/lib/types";

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer — End-of-Study Internship",
    company: "Capgemini Engineering",
    location: "Tunisia",
    period: "Feb 2026 – Jun 2026",
    featured: true,
    context: ["AnalyseImpacte", "Aerospace · Safety-Critical", "DO-178C · DAL A", "4 Scrum sprints", "9-stage Jenkins pipeline"],
    impact: { before: "3–5 days", after: "< 10 min", label: "Design-document update cycle" },
    highlights: [
      "Reduced a certified aeronautical design-document update cycle (DO-178C, DAL A) from 3-5 days to under 10 minutes, designing AnalyseImpacte end-to-end for a major client in the aerospace industry, across 4 Scrum sprints",
      "Built a full-stack application (Java 21 / Spring Boot / Angular / SQLite) with JWT authentication, RBAC role management, and REST APIs documented via Swagger",
      "Automated cross-impact classification (code / requirements) across 4 severity levels, with full DO-178C traceability and CSV export",
      "Designed an AI-assisted documentation pipeline combining a deterministic AST parser with a local LLM (Ollama, qwen2.5-coder), with anti-hallucination safeguards rejecting any content not grounded in the source code",
      "Delivered a conversational AI copilot with 4-mode intent routing and a natural-language analytics dashboard",
      "Built a 9-stage Jenkins CI/CD pipeline (SonarQube, Trivy, Nexus, Docker, automatic rollback) with Prometheus/Grafana monitoring — validated with 100% success on JMeter load testing (50 concurrent users) and zero critical vulnerabilities across 1,686 OWASP ZAP attack requests",
    ],
    tech: [
      "Java 21",
      "Spring Boot",
      "Angular",
      "Ollama",
      "Jenkins",
      "Docker",
      "SonarQube",
      "Trivy",
      "Nexus",
      "Prometheus",
      "Grafana",
    ],
    caseStudy: { label: "AnalyseImpacte case study", href: "#case-study" },
  },
  {
    role: "Software Engineering Intern",
    company: "Crosschain Solutions",
    location: "Tunisia",
    period: "Jul 2025 – Sep 2025",
    context: ["Tokenized micro-donation platform"],
    highlights: [
      "Developed and secured REST APIs with JWT authentication for a tokenized micro-donation platform (Spring Boot)",
      "Wrote technical specifications for 3 functional modules after gathering requirements directly from stakeholders, unblocking sprint planning for the team",
    ],
    tech: ["Spring Boot", "JWT", "REST APIs"],
  },
  {
    role: "End-of-Study Internship — Senior Technician",
    company: "Lézard Com",
    location: "Tunisia",
    period: "Feb 2023 – Jun 2023",
    context: ["Guesthouse rental application"],
    highlights: [
      "Solo-delivered a full-stack guesthouse rental application (Spring Boot, Angular, Spring Security) with a normalized MySQL data model — first end-to-end production-type project",
    ],
    tech: ["Spring Boot", "Angular", "Spring Security", "MySQL"],
  },
];
