import type { Route } from "./+types/posts.$id";
import { Form, redirect, useNavigation } from "react-router";
import { useState } from "react";
import { Link } from "react-router";
import { RichTextEditor } from "~/components/admin/RichTextEditor";
import { createPost, getPostBySlug, updatePost } from "~/db/posts";
import { getDb } from "~/db/client";
import { posts } from "~/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "~/utils/session.server";
import { useTranslation } from "~/context/SettingsContext";

export async function loader({ request, params }: Route.LoaderArgs) {
  await requireAdmin(request);
  if (params.id === "new") return { post: null };
  const [post] = await getDb()
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

const fieldClass =
  "w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand rounded-[2px] transition-colors";

const monoFieldClass = `${fieldClass} font-mono`;

export default function PostEditor({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { post } = loaderData;
  const navigation = useNavigation();
  const saving = navigation.state === "submitting";
  const t = useTranslation();

  const [content, setContent] = useState(post?.content ?? "");

  return (
    <main className="px-10 pt-36 pb-20">
      <div className="mx-auto max-w-[800px]">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <Link
              to="/admin"
              className="font-mono text-[0.68rem] tracking-[0.08em] uppercase text-muted-foreground hover:text-brand transition-colors mb-4 inline-block"
            >
              {t.admin.editor.backToPosts}
            </Link>
            <h1 className="font-display font-extrabold text-[clamp(2rem,4vw,3rem)] tracking-[-0.03em] leading-tight">
              {post ? t.admin.editor.editPost : t.admin.editor.newPost}
            </h1>
          </div>
        </div>

        <Form method="post" className="flex flex-col gap-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="title"
                className="font-mono text-[0.68rem] tracking-[0.08em] uppercase text-muted-foreground"
              >
                {t.admin.editor.title}
              </label>
              <input
                id="title"
                name="title"
                required
                defaultValue={post?.title ?? ""}
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="slug"
                className="font-mono text-[0.68rem] tracking-[0.08em] uppercase text-muted-foreground"
              >
                {t.admin.editor.slug}
              </label>
              <input
                id="slug"
                name="slug"
                required
                defaultValue={post?.slug ?? ""}
                className={monoFieldClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="description"
              className="font-mono text-[0.68rem] tracking-[0.08em] uppercase text-muted-foreground"
            >
              {t.admin.editor.description}
            </label>
            <textarea
              id="description"
              name="description"
              rows={2}
              defaultValue={post?.description ?? ""}
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="tags"
              className="font-mono text-[0.68rem] tracking-[0.08em] uppercase text-muted-foreground"
            >
              {t.admin.editor.tags}{" "}
              <span className="normal-case tracking-normal opacity-60">
                {t.admin.editor.tagsHint}
              </span>
            </label>
            <input
              id="tags"
              name="tags"
              defaultValue={post?.tags.join(", ") ?? ""}
              placeholder="react, typescript, cloud"
              className={monoFieldClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[0.68rem] tracking-[0.08em] uppercase text-muted-foreground">
              {t.admin.editor.content}
            </span>
            <RichTextEditor content={content} onChange={setContent} />
            <input type="hidden" name="content" value={content} />
          </div>

          {/* Footer: publish toggle + submit */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                name="published"
                defaultChecked={post?.published ?? false}
                className="size-4 accent-[var(--brand)]"
              />
              <span className="font-mono text-[0.72rem] tracking-[0.06em] uppercase text-muted-foreground">
                {t.admin.editor.publish}
              </span>
            </label>

            <div className="flex items-center gap-4">
              {actionData?.error && (
                <p className="font-mono text-[0.72rem] text-destructive">
                  {actionData.error}
                </p>
              )}
              <button
                type="submit"
                disabled={saving}
                className="font-mono text-[0.75rem] tracking-[0.08em] uppercase px-6 py-3 rounded-[2px] bg-brand text-brand-fg font-medium hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {saving ? t.admin.editor.saving : t.admin.editor.save}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </main>
  );
}
