export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
}
