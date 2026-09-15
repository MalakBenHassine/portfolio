import { analyseImpacte } from "@/data/caseStudy";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";

const normalize = (text: string) => text.toLowerCase().replace(/[-_]/g, " ");

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Where each technology was actually used — derived only from the content already on the site. */
const contexts: { name: string; terms: string[] }[] = [
  {
    name: "AnalyseImpacte",
    terms: [
      ...analyseImpacte.tech,
      ...analyseImpacte.workflow.flatMap((step) => [step.title, step.caption, step.detail]),
      ...analyseImpacte.architecture.nodes.flatMap((node) => node.items),
      ...(experience.find((item) => item.featured)?.tech ?? []),
    ],
  },
  ...experience
    .filter((item) => !item.featured)
    .map((item) => ({ name: item.company, terms: item.tech })),
  ...projects.map((project) => ({ name: project.title, terms: project.tech })),
];

/** e.g. "Jenkins" → ["AnalyseImpacte"]; "Ollama" → ["AnalyseImpacte", "CareerMatch", "HR Platform with AI"]. */
export function getSkillContexts(skill: string): string[] {
  const pattern = new RegExp(`(^|[^a-z0-9.#+])${escape(normalize(skill))}($|[^a-z0-9#+])`);
  return contexts.filter((context) => context.terms.some((term) => pattern.test(normalize(term)))).map((context) => context.name);
}
