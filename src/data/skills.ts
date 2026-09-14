import type { SkillGroup } from "@/lib/types";

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    core: ["Java", "Python", "TypeScript", "JavaScript", "C#", "PHP", "SQL"],
  },
  {
    name: "Backend",
    core: ["Spring Boot", "Spring Security", ".NET Core", "Django", "FastAPI", "Node.js"],
    more: ["Spring Data JPA", "Symfony", "Maven", "REST APIs", "Swagger/OpenAPI", "JWT", "RBAC"],
  },
  {
    name: "Frontend",
    core: ["Angular", "React", "Vue.js", "Tailwind CSS"],
    more: ["Bootstrap"],
  },
  {
    name: "AI",
    core: ["LLMs", "Ollama", "RAG", "Sentence Transformers", "Machine Learning"],
    more: ["Text-to-SQL", "Qdrant", "Deep Learning"],
  },
  {
    name: "DevOps",
    core: ["Docker", "Jenkins", "GitLab CI/CD", "SonarQube", "Nexus", "Trivy"],
    more: ["Prometheus", "Grafana", "Ubuntu Server", "Git"],
    wide: true,
  },
  {
    name: "Databases",
    core: ["MySQL", "PostgreSQL", "SQL Server", "SQLite", "MongoDB"],
  },
  {
    name: "Quality & Security",
    core: ["JMeter", "OWASP ZAP", "Static Analysis", "Testing"],
    more: ["Load testing", "Scrum/Agile", "MVC", "N-tier", "Microservices"],
    wide: true,
  },
];
