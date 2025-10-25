"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MainLayout, RouteGuard } from '@/components';
import { UserPlus, Check, X, Heart, MessageCircle, Image as ImageIcon } from 'lucide-react';
import { useMatchmaking } from '@/contexts/matchmaking-context';
import { Button } from '@/components/ui';
import { mockArtists } from '@/data/mock';
import { mockArtworks } from '@/data/mock';
import Image from 'next/image';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';

// Helper function to get artist's artworks
function getArtistArtworks(artistId: string) {
  return mockArtworks.filter(artwork => artwork.artistId === artistId).slice(0, 6);
}

// Add skills to artists for demo purposes
const artistsWithSkills = mockArtists.map(artist => ({
  ...artist,
  skills: artist.id === '1' ? ['Oil Painting', 'Watercolor', 'Traditional Chinese Painting'] :
          artist.id === '2' ? ['Digital Art', '3D Modeling', 'Character Design'] :
          artist.id === '3' ? ['Mixed Media', 'Installation Art', 'Sculpture'] :
          ['Photography', 'Digital Manipulation', 'Landscape']
}));

export default function ArtistMatchmakingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [artists, setArtists] = useState(artistsWithSkills);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const { matchWithArtist, isMatched, savedArtists } = useMatchmaking();
  const [showMatched, setShowMatched] = useState(false);
  
  // Motion values for swipe animation
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const cardOpacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
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
      } else {
        // End of artists, show matched screen
        setShowMatched(true);
      }
      setDirection(null);
      x.set(0);
    }, 300);
  };

  // Get current artist
  const currentArtist = artists[currentIndex];
  const artistArtworks = currentArtist ? getArtistArtworks(currentArtist.id) : [];
  
  return (
    <RouteGuard requiredUserType="buyer">
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">Artist Matchmaking</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Swipe right to connect with artists or left to pass
              </p>
            </div>
          </div>

          {showMatched ? (
            // Show matched artists
            <div className="max-w-lg mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Your Matches</h2>
                
                {savedArtists.length > 0 ? (
                  <div className="space-y-4">
                    {savedArtists.map(artist => {
                      
                      return (
                        <div key={artist.id} className="flex items-center p-3 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img 
                              src={artist.profileImage} 
                              alt={artist.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{artist.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{artist.location}</p>
                          </div>
                          <Button size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">You haven't matched with any artists yet.</p>
                  </div>
                )}
                
                <Button 
                  className="w-full mt-6"
                  onClick={() => {
                    setCurrentIndex(0);
                    setShowMatched(false);
                  }}
                >
                  Start Over
                </Button>
              </div>
            </div>
          ) : currentArtist ? (
            // Tinder-like card stack
            <div className="max-w-lg mx-auto relative h-[600px]">
              {/* Card */}
              <motion.div 
                ref={cardRef}
                className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                style={{ 
                  x,
                  rotate,
                  opacity: cardOpacity
                }}
                onDragEnd={(_, info) => handleDragEnd(info)}
                animate={{
                  x: direction === 'left' ? -400 : direction === 'right' ? 400 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Artwork Gallery */}
                <div className="relative h-72 bg-gray-100 dark:bg-gray-900">
                  <div className="grid grid-cols-3 grid-rows-2 h-full gap-1">
                    {artistArtworks.length > 0 ? (
                      artistArtworks.map((artwork, index) => (
                        <div key={artwork.id} className="relative overflow-hidden">
                          <img 
                            src={artwork.images[0]} 
                            alt={artwork.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-3 row-span-2 flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                        <p className="ml-2 text-gray-500">No artworks available</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Artist Info */}
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-green-500">
                      <img 
                        src={currentArtist.profileImage} 
                        alt={currentArtist.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{currentArtist.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{currentArtist.location}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentArtist.skills?.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {currentArtist.bio}
                  </p>
                  
                  {/* Swipe indicators */}
                  <div className="absolute top-4 left-4 bg-red-500 text-white py-1 px-3 rounded-full font-bold transform -rotate-12 opacity-0 transition-opacity duration-200" 
                       style={{ opacity: x.get() < -50 ? 1 : 0 }}>
                    PASS
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-green-500 text-white py-1 px-3 rounded-full font-bold transform rotate-12 opacity-0 transition-opacity duration-200" 
                       style={{ opacity: x.get() > 50 ? 1 : 0 }}>
                    CONNECT
                  </div>
                </div>
              </motion.div>
              
              {/* Action buttons */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-8">
                <Button 
                  size="lg"
                  variant="outline"
                  className="h-14 w-14 rounded-full border-2 border-red-500 text-red-500"
                  onClick={() => handleSwipe('left')}
                >
                  <X className="h-6 w-6" />
                </Button>
                
                <Button 
                  size="lg"
                  className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600"
                  onClick={() => handleSwipe('right')}
                >
                  <Check className="h-6 w-6" />
                </Button>
              </div>
              
              {/* Progress indicator */}
              <div className="absolute bottom-24 left-0 right-0">
                <div className="flex justify-center space-x-1">
                  {artists.map((_, index) => (
                    <div 
                      key={index} 
                      className={`h-1 rounded-full ${index === currentIndex ? 'w-6 bg-green-500' : 'w-2 bg-gray-300 dark:bg-gray-600'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // No more artists
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg max-w-lg mx-auto">
              <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No more artists</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                You've gone through all available artists.
              </p>
              <Button 
                className="mt-4"
                onClick={() => {
                  setCurrentIndex(0);
                  setShowMatched(false);
                }}
              >
                Start Over
              </Button>
            </div>
          )}
        </div>
      </MainLayout>
    </RouteGuard>
  );
}
