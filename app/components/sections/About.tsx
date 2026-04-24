const STATS = [
  { value: "5+", label: "Years of\nexperience" },
  { value: "30+", label: "Projects\nshipped" },
  { value: "10+", label: "Technologies\nmastered" },
];

export function About() {
  return (
    <section id="about" className="py-28 px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16" data-reveal>
          <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
            01 — About
          </span>
          <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.03em] mt-3">
            Who I am
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          <div className="space-y-5 text-[1.05rem] leading-[1.75] text-muted-foreground" data-reveal data-reveal-delay="1">
            <p>
              I'm a <strong className="text-foreground font-medium">full-stack engineer</strong> and{" "}
              <strong className="text-foreground font-medium">cloud architect</strong> with a passion for building{" "}
              <strong className="text-foreground font-medium">robust, scalable systems</strong>. I work across the{" "}
              <strong className="text-foreground font-medium">entire stack</strong> — from designing pixel-perfect UIs
              to architecting <strong className="text-foreground font-medium">distributed cloud infrastructure</strong>.
            </p>
            <p>
              I specialise in translating{" "}
              <strong className="text-foreground font-medium">complex business requirements</strong> into elegant
              technical solutions. Whether it's a{" "}
              <strong className="text-foreground font-medium">real-time data pipeline</strong>, a{" "}
              <strong className="text-foreground font-medium">microservices architecture</strong>, or a{" "}
              <strong className="text-foreground font-medium">polished user interface</strong> — I care deeply about
              the craft at every layer.
            </p>
            <p>
              When I'm not coding, I'm exploring new technologies,{" "}
              <strong className="text-foreground font-medium">contributing to open source</strong>, and occasionally{" "}
              <strong className="text-foreground font-medium">writing about software engineering</strong>.
            </p>
          </div>

          <div className="flex flex-col" data-reveal data-reveal-delay="2">
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="flex items-baseline gap-6 py-7 border-b border-border first:border-t"
              >
                <span className="font-display font-extrabold text-[3.5rem] leading-none tracking-[-0.04em] text-brand min-w-[5rem]">
                  {value}
                </span>
                <span className="text-[0.9rem] text-muted-foreground leading-snug whitespace-pre-line">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
