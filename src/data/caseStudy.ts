import type { CaseStudy } from "@/lib/types";

/** AnalyseImpacte — internship case study (Capgemini Engineering), grounded in the end-of-study internship report. */
export const analyseImpacte: CaseStudy = {
  title: "AnalyseImpacte",
  subtitle: "AI-Assisted Impact Analysis Platform for Aerospace Software",
  context: [
    "End-of-study internship",
    "Capgemini Engineering",
    "Aerospace · Safety-Critical",
    "DO-178C · DAL A",
    "4 Scrum sprints",
  ],
  problem:
    "After every code change, engineers had to manually trace its impact on requirements and update the certified design document (SDDD). Under DO-178C traceability rules, this took 3–5 days per cycle — slow, costly and exposed to human error.",
  solution:
    "A full-stack platform that parses source code, requirements (SRD) and design documents (SDDD), classifies cross-impacts across 4 severity levels, and drafts documentation updates with a local LLM grounded by a deterministic AST parser.",
  results: [
    {
      kind: "before-after",
      before: "3–5 days",
      after: "< 10 min",
      label: "Design-document update cycle",
      detail: "Manual workflow → automated analysis",
    },
    {
      kind: "counter",
      value: 9,
      label: "CI/CD pipeline stages",
      detail: "Jenkins · quality gate · automatic rollback",
    },
    {
      kind: "counter",
      value: 100,
      suffix: "%",
      label: "JMeter load-test success",
      detail: "50 concurrent users",
    },
    {
      kind: "counter",
      value: 0,
      label: "Critical vulnerabilities",
      detail: "OWASP ZAP · 1,686 attack requests",
    },
  ],
  workflow: [
    { title: "Source Code", caption: "Code, SRD & SDDD imported" },
    { title: "Static Analysis", caption: "Deterministic AST parsing" },
    { title: "Impact Analysis", caption: "Cross-impact matrix, 4 severity levels" },
    { title: "Local AI", caption: "Ollama · qwen2.5-coder, grounded output" },
    { title: "SDDD Update", caption: "DO-178C traceability, PDF & CSV reports" },
    { title: "Testing", caption: "SonarQube, JMeter, OWASP ZAP" },
    { title: "CI/CD", caption: "9-stage Jenkins pipeline" },
    { title: "Deployment", caption: "Docker, rollback, Prometheus & Grafana" },
  ],
  architecture: [
    {
      icon: "sparkles",
      title: "AI Layer",
      items: ["Ollama · qwen2.5-coder", "AST-grounded generation", "Anti-hallucination safeguards", "4-mode intent routing"],
    },
    {
      icon: "server",
      title: "Backend",
      items: ["Java 21 · Spring Boot", "REST APIs · Swagger", "JWT authentication · RBAC", "SQLite"],
    },
    {
      icon: "monitor",
      title: "Frontend",
      items: ["Angular", "Impact analysis workspace", "Natural-language analytics", "Conversational AI copilot"],
    },
    {
      icon: "shield",
      title: "Security",
      items: ["Trivy image scanning", "OWASP ZAP audit", "Secrets in Jenkins Credentials", "Role-based access control"],
    },
    {
      icon: "infinity",
      title: "CI/CD",
      items: ["Jenkins · 9 stages", "SonarQube quality gate", "Nexus image registry", "Multi-stage Docker images"],
    },
    {
      icon: "activity",
      title: "Monitoring",
      items: ["Prometheus metrics", "Grafana dashboards", "Post-deploy smoke tests", "Automatic rollback"],
    },
  ],
  tech: ["Java 21", "Spring Boot", "Angular", "SQLite", "Ollama", "Jenkins", "Docker", "Prometheus", "Grafana"],
  note: "Delivered during my end-of-study internship at Capgemini Engineering (Feb – Jun 2026) — client code is confidential.",
};
