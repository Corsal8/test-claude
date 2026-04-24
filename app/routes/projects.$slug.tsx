import type { Route } from "./+types/projects.$slug";
import { Link } from "react-router";
import { projects } from "~/data/projects";

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Project Not Found" }];
  return [
    { title: `${data.project.title} — Your Name` },
    { name: "description", content: data.project.description },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) throw new Response("Not Found", { status: 404 });
  return { project };
}

export default function ProjectDetail({ loaderData }: Route.ComponentProps) {
  const { project } = loaderData;

  return (
    <main className="px-10 pt-36 pb-20">
      <div className="mx-auto max-w-[800px]">
        {/* Back link */}
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.08em] uppercase text-muted-foreground hover:text-brand transition-colors mb-12"
        >
          ← Back to projects
        </Link>

        {/* Tags eyebrow */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[0.65rem] tracking-[0.06em] text-muted-foreground px-2.5 py-1 border border-border rounded-[2px]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] leading-[1.0] tracking-[-0.03em] mb-4">
          {project.title}
        </h1>

        {/* Short description */}
        <p className="text-[1.05rem] leading-[1.65] text-muted-foreground mb-10">
          {project.description}
        </p>

        {/* Action links */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex gap-3 flex-wrap mb-10">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.75rem] tracking-[0.08em] uppercase px-6 py-3 rounded-[2px] border border-border-strong text-foreground hover:border-brand hover:text-brand transition-all"
              >
                ↗ View on GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.75rem] tracking-[0.08em] uppercase px-6 py-3 rounded-[2px] bg-brand text-brand-fg font-medium hover:brightness-110 transition-all"
              >
                ↗ Live Site
              </a>
            )}
          </div>
        )}

        <div className="h-px bg-border mb-10" />

        {/* Long description */}
        <p className="text-[1.05rem] leading-[1.75] text-muted-foreground whitespace-pre-line">
          {project.longDescription}
        </p>
      </div>
    </main>
  );
}
