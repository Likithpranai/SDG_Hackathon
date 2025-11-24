"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, UserType } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  setUserType: (userType: UserType) => void;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  isLoggedIn: boolean;
  isArtist: boolean;
  isBuyer: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing user session
  useEffect(() => {
    const storedUserType = localStorage.getItem("aura_user_type");
    if (storedUserType) {
      try {
        const userType = storedUserType as UserType;
        // Create a demo user with the stored user type
        const demoUser: User = {
          id: "demo-user",
          name: userType === "artist" ? "Demo Artist" : "Demo Buyer",
          email: `demo-${userType}@example.com`,
          userType: userType,
          profileImage: "/placeholder-profile.jpg",
          savedArtists: userType === "buyer" ? ["1", "2", "3"] : [] // Initialize with some matched artists for buyers
        };
        setUser(demoUser);
      } catch (error) {
        console.error("Error parsing stored user type:", error);
        localStorage.removeItem("aura_user_type");
      }
    }
    setIsLoading(false);
  }, []);

  // Set user type (artist or buyer) without authentication
  const setUserType = (userType: UserType) => {
    // Create a demo user with the selected user type
    const demoUser: User = {
      id: "demo-user",
      name: userType === "artist" ? "Demo Artist" : "Demo Buyer",
      email: `demo-${userType}@example.com`,
      userType: userType,
      profileImage: "/placeholder-profile.jpg",
      savedArtists: userType === "buyer" ? ["1", "2", "3"] : [] // Initialize with some matched artists for buyers
    };

    // Store user type in localStorage for persistence
    localStorage.setItem("aura_user_type", userType);
    setUser(demoUser);

    // Redirect to appropriate dashboard
    if (userType === "artist") {
      router.push('/artists/dashboard');
    } else {
      router.push('/buyers/dashboard');
    }
  };

  const logout = () => {
    localStorage.removeItem("aura_user_type");
    setUser(null);
    router.push('/');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    // Store the updated user type in localStorage
    localStorage.setItem("aura_user_type", updatedUser.userType);
  };

  const isLoggedIn = !!user;
  const isArtist = isLoggedIn && user?.userType === "artist";
  const isBuyer = isLoggedIn && user?.userType === "buyer";

  const value = {
    user,
    isLoading,
    setUserType,
    logout,
    updateUser,
    isLoggedIn,
    isArtist,
    isBuyer,
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
