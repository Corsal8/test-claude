import type { Route } from "./+types/$slug";
import { Link } from "react-router";
import { getPostBySlug } from "~/db/posts";
import { sanitizePostContent } from "~/utils/sanitize.server";

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Post Not Found" }];
  return [
    { title: `${data.post.title} — Your Name` },
    { name: "description", content: data.post.description },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPostBySlug(params.slug);
  if (!post || !post.published) throw new Response("Not Found", { status: 404 });
  return { post, sanitizedContent: sanitizePostContent(post.content) };
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const { post, sanitizedContent } = loaderData;

  return (
    <main className="px-10 pt-36 pb-20">
      <div className="mx-auto max-w-[800px]">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.08em] uppercase text-muted-foreground hover:text-brand transition-colors mb-12"
        >
          ← Back to blog
        </Link>

        {/* Eyebrow: date + tags */}
        <div className="flex items-center gap-3 flex-wrap mb-6">
          <time className="font-mono text-[0.65rem] tracking-[0.08em] text-muted-foreground">
            {post.createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.tags.length > 0 && (
            <>
              <span className="text-muted-foreground/40" aria-hidden>·</span>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.62rem] tracking-[0.06em] text-muted-foreground px-2 py-0.5 border border-border rounded-[2px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] leading-[1.0] tracking-[-0.03em] mb-4">
          {post.title}
        </h1>

        {/* Description */}
        <p className="text-[1.05rem] leading-[1.65] text-muted-foreground mb-10">
          {post.description}
        </p>

        <div className="h-px bg-border mb-10" />

        {/* Content */}
        <article
          className="post-content leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-2 [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-2 [&_blockquote]:border-brand [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
    </main>
  );
}
