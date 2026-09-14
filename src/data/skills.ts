import type { SkillGroup } from "@/lib/types";

export const skillGroups: SkillGroup[] = [
  {
    name: "AI",
    skills: [
      "Local LLMs (Ollama)",
      "RAG",
      "Text-to-SQL",
      "Sentence-Transformers",
      "Qdrant",
      "Machine Learning",
      "Deep Learning",
    ],
  },
  {
    name: "Languages",
    skills: ["Java", "Python", "TypeScript", "JavaScript", "C#", "PHP", "SQL"],
  },
  {
    name: "Backend",
    skills: [
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      ".NET Core",
      "Django",
      "FastAPI",
      "Node.js",
      "Symfony",
      "Maven",
    ],
  },
  {
    name: "Frontend",
    skills: ["Angular", "React", "Vue.js", "Bootstrap", "Tailwind CSS"],
  },
  {
    name: "API & Security",
    skills: ["REST APIs", "Swagger/OpenAPI", "JWT", "RBAC", "OWASP ZAP"],
  },
  {
    name: "Databases",
    skills: ["MySQL", "PostgreSQL", "SQL Server", "SQLite", "MongoDB"],
  },
  {
    name: "DevOps & CI/CD",
    skills: [
      "Docker",
      "Jenkins",
      "GitLab CI/CD",
      "SonarQube",
      "Nexus",
      "Trivy",
      "Prometheus",
      "Grafana",
      "Ubuntu Server",
      "Git",
    ],
  },
  {
    name: "Quality & Methods",
    skills: [
      "Apache JMeter",
      "Load testing",
      "Static analysis",
      "Scrum/Agile",
      "MVC",
      "N-tier",
      "Microservices",
    ],
  },
];
