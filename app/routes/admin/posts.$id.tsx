import type { Route } from "./+types/posts.$id";
import { Form, redirect, useNavigation } from "react-router";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { RichTextEditor } from "~/components/admin/RichTextEditor";
import { createPost, getPostBySlug, updatePost } from "~/db/posts";
import { db } from "~/db/client";
import { posts } from "~/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "~/utils/session.server";

export async function loader({ request, params }: Route.LoaderArgs) {
  await requireAdmin(request);
  if (params.id === "new") return { post: null };
  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, params.id))
    .limit(1);
  if (!post) throw new Response("Not Found", { status: 404 });
  return { post };
}

export async function action({ request, params }: Route.ActionArgs) {
  await requireAdmin(request);
  const formData = await request.formData();

  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const content = String(formData.get("content") ?? "");
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const published = formData.get("published") === "on";

  if (!title || !slug) {
    return { error: "Title and slug are required" };
  }

  if (params.id === "new") {
    const existing = await getPostBySlug(slug);
    if (existing) return { error: "A post with that slug already exists" };
    await createPost({ title, slug, description, content, tags, published });
  } else {
    const updated = await updatePost(params.id, {
      title,
      slug,
      description,
      content,
      tags,
      published,
    });
    if (!updated) throw new Response("Not Found", { status: 404 });
  }

  return redirect("/admin");
}

export default function PostEditor({ loaderData, actionData }: Route.ComponentProps) {
  const { post } = loaderData;
  const navigation = useNavigation();
  const saving = navigation.state === "submitting";

  const [content, setContent] = useState(post?.content ?? "");

  return (
    <main className="px-4 pb-16 pt-24">
      <div className="container mx-auto max-w-3xl">
        <h1 className="mb-8 font-mono text-2xl font-bold">
          <span className="text-sky-400">// </span>
          {post ? "Edit post" : "New post"}
        </h1>

        <Form method="post" className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="title" className="text-sm text-muted-foreground">
                Title
              </label>
              <input
                id="title"
                name="title"
                required
                defaultValue={post?.title ?? ""}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="slug" className="text-sm text-muted-foreground">
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                required
                defaultValue={post?.slug ?? ""}
                className="w-full rounded-md border bg-background px-3 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="description"
              className="text-sm text-muted-foreground"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={2}
              defaultValue={post?.description ?? ""}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="tags" className="text-sm text-muted-foreground">
              Tags{" "}
              <span className="text-xs">(comma-separated)</span>
            </label>
            <input
              id="tags"
              name="tags"
              defaultValue={post?.tags.join(", ") ?? ""}
              placeholder="react, typescript, cloud"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm text-muted-foreground">Content</label>
            <RichTextEditor content={content} onChange={setContent} />
            <input type="hidden" name="content" value={content} />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="published"
                defaultChecked={post?.published ?? false}
                className="size-4"
              />
              Publish
            </label>

            <div className="flex gap-2">
              {actionData?.error && (
                <p className="self-center text-sm text-destructive">
                  {actionData.error}
                </p>
              )}
              <Button type="submit" disabled={saving}>
                {saving ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </main>
  );
}
