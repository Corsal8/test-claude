import { useTranslation } from "~/context/SettingsContext";

export function About() {
  const t = useTranslation();

  return (
    <section id="about" className="py-28 px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16" data-reveal>
          <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
            {t.about.label}
          </span>
          <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.03em] mt-3">
            {t.about.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          <div
            className="space-y-5 text-[1.05rem] leading-[1.75] text-muted-foreground [&_strong]:text-foreground [&_strong]:font-medium"
            data-reveal
            data-reveal-delay="1"
          >
            <p>{t.about.p1()}</p>
            <p>{t.about.p2()}</p>
            <p>{t.about.p3()}</p>
          </div>

          <div className="flex flex-col" data-reveal data-reveal-delay="2">
            {t.about.stats.map(({ value, label }) => (
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
