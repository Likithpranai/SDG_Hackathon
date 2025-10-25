"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MainLayout, RouteGuard } from '@/components';
import { UserPlus, Check, X, Heart, MessageCircle, Image as ImageIcon, MapPin, Instagram, Twitter, Globe, Star, ArrowRight } from 'lucide-react';
import { useMatchmaking } from '@/contexts/matchmaking-context';
import { Button } from '@/components/ui';
import { mockArtists } from '@/data/mock';
import { mockArtworks } from '@/data/mock';
import { Artist } from '@/types';
import Image from 'next/image';
import { motion, PanInfo, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Helper function to get artist's artworks with fallback images
function getArtistArtworks(artistId: string) {
  const artworks = mockArtworks.filter(artwork => artwork.artistId === artistId).slice(0, 6);
  
  // If no artworks found, provide default artwork data
  if (artworks.length === 0) {
    // Default artwork images based on artist ID
    const defaultImages: Record<string, string[]> = {
      '1': ['https://images.unsplash.com/photo-1578926288207-32356a8c97fa?q=80&w=1000&auto=format&fit=crop'],
      '2': ['https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=1000&auto=format&fit=crop'],
      '3': ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop'],
      '4': ['https://images.unsplash.com/photo-1506259091721-347e791bab0f?q=80&w=1000&auto=format&fit=crop'],
      '6': ['https://images.unsplash.com/photo-1551913902-c92207136625?q=80&w=1000&auto=format&fit=crop'],
      '8': ['https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1000&auto=format&fit=crop'],
    };
    
    return [{
      id: `default-${artistId}`,
      title: 'Artwork Sample',
      description: 'A sample of the artist\'s work',
      artistId: artistId,
      images: defaultImages[artistId] || ['https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?q=80&w=1000&auto=format&fit=crop'],
      type: 'physical',
      category: 'sample',
      tags: ['sample'],
      price: 0,
      currency: 'HKD'
    }];
  }
  
  return artworks;
}

// Define extended artist type with skills
interface ExtendedArtist extends Artist {
  skills: string[];
}

// Select only 6 specific artists with pictures and add skills
const selectedArtistIds = ['1', '2', '3', '4', '6', '8']; // Mei Lin, David Wong, Sarah Chen, Michael Zhang, Jason Tam, Alex Leung

const artistsWithSkills: ExtendedArtist[] = mockArtists
  .filter(artist => selectedArtistIds.includes(artist.id))
  .map(artist => ({
    ...artist,
    skills: artist.id === '1' ? ['Oil Painting', 'Watercolor', 'Traditional Chinese Painting'] :
            artist.id === '2' ? ['Digital Art', '3D Modeling', 'Character Design'] :
            artist.id === '3' ? ['Mixed Media', 'Installation Art', 'Sculpture'] :
            artist.id === '4' ? ['Photography', 'Digital Manipulation', 'Landscape'] :
            artist.id === '6' ? ['Street Art', 'Murals', 'Urban Art'] :
            ['Conceptual Art', 'Installations', 'Mixed Media']
  }));

export default function ArtistMatchmakingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [artists, setArtists] = useState(artistsWithSkills);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const { matchWithArtist, isMatched, savedArtists } = useMatchmaking();
  const [showMatched, setShowMatched] = useState(false);
  const [activeTab, setActiveTab] = useState<'discover' | 'matches'>('discover');
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(0);
  
  // Motion values for swipe animation
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-10, 0, 10]);
  const cardOpacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const scale = useTransform(x, [-200, 0, 200], [0.9, 1, 0.9]);
  
  // References for touch handling
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Handle drag end
  const handleDragEnd = (info: PanInfo) => {
    if (info.offset.x > 100) {
      handleSwipe('right');
    } else if (info.offset.x < -100) {
      handleSwipe('left');
    }
  };
  
  // Handle swipe
  const handleSwipe = (dir: 'left' | 'right') => {
    setDirection(dir);
    
    if (dir === 'right') {
      // Match with this artist
      matchWithArtist(artists[currentIndex].id);
    }
    
    // Move to next artist after animation completes
    setTimeout(() => {
      if (currentIndex < artists.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedArtworkIndex(0);
      } else {
        // End of artists, show matched screen
        setActiveTab('matches');
      }
      setDirection(null);
      x.set(0);
    }, 300);
  };

  // Get current artist
  const currentArtist = artists[currentIndex];
  const artistArtworks = currentArtist ? getArtistArtworks(currentArtist.id) : [];
  
  // Handle artwork navigation
  const nextArtwork = () => {
    if (artistArtworks.length > 0) {
      setSelectedArtworkIndex((prev) => 
        prev === artistArtworks.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const prevArtwork = () => {
    if (artistArtworks.length > 0) {
      setSelectedArtworkIndex((prev) => 
        prev === 0 ? artistArtworks.length - 1 : prev - 1
      );
    }
  };
  
  return (
    <RouteGuard requiredUserType="buyer">
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          {/* Header with tabs */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Artist Matchmaking</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Discover and connect with talented artists that match your style
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-full p-1 shadow-md flex">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'discover' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
                onClick={() => setActiveTab('discover')}
              >
                Discover Artists
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'matches' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
                onClick={() => setActiveTab('matches')}
              >
                Your Matches {savedArtists.length > 0 && <span className="ml-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs px-2 py-0.5 rounded-full">{savedArtists.length}</span>}
              </button>
            </div>
          </div>

          {activeTab === 'matches' ? (
            // Show matched artists
            <div className="max-w-5xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent inline-block">Your Artist Matches</h2>
                
                {savedArtists.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedArtists.map(artist => {
                      const artistArtworks = getArtistArtworks(artist.id);
                      return (
                        <div key={artist.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all hover:scale-[1.02] duration-300">
                          {/* Artist header with image */}
                          <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-500 overflow-hidden">
                            {artistArtworks.length > 0 && (
                              <img 
                                src={artistArtworks[0].images[0]} 
                                alt={artistArtworks[0].title}
                                className="w-full h-full object-cover opacity-50"
                                onError={(e) => {
                                  // Fallback to a default image if artwork image fails to load
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop';
                                }}
                              />
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-24"></div>
                            <div className="absolute bottom-4 left-4 flex items-center">
                              <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden mr-3">
                                <img 
                                  src={artist.profileImage} 
                                  alt={artist.name} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    // Fallback to a default profile image if artist image fails to load
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop';
                                  }}
                                />
                              </div>
                              <div>
                                <h3 className="font-bold text-white text-lg">{artist.name}</h3>
                                <div className="flex items-center text-white/80 text-sm">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{artist.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Artist content */}
                          <div className="p-5">
                            <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                              {artist.bio}
                            </p>
                            
                            {/* Skills */}
                            <div className="mb-4">
                              {((artist as ExtendedArtist).skills || []).slice(0, 3).map((skill: string, index: number) => (
                                <span 
                                  key={index}
                                  className="inline-block bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs px-2 py-1 rounded-full mr-2 mb-2"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            
                            {/* Action buttons */}
                            <div className="flex gap-2 mt-4">
                              <Link href={`/buyers/conversations?artistId=${artist.id}`} className="flex-1">
                                <Button 
                                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                                  size="sm"
                                >
                                  <MessageCircle className="h-4 w-4 mr-2" />
                                  Message
                                </Button>
                              </Link>
                              <Link href={`/artists/${artist.id}`} className="flex-1">
                                <Button 
                                  variant="outline" 
                                  className="w-full border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300"
                                  size="sm"
                                >
                                  View Profile
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/30 rounded-xl">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <Heart className="h-10 w-10 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">No matches yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                      You haven't matched with any artists yet. Start discovering artists to find your perfect creative match!
                    </p>
                    <Button 
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      onClick={() => setActiveTab('discover')}
                    >
                      Discover Artists
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : currentArtist ? (
            // Enhanced card-based discovery UI
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main card with artwork showcase */}
                <div className="md:col-span-2">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentIndex}
                      ref={cardRef}
                      className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl h-[550px]"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      style={{ 
                        x,
                        rotate,
                        opacity: cardOpacity,
                        scale
                      }}
                      onDragEnd={(_, info) => handleDragEnd(info)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        x: direction === 'left' ? -400 : direction === 'right' ? 400 : 0,
                        opacity: 1, 
                        scale: 1
                      }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Featured artwork showcase */}
                      <div className="relative h-[280px] bg-gradient-to-br from-gray-100 to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30 overflow-hidden">
                        {artistArtworks.length > 0 ? (
                          <>
                            <img 
                              src={artistArtworks[selectedArtworkIndex].images[0]} 
                              alt={artistArtworks[selectedArtworkIndex].title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to a default image if artwork image fails to load
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop';
                              }}
                            />
                            {/* Artwork navigation */}
                            {artistArtworks.length > 1 && (
                              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                                {artistArtworks.map((_, idx) => (
                                  <button 
                                    key={idx}
                                    className={`w-2.5 h-2.5 rounded-full transition-all ${idx === selectedArtworkIndex ? 'bg-white scale-110 shadow-md' : 'bg-white/50 hover:bg-white/80'}`}
                                    onClick={() => setSelectedArtworkIndex(idx)}
                                    aria-label={`View artwork ${idx + 1}`}
                                  />
                                ))}
                              </div>
                            )}
                            {/* Artwork navigation arrows */}
                            {artistArtworks.length > 1 && (
                              <>
                                <button 
                                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all shadow-md hover:scale-110"
                                  onClick={prevArtwork}
                                  aria-label="Previous artwork"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </button>
                                <button 
                                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all shadow-md hover:scale-110"
                                  onClick={nextArtwork}
                                  aria-label="Next artwork"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                              <div className="backdrop-blur-sm bg-black/20 inline-block px-2 py-0.5 rounded text-xs text-white/90 mb-1">
                                {artistArtworks[selectedArtworkIndex].category}
                              </div>
                              <h3 className="font-bold text-white drop-shadow-sm">
                                {artistArtworks[selectedArtworkIndex].title}
                              </h3>
                              <div className="flex items-center mt-1">
                                <span className="text-xs text-white/80">{selectedArtworkIndex + 1} of {artistArtworks.length}</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center">
                            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-full mb-4">
                              <ImageIcon className="h-10 w-10 text-indigo-500 dark:text-indigo-400" />
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-center px-8">
                              No artwork samples available yet.<br />This artist may be new to the platform.
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {/* Artist Info */}
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-indigo-500 shadow-lg">
                            <img 
                              src={currentArtist.profileImage} 
                              alt={currentArtist.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to a default profile image if artist image fails to load
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop';
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{currentArtist.name}</h3>
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <MapPin className="h-3 w-3 mr-1" />
                              <p className="text-sm">{currentArtist.location}</p>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                          {currentArtist.bio}
                        </p>
                        
                        <div className="mb-4">
                          <h4 className="font-medium mb-2 text-sm text-gray-500 dark:text-gray-400">SPECIALTIES</h4>
                          <div className="flex flex-wrap gap-2">
                            {(currentArtist as ExtendedArtist).skills.map((skill: string, index: number) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Social links if available */}
                        {currentArtist.socialLinks && (
                          <div className="flex space-x-3 mt-4">
                            {currentArtist.socialLinks.instagram && (
                              <a href="#" className="text-gray-500 hover:text-indigo-600">
                                <Instagram className="h-4 w-4" />
                              </a>
                            )}
                            {currentArtist.socialLinks.twitter && (
                              <a href="#" className="text-gray-500 hover:text-indigo-600">
                                <Twitter className="h-4 w-4" />
                              </a>
                            )}
                            {currentArtist.socialLinks.website && (
                              <a href="#" className="text-gray-500 hover:text-indigo-600">
                                <Globe className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Swipe indicators */}
                      <div className="absolute top-4 left-4 bg-red-500 text-white py-1 px-3 rounded-full font-bold transform -rotate-12 opacity-0 transition-opacity duration-200 shadow-lg" 
                           style={{ opacity: x.get() < -50 ? 1 : 0 }}>
                        PASS
                      </div>
                      
                      <div className="absolute top-4 right-4 bg-indigo-500 text-white py-1 px-3 rounded-full font-bold transform rotate-12 opacity-0 transition-opacity duration-200 shadow-lg" 
                           style={{ opacity: x.get() > 50 ? 1 : 0 }}>
                        CONNECT
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Side panel with info and controls */}
                <div className="md:col-span-1">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg sticky top-24">
                    <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Find Your Match</h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                      Swipe right to connect with artists that match your style, or left to pass.
                    </p>
                    
                    {/* Action buttons */}
                    <div className="flex justify-center space-x-8 mb-8">
                      <Button 
                        size="lg"
                        variant="outline"
                        className="h-14 w-14 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
                        onClick={() => handleSwipe('left')}
                      >
                        <X className="h-6 w-6" />
                      </Button>
                      
                      <Button 
                        size="lg"
                        className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                        onClick={() => handleSwipe('right')}
                      >
                        <Check className="h-6 w-6" />
                      </Button>
                    </div>
                    
                    {/* Progress indicator */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Artist</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{currentIndex + 1} of {artists.length}</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                          style={{ width: `${((currentIndex + 1) / artists.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Tips */}
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                      <h4 className="font-medium text-sm text-indigo-800 dark:text-indigo-300 mb-2">Tips</h4>
                      <ul className="text-xs text-indigo-700 dark:text-indigo-400 space-y-2">
                        <li className="flex items-start">
                          <Star className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                          <span>Swipe or use buttons to match with artists</span>
                        </li>
                        <li className="flex items-start">
                          <Star className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                          <span>Browse through artist's work samples using the navigation dots</span>
                        </li>
                        <li className="flex items-start">
                          <Star className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                          <span>Check your matches tab to message artists you've connected with</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // No more artists
            <div className="max-w-lg mx-auto">
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <UserPlus className="h-10 w-10 text-indigo-500 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">No More Artists</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                  You've gone through all available artists. Check out your matches or start over to discover artists again.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 px-6">
                  <Button 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    onClick={() => {
                      setCurrentIndex(0);
                      setActiveTab('discover');
                    }}
                  >
                    Start Over
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300"
                    onClick={() => setActiveTab('matches')}
                  >
                    View Matches
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </MainLayout>
    </RouteGuard>
  );
}
