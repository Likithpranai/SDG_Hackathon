"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainLayout } from "@/components/layout/main-layout";
import { Users, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function BuyerAuth() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login with email and password
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    
    const result = await login(email, password);
    
    if (result.success) {
      router.push('/buyers/dashboard');
    } else {
      setIsLoading(false);
      alert(result.message || 'Login failed');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would call a signup API
    // For now, simulate with a login
    const email = (document.getElementById('signup-email') as HTMLInputElement).value;
    const password = (document.getElementById('signup-password') as HTMLInputElement).value;
    
    const result = await login(email, password);
    
    if (result.success) {
      router.push('/buyers/dashboard');
    } else {
      setIsLoading(false);
      alert(result.message || 'Signup failed');
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Link href="/" className="flex items-center text-pink-600 dark:text-pink-400 mb-6 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
        
        <div className="flex items-center justify-center mb-8">
          <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-full mr-3">
            <Users className="h-6 w-6 text-pink-600 dark:text-pink-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Buyer Portal</h1>
        </div>

        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-2 border-b border-gray-200 dark:border-gray-800">
            <button
              className={`py-3 font-medium text-sm ${
                activeTab === 'login'
                  ? 'text-pink-600 dark:text-pink-400 border-b-2 border-pink-600 dark:border-pink-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`py-3 font-medium text-sm ${
                activeTab === 'signup'
                  ? 'text-pink-600 dark:text-pink-400 border-b-2 border-pink-600 dark:border-pink-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="buyer@example.com" 
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <a href="#" className="text-pink-600 hover:text-pink-500 dark:text-pink-400">
                      Forgot password?
                    </a>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="Your Name" 
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="buyer@example.com" 
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      id="signup-password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    I agree to the <a href="#" className="text-pink-600 hover:underline dark:text-pink-400">Terms of Service</a> and <a href="#" className="text-pink-600 hover:underline dark:text-pink-400">Privacy Policy</a>
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Buyer Account"}
                </Button>
              </form>
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Are you an artist instead? <Link href="/artists/auth" className="text-pink-600 hover:underline dark:text-pink-400">Go to artist login</Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
