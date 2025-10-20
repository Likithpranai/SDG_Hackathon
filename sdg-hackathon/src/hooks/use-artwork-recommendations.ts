import { useState, useEffect } from 'react';
import { Artwork, ArtworkCategory } from '@/types/artwork';
import { mockArtworks } from '@/lib/mock-data';

interface RecommendationOptions {
  userId?: string;
  preferredCategories?: ArtworkCategory[];
  recentlyViewed?: string[];
  limit?: number;
}

/**
 * A hook that simulates AI-powered artwork recommendations
 * In a real application, this would call an AI service
 */
export function useArtworkRecommendations({
  userId,
  preferredCategories = [],
  recentlyViewed = [],
  limit = 6,
}: RecommendationOptions = {}) {
  const [recommendations, setRecommendations] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      let recommendedArtworks: Artwork[] = [];

      // In a real app, this logic would be on the server with a proper recommendation algorithm
      
      // First, prioritize artworks from preferred categories
      if (preferredCategories.length > 0) {
        const categoryMatches = mockArtworks.filter(
          artwork => preferredCategories.includes(artwork.category)
        );
        recommendedArtworks = [...recommendedArtworks, ...categoryMatches];
      }

      // Then, find artworks similar to recently viewed ones (based on tags or category)
      if (recentlyViewed.length > 0) {
        const viewedArtworks = mockArtworks.filter(artwork => 
          recentlyViewed.includes(artwork.id)
        );
        
        const similarArtworks = mockArtworks.filter(artwork => 
          !recentlyViewed.includes(artwork.id) && // Don't recommend already viewed artworks
          !recommendedArtworks.some(rec => rec.id === artwork.id) && // Avoid duplicates
          viewedArtworks.some(viewed => 
            viewed.category === artwork.category || // Same category
            viewed.tags.some(tag => artwork.tags.includes(tag)) // Shared tags
          )
        );
        
        recommendedArtworks = [...recommendedArtworks, ...similarArtworks];
      }

      // If we still don't have enough recommendations, add popular artworks
      if (recommendedArtworks.length < limit) {
        const popularArtworks = mockArtworks
          .filter(artwork => 
            !recommendedArtworks.some(rec => rec.id === artwork.id) && // Avoid duplicates
            !recentlyViewed.includes(artwork.id) // Don't recommend already viewed artworks
          )
          .sort((a, b) => b.likes - a.likes); // Sort by popularity
        
        recommendedArtworks = [...recommendedArtworks, ...popularArtworks];
      }

      // Limit the number of recommendations
      setRecommendations(recommendedArtworks.slice(0, limit));
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [preferredCategories, recentlyViewed, limit]);

  return { recommendations, loading };
}
