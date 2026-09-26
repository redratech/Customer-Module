import { Plus, Users } from "lucide-react";

type EmptyStateProps = {
  filtered: boolean;
  onAdd: () => void;
};

export function EmptyState({ filtered, onAdd }: EmptyStateProps) {
  return (
    <div className="panel flex flex-col items-center px-6 py-14 text-center">
      <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Users className="size-5" />
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-tight">No customers found</h3>
      <p className="mt-1 max-w-sm text-pretty text-sm text-muted-foreground">
        {filtered
          ? "No records match your search. Try a different name, mobile number or PIN code."
          : "Your customer register is empty. Add your first customer to get started."}
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Plus className="size-4" /> Add Customer
      </button>
    </div>
  );
}
