"use client";

import React from "react";
import { Palette, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export function UserTypeSelector() {
  const { setUserType } = useAuth();

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-lg p-8 space-y-8">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Choose User Type
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Select how you want to use the platform
          </p>
        </div>

        <div className="space-y-6">
          <div 
            className="p-6 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all cursor-pointer"
            onClick={() => setUserType("artist")}
          >
            <div className="flex items-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
                <Palette className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">Artist</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Showcase your artwork and connect with buyers</p>
              </div>
            </div>
            <Button 
              className="mt-4 w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              onClick={() => setUserType("artist")}
            >
              Continue as Artist
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div 
            className="p-6 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all cursor-pointer"
            onClick={() => setUserType("buyer")}
          >
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                <ShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">Buyer</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Discover and purchase unique artworks</p>
              </div>
            </div>
            <Button 
              className="mt-4 w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              onClick={() => setUserType("buyer")}
            >
              Continue as Buyer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
