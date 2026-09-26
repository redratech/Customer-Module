import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().trim().min(1, { message: "Customer name is required" }).max(80, { message: "Name must be under 80 characters" }),
  mobile: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, { message: "Enter a valid 10-digit mobile number" }),
  address: z.string().trim().min(1, { message: "Address detail is required" }).max(300, { message: "Address must be under 300 characters" }),
  place: z.string().trim().min(1, { message: "Place is required" }).max(80, { message: "Place must be under 80 characters" }),
  state: z.string().trim().min(1, { message: "State is required" }),
  district: z.string().trim().min(1, { message: "District is required" }),
  pincode: z
    .string()
    .trim()
    .regex(/^[0-9]{6}$/, { message: "PIN code must be exactly 6 digits" }),
});

export type CustomerInput = z.infer<typeof customerSchema>;

export type Customer = CustomerInput & {
  id: string;
  createdAt: string;
};

export const emptyCustomer: CustomerInput = {
  name: "",
  mobile: "",
  address: "",
  place: "",
  state: "",
  district: "",
  pincode: "",
};

export function formatMobile(mobile: string) {
  return mobile.length === 10 ? `${mobile.slice(0, 5)} ${mobile.slice(5)}` : mobile;
}

export function matchesQuery(customer: Customer, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [customer.name, customer.mobile, customer.place, customer.district, customer.pincode]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

export const seedCustomers: Customer[] = [
  {
    id: "c-1",
    name: "Ananya Iyer",
    mobile: "9845012345",
    address: "12, MG Road, Shanthala Nagar",
    place: "Bengaluru",
    state: "Karnataka",
    district: "Bengaluru Urban",
    pincode: "560001",
    createdAt: "2026-01-12T09:00:00.000Z",
  },
  {
    id: "c-2",
    name: "Rohit Sharma",
    mobile: "9987045678",
    address: "45, Civil Lines, Near Collectorate",
    place: "Jaipur",
    state: "Rajasthan",
    district: "Jaipur",
    pincode: "302001",
    createdAt: "2026-02-03T09:00:00.000Z",
  },
  {
    id: "c-3",
    name: "Priya Nair",
    mobile: "9822090876",
    address: "8, Marine Drive, Ernakulam South",
    place: "Kochi",
    state: "Kerala",
    district: "Ernakulam",
    pincode: "682001",
    createdAt: "2026-03-18T09:00:00.000Z",
  },
  {
    id: "c-4",
    name: "Arjun Mehta",
    mobile: "9811033445",
    address: "22, Linking Road, Bandra West",
    place: "Mumbai",
    state: "Maharashtra",
    district: "Mumbai",
    pincode: "400050",
    createdAt: "2026-04-22T09:00:00.000Z",
  },
];
