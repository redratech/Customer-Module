import { useCallback, useEffect, useState } from "react";
import type { Customer, CustomerInput } from "@/lib/customer";
import { seedCustomers } from "@/lib/customer";

const STORAGE_KEY = "vantage.customers.v1";

function readStored(): Customer[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedCustomers;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Customer[]) : seedCustomers;
  } catch {
    return seedCustomers;
  }
}

/** Customer records with local persistence, plus loading/error state. */
export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setCustomers(readStored());
      setError(null);
    } catch {
      setError("We couldn't load your customer records.");
    } finally {
      setLoading(false);
    }
  }, []);

  const persist = useCallback((next: Customer[]) => {
    setCustomers(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      setError("Changes could not be saved on this device.");
    }
  }, []);

  const addCustomer = useCallback(
    (input: CustomerInput) => {
      const customer: Customer = {
        ...input,
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `c-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      persist([customer, ...customers]);
      return customer;
    },
    [customers, persist],
  );

  const updateCustomer = useCallback(
    (id: string, input: CustomerInput) => {
      persist(customers.map((c) => (c.id === id ? { ...c, ...input } : c)));
    },
    [customers, persist],
  );

  const deleteCustomer = useCallback(
    (id: string) => {
      persist(customers.filter((c) => c.id !== id));
    },
    [customers, persist],
  );

  return { customers, loading, error, addCustomer, updateCustomer, deleteCustomer };
}
