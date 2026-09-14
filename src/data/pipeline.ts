import type { PipelineStage } from "@/lib/types";

/**
 * Stages shown in the Hero animation. Built from the tools used in the
 * AnalyseImpacte Jenkins pipeline — rename them to match the exact stage
 * names of the real Jenkinsfile.
 */
export const pipelineStages: PipelineStage[] = [
  { name: "Checkout", tool: "Git" },
  { name: "Build", tool: "Maven" },
  { name: "Code quality", tool: "SonarQube" },
  { name: "Security scan", tool: "Trivy" },
  { name: "Publish artifact", tool: "Nexus" },
  { name: "Containerize", tool: "Docker" },
  { name: "Deploy", tool: "Docker" },
  { name: "Health check & rollback", tool: "Jenkins" },
  { name: "Monitoring", tool: "Prometheus · Grafana" },
];
