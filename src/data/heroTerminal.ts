export type TerminalTone = "info" | "ok" | "ai" | "result";

export interface TerminalLine {
  tone: TerminalTone;
  label: string;
  value: string;
}

/** Command typed in the Hero terminal. */
export const terminalCommand = "git push origin main";

/** Output lines — mirror the real AnalyseImpacte delivery chain. */
export const terminalLines: TerminalLine[] = [
  { tone: "info", label: "jenkins", value: "pipeline triggered" },
  { tone: "ok", label: "tests & sonar", value: "passed" },
  { tone: "ok", label: "quality gate", value: "passed" },
  { tone: "ok", label: "trivy image scan", value: "passed" },
  { tone: "ok", label: "push images → nexus", value: "done" },
  { tone: "ok", label: "deploy + smoke tests", value: "healthy" },
  { tone: "ai", label: "ai copilot · ollama", value: "ready" },
  { tone: "result", label: "impact analysis", value: "3–5 days → <10 min" },
];

/** Technologies orbiting the terminal on large screens (x / y in % of the visual). */
export const orbitTech = [
  { tech: "Spring Boot", x: 14, y: 4 },
  { tech: "Docker", x: 47, y: 2 },
  { tech: "Ollama", x: 82, y: 5 },
  { tech: "Angular", x: 10, y: 96 },
  { tech: "Grafana", x: 50, y: 97 },
  { tech: "Jenkins", x: 88, y: 96 },
] as const;
