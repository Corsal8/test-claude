import { useTranslation } from "~/context/SettingsContext";

export function Hero() {
  const t = useTranslation();

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-end pb-20 pt-32 px-10"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="flex items-center gap-4 mb-8 fade-up">
          <div className="h-px w-12 bg-brand shrink-0" />
          <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
            {t.hero.tagline}
          </span>
        </div>

        <h1 className="font-display font-extrabold leading-[0.92] tracking-[-0.03em] text-[clamp(4rem,11vw,10rem)] fade-up delay-1">
          Your
          <br />
          <span className="text-brand">Name</span>
          <span className="hero-cursor" aria-hidden="true" />
        </h1>

        <div className="mt-16 flex items-end justify-between flex-wrap gap-8 fade-up delay-2">
          <p className="text-[1.05rem] leading-[1.65] text-muted-foreground max-w-[38ch]">
            {t.hero.description}
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="#projects"
              className="font-mono text-[0.75rem] tracking-[0.08em] uppercase px-6 py-3 rounded-[2px] bg-brand text-brand-fg font-medium hover:brightness-110 hover:-translate-y-px transition-all"
            >
              {t.hero.viewProjects}
            </a>
            <a
              href="#contact"
              className="font-mono text-[0.75rem] tracking-[0.08em] uppercase px-6 py-3 rounded-[2px] border border-border-strong text-foreground hover:border-brand hover:text-brand transition-all"
            >
              {t.hero.getInTouch}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
