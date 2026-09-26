import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { CustomerSearch } from "@/components/customers/customer-search";
import { CustomerTable } from "@/components/customers/customer-table";
import { CustomerCard } from "@/components/customers/customer-card";
import { CustomerForm } from "@/components/customers/customer-form";
import { DeleteCustomerDialog } from "@/components/customers/delete-customer-dialog";
import { EmptyState } from "@/components/customers/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useCustomers } from "@/hooks/use-customers";
import { matchesQuery, type Customer, type CustomerInput } from "@/lib/customer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Customers Module" },
      {
        name: "description",
        content:
          "Manage customer records for your business: add, edit, search and delete customer details including address, place, district, state and PIN code.",
      },
      { property: "og:title", content: "Customers Module" },
      {
        property: "og:description",
        content: "A clean customer register to add, edit, search and remove customer details.",
      },
    ],
  }),
  component: CustomersPage,
});

function CustomersPage() {
  const { customers, loading, error, addCustomer, updateCustomer, deleteCustomer } = useCustomers();
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Customer | null>(null);

  const filtered = useMemo(() => customers.filter((c) => matchesQuery(c, query)), [customers, query]);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (customer: Customer) => {
    setEditing(customer);
    setFormOpen(true);
  };

  const handleSubmit = (values: CustomerInput) => {
    if (editing) {
      updateCustomer(editing.id, values);
      toast.success("Customer updated successfully");
    } else {
      addCustomer(values);
      toast.success("Customer added successfully");
    }
    setFormOpen(false);
    setEditing(null);
  };

  const handleDelete = () => {
    if (!pendingDelete) return;
    deleteCustomer(pendingDelete.id);
    setPendingDelete(null);
    toast.success("Customer deleted successfully");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -right-28 top-1/3 h-[380px] w-[380px] rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 animate-rise">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary font-mono text-sm font-medium text-primary-foreground">
              V
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold tracking-tight">User Module</div>
              <div className="truncate font-mono text-[11px] text-muted-foreground">Customer Management</div>
            </div>
          </div>
          <div className="hidden shrink-0 items-center gap-2 font-mono text-[11px] text-muted-foreground sm:flex">
            <span className="size-1.5 rounded-full bg-primary/70" />
            <span>
              {customers.length} record{customers.length === 1 ? "" : "s"}
            </span>
          </div>
        </header>

        <div className="mt-8 flex flex-col gap-4 animate-rise [animation-delay:60ms] sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">Customers</h1>
            <p className="mt-1 text-pretty text-sm text-muted-foreground">
              Manage customer records, contact details, and locations.
            </p>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Plus className="size-4" /> Add Customer
          </button>
        </div>

        <div className="mt-6 animate-rise [animation-delay:120ms]">
          <CustomerSearch
            value={query}
            onChange={setQuery}
            resultLabel={`Showing ${filtered.length} of ${customers.length}`}
          />
        </div>

        <div className="mt-4 animate-rise [animation-delay:180ms]">
          {loading ? (
            <div className="panel space-y-3 p-4">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-11 w-full rounded-xl" />
              ))}
            </div>
          ) : error ? (
            <div className="panel px-6 py-10 text-center">
              <h3 className="text-base font-semibold tracking-tight">Something went wrong</h3>
              <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState filtered={query.trim().length > 0} onAdd={openAdd} />
          ) : (
            <>
              <div className="hidden lg:block">
                <CustomerTable customers={filtered} onEdit={openEdit} onDelete={setPendingDelete} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
                {filtered.map((customer) => (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                    onEdit={openEdit}
                    onDelete={setPendingDelete}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <CustomerForm
        open={formOpen}
        customer={editing}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditing(null);
        }}
        onSubmit={handleSubmit}
      />

      <DeleteCustomerDialog
        customer={pendingDelete}
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
