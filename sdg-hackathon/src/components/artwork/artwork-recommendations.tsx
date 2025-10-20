import React from 'react';
import { ArtworkCard } from './artwork-card';
import { Artwork } from '@/types/artwork';

interface ArtworkRecommendationsProps {
  title?: string;
  artworks: Artwork[];
  loading?: boolean;
}

export function ArtworkRecommendations({
  title = 'Recommended for You',
  artworks,
  loading = false,
}: ArtworkRecommendationsProps) {
  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg h-80"
            />
          ))}
        </div>
      </div>
    );
  }

  if (artworks.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
}
