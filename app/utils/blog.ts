import type { ComponentType } from "react";
import type { Post, PostFrontmatter } from "~/types/blog.types";

interface PostModule {
  default: ComponentType;
  frontmatter: PostFrontmatter;
}

const postModules = import.meta.glob<PostModule>("../content/blog/*.mdx", {
  eager: true,
});

export function getAllPosts(): Post[] {
  return Object.entries(postModules)
    .map(([filepath, mod]) => {
      const slug = filepath.split("/").pop()?.replace(".mdx", "") ?? "";
      return { slug, ...mod.frontmatter };
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostMeta(slug: string): Post | null {
  const entry = Object.entries(postModules).find(([filepath]) =>
    filepath.endsWith(`/${slug}.mdx`)
  );
  if (!entry) return null;
  return { slug, ...entry[1].frontmatter };
}

export function getPostComponent(slug: string): ComponentType | null {
  const entry = Object.entries(postModules).find(([filepath]) =>
    filepath.endsWith(`/${slug}.mdx`)
  );
  return entry ? entry[1].default : null;
}
