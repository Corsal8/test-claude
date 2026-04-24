import type { Route } from "./+types/index";
import { Form, Link } from "react-router";
import { PenLine, Trash2 } from "lucide-react";
import { getAllPostsAdmin } from "~/db/posts";
import { destroyAdminSession, requireAdmin } from "~/utils/session.server";
import { useTranslation } from "~/context/SettingsContext";

export async function loader({ request }: Route.LoaderArgs) {
  await requireAdmin(request);
  return { posts: await getAllPostsAdmin() };
}

export async function action({ request }: Route.ActionArgs) {
  await requireAdmin(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "logout") {
    return destroyAdminSession(request);
  }
}

export default function AdminIndex({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;
  const t = useTranslation();

  return (
    <main className="px-10 pt-36 pb-20">
      <div className="mx-auto max-w-[800px]">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
              {t.admin.label}
            </span>
            <h1 className="font-display font-extrabold text-[clamp(2rem,4vw,3rem)] tracking-[-0.03em] leading-tight mt-2">
              {t.admin.posts.heading}
            </h1>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Link
              to="/admin/posts/new"
              className="font-mono text-[0.72rem] tracking-[0.08em] uppercase px-4 py-2.5 rounded-[2px] bg-brand text-brand-fg font-medium hover:brightness-110 transition-all"
            >
              {t.admin.posts.newPost}
            </Link>
            <Form method="post">
              <input type="hidden" name="intent" value="logout" />
              <button
                type="submit"
                className="font-mono text-[0.72rem] tracking-[0.08em] uppercase px-4 py-2.5 rounded-[2px] border border-border text-muted-foreground hover:border-brand hover:text-brand transition-all"
              >
                {t.admin.posts.signOut}
              </button>
            </Form>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="border border-dashed border-border py-16 text-center">
            <p className="font-mono text-[0.75rem] tracking-[0.12em] uppercase text-muted-foreground">
              {t.admin.posts.noPosts}
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between gap-4 py-5 border-b border-border first:border-t"
              >
                <div className="min-w-0">
                  <p className="font-display font-semibold text-[0.95rem] leading-snug truncate">
                    {post.title}
                  </p>
                  <p className="font-mono text-[0.62rem] tracking-[0.06em] text-muted-foreground mt-1">
                    {post.published ? (
                      <span className="text-brand">{t.admin.posts.published}</span>
                    ) : (
                      <span>{t.admin.posts.draft}</span>
                    )}{" "}
                    · {post.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link
                    to={`/admin/posts/${post.id}`}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-[2px]"
                    aria-label={t.admin.posts.editPost}
                  >
                    <PenLine className="size-4" />
                  </Link>
                  <Form method="post" action={`/admin/posts/${post.id}/delete`}>
                    <button
                      type="submit"
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-[2px]"
                      aria-label={t.admin.posts.deletePost}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </Form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
