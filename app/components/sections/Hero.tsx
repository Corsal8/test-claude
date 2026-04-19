import { ArrowDown, Code2, Mail } from "lucide-react";
import { Button } from "~/components/ui/button";

export function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-screen flex-col items-center justify-center px-4 pt-16"
    >
      <div className="container mx-auto max-w-4xl text-center">
        <p className="mb-4 font-mono text-sm uppercase tracking-widest text-sky-400">
          Full-Stack / Cloud Architect
        </p>
        <h1 className="mb-6 font-mono text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
          Your Name
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Building scalable systems from pixel to cloud. I design and engineer
          full-stack applications with a focus on performance, reliability, and
          developer experience.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <a href="#projects">
              View Projects <ArrowDown className="size-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code2 className="size-4" /> GitHub
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href="mailto:your@email.com">
              <Mail className="size-4" /> Get in Touch
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
