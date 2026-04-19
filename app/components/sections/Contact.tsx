import { Briefcase, Code2, Mail, Share2 } from "lucide-react";
import { Button } from "~/components/ui/button";

interface ContactLink {
  icon: typeof Mail;
  label: string;
  href: string;
  ariaLabel: string;
  external: boolean;
}

const CONTACT_LINKS: ContactLink[] = [
  {
    icon: Code2,
    label: "GitHub",
    href: "https://github.com",
    ariaLabel: "GitHub profile",
    external: true,
  },
  {
    icon: Briefcase,
    label: "LinkedIn",
    href: "https://linkedin.com",
    ariaLabel: "LinkedIn profile",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:your@email.com",
    ariaLabel: "Send email",
    external: false,
  },
  {
    icon: Share2,
    label: "Twitter / X",
    href: "https://twitter.com",
    ariaLabel: "Twitter profile",
    external: true,
  },
];

export function Contact() {
  return (
    <section id="contact" className="px-4 py-24">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="mb-4 font-mono text-3xl font-bold">
          <span className="text-sky-400">// </span>Get In Touch
        </h2>
        <p className="mx-auto mb-12 max-w-lg text-muted-foreground">
          I'm open to new opportunities, collaborations, or just a good
          conversation about technology. Feel free to reach out through any of
          the channels below.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {CONTACT_LINKS.map(({ icon: Icon, label, href, ariaLabel, external }) => (
            <Button key={label} asChild variant="outline" size="lg">
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={ariaLabel}
              >
                <Icon className="size-4" /> {label}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
