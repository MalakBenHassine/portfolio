import type { PipelineStage } from "@/lib/types";

/**
 * The nine stages of the AnalyseImpacte Jenkinsfile, as documented in the
 * internship report (Sprint 4 — Jenkins Stage View). Stages 2 and 4 run
 * their backend/frontend jobs in parallel.
 */
export const pipelineStages: PipelineStage[] = [
  { name: "Checkout", tool: "GitLab" },
  { name: "Tests & Sonar", tool: "Maven · Karma", parallel: true },
  { name: "Quality Gate", tool: "SonarQube" },
  { name: "Build images", tool: "Docker", parallel: true },
  { name: "Security scan", tool: "Trivy" },
  { name: "Backup previous", tool: "rollback tag" },
  { name: "Push images", tool: "Nexus" },
  { name: "Deploy", tool: "docker-compose" },
  { name: "Smoke tests", tool: "post-deploy" },
];
