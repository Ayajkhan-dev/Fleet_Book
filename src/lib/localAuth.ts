// Local Authentication System for FleetBook
// Works independently of OAuth - stores user in localStorage

export interface LocalUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "operator" | "admin";
  city: string;
  avatar?: string;
  status: string;
  rating?: string;
  totalReviews?: number;
  businessName?: string;
  yearsInBusiness?: number;
  operatingCities?: string;
}

const LOCAL_AUTH_KEY = "fleetbook_user";

// Pre-defined demo accounts for instant login
export const demoAccounts: LocalUser[] = [
  { id: 101, name: "Ankit Mishra", email: "ankit@email.com", phone: "9876501234", role: "customer", city: "Lucknow", status: "active" },
  { id: 201, name: "Rajesh Sharma", email: "rajesh@sharmacars.in", phone: "9876543210", role: "operator", city: "Lucknow", status: "active", businessName: "Sharma Fleet Services", rating: "4.5", totalReviews: 12, yearsInBusiness: 8, operatingCities: "Lucknow,Kanpur,Allahabad" },
  { id: 301, name: "FleetBook Admin", email: "admin@fleetbook.in", phone: "9999999999", role: "admin", city: "Delhi", status: "active" },
];

export function getLocalUser(): LocalUser | null {
  try {
    const stored = localStorage.getItem(LOCAL_AUTH_KEY);
    if (stored) {
      return JSON.parse(stored) as LocalUser;
    }
  } catch {
    // ignore
  }
  return null;
}

export function setLocalUser(user: LocalUser): void {
  localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(user));
}

export function clearLocalUser(): void {
  localStorage.removeItem(LOCAL_AUTH_KEY);
}

export function loginLocal(email: string, password: string, role: string): LocalUser | null {
  // For demo: any password works with demo accounts
  const account = demoAccounts.find(
    (a) => a.email.toLowerCase() === email.toLowerCase() && a.role === role
  );
  if (account) {
    setLocalUser(account);
    return account;
  }

  // If not a demo account, create a new user (registration)
  if (email && password && password.length >= 4) {
    const newUser: LocalUser = {
      id: Date.now(),
      name: email.split("@")[0],
      email,
      phone: "",
      role: role as "customer" | "operator" | "admin",
      city: "Lucknow",
      status: "active",
    };
    setLocalUser(newUser);
    return newUser;
  }

  return null;
}

export function registerLocal(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  city?: string;
}): LocalUser | null {
  if (!data.name || !data.email || !data.password || data.password.length < 4) {
    return null;
  }

  // Check if email already exists
  const existing = demoAccounts.find(a => a.email.toLowerCase() === data.email.toLowerCase());
  if (existing) {
    // Just log them in
    setLocalUser(existing);
    return existing;
  }

  const newUser: LocalUser = {
    id: Date.now(),
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    role: (data.role as "customer" | "operator") || "customer",
    city: data.city || "Lucknow",
    status: data.role === "operator" ? "pending" : "active",
  };

  setLocalUser(newUser);
  return newUser;
}

export function logoutLocal(): void {
  clearLocalUser();
}

export function isAuthenticated(): boolean {
  return getLocalUser() !== null;
}
