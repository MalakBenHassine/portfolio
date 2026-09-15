import {
  siAnsible,
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
  siGithubactions,
  siGitlab,
  siGrafana,
  siHuggingface,
  siJavascript,
  siJenkins,
  siJsonwebtokens,
  siLetsencrypt,
  siLinux,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNginx,
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
  siSnyk,
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
  /** Symbol id in the page sprite. */
  id: string;
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
  "GitHub Actions": siGithubactions,
  Ansible: siAnsible,
  Nginx: siNginx,
  Linux: siLinux,
  Snyk: siSnyk,
  "Let's Encrypt": siLetsencrypt,
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
  return { id: techIconId(icon.slug), path: icon.path, color: isReadableOnDark ? `#${icon.hex}` : FALLBACK_COLOR };
}

/** Id of a logo's <symbol> in the page sprite. */
export const techIconId = (slug: string) => `ti-${slug}`;

/** Unique logos (by slug) for the given technology names — each is drawn once in the sprite. */
export function getSpriteIcons(techs: Iterable<string>): { id: string; path: string }[] {
  const bySlug = new Map<string, string>();
  for (const tech of techs) {
    const icon = iconsByTech[tech];
    if (icon) bySlug.set(icon.slug, icon.path);
  }
  return [...bySlug].map(([slug, path]) => ({ id: techIconId(slug), path }));
}
