import { Search } from "lucide-react";

type CustomerSearchProps = {
  value: string;
  onChange: (value: string) => void;
  resultLabel: string;
};

export function CustomerSearch({ value, onChange, resultLabel }: CustomerSearchProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search customers"
          placeholder="Search name, mobile, place, district, PIN…"
          className="w-full rounded-xl border border-border bg-surface/70 py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-faint outline-none transition hover:border-border-strong focus:border-primary/40 focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="font-mono text-[11px] text-muted-foreground sm:w-32 sm:text-right">{resultLabel}</div>
    </div>
  );
}
