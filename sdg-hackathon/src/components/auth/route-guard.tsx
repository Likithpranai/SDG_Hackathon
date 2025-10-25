"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

interface RouteGuardProps {
  children: React.ReactNode;
  requiredUserType?: "artist" | "buyer" | "admin";
}

export function RouteGuard({ children, requiredUserType }: RouteGuardProps) {
  const router = useRouter();
  const { isLoggedIn, isLoading, user } = useAuth();

  // For development - bypass authentication checks
  // In a real app, you would use the commented code below
  /*
  useEffect(() => {
    // Wait until auth is loaded before making decisions
    if (!isLoading) {
      // If not logged in, redirect to login
      if (!isLoggedIn) {
        router.push("/login");
        return;
      }

      // If specific user type is required, check it
      if (requiredUserType && user?.userType !== requiredUserType) {
        // Redirect to appropriate page based on user type
        if (user?.userType === "artist") {
          router.push("/artists/dashboard");
        } else if (user?.userType === "buyer") {
          router.push("/buyers/dashboard");
        } else {
          router.push("/");
        }
      }
    }
  }, [isLoggedIn, isLoading, requiredUserType, user, router]);

  // Show nothing while loading or redirecting
  if (isLoading || !isLoggedIn || (requiredUserType && user?.userType !== requiredUserType)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  */

  // Development mode - always show content
  return <>{children}</>;
}
