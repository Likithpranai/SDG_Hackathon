"use client";

import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export default function TestAuth() {
  const { user, isLoggedIn, isArtist, isBuyer, logout } = useAuth();

  return (
    <MainLayout>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-6">
            Authentication Test Page
          </h1>

          <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Authentication Status
            </h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="font-medium">Logged In:</span>
                <span className={isLoggedIn ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                  {isLoggedIn ? "Yes" : "No"}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Is Artist:</span>
                <span className={isArtist ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                  {isArtist ? "Yes" : "No"}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Is Buyer:</span>
                <span className={isBuyer ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                  {isBuyer ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>

          {isLoggedIn && user && (
            <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                User Information
              </h2>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="font-medium">ID:</span>
                  <span>{user.id}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{user.name}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{user.email}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">User Type:</span>
                  <span className={
                    user.userType === "artist" 
                      ? "text-indigo-600 dark:text-indigo-400" 
                      : "text-pink-600 dark:text-pink-400"
                  }>
                    {user.userType.charAt(0).toUpperCase() + user.userType.slice(1)}
                  </span>
                </p>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <Button 
              onClick={() => window.location.href = "/login"}
              className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              Go to Login
            </Button>
            <Button 
              onClick={() => window.location.href = "/signup"}
              className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Go to Signup
            </Button>
            {isLoggedIn && (
              <Button 
                onClick={() => logout()}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
