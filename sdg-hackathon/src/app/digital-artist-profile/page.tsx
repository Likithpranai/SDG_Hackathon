"use client";

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  Image as ImageIcon, 
  Heart, 
  Eye, 
  Twitter, 
  Instagram, 
  Globe, 
  Plus, 
  Mail,
  Calendar,
  Briefcase,
  MapPin,
  X,
  Save
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { digitalArtist } from "@/lib/digital-artist-data";

export default function DigitalArtistProfile() {
  const [activeTab, setActiveTab] = useState("profile"); // "profile" or "dashboard"
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Use the digital artist data with state so we can update it
  const [artist, setArtist] = useState(digitalArtist);
  
  // Form state for editing profile
  const [editForm, setEditForm] = useState({
    name: artist.name,
    age: artist.age,
    location: artist.location,
    email: artist.email,
    bio: artist.bio,
    experience: artist.experience,
    primaryMedium: artist.primaryMedium,
    skills: artist.skills
  });
  
  // Update form when artist changes
  useEffect(() => {
    setEditForm({
      name: artist.name,
      age: artist.age,
      location: artist.location,
      email: artist.email,
      bio: artist.bio,
      experience: artist.experience,
      primaryMedium: artist.primaryMedium,
      skills: artist.skills
    });
  }, [artist]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setArtist(prev => ({
      ...prev,
      name: editForm.name,
      age: editForm.age,
      location: editForm.location,
      email: editForm.email,
      bio: editForm.bio,
      experience: editForm.experience,
      primaryMedium: editForm.primaryMedium,
      skills: editForm.skills
    }));
    setIsEditModalOpen(false);
  };

  // Helper function to render social icon based on platform
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-5 w-5" />;
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      default:
        return <Globe className="h-5 w-5" />;
    }
  };

  return (
    <MainLayout>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 dark:bg-gray-800 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={editForm.age}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={editForm.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 dark:bg-gray-800 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={editForm.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 dark:bg-gray-800 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Experience</label>
                      <input
                        type="text"
                        id="experience"
                        name="experience"
                        value={editForm.experience}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="primaryMedium" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Primary Medium</label>
                      <input
                        type="text"
                        id="primaryMedium"
                        name="primaryMedium"
                        value={editForm.primaryMedium}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills</label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={editForm.skills}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-800">
                  <Button
                    type="button"
                    variant="outline"
                    className="mr-2"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
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
                  <ImageIcon className="h-16 w-16 text-indigo-300 dark:text-indigo-700" />
                </div>
              </div>
            </div>
            
            {/* Name and Social Links */}
            <div className="md:ml-6 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{artist.name}</h1>
                  <p className="text-gray-500 dark:text-gray-400">{artist.location}</p>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    className="border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300"
                    size="sm"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-4 flex space-x-3">
                {artist.socialLinks && Object.entries(artist.socialLinks).map(([platform, handle], index) => (
                  <a 
                    key={index} 
                    href={platform === 'website' ? (handle || '#') : `https://${platform}.com/${(handle || '').replace('@', '')}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {renderSocialIcon(platform)}
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
            {/* Artist Bio with Artsy Border - Maintaining original aesthetic */}
            <div className="mb-8">
              <div className="relative">
                <div className="absolute inset-0 border-8 border-double border-indigo-100 dark:border-indigo-900/30 rounded-lg transform -rotate-1"></div>
                <div className="absolute inset-0 border-4 border-dashed border-purple-100 dark:border-purple-900/30 rounded-lg transform rotate-1"></div>
                <div className="relative bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6 z-10">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
                  <p className="text-gray-600 dark:text-gray-400 italic">"{artist.bio}"</p>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="block text-gray-500 dark:text-gray-400">Primary Medium</span>
                      <span className="font-medium text-gray-900 dark:text-white">{artist.primaryMedium}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 dark:text-gray-400">Location</span>
                      <span className="font-medium text-gray-900 dark:text-white flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-indigo-500" />
                        {artist.location}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-500 dark:text-gray-400">Experience</span>
                      <span className="font-medium text-gray-900 dark:text-white flex items-center">
                        <Briefcase className="h-4 w-4 mr-1 text-indigo-500" />
                        {artist.experience}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-500 dark:text-gray-400">Email</span>
                      <span className="font-medium text-gray-900 dark:text-white flex items-center">
                        <Mail className="h-4 w-4 mr-1 text-indigo-500" />
                        <a href={`mailto:${artist.email}`} className="hover:text-indigo-600 hover:underline">
                          {artist.email}
                        </a>
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-500 dark:text-gray-400">Skills</span>
                      <span className="font-medium text-gray-900 dark:text-white">{artist.skills}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 dark:text-gray-400">Age</span>
                      <span className="font-medium text-gray-900 dark:text-white">{artist.age}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* My Work - Pinterest Style Gallery - Using the gallery data from digital artist */}
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
              
              {/* Pinterest-style masonry layout with aesthetic design */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
                {artist.gallery && artist.gallery.map((artwork, index) => {
                  // Create a true Pinterest-style masonry layout
                  // First and fourth items are wide, third item is tall
                  const isWide = index === 0 || index === 3;
                  const isTall = index === 2;
                  
                  return (
                    <div 
                      key={artwork.id}
                      className={cn(
                        "bg-white dark:bg-[#1a1a2e] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02] duration-300 cursor-pointer border border-gray-100 dark:border-gray-800",
                        isWide ? "col-span-2" : "",
                        isTall ? "row-span-2" : ""
                      )}
                    >
                      <div className={cn(
                        "relative",
                        isWide ? "aspect-[16/9]" : "",
                        isTall ? "aspect-[9/16]" : "",
                        !isWide && !isTall ? "aspect-square" : ""
                      )}>
                        {/* Display actual image */}
                        <img 
                          src={artwork.url} 
                          alt={artwork.title} 
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Beautiful overlay on hover with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                          <div className="transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
                            <h3 className="font-bold text-xl text-white mb-2">{artwork.title} ({artwork.year})</h3>
                            <p className="text-sm text-gray-200 mb-3">{artwork.medium}</p>
                            <p className="text-sm text-gray-300">{artwork.description}</p>
                            
                            <div className="flex justify-between mt-4 text-xs">
                              <span className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white">
                                <Calendar className="h-3.5 w-3.5 mr-1.5" /> {artwork.year}
                              </span>
                              <span className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white">
                                <Heart className="h-3.5 w-3.5 mr-1.5" /> {Math.floor(Math.random() * 100) + 10}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Artwork info below image */}
                      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                        <h3 className="font-medium text-lg">{artwork.title}</h3>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">{artwork.medium}</p>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{artwork.year}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
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
          // Dashboard Stats View - Simplified for this example
          <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Artist Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">
              This is where you would see your statistics and analytics.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
