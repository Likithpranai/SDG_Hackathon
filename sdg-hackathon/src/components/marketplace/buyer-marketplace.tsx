"use client";

import React, { useState } from 'react';
import { UserPlus, Search, Palette } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';
import { Button } from '@/components/ui';
import { ArtworkCarousel } from './artwork-carousel';
import { ArtworkSearch } from './artwork-search';
import { mockArtworks } from '@/data/mock';
import { useAuth } from '@/contexts';
import { Artwork } from '@/types';

export function BuyerMarketplace() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Discover Exceptional Artwork
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Find unique pieces that speak to you, directly from Hong Kong's most talented artists
        </p>
      </div>
      
      {/* Search Bar */}
      <div className="mb-12 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Search className="h-5 w-5 text-blue-500 mr-2" />
            Find Your Perfect Artwork
          </h2>
          <ArtworkSearch onSearchResults={(results) => {
            if (results.length > 0) {
              router.push(`/search?q=${encodeURIComponent(results[0].title || 'art')}`);
            }
          }} />
        </div>
      </div>

      {/* Featured Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Palette className="h-6 w-6 text-indigo-500 mr-2" />
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {['Traditional', 'Digital', 'Photography', 'Mixed Media'].map((category) => (
            <div 
              key={category}
              onClick={() => router.push(`/search?q=${encodeURIComponent(category)}`)} 
              className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2">{category}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Explore {category.toLowerCase()} artwork from local artists
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Artwork Carousel */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Featured Artworks</h2>
        <ArtworkCarousel artworks={mockArtworks} />
      </div>
      
      {/* Artist Matchmaking CTA */}
      <div className="bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Can't find your perfect artwork?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Connect with artists who match your style preferences and commission custom pieces tailored to your vision.
        </p>
        <Button 
          onClick={() => router.push(ROUTES.BUYER_MATCHMAKING)}
          size="lg"
          className="bg-linear-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Find Your Perfect Artist Match
        </Button>
      </div>
    </div>
  );
}
