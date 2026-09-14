import {
  siAngular,
  siApachejmeter,
  siApachemaven,
  siBootstrap,
  siDjango,
  siDocker,
  siDotnet,
  siEjs,
  siExpress,
  siFastapi,
  siGit,
  siGitlab,
  siGrafana,
  siHuggingface,
  siJavascript,
  siJenkins,
  siJsonwebtokens,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOllama,
  siOpenjdk,
  siOwasp,
  siPhp,
  siPostgresql,
  siPrometheus,
  siPython,
  siQdrant,
  siReact,
  siScikitlearn,
  siSonarqubeserver,
  siSonatype,
  siSpring,
  siSpringboot,
  siSqlite,
  siStreamlit,
  siSwagger,
  siSymfony,
  siTailwindcss,
  siTrivy,
  siTypescript,
  siUbuntu,
  siVuedotjs,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

export interface TechIconData {
  path: string;
  /** Brand color, lightened fallback when too dark for the dark theme. */
  color: string;
}

const iconsByTech: Record<string, SimpleIcon> = {
  Java: siOpenjdk,
  "Java 21": siOpenjdk,
  Python: siPython,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  PHP: siPhp,
  "Spring Boot": siSpringboot,
  "Spring Security": siSpring,
  "Spring Data JPA": siSpring,
  ".NET Core": siDotnet,
  Django: siDjango,
  FastAPI: siFastapi,
  "Node.js": siNodedotjs,
  Express: siExpress,
  EJS: siEjs,
  "Entity Framework": siDotnet,
  Symfony: siSymfony,
  Maven: siApachemaven,
  Angular: siAngular,
  React: siReact,
  "Next.js": siNextdotjs,
  "Vue.js": siVuedotjs,
  "Tailwind CSS": siTailwindcss,
  Bootstrap: siBootstrap,
  Ollama: siOllama,
  "Local LLMs (Ollama)": siOllama,
  "Sentence Transformers": siHuggingface,
  "Sentence-Transformers": siHuggingface,
  Qdrant: siQdrant,
  "Scikit-learn": siScikitlearn,
  Streamlit: siStreamlit,
  Docker: siDocker,
  "Docker Compose": siDocker,
  Jenkins: siJenkins,
  "GitLab CI/CD": siGitlab,
  SonarQube: siSonarqubeserver,
  Nexus: siSonatype,
  Trivy: siTrivy,
  Prometheus: siPrometheus,
  Grafana: siGrafana,
  Git: siGit,
  "Ubuntu Server": siUbuntu,
  MySQL: siMysql,
  PostgreSQL: siPostgresql,
  SQLite: siSqlite,
  MongoDB: siMongodb,
  JMeter: siApachejmeter,
  "Apache JMeter": siApachejmeter,
  "OWASP ZAP": siOwasp,
  "Swagger/OpenAPI": siSwagger,
  JWT: siJsonwebtokens,
};

const FALLBACK_COLOR = "#a3bcff";

function relativeLuminance(hex: string): number {
  const channels = [0, 2, 4].map((offset) => {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export function getTechIcon(tech: string): TechIconData | null {
  const icon = iconsByTech[tech];
  if (!icon) return null;
  const isReadableOnDark = relativeLuminance(icon.hex) > 0.12;
  return { path: icon.path, color: isReadableOnDark ? `#${icon.hex}` : FALLBACK_COLOR };
}

/** Two-letter monogram for technologies without a logo. */
export function getTechMonogram(tech: string): string {
  const cleaned = tech.replace(/[^A-Za-z0-9#+ ]/g, " ").trim();
  const words = cleaned.split(/\s+/);
  if (words.length > 1) return `${words[0][0]}${words[1][0]}`.toUpperCase();
  if (cleaned.length <= 4) return cleaned;
  return cleaned.slice(0, 2).toUpperCase();
}
