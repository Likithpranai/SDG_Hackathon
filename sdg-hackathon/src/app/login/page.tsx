"use client";

import React from "react";
import Link from "next/link";
import { MainLayout } from "@/components";
import { Button } from "@/components/ui";
import { Palette, ShoppingBag, ArrowRight } from "lucide-react";
import { ROUTES } from "@/constants";

export default function LoginPage() {

  return (
    <MainLayout>
      <div className="flex min-h-[80vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-lg p-8 space-y-8">
            <div className="text-center">
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Choose Account Type
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Select the type of account you want to sign in to
              </p>
            </div>

            <div className="space-y-6">
              <Link href={ROUTES.LOGIN + "/artist"} className="block">
                <div className="p-6 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all">
                  <div className="flex items-center">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
                      <Palette className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">Artist Account</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Showcase your artwork and connect with buyers</p>
                    </div>
                  </div>
                  <Button 
                    className="mt-4 w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  >
                    Sign in as Artist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>

              <Link href={ROUTES.LOGIN + "/buyer"} className="block">
                <div className="p-6 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                      <ShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">Buyer Account</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Discover and purchase unique artworks</p>
                    </div>
                  </div>
                  <Button 
                    className="mt-4 w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  >
                    Sign in as Buyer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-[#1a1a2e] text-gray-500 dark:text-gray-400">
                    New here?
                  </span>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <Link
                  href="/signup"
                  className="flex-1 flex justify-center items-center px-4 py-2 border border-indigo-300 dark:border-indigo-700 rounded-md shadow-sm text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-white dark:bg-transparent hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                >
                  Artist Signup
                </Link>
                <Link
                  href="/signup/buyer"
                  className="flex-1 flex justify-center items-center px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-md shadow-sm text-sm font-medium text-blue-700 dark:text-blue-300 bg-white dark:bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  Buyer Signup
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
