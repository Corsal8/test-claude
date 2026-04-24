const TICKER_ITEMS = [
  "Full-Stack Engineering",
  "Cloud Architecture",
  "React",
  "TypeScript",
  "Node.js",
  "Go",
  "Kubernetes",
  "PostgreSQL",
  "Open Source",
  "Developer Experience",
];

function TickerDot() {
  return (
    <span className="w-1 h-1 rounded-full bg-brand shrink-0 inline-block" />
  );
}

export function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="overflow-hidden border-t border-b border-border py-3">
      <div className="ticker-track">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground whitespace-nowrap flex items-center gap-4"
          >
            <TickerDot />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
