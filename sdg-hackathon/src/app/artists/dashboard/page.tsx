"use client";

import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, BarChart2, Settings, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ArtistDashboard() {
  // Mock data for the dashboard
  const recentUploads = [
    { id: 1, title: "Abstract Landscape", image: "/placeholder-art-1.jpg", likes: 24, views: 156 },
    { id: 2, title: "Urban Reflections", image: "/placeholder-art-2.jpg", likes: 18, views: 102 },
    { id: 3, title: "Colorful Emotions", image: "/placeholder-art-3.jpg", likes: 32, views: 215 },
  ];

  return (
    <MainLayout>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">Artist Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Welcome back! Manage your artwork and track your performance.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button
              className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              size="sm"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload New Art
            </Button>
            <Button
              variant="outline"
              className="border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300"
              size="sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                <ImageIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Total Artworks</h3>
                <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-full">
                <BarChart2 className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Total Views</h3>
                <p className="text-3xl font-bold text-pink-700 dark:text-pink-300">1,248</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                <BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Total Likes</h3>
                <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">286</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Uploads</h2>
            <Link
              href="/artists/uploads"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentUploads.map((artwork) => (
              <div
                key={artwork.id}
                className="bg-gray-50 dark:bg-gray-900/50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                    <ImageIcon className="h-10 w-10 text-gray-400 dark:text-gray-600" />
                  </div>
                  {/* In a real app, you would have actual artwork images */}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">{artwork.title}</h3>
                  <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{artwork.likes} likes</span>
                    <span>{artwork.views} views</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Upload New Art Card */}
            <Link
              href="/artists/upload"
              className="bg-gray-50 dark:bg-gray-900/50 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center p-6 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors cursor-pointer"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mb-3">
                <Plus className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <p className="font-medium text-indigo-700 dark:text-indigo-300">Upload New Artwork</p>
            </Link>
          </div>
        </div>

        {/* Upcoming Features */}
        <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-lg p-6">
          <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">Coming Soon</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We're working on exciting new features to help you grow your artistic presence, including analytics,
            commission management, and more!
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
