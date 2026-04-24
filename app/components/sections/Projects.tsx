import { href, Link } from "react-router";
import { useTranslation } from "~/context/SettingsContext";
import type { Project } from "~/types/project.types";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const t = useTranslation();

  return (
    <section id="projects" className="py-28 px-10 bg-muted">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16" data-reveal>
          <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
            {t.projects.label}
          </span>
          <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.03em] mt-3">
            {t.projects.heading}
          </h2>
        </div>

        <div className="flex flex-col">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[3.5rem_1fr_auto] items-start gap-8 py-10 border-b border-border first:border-t group cursor-default"
              data-reveal
              data-reveal-delay={String(i % 3)}
            >
              {/* Number */}
              <span className="font-mono text-[0.72rem] tracking-[0.05em] text-muted-foreground pt-1 group-hover:text-brand transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div>
                <h3 className="font-display font-bold text-[1.4rem] leading-[1.2] mb-2 group-hover:text-brand transition-colors">
                  {project.title}
                </h3>
                <p className="text-[0.92rem] text-muted-foreground leading-[1.6] max-w-[55ch] mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[0.65rem] tracking-[0.06em] text-muted-foreground px-2.5 py-1 border border-border rounded-[2px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    to={href("/projects/:slug", { slug: project.slug })}
                    className="font-mono text-[0.68rem] tracking-[0.06em] uppercase bg-brand text-brand-fg px-3.5 py-1.5 rounded-[2px] font-medium hover:brightness-110 transition-all"
                  >
                    {t.projects.details}
                  </Link>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className="font-mono text-[0.68rem] tracking-[0.06em] uppercase text-muted-foreground border-b border-border pb-px hover:text-foreground hover:border-muted-foreground transition-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.projects.source}
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="font-mono text-[0.68rem] tracking-[0.06em] uppercase text-muted-foreground border-b border-border pb-px hover:text-foreground hover:border-muted-foreground transition-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.projects.live}
                    </a>
                  )}
                </div>
              </div>

              {/* Arrow — desktop only */}
              <span className="hidden md:block text-[1.2rem] text-brand opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center">
                ↗
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
