import { useTranslation } from "~/context/SettingsContext";
import type { Certification } from "~/types/certification.types";

interface CertificationsProps {
  certifications: Certification[];
}

export function Certifications({ certifications }: CertificationsProps) {
  const t = useTranslation();

  return (
    <section id="certifications" className="py-28 px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16" data-reveal>
          <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
            {t.certifications.label}
          </span>
          <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.03em] mt-3">
            {t.certifications.heading}
          </h2>
        </div>

        <div className="flex flex-col">
          {certifications.map((cert, i) => (
            <div
              key={cert.id}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] items-center gap-7 py-7 border-b border-border first:border-t"
              data-reveal
              data-reveal-delay={String(i % 3)}
            >
              {/* Logo / initials badge */}
              <div className="w-10 h-10 border border-border rounded-[4px] flex items-center justify-center bg-muted shrink-0">
                <span className="font-mono text-[0.55rem] tracking-[0.04em] text-brand">
                  {cert.initials}
                </span>
              </div>

              {/* Name + meta */}
              <div>
                <p className="font-display font-semibold text-base mb-1.5">
                  {cert.name}
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-[0.85rem] text-muted-foreground">
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-[0.62rem] tracking-[0.06em] uppercase px-2 py-0.5 border border-brand text-brand rounded-[2px]">
                    {cert.id}
                  </span>
                  {/* Verify link visible on mobile only */}
                  <a
                    href={cert.verifyUrl}
                    className="md:hidden font-mono text-[0.65rem] tracking-[0.06em] uppercase text-muted-foreground border-b border-border pb-px hover:text-brand hover:border-brand transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.certifications.verify}
                  </a>
                </div>
              </div>

              {/* Year + verify — desktop only */}
              <div className="hidden md:flex flex-col items-end gap-2">
                <span className="font-mono text-[0.72rem] text-muted-foreground">
                  {cert.year}
                </span>
                <a
                  href={cert.verifyUrl}
                  className="font-mono text-[0.65rem] tracking-[0.06em] uppercase text-muted-foreground border-b border-border pb-px hover:text-brand hover:border-brand transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.certifications.verify}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
