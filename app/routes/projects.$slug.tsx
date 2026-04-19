import type { Route } from "./+types/projects.$slug";
import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
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
    <main className="px-4 pb-16 pt-24">
      <div className="container mx-auto max-w-2xl">
        <Button asChild variant="ghost" size="sm" className="-ml-2 mb-8">
          <Link to="/#projects">
            <ArrowLeft className="size-4" /> Back to projects
          </Link>
        </Button>

        <h1 className="mb-3 font-mono text-3xl font-bold md:text-4xl">
          {project.title}
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">
          {project.description}
        </p>

        <div className="mb-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mb-12 flex gap-3">
          {project.githubUrl && (
            <Button asChild variant="outline">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code2 className="size-4" /> View on GitHub
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-4" /> Live Site
              </a>
            </Button>
          )}
        </div>

        <hr className="mb-8 border-border" />

        <p className="leading-relaxed text-muted-foreground">
          {project.longDescription}
        </p>
      </div>
    </main>
  );
}
