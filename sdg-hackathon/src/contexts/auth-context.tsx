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

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedUser = localStorage.getItem("artconnect_user");
        const storedUserId = localStorage.getItem("artconnect_user_id");
        
        if (storedUser) {
          // Use the stored user data for immediate rendering
          setUser(JSON.parse(storedUser));
          
          // If we have a user ID, validate the session with the server
          if (storedUserId) {
            try {
              const response = await fetch(`/api/auth/user?userId=${storedUserId}`);
              if (response.ok) {
                const data = await response.json();
                // Update the user data with the latest from the server
                localStorage.setItem("artconnect_user", JSON.stringify(data.user));
                setUser(data.user);
              } else {
                // If the server rejects the session, log the user out
                localStorage.removeItem("artconnect_user");
                localStorage.removeItem("artconnect_user_id");
                setUser(null);
              }
            } catch (apiError) {
              console.error("API error during session validation:", apiError);
              // Keep the user logged in with stored data if API is unavailable
            }
          }
        }
      } catch (error) {
        console.error("Failed to restore session:", error);
        localStorage.removeItem("artconnect_user");
        localStorage.removeItem("artconnect_user_id");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
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
