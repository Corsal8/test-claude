import type { Config } from "@react-router/dev/config";
import { projects } from "./app/data/projects";

export default {
  ssr: true,
  // async prerender() {
  //   const projectSlugs = projects.map((p) => p.slug);
  //   return [...projectSlugs.map((s) => `/projects/${s}`)];
  // },
} satisfies Config;
