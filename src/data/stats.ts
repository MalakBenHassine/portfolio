import type { Stat } from "@/lib/types";

export const stats: Stat[] = [
  { value: 3, label: "Professional Internships", detail: "Capgemini · Crosschain · Lézard Com" },
  { value: 9, label: "CI/CD Pipeline Stages", detail: "Automated with Jenkins" },
  { value: 100, suffix: "%", label: "Load Test Success", detail: "JMeter · 50 concurrent users" },
  {
    value: 0,
    label: "Critical Security Vulnerabilities",
    detail: "OWASP ZAP · 1,686 attack requests",
  },
];
