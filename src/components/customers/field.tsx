import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  className?: string | undefined;
  children: ReactNode;
};

export function Field({ label, htmlFor, error, className, children }: FieldProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-muted-foreground">
        {label} <span className="text-danger">*</span>
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const fieldInputClass =
  "w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm text-foreground placeholder:text-faint outline-none transition hover:border-border-strong focus:border-primary/40 focus:ring-2 focus:ring-ring";
