import type { SkillCategory } from "~/types/skill.types";

export const skills: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      "React",
      "TypeScript",
      "React Router",
      "Next.js",
      "Tailwind CSS",
      "Vite",
    ],
  },
  {
    name: "Backend",
    skills: [
      "Node.js",
      "Go",
      "Python",
      "REST",
      "GraphQL",
      "PostgreSQL",
      "Redis",
    ],
  },
  {
    name: "Cloud & Infrastructure",
    skills: [
      "AWS",
      "GCP",
      "Azure",
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD",
    ],
  },
  {
    name: "Tools & Practices",
    skills: [
      "Git",
      "Linux",
      "Vitest",
      "Playwright",
      "OpenTelemetry",
      "Nx",
      "Agile",
    ],
  },
];
