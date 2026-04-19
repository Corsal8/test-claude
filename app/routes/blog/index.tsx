import type { Route } from "./+types/index";
import { Link } from "react-router";
import { getAllPosts } from "~/utils/blog";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog — Your Name" },
    {
      name: "description",
      content:
        "Thoughts on full-stack engineering, cloud architecture, and software craft.",
    },
  ];
}

export function loader() {
  return { posts: getAllPosts() };
}

export default function BlogIndex({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;

  return (
    <main className="px-4 pb-16 pt-24">
      <div className="container mx-auto max-w-2xl">
        <h1 className="mb-4 font-mono text-4xl font-bold">
          <span className="text-sky-400">// </span>Blog
        </h1>
        <p className="mb-12 text-muted-foreground">
          Thoughts on full-stack engineering, cloud architecture, and software
          craft.
        </p>

        {posts.length === 0 ? (
          <div className="rounded-lg border border-dashed p-16 text-center">
            <p className="font-mono text-muted-foreground">
              Posts coming soon.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex items-start justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
                >
                  <div>
                    <p className="font-medium transition-colors group-hover:text-sky-400">
                      {post.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {post.description}
                    </p>
                    <div className="mt-2 flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <time className="ml-4 mt-1 shrink-0 text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
