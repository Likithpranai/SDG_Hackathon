"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, Palette, Users } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function SignupPage() {
  const router = useRouter();
  const { login, isLoggedIn, isArtist, isBuyer } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"artist" | "buyer">("artist");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      if (isArtist) {
        router.push("/artists/dashboard");
      } else if (isBuyer) {
        router.push("/buyers/dashboard");
      }
    }
  }, [isLoggedIn, isArtist, isBuyer, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);

    try {
      // Register the user
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, userType }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Registration failed');
        setIsLoading(false);
        return;
      }

      // If registration was successful, log the user in
      const loginResult = await login(email, password);
      
      if (loginResult.success) {
        // The router.push will be handled by the useEffect above
        // based on the user type (artist or buyer)
      } else {
        setError(loginResult.message || "Login failed after registration");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex min-h-[80vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-lg p-8 space-y-8">
            <div className="text-center">
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-indigo-700 dark:text-indigo-300">
                Create Your Account
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Join our community as an artist or buyer
              </p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-900"
                    placeholder="John Doe"
                    label="Full Name"
                    leftIcon={<User className="h-5 w-5 text-gray-400" />}
                  />
                </div>

                <div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-900"
                    placeholder="you@example.com"
                    label="Email address"
                    leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
                  />
                </div>

                <div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-900"
                    placeholder="••••••••"
                    label="Password"
                    leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    }
                  />
                </div>

                <div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-900"
                    placeholder="••••••••"
                    label="Confirm Password"
                    leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                  />
                </div>
              </div>

              {/* Account Type Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Account Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setUserType("artist")}
                    className={`p-4 rounded-lg border-2 flex flex-col items-center ${userType === "artist" 
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300" 
                      : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700"}`}
                  >
                    <Palette className="h-8 w-8 mb-2 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-medium">Artist</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Create & sell artwork</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setUserType("buyer")}
                    className={`p-4 rounded-lg border-2 flex flex-col items-center ${userType === "buyer" 
                      ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300" 
                      : "border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700"}`}
                  >
                    <Users className="h-8 w-8 mb-2 text-pink-600 dark:text-pink-400" />
                    <span className="font-medium">Buyer</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Discover & purchase art</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  I agree to the{" "}
                  <Link href="/terms" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                    Privacy Policy
                  </Link>
                </span>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  {isLoading ? "Creating account..." : "Create account"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4 inline" />}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-[#1a1a2e] text-gray-500 dark:text-gray-400">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/login"
                  className="w-full flex justify-center items-center px-4 py-2 border border-indigo-300 dark:border-indigo-700 rounded-md shadow-sm text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-white dark:bg-transparent hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                >
                  Sign in instead
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
