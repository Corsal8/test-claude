import { Badge } from "~/components/ui/badge";
import type { SkillCategory } from "~/types/skill.types";

interface SkillsProps {
  skills: SkillCategory[];
}

export function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="bg-muted/30 px-4 py-24">
      <div className="container mx-auto max-w-4xl">
        <h2 className="mb-12 font-mono text-3xl font-bold">
          <span className="text-sky-400">// </span>Skills & Stack
        </h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {skills.map((category) => (
            <div key={category.name}>
              <h3 className="mb-4 font-mono text-sm font-semibold uppercase tracking-widest text-sky-400">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
