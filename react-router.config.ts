import type { Config } from "@react-router/dev/config";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { projects } from "./app/data/projects";

function getBlogSlugs(): string[] {
  try {
    return readdirSync(join(process.cwd(), "app/content/blog"))
      .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
      .map((f) => f.replace(".mdx", ""));
  } catch {
    return [];
  }
}

export default {
  ssr: true,
  async prerender() {
    const blogSlugs = getBlogSlugs();
    const projectSlugs = projects.map((p) => p.slug);
    return [
      "/",
      "/blog",
      ...blogSlugs.map((s) => `/blog/${s}`),
      ...projectSlugs.map((s) => `/projects/${s}`),
    ];
  },
} satisfies Config;
