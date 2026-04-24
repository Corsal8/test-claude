import { useEffect, useState } from "react";
import { href, Link } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { ThemeToggle } from "~/components/ThemeToggle";
import { cn } from "~/utils/cn";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border transition-all duration-300",
        isScrolled
          ? "bg-background/96 backdrop-blur-md"
          : "bg-background/82 backdrop-blur-sm",
      )}
    >
      <nav className="w-full px-10 flex h-16 items-center">
        <Link
          to="/"
          className="font-display font-extrabold text-[1.05rem] tracking-[-0.02em] text-brand mr-12 shrink-0 whitespace-nowrap"
        >
          &lt;YN /&gt;
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="nav-link font-mono text-[0.7rem] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex-1" />

        {/* Desktop utils */}
        <div className="hidden md:flex items-center gap-0 border-l border-border pl-6 ml-6">
          {/* Language toggle — buttons wired up when i18n is implemented */}
          <div className="flex">
            <button
              className="font-mono text-[0.68rem] tracking-[0.1em] uppercase text-brand font-medium px-2 py-1.5 transition-colors"
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              className="font-mono text-[0.68rem] tracking-[0.1em] uppercase text-muted-foreground px-2 py-1.5 hover:text-brand transition-colors"
              aria-label="Switch to Italian"
            >
              IT
            </button>
          </div>
          <div className="w-px h-4 bg-border mx-3" aria-hidden="true" />
          <ThemeToggle />
        </div>

        {/* Mobile trigger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden border border-border text-muted-foreground px-2.5 py-1.5 rounded-[2px] text-sm leading-none hover:border-brand hover:text-brand transition-all"
              aria-label="Open menu"
            >
              &#9776;
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[280px] bg-muted border-r border-border p-8 flex flex-col gap-8"
          >
            <SheetHeader>
              <SheetTitle asChild>
                <span className="font-display font-extrabold text-[1.1rem] tracking-[-0.02em] text-brand">
                  &lt;YN /&gt;
                </span>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-mono text-[0.78rem] tracking-[0.1em] uppercase text-muted-foreground hover:text-brand transition-colors py-3.5 border-b border-border first:border-t"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              <div>
                <p className="font-mono text-[0.62rem] tracking-[0.14em] uppercase text-muted-foreground mb-2">
                  Language
                </p>
                <div className="flex gap-1">
                  <button
                    className="font-mono text-[0.68rem] tracking-[0.1em] uppercase text-brand font-medium px-2 py-1.5 transition-colors"
                    aria-label="Switch to English"
                  >
                    EN
                  </button>
                  <button
                    className="font-mono text-[0.68rem] tracking-[0.1em] uppercase text-muted-foreground px-2 py-1.5 hover:text-brand transition-colors"
                    aria-label="Switch to Italian"
                  >
                    IT
                  </button>
                </div>
              </div>
              <div>
                <p className="font-mono text-[0.62rem] tracking-[0.14em] uppercase text-muted-foreground mb-2">
                  Theme
                </p>
                <ThemeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
