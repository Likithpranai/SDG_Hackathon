"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MainLayout } from "@/components/layout/main-layout";
import { Palette, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GetStarted() {
  return (
    <MainLayout>
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Join the <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">ArtConnect</span> Community
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Choose your path to connect with the art world in a way that suits you best
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Artist Option */}
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-xl">
            <div className="h-48 relative overflow-hidden">
              <Image 
                src="/artists-banner.jpg" 
                alt="Artist workspace with canvas and paint"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">For Artists</h2>
                  <p className="text-gray-200">Showcase your work and connect with art enthusiasts</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1 rounded-full mr-3 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Create your artist profile and portfolio</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1 rounded-full mr-3 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Get AI-powered feedback on your artwork</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1 rounded-full mr-3 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Connect with other artists for collaboration</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1 rounded-full mr-3 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Sell your artwork to interested buyers</span>
                </li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/signup/artist" className="flex-1">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Palette className="h-5 w-5 mr-2" />
                    Sign Up as Artist
                  </Button>
                </Link>
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300">
                    Already have an account?
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Buyer Option */}
          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-xl">
            <div className="h-48 relative overflow-hidden">
              <Image 
                src="/buyers-banner.jpg" 
                alt="Art gallery with visitors"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">For Buyers</h2>
                  <p className="text-gray-200">Discover unique artwork that speaks to you</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-1 rounded-full mr-3 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Browse a diverse collection of artwork</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-1 rounded-full mr-3 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Get matched with artists based on your taste</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-1 rounded-full mr-3 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Connect directly with artists for custom pieces</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-1 rounded-full mr-3 mt-0.5">
                    <ChevronRight className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Stay updated on art events and exhibitions</span>
                </li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/signup/buyer" className="flex-1">
                  <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                    <Users className="h-5 w-5 mr-2" />
                    Sign Up as Buyer
                  </Button>
                </Link>
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full border-pink-300 dark:border-pink-700 text-pink-700 dark:text-pink-300">
                    Already have an account?
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Not sure which option is right for you?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            You can always create both types of accounts if you're both an artist and an art enthusiast.
            Each account type gives you access to different features tailored to your needs.
          </p>
          <Link href="/about">
            <Button variant="outline" className="px-8">
              Learn More About ArtConnect
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
