import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@/types/user-type";
import AuthService from "@/services/auth-service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  checkEmail: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch latest user data from server
  const refreshUser = async () => {
    setLoading(true);
    try {
      const authenticatedUser = await AuthService.checkAuth();
      const userData = authenticatedUser.data;
      setUser(userData?.user || null);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Initialize auth on mount
  useEffect(() => {
    refreshUser();
  }, []);

  // Check if an email is already registered
  const checkEmail = async (email: string): Promise<boolean> => {
    try {
      const response = await AuthService.userExists(email);
      return !!response.data?.user;
    } catch (error) {
      console.error("Email check error:", error);
      return false;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await AuthService.logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    logout,
    refreshUser,
    checkEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
