import { eq } from "drizzle-orm";
import { db } from "./client";
import { posts } from "./schema";

export async function getAllPosts() {
  return db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(posts.createdAt);
}

export async function getPostBySlug(slug: string) {
  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);
  return post ?? null;
}

export async function getAllPostsAdmin() {
  return db.select().from(posts).orderBy(posts.createdAt);
}

export async function createPost(data: {
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string[];
  published: boolean;
}) {
  const [post] = await db.insert(posts).values(data).returning();
  return post;
}

export async function updatePost(
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    description: string;
    content: string;
    tags: string[];
    published: boolean;
  }>
) {
  const [post] = await db
    .update(posts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning();
  return post ?? null;
}

export async function deletePost(id: string) {
  await db.delete(posts).where(eq(posts.id, id));
}
