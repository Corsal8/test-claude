import type { SkillCategory } from "~/types/skill.types";

const CATEGORY_ICONS: Record<string, string> = {
  Frontend: "◈",
  Backend: "◎",
  "Cloud & Infrastructure": "⬡",
  "Tools & Practices": "◇",
};

interface SkillsProps {
  skills: SkillCategory[];
}

export function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="py-28 px-10 bg-muted">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16" data-reveal>
          <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
            02 — Skills
          </span>
          <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.03em] mt-3">
            Stack & Tools
          </h2>
        </div>

        <div className="border border-border" data-reveal data-reveal-delay="1">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {skills.map((category) => (
              <div
                key={category.name}
                className="p-10 border-b border-border last:border-b-0 sm:border-r sm:even:border-r-0 sm:[&:nth-child(n+3)]:border-b-0 max-sm:border-r-0"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-brand text-base">
                    {CATEGORY_ICONS[category.name] ?? "◇"}
                  </span>
                  <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-brand">
                    {category.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[0.7rem] px-2.5 py-1 rounded-[2px] border border-border text-muted-foreground hover:border-brand hover:text-brand transition-all duration-150 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
