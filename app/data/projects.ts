import type { Project } from "~/types/project.types";

export const projects: Project[] = [
  {
    slug: "cloud-dashboard",
    title: "Cloud Dashboard",
    description:
      "Real-time infrastructure monitoring dashboard for multi-cloud environments.",
    longDescription: `A comprehensive monitoring solution for teams managing infrastructure across
AWS, GCP, and Azure. Features real-time metrics, alerting, cost analysis, and
a customizable widget system. Built for scale with WebSockets for live updates
and a PostgreSQL-backed data warehouse for historical trend analysis.`,
    tags: ["React", "TypeScript", "AWS", "Node.js", "PostgreSQL", "WebSockets"],
    githubUrl: "https://github.com",
    liveUrl: undefined,
    featured: true,
  },
  {
    slug: "api-gateway",
    title: "API Gateway",
    description:
      "High-performance API gateway with rate limiting, auth, and observability.",
    longDescription: `A production-grade API gateway built in Go, handling thousands of requests
per second. Features JWT authentication, configurable rate limiting per client,
distributed tracing via OpenTelemetry, and a Prometheus metrics endpoint.
Deployed on Kubernetes with Helm charts for reproducible configuration.`,
    tags: ["Go", "Docker", "Kubernetes", "OpenTelemetry", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com",
    liveUrl: undefined,
    featured: true,
  },
  {
    slug: "component-library",
    title: "Component Library",
    description:
      "Accessible, themeable React component library with Storybook documentation.",
    longDescription: `A design system and component library used across multiple internal products.
Built with React, TypeScript, and Tailwind CSS. Fully accessible (WCAG 2.1 AA),
themeable via CSS variables, and comprehensively documented with Storybook.
Published to a private npm registry and versioned with Changesets.`,
    tags: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Accessibility"],
    githubUrl: "https://github.com",
    liveUrl: undefined,
    featured: true,
  },
];
