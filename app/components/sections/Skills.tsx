import { Cloud, Monitor, Server, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import type { SkillCategory } from "~/types/skill.types";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Frontend: Monitor,
  Backend: Server,
  "Cloud & Infrastructure": Cloud,
  "Tools & Practices": Wrench,
};

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
          {skills.map((category) => {
            const Icon = CATEGORY_ICONS[category.name] ?? Wrench;
            return (
              <div key={category.name} className="rounded-lg border p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Icon className="size-4 text-sky-400" />
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-widest text-sky-400">
                    {category.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
