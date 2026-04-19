import type { ComponentType } from "react";
import type { PostFrontmatter } from "./blog.types";

declare module "*.mdx" {
  const Component: ComponentType;
  export const frontmatter: PostFrontmatter;
  export default Component;
}
