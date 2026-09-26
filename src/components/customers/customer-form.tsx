import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { SearchableSelect } from "./searchable-select";
import { Field, fieldInputClass } from "./field";
import { INDIA_STATES, districtsForState } from "@/data/india-locations";
import { customerSchema, emptyCustomer, type Customer, type CustomerInput } from "@/lib/customer";
import { lookupPincode } from "@/lib/pincode";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type Errors = { [K in keyof CustomerInput]?: string | undefined };

type CustomerFormProps = {
  open: boolean;
  customer: Customer | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CustomerInput) => void;
};

export function CustomerForm({ open, customer, onOpenChange, onSubmit }: CustomerFormProps) {
  const isMobile = useIsMobile();
  const [values, setValues] = useState<CustomerInput>(emptyCustomer);
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setSaving(false);
    setValues(
      customer
        ? {
            name: customer.name,
            mobile: customer.mobile,
            address: customer.address,
            place: customer.place,
            state: customer.state,
            district: customer.district,
            pincode: customer.pincode,
          }
        : emptyCustomer,
    );
    // Reset last checked pincode so first lookup in this form session is treated specially.
    lastPincodeChecked.current = null;
  }, [open, customer]);

  const districts = useMemo(() => districtsForState(values.state), [values.state]);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const lastPincodeChecked = useRef<string | null>(null);

  const set = <K extends keyof CustomerInput>(key: K, value: CustomerInput[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // Auto-fill state/district when a full 6-digit PIN is entered.
  useEffect(() => {
    let mounted = true;
    const p = values.pincode.trim();
    if (p.length !== 6) return;
    // Avoid repeated lookups for the same PIN.
    if (lastPincodeChecked.current === p) return;
    setPincodeLoading(true);
    lookupPincode(p)
      .then((res) => {
        if (!mounted) return;
        if (res) {
          // If this is the first lookup in the form session, only fill empty fields
          // to avoid overwriting user-provided values. For subsequent PIN changes,
          // overwrite the state/district so the form reflects the latest PIN.
          const isFirstLookup = lastPincodeChecked.current === null;
          setValues((prev) => ({
            ...prev,
            state: isFirstLookup ? prev.state || res.state || "" : res.state || "",
            district: isFirstLookup ? prev.district || res.district || "" : res.district || "",
          }));
          setErrors((prev) => ({ ...prev, state: undefined, district: undefined }));
        }
      })
      .finally(() => {
        if (mounted) setPincodeLoading(false);
        lastPincodeChecked.current = p;
      });
    return () => {
      mounted = false;
    };
  }, [values.pincode]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = customerSchema.safeParse(values);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof CustomerInput;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setSaving(true);
    onSubmit(result.data);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        aria-describedby={undefined}
        className={cn(
          "flex flex-col gap-0 border-border bg-surface/95 p-0 backdrop-blur-2xl",
          isMobile ? "h-[92vh] max-h-[92vh] rounded-t-2xl" : "w-full sm:max-w-[460px]",
        )}
      >
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold tracking-tight">
              {customer ? "Edit Customer" : "Add Customer"}
            </h2>
            <p className="truncate font-mono text-[11px] text-muted-foreground">
              {customer ? customer.name : "New customer record"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
          <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto px-5 py-5 sm:grid-cols-2 sm:px-6">
            <Field label="Customer Name" htmlFor="name" error={errors.name} className="sm:col-span-2">
              <input
                id="name"
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Ananya Iyer"
                className={cn(fieldInputClass, errors.name && "border-danger/60")}
              />
            </Field>

            <Field label="Mobile Number" htmlFor="mobile" error={errors.mobile}>
              <input
                id="mobile"
                inputMode="numeric"
                value={values.mobile}
                onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="10-digit number"
                className={cn(fieldInputClass, "font-mono", errors.mobile && "border-danger/60")}
              />
            </Field>

            <Field label="PIN Code" htmlFor="pincode" error={errors.pincode}>
              <div className="relative">
                <input
                  id="pincode"
                  inputMode="numeric"
                  value={values.pincode}
                  onChange={(e) => set("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="6-digit PIN"
                  className={cn(fieldInputClass, "font-mono", errors.pincode && "border-danger/60")}
                />
                {pincodeLoading ? (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">Checking…</div>
                ) : null}
              </div>
            </Field>

            <Field label="Address Detail" htmlFor="address" error={errors.address} className="sm:col-span-2">
              <Textarea
                id="address"
                rows={3}
                value={values.address}
                onChange={(e) => set("address", e.target.value)}
                placeholder="House / building, street, landmark"
                className={cn(fieldInputClass, "resize-none", errors.address && "border-danger/60")}
              />
            </Field>

            <Field label="Place" htmlFor="place" error={errors.place} className="sm:col-span-2">
              <input
                id="place"
                value={values.place}
                onChange={(e) => set("place", e.target.value)}
                placeholder="City, town or locality"
                className={cn(fieldInputClass, errors.place && "border-danger/60")}
              />
            </Field>

            <Field label="State" htmlFor="state" error={errors.state}>
              <SearchableSelect
                id="state"
                value={values.state}
                options={INDIA_STATES}
                onChange={(state) => {
                  setValues((prev) => ({ ...prev, state, district: "" }));
                  setErrors((prev) => ({ ...prev, state: undefined, district: undefined }));
                }}
                placeholder="Select state"
                searchPlaceholder="Search state…"
                emptyText="No state found"
                invalid={Boolean(errors.state)}
              />
            </Field>

            <Field label="District" htmlFor="district" error={errors.district}>
              <SearchableSelect
                id="district"
                value={values.district}
                options={districts}
                onChange={(district) => set("district", district)}
                placeholder={values.state ? "Select district" : "Select state first"}
                searchPlaceholder="Search district…"
                emptyText="No district found"
                disabled={!values.state}
                invalid={Boolean(errors.district)}
              />
            </Field>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {saving ? "Saving…" : customer ? "Save Changes" : "Save Customer"}
            </button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
