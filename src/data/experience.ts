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
      "Reduced the update cycle of a certified aeronautical design document (DO-178C, DAL A) from 3–5 days to under 10 minutes by designing AnalyseImpacte end to end for a major aerospace client, over 4 Scrum sprints",
      "Automated cross-impact classification between C code and requirements (SRD) on 4 severity levels, with full DO-178C traceability (Refined / Extended / Derived) and CSV export",
      "Kept AI-generated documentation grounded: a deterministic AST parser feeds a local LLM (Ollama, qwen2.5-coder), and safeguards reject any content not found in the source code",
      "Validated a 9-stage Jenkins CI/CD pipeline (SonarQube, Trivy, Nexus, Docker, automatic rollback) at 100% success under JMeter load testing with 50 concurrent users and 0 critical vulnerabilities across 1,686 OWASP ZAP attack requests, monitored with Prometheus and Grafana",
      "Delivered a conversational copilot with 4-mode intent routing and a natural-language dashboard to query the analysis history",
      "Developed the full-stack application (Java 21, Spring Boot, Angular, SQLite) with JWT authentication, RBAC role management and REST APIs documented in Swagger",
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
      "Unblocked the team's sprint planning by writing the technical specifications of 3 functional modules, from requirements gathered directly with stakeholders",
      "Developed and secured the REST APIs of a tokenized micro-donation platform with JWT authentication (Spring Boot)",
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
      "Delivered, alone, a complete guesthouse rental application — from the normalized MySQL data model to the Spring Boot API secured with Spring Security and the Angular interface",
    ],
    tech: ["Spring Boot", "Angular", "Spring Security", "MySQL"],
  },
];
