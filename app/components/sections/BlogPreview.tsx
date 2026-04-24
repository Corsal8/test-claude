import { href, Link } from "react-router";
import { useTranslation } from "~/context/SettingsContext";
import type { Post } from "~/db/schema";

interface BlogPreviewProps {
  posts: Post[];
}

function formatDate(date: Date, locale: string) {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const t = useTranslation();
  const visible = posts.slice(0, 3);

  return (
    <section id="blog" className="py-28 px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16" data-reveal>
          <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
            {t.blog.label}
          </span>
          <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.03em] mt-3">
            {t.blog.heading}
          </h2>
        </div>

        {visible.length === 0 ? (
          <div
            className="border border-dashed border-border py-16 flex flex-col items-center gap-2 text-center"
            data-reveal
            data-reveal-delay="1"
          >
            <p className="font-mono text-[0.75rem] tracking-[0.12em] uppercase text-muted-foreground">
              {t.blog.emptyTitle}
            </p>
            <p className="text-sm text-muted-foreground">{t.blog.emptySubtitle}</p>
          </div>
        ) : (
          <>
            <div
              className="grid grid-cols-1 sm:grid-cols-3 border border-border"
              data-reveal
              data-reveal-delay="1"
            >
              {visible.map((post) => (
                <Link
                  key={post.id}
                  to={href("/blog/:slug", { slug: post.slug })}
                  className="group flex flex-col gap-4 p-8 border-b border-border sm:border-b-0 sm:border-r sm:last:border-r-0 hover:bg-muted/50 transition-colors duration-200 cursor-pointer"
                >
                  {/* Meta row */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.65rem] tracking-[0.08em] text-muted-foreground">
                      {formatDate(post.createdAt, t.blog.dateLocale)}
                    </span>
                  </div>

                  {/* Title */}
                  <p className="font-display font-bold text-[1.05rem] leading-[1.3] group-hover:text-brand transition-colors">
                    {post.title}
                  </p>

                  {/* Excerpt */}
                  <p className="text-[0.88rem] leading-[1.65] text-muted-foreground flex-1">
                    {post.description}
                  </p>

                  {/* Read link */}
                  <span className="font-mono text-[0.68rem] tracking-[0.06em] uppercase text-muted-foreground border-b border-border pb-px self-start group-hover:text-brand group-hover:border-brand transition-all">
                    {t.blog.readPost}
                  </span>
                </Link>
              ))}
            </div>

            <div
              className="flex justify-end mt-10"
              data-reveal
              data-reveal-delay="2"
            >
              <Link
                to={href("/blog")}
                className="font-mono text-[0.75rem] tracking-[0.08em] uppercase px-6 py-3 rounded-[2px] border border-border-strong text-foreground hover:border-brand hover:text-brand transition-all"
              >
                {t.blog.allPosts}
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
