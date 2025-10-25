"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{success: boolean; message?: string}>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  isLoggedIn: boolean;
  isArtist: boolean;
  isBuyer: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check for existing user session
  useEffect(() => {
    const storedUser = localStorage.getItem("artconnect_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("artconnect_user");
        localStorage.removeItem("artconnect_user_id");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{success: boolean; message?: string}> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Login failed');
        return { success: false, message: data.error || 'Login failed' };
      }

      // Store user in localStorage for persistence
      localStorage.setItem("artconnect_user", JSON.stringify(data.user));
      localStorage.setItem("artconnect_user_id", data.user.id);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      setError('Network error. Please try again.');
      return { success: false, message: 'Network error. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("artconnect_user");
    localStorage.removeItem("artconnect_user_id");
    setUser(null);
    router.push('/');
  };
  
  const clearError = () => {
    setError(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("artconnect_user", JSON.stringify(updatedUser));
  };

  const isLoggedIn = !!user;
  const isArtist = isLoggedIn && user?.userType === "artist";
  const isBuyer = isLoggedIn && user?.userType === "buyer";

  const value = {
    user,
    isLoading,
    login,
    logout,
    updateUser,
    isLoggedIn,
    isArtist,
    isBuyer,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
