import { Code2, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Project } from "~/types/project.types";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="px-4 py-24">
      <div className="container mx-auto max-w-4xl">
        <h2 className="mb-12 font-mono text-3xl font-bold">
          <span className="text-sky-400">// </span>Projects
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.slug} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-base">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button asChild variant="ghost" size="sm" className="flex-1">
                  <Link to={`/projects/${project.slug}`}>Details</Link>
                </Button>
                {project.githubUrl && (
                  <Button asChild variant="ghost" size="icon-sm">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source code`}
                    >
                      <Code2 />
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button asChild variant="ghost" size="icon-sm">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live site`}
                    >
                      <ExternalLink />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
