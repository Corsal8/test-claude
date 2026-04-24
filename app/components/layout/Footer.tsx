import { useTranslation } from "~/context/SettingsContext";

export function Footer() {
  const t = useTranslation();

  return (
    <footer className="border-t-2 border-border-strong py-10 px-10 bg-background">
      <div className="mx-auto max-w-[1200px] flex items-center justify-between flex-wrap gap-4">
        <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
          &copy; {new Date().getFullYear()} Your Name
        </span>
        <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
          {t.footer.builtWith}
        </span>
      </div>
    </footer>
  );
}
