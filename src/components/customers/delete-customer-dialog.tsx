import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Customer } from "@/lib/customer";

type DeleteCustomerDialogProps = {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function DeleteCustomerDialog({ customer, open, onOpenChange, onConfirm }: DeleteCustomerDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[400px] gap-0 rounded-2xl border-border bg-surface/95 p-0 backdrop-blur-2xl">
        <div className="px-6 pt-6">
          <div className="grid size-11 place-items-center rounded-xl bg-danger/10 text-danger">
            <Trash2 className="size-5" />
          </div>
          <AlertDialogTitle className="mt-4 text-lg font-semibold tracking-tight">Delete customer?</AlertDialogTitle>
          <AlertDialogDescription className="mt-1 text-pretty text-sm text-muted-foreground">
            Are you sure you want to delete this customer?
            {customer ? ` ${customer.name} will be removed permanently.` : ""}
          </AlertDialogDescription>
        </div>
        <div className="flex items-center justify-end gap-2 px-6 py-5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-danger px-4 py-2.5 text-sm font-semibold text-danger-foreground transition-colors hover:bg-danger/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Delete
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
