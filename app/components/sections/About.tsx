const stats = [
  { value: "5+", label: "Years of experience" },
  { value: "30+", label: "Projects shipped" },
  { value: "10+", label: "Technologies mastered" },
];

export function About() {
  return (
    <section id="about" className="px-4 py-24">
      <div className="container mx-auto max-w-4xl">
        <h2 className="mb-12 font-mono text-3xl font-bold">
          <span className="text-sky-400">// </span>About Me
        </h2>
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-4 text-muted-foreground md:col-span-2">
            <p>
              Placeholder bio — I'm a full-stack engineer and cloud architect
              with a passion for building robust, scalable systems. I work
              across the entire stack, from designing pixel-perfect UIs to
              architecting distributed cloud infrastructure.
            </p>
            <p>
              I specialize in translating complex business requirements into
              elegant technical solutions. Whether it's a real-time data
              pipeline, a microservices architecture, or a polished user
              interface — I care deeply about the craft at every layer.
            </p>
            <p>
              When I'm not coding, I'm exploring new technologies, contributing
              to open source, and occasionally writing about software
              engineering.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="rounded-lg border p-4">
                <p className="font-mono text-3xl font-bold text-sky-400">
                  {value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
