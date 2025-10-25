"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Heart, 
  Clock, 
  MessageSquare, 
  Search, 
  Grid, 
  ChevronRight,
  BookmarkPlus,
  Sparkles
} from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';
import { mockArtworks } from '@/data/mock';
import { useAuth } from '@/contexts';
import { ArtworkCard } from '@/components/artwork';

export function BuyerDashboard() {
  const { user } = useAuth();
  const [savedArtworks] = useState(mockArtworks.slice(0, 3)); // Mock saved artworks
  const [recentlyViewed] = useState(mockArtworks.slice(3, 6)); // Mock recently viewed

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {user?.name || 'Art Enthusiast'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Continue exploring unique artworks from talented Hong Kong artists.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button>
            <Link href="/marketplace" className="flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Discover Artworks
            </Link>
          </Button>
          <Button variant="outline">
            <Link href="/artists" className="flex items-center">
              <Grid className="h-4 w-4 mr-2" />
              Browse Artists
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
              <BookmarkPlus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Saved Artworks</p>
              <p className="text-2xl font-bold">{savedArtworks.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mr-4">
              <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Liked Artworks</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
              <ShoppingBag className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Purchases</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mr-4">
              <MessageSquare className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Artist Conversations</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Artworks */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Saved Artworks</h2>
          <Link href="/buyers/saved">
            <Button variant="ghost" size="sm" className="flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArtworks.map(artwork => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-500" />
            Recently Viewed
          </h2>
          <Link href="/buyers/history">
            <Button variant="ghost" size="sm" className="flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentlyViewed.map(artwork => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
            Recommended For You
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockArtworks.slice(6, 9).map(artwork => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </div>
    </div>
  );
}
