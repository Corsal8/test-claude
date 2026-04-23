import type { Route } from "./+types/$slug";
import { getPostBySlug } from "~/db/posts";
import { sanitizePostContent } from "~/utils/sanitize.server";

export async function meta({ data }: Route.MetaArgs) {
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
    <main className="px-4 pb-16 pt-24">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
            <time>
              {post.createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-muted px-2 py-0.5 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <h1 className="font-mono text-3xl font-bold md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-muted-foreground">{post.description}</p>
        </div>

        <hr className="mb-8 border-border" />

        <article
          className="prose prose-invert max-w-none space-y-4 leading-relaxed text-muted-foreground [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:font-mono [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:font-mono [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_a]:text-sky-400 [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-4"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
    </main>
  );
}
