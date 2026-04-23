import { ArrowRight } from "lucide-react";
import { href, Link } from "react-router";
import { Button } from "~/components/ui/button";
import type { Post } from "~/types/blog.types";

interface BlogPreviewProps {
  posts: Post[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <section id="blog" className="bg-muted/30 px-4 py-24">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="font-mono text-3xl font-bold">
            <span className="text-sky-400">// </span>From the Blog
          </h2>
          <Button asChild variant="ghost" size="sm">
            <Link to={href("/blog")}>
              All posts <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <p className="font-mono text-muted-foreground">
              Posts coming soon.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Stay tuned.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {posts.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <Link
                  to={href("/blog/:slug", { slug: post.slug })}
                  className="group flex items-start justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
                >
                  <div>
                    <p className="font-medium transition-colors group-hover:text-sky-400">
                      {post.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {post.description}
                    </p>
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
    </section>
  );
}
