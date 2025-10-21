"use client";

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  Image as ImageIcon, 
  BarChart2, 
  Settings, 
  Plus, 
  Heart, 
  Eye, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Globe, 
  Facebook, 
  Youtube, 
  User, 
  Users 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/utils/cn";

export default function ArtistDashboard() {
  const router = useRouter();
  const { isLoggedIn, isArtist } = useAuth();
  const [activeTab, setActiveTab] = useState("profile"); // "profile" or "dashboard"

  // Redirect if not logged in as artist
  useEffect(() => {
    if (!isLoggedIn || !isArtist) {
      router.push("/login");
    }
  }, [isLoggedIn, isArtist, router]);

  // Mock data for the artist profile
  const artistProfile = {
    name: "Sofia Rodriguez",
    profileImage: "/placeholder-profile.jpg",
    coverImage: "/placeholder-cover.jpg",
    bio: "Contemporary visual artist specializing in mixed media and digital art. Drawing inspiration from urban landscapes and natural patterns to create vibrant, thought-provoking pieces that challenge perception.",
    experience: "8 years",
    primaryMedium: "Mixed Media, Digital Art",
    location: "Barcelona, Spain",
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com/sofia.creates" },
      { platform: "twitter", url: "https://twitter.com/sofia_art" },
      { platform: "website", url: "https://sofiaart.com" },
    ],
    stats: {
      artworks: 42,
      views: 12480,
      likes: 3286,
      sales: 18
    }
  };

  // Mock data for the artist's artwork
  const artworks = [
    { 
      id: 1, 
      title: "Urban Rhythm", 
      image: "/placeholder-art-1.jpg", 
      description: "A dynamic exploration of city life through abstract forms and vibrant colors.",
      technique: "Acrylic on canvas with digital enhancement",
      likes: 124, 
      views: 756,
      width: "wide", // For Pinterest-style layout
    },
    { 
      id: 2, 
      title: "Serenity in Blue", 
      image: "/placeholder-art-2.jpg", 
      description: "Meditative piece exploring the calming effects of blue tones and flowing forms.",
      technique: "Digital painting",
      likes: 98, 
      views: 502,
      width: "medium", 
    },
    { 
      id: 3, 
      title: "Fragmented Reality", 
      image: "/placeholder-art-3.jpg", 
      description: "A deconstruction of perception through geometric shapes and contrasting textures.",
      technique: "Mixed media collage",
      likes: 132, 
      views: 815,
      width: "tall", 
    },
    { 
      id: 4, 
      title: "Neon Dreams", 
      image: "/placeholder-art-4.jpg", 
      description: "Vibrant nightlife inspired piece with bold neon elements against dark backgrounds.",
      technique: "Digital art with photographic elements",
      likes: 187, 
      views: 1024,
      width: "medium", 
    },
    { 
      id: 5, 
      title: "Natural Abstractions", 
      image: "/placeholder-art-5.jpg", 
      description: "Organic forms and earthy tones create a harmonious abstract representation of natural elements.",
      technique: "Watercolor and ink",
      likes: 76, 
      views: 438,
      width: "wide", 
    },
    { 
      id: 6, 
      title: "Emotional Landscape", 
      image: "/placeholder-art-6.jpg", 
      description: "A visual journey through the spectrum of human emotions using color theory and abstract forms.",
      technique: "Oil painting with digital post-processing",
      likes: 145, 
      views: 892,
      width: "tall", 
    },
  ];

  if (!isLoggedIn || !isArtist) {
    return null; // Don't render anything while checking auth
  }
  
  // Helper function to render social icon based on platform
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-5 w-5" />;
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      case "facebook":
        return <Facebook className="h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
      case "youtube":
        return <Youtube className="h-5 w-5" />;
      case "website":
      default:
        return <Globe className="h-5 w-5" />;
    }
  };

  return (
    <MainLayout>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        {/* Profile Header with Image and Name */}
        <div className="mb-8 bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm overflow-hidden">
          {/* Cover Image */}
          <div className="h-40 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-size-[20px_20px]"></div>
          </div>
          
          <div className="px-6 py-6 flex flex-col md:flex-row">
            {/* Profile Image */}
            <div className="-mt-16 mb-4 md:mb-0 shrink-0">
              <div className="h-32 w-32 rounded-full border-4 border-white dark:border-[#1a1a2e] overflow-hidden bg-indigo-100 dark:bg-indigo-900/30 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="h-16 w-16 text-indigo-300 dark:text-indigo-700" />
                </div>
              </div>
            </div>
            
            {/* Name and Social Links */}
            <div className="md:ml-6 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{artistProfile.name}</h1>
                  <p className="text-gray-500 dark:text-gray-400">{artistProfile.location}</p>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    className="border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300"
                    size="sm"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-4 flex space-x-3">
                {artistProfile.socialLinks.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {renderSocialIcon(link.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Profile/Dashboard Toggle */}
          <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-4">
            <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab("profile")}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  activeTab === "profile"
                    ? "bg-white dark:bg-gray-900 text-indigo-700 dark:text-indigo-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-500"
                )}
              >
                View Profile
              </button>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  activeTab === "dashboard"
                    ? "bg-white dark:bg-gray-900 text-indigo-700 dark:text-indigo-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-500"
                )}
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "profile" ? (
          <>
            {/* Artist Bio with Artsy Border */}
            <div className="mb-8">
              <div className="relative">
                <div className="absolute inset-0 border-8 border-double border-indigo-100 dark:border-indigo-900/30 rounded-lg transform -rotate-1"></div>
                <div className="absolute inset-0 border-4 border-dashed border-purple-100 dark:border-purple-900/30 rounded-lg transform rotate-1"></div>
                <div className="relative bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6 z-10">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
                  <p className="text-gray-600 dark:text-gray-400 italic">"{artistProfile.bio}"</p>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="block text-gray-500 dark:text-gray-400">Experience</span>
                      <span className="font-medium text-gray-900 dark:text-white">{artistProfile.experience}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 dark:text-gray-400">Primary Medium</span>
                      <span className="font-medium text-gray-900 dark:text-white">{artistProfile.primaryMedium}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 dark:text-gray-400">Location</span>
                      <span className="font-medium text-gray-900 dark:text-white">{artistProfile.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* My Work - Pinterest Style Gallery */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Work</h2>
                <Button
                  className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  size="sm"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Art
                </Button>
              </div>
              
              {/* Pinterest-style masonry layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
                {artworks.map((artwork) => (
                  <div 
                    key={artwork.id}
                    className={cn(
                      "bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all hover:scale-[1.02] duration-300 cursor-pointer",
                      artwork.width === "wide" ? "col-span-2" : "",
                      artwork.width === "tall" ? "row-span-2" : ""
                    )}
                  >
                    <div className={cn(
                      "relative bg-gray-200 dark:bg-gray-800",
                      artwork.width === "wide" ? "aspect-video" : "",
                      artwork.width === "tall" ? "aspect-9/16" : "",
                      artwork.width === "medium" ? "aspect-square" : ""
                    )}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ImageIcon className="h-10 w-10 text-gray-400 dark:text-gray-600" />
                      </div>
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                        <h3 className="font-medium text-lg">{artwork.title}</h3>
                        <p className="text-sm text-gray-200 line-clamp-2">{artwork.description}</p>
                        <div className="flex justify-between mt-2 text-xs">
                          <span className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" /> {artwork.likes}
                          </span>
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" /> {artwork.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Upload New Art Card */}
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center p-6 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors cursor-pointer aspect-square">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mb-3">
                    <Plus className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <p className="font-medium text-indigo-700 dark:text-indigo-300">Upload New Artwork</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Dashboard Stats View
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                    <ImageIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Total Artworks</h3>
                    <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{artistProfile.stats.artworks}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-full">
                    <Eye className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Total Views</h3>
                    <p className="text-3xl font-bold text-pink-700 dark:text-pink-300">{artistProfile.stats.views.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                    <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Total Likes</h3>
                    <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{artistProfile.stats.likes.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                    <BarChart2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Total Sales</h3>
                    <p className="text-3xl font-bold text-green-700 dark:text-green-300">{artistProfile.stats.sales}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Activity Chart Placeholder */}
            <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Activity Overview</h2>
              <div className="h-64 bg-gray-50 dark:bg-gray-900/50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Activity chart visualization would appear here</p>
              </div>
            </div>
            
            {/* Top Performing Artworks */}
            <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Top Performing Artworks</h2>
              <div className="space-y-4">
                {artworks.slice(0, 3).map((artwork) => (
                  <div key={artwork.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <div className="h-16 w-16 bg-gray-200 dark:bg-gray-800 rounded-md shrink-0 flex items-center justify-center mr-4">
                      <ImageIcon className="h-6 w-6 text-gray-400 dark:text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{artwork.title}</h3>
                      <div className="flex space-x-4 mt-1 text-sm">
                        <span className="text-gray-500 dark:text-gray-400 flex items-center">
                          <Heart className="h-3 w-3 mr-1 text-purple-500" /> {artwork.likes}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 flex items-center">
                          <Eye className="h-3 w-3 mr-1 text-blue-500" /> {artwork.views}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm" className="text-xs p-1 h-auto">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
