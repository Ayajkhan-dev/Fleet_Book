import { useCallback, useMemo } from "react";
import { getLocalUser, logoutLocal, type LocalUser } from "@/lib/localAuth";

export interface UnifiedUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: "customer" | "operator" | "admin";
  city?: string;
  status?: string;
  rating?: string;
  totalReviews?: number;
  businessName?: string;
  yearsInBusiness?: number;
  operatingCities?: string;
  createdAt?: Date;
}

function normalizeUser(localUser: LocalUser): UnifiedUser {
  return {
    id: localUser.id,
    name: localUser.name,
    email: localUser.email,
    phone: localUser.phone,
    avatar: localUser.avatar,
    role: localUser.role,
    city: localUser.city,
    status: localUser.status,
    rating: localUser.rating,
    totalReviews: localUser.totalReviews,
    businessName: localUser.businessName,
    yearsInBusiness: localUser.yearsInBusiness,
    operatingCities: localUser.operatingCities,
  };
}

export function useAuth() {
  const localUser = getLocalUser();

  const user: UnifiedUser | null = useMemo(() => {
    if (localUser) {
      return normalizeUser(localUser);
    }
    return null;
  }, [localUser]);

  const isAuthenticated = !!user;
  const isLoading = false;

  const logout = useCallback(() => {
    logoutLocal();
    // Also clear any OAuth cookies
    document.cookie = "kimi_sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  }, []);

  return useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      isAdmin: user?.role === "admin",
      isOperator: user?.role === "operator",
      isCustomer: user?.role === "customer",
      logout,
      refresh: () => window.location.reload(),
    }),
    [user, isAuthenticated, isLoading, logout]
  );
}
