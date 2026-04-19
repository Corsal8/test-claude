export function Footer() {
  return (
    <footer className="border-t py-8 px-4">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <p className="font-mono">&copy; {new Date().getFullYear()} Your Name</p>
        <p>
          Built with{" "}
          <a
            href="https://reactrouter.com"
            className="transition-colors hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Router
          </a>{" "}
          +{" "}
          <a
            href="https://tailwindcss.com"
            className="transition-colors hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tailwind CSS
          </a>
        </p>
      </div>
    </footer>
  );
}
