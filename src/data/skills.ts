import type { LearningSkills, SkillGroup } from "@/lib/types";

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
    name: "DevOps & CI/CD",
    core: [
      { name: "Docker", role: "Containerization" },
      { name: "Docker Compose", role: "Multi-container orchestration" },
      { name: "Jenkins", role: "CI/CD automation" },
      { name: "GitHub Actions", role: "CI/CD workflows" },
      { name: "GitLab CI/CD", role: "Build pipelines" },
      { name: "Nexus", role: "Artifact registry" },
    ],
    more: ["Git", "GitHub"],
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
    name: "Infrastructure & Monitoring",
    core: [
      { name: "Linux", role: "Server administration" },
      { name: "Prometheus", role: "Metrics collection" },
      { name: "Grafana", role: "Observability dashboards" },
    ],
    more: ["Ubuntu Server"],
  },
  {
    name: "Quality & Security",
    core: [
      { name: "SonarQube", role: "Code quality gates" },
      { name: "Trivy", role: "Image vulnerability scans" },
      { name: "OWASP ZAP", role: "Security audits" },
      { name: "JMeter", role: "Load testing" },
      { name: "Static Analysis", role: "Code health" },
      { name: "Testing", role: "Unit & smoke tests" },
    ],
    more: ["Load testing", "Scrum/Agile", "MVC", "N-tier", "Microservices"],
  },
];

/**
 * Skills being learned in the 2026 DevOps & DevSecOps training, kept apart from skills already used on
 * delivered projects. Once the practice project is online: move these into `skillGroups` above and set
 * `proof` (or delete this block) so every listed skill links to real work.
 */
export const learningSkills: LearningSkills = {
  title: "Currently learning (2026 training)",
  note: "DevOps & DevSecOps training — deploying a full-stack application to a secured VPS with CI/CD. These move to the main list once the practice project is online.",
  core: [
    { name: "Ansible", role: "Infrastructure as Code" },
    { name: "Nginx", role: "Reverse proxy & HTTPS" },
    { name: "VPS deployment", role: "Deploying to a remote server" },
    { name: "SSH", role: "Secure remote access" },
    { name: "Domain & DNS setup", role: "Custom domains" },
    { name: "Snyk", role: "Dependency vulnerability scans" },
    { name: "DevSecOps", role: "Security built into the pipeline" },
    { name: "Secrets management", role: "Credentials kept out of code" },
    { name: "Firewall configuration", role: "Server network hardening" },
    { name: "Let's Encrypt", role: "SSL/TLS certificates" },
  ],
};
