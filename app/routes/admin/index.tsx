import type { Route } from "./+types/index";
import { Form, Link } from "react-router";
import { PenLine, Plus, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { getAllPostsAdmin } from "~/db/posts";
import { destroyAdminSession, requireAdmin } from "~/utils/session.server";

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

  return (
    <main className="px-4 pb-16 pt-24">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-mono text-3xl font-bold">
            <span className="text-sky-400">// </span>Posts
          </h1>
          <div className="flex items-center gap-2">
            <Button asChild size="sm">
              <Link to="/admin/posts/new">
                <Plus className="size-4" /> New post
              </Link>
            </Button>
            <Form method="post">
              <input type="hidden" name="intent" value="logout" />
              <Button type="submit" variant="ghost" size="sm">
                Sign out
              </Button>
            </Form>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-lg border border-dashed p-16 text-center">
            <p className="font-mono text-muted-foreground">No posts yet.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {post.published ? (
                      <span className="text-green-500">Published</span>
                    ) : (
                      <span>Draft</span>
                    )}{" "}
                    · {post.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button asChild variant="ghost" size="icon-sm">
                    <Link to={`/admin/posts/${post.id}`}>
                      <PenLine className="size-4" />
                    </Link>
                  </Button>
                  <Form method="post" action={`/admin/posts/${post.id}/delete`}>
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon-sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </Form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
