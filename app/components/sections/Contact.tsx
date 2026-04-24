interface ContactLink {
  label: string;
  href: string;
  external: boolean;
  icon: React.ReactNode;
}

const CONTACT_LINKS: ContactLink[] = [
  {
    label: "GitHub",
    href: "https://github.com",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="size-[15px] fill-current opacity-50 group-hover:opacity-100 transition-opacity shrink-0">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="size-[15px] fill-current opacity-50 group-hover:opacity-100 transition-opacity shrink-0">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:your@email.com",
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" className="size-[15px] fill-current opacity-50 group-hover:opacity-100 transition-opacity shrink-0">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="size-[15px] fill-current opacity-50 group-hover:opacity-100 transition-opacity shrink-0">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-28 px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16" data-reveal>
          <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
            06 — Contact
          </span>
        </div>

        <h2
          className="font-display font-extrabold leading-[0.95] tracking-[-0.03em] text-[clamp(2.5rem,7vw,6.5rem)] mb-12"
          data-reveal
          data-reveal-delay="1"
        >
          Let's build
          <br />
          something{" "}
          <span className="underline decoration-brand underline-offset-2 decoration-[0.06em]">
            great
          </span>
          <br />
          together.
        </h2>

        <div className="flex flex-wrap gap-3" data-reveal data-reveal-delay="2">
          {CONTACT_LINKS.map(({ label, href, external, icon }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group font-mono text-[0.75rem] tracking-[0.08em] uppercase px-5 py-3 rounded-[2px] border border-border text-muted-foreground hover:border-brand hover:text-brand transition-all flex items-center gap-2"
            >
              {icon}
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
