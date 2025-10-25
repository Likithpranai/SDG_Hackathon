"use client";

import React, { useState } from 'react';
import { BookmarkPlus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { mockArtworks } from '@/data/mock';
import { ArtworkCard } from '@/components/artwork';
import { useAuth } from '@/contexts';

export function SavedArtworks() {
  const { user } = useAuth();
  const [savedArtworks, setSavedArtworks] = useState(mockArtworks.slice(0, 6)); // Mock saved artworks

  const removeArtwork = (artworkId: string) => {
    setSavedArtworks(savedArtworks.filter(artwork => artwork.id !== artworkId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">Saved Artworks</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your collection of favorite artworks
          </p>
        </div>
      </div>

      {savedArtworks.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <BookmarkPlus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No saved artworks yet</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
            Browse the marketplace and save artworks you love to build your collection
          </p>
          <Button>
            <a href="/marketplace" className="flex items-center">Discover Artworks</a>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedArtworks.map(artwork => (
              <div key={artwork.id} className="relative group">
                <ArtworkCard artwork={artwork} />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200"
                  onClick={() => removeArtwork(artwork.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
