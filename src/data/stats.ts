import type { Stat } from "@/lib/types";

export const stats: Stat[] = [
  { value: 3, label: "Professional Internships" },
  { value: 9, label: "CI/CD Pipeline Stages Automated" },
  { value: 100, suffix: "%", label: "Load Test Success Rate" },
  {
    value: 0,
    label: "Critical Vulnerabilities",
    detail: "1,686 security tests",
  },
];
