import { Pencil, Trash2 } from "lucide-react";
import type { Customer } from "@/lib/customer";
import { formatMobile } from "@/lib/customer";

type CustomerCardProps = {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
};

export function CustomerCard({ customer, onEdit, onDelete }: CustomerCardProps) {
  return (
    <article className="panel p-4">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold tracking-tight">{customer.name}</h3>
          <p className="font-mono text-xs text-muted-foreground">{formatMobile(customer.mobile)}</p>
        </div>
        <span className="shrink-0 rounded-lg bg-primary/10 px-2.5 py-1 font-mono text-[11px] font-medium text-primary">
          {customer.pincode}
        </span>
      </header>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div className="col-span-2 min-w-0">
          <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">Address</dt>
          <dd className="text-pretty text-foreground/80">{customer.address}</dd>
        </div>
        <div className="min-w-0">
          <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">Place</dt>
          <dd className="truncate text-foreground/80">{customer.place}</dd>
        </div>
        <div className="min-w-0">
          <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">District</dt>
          <dd className="truncate text-foreground/80">{customer.district}</dd>
        </div>
        <div className="col-span-2 min-w-0">
          <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">State</dt>
          <dd className="truncate text-foreground/80">{customer.state}</dd>
        </div>
      </dl>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(customer)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background/50 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-primary/5 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Pencil className="size-4" /> Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(customer)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background/50 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-danger/40 hover:bg-danger/5 hover:text-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Trash2 className="size-4" /> Delete
        </button>
      </div>
    </article>
  );
}
