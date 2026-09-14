import type { SkillGroup } from "@/lib/types";

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    core: [
      { name: "Java", role: "Enterprise backends" },
      { name: "Python", role: "AI services & APIs" },
      { name: "TypeScript", role: "Typed frontends" },
      { name: "JavaScript", role: "Web interactivity" },
      { name: "C#", role: ".NET services" },
      { name: "PHP", role: "Symfony apps" },
      { name: "SQL", role: "Data modeling" },
    ],
  },
  {
    name: "Backend",
    core: [
      { name: "Spring Boot", role: "Production REST APIs" },
      { name: "Spring Security", role: "JWT auth & RBAC" },
      { name: ".NET Core", role: "Enterprise APIs" },
      { name: "Django", role: "Multi-tenant platforms" },
      { name: "FastAPI", role: "AI service endpoints" },
      { name: "Node.js", role: "Lightweight servers" },
    ],
    more: ["Spring Data JPA", "Symfony", "Maven", "REST APIs", "Swagger/OpenAPI", "JWT", "RBAC"],
  },
  {
    name: "Frontend",
    core: [
      { name: "Angular", role: "Frontend engineering" },
      { name: "React", role: "Component UIs" },
      { name: "Vue.js", role: "Reactive interfaces" },
      { name: "Tailwind CSS", role: "Design systems" },
    ],
    more: ["Bootstrap"],
  },
  {
    name: "AI",
    core: [
      { name: "LLMs", role: "Grounded generation" },
      { name: "Ollama", role: "Local LLM execution" },
      { name: "RAG", role: "Retrieval pipelines" },
      { name: "Sentence Transformers", role: "Semantic embeddings" },
      { name: "Machine Learning", role: "Predictive models" },
    ],
    more: ["Text-to-SQL", "Qdrant", "Deep Learning"],
  },
  {
    name: "DevOps",
    core: [
      { name: "Docker", role: "Containerization" },
      { name: "Jenkins", role: "CI/CD automation" },
      { name: "GitLab CI/CD", role: "Build pipelines" },
      { name: "SonarQube", role: "Code quality gates" },
      { name: "Nexus", role: "Artifact registry" },
      { name: "Trivy", role: "Image vulnerability scans" },
    ],
    more: ["Prometheus", "Grafana", "Ubuntu Server", "Git"],
    wide: true,
  },
  {
    name: "Databases",
    core: [
      { name: "MySQL", role: "Relational schemas" },
      { name: "PostgreSQL", role: "Production data" },
      { name: "SQL Server", role: ".NET persistence" },
      { name: "SQLite", role: "Embedded storage" },
      { name: "MongoDB", role: "Document storage" },
    ],
  },
  {
    name: "Quality & Security",
    core: [
      { name: "JMeter", role: "Load testing" },
      { name: "OWASP ZAP", role: "Security audits" },
      { name: "Static Analysis", role: "Code health" },
      { name: "Testing", role: "Unit & smoke tests" },
    ],
    more: ["Load testing", "Scrum/Agile", "MVC", "N-tier", "Microservices"],
    wide: true,
  },
];
