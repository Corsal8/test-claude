import type { Route } from "./+types/index";
import { href, Link } from "react-router";
import { getAllPosts } from "~/db/posts";

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

export async function loader() {
  return { posts: await getAllPosts() };
}

export default function BlogIndex({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;

  return (
    <main className="px-10 pt-36 pb-20">
      <div className="mx-auto max-w-[800px]">
        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
            Writing
          </span>
          <h1 className="font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em] mt-3">
            Blog
          </h1>
          <p className="mt-5 text-muted-foreground text-[1.05rem] leading-[1.65] max-w-[45ch]">
            Thoughts on full-stack engineering, cloud architecture, and software
            craft.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="border border-dashed border-border py-16 text-center">
            <p className="font-mono text-[0.75rem] tracking-[0.12em] uppercase text-muted-foreground">
              Posts coming soon.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={href("/blog/:slug", { slug: post.slug })}
                className="group grid grid-cols-1 sm:grid-cols-[1fr_auto] items-start gap-4 py-8 border-b border-border first:border-t hover:opacity-80 transition-opacity"
              >
                <div>
                  <h2 className="font-display font-bold text-[1.15rem] leading-[1.25] mb-2 group-hover:text-brand transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[0.9rem] text-muted-foreground leading-[1.6] mb-3">
                    {post.description}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[0.65rem] tracking-[0.06em] text-muted-foreground px-2 py-0.5 border border-border rounded-[2px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <time className="font-mono text-[0.65rem] tracking-[0.06em] text-muted-foreground shrink-0 sm:pt-1">
                  {post.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
