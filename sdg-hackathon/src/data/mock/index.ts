// Export all mock data from a single entry point
export * from './artists';
export * from './artworks';
export * from './users';
export * from './messages';

// Helper functions for working with mock data
import { Artwork } from '@/types';
import { mockArtworks } from './artworks';
import { mockArtists } from './artists';

// Helper function to get artwork with artist data included
export function getArtworkWithArtist(artworkId: string): Artwork | undefined {
  const artwork = mockArtworks.find(a => a.id === artworkId);
  if (!artwork) return undefined;
  
  const artist = mockArtists.find(a => a.id === artwork.artistId);
  return {
    ...artwork,
    artist,
  };
}

// Helper function to get artworks by artist
export function getArtworksByArtist(artistId: string): Artwork[] {
  return mockArtworks.filter(artwork => artwork.artistId === artistId);
}

// Helper function to get similar artworks (by category or tags)
export function getSimilarArtworks(artworkId: string, limit: number = 4): Artwork[] {
  const artwork = mockArtworks.find(a => a.id === artworkId);
  if (!artwork) return [];
  
  return mockArtworks
    .filter(a => a.id !== artworkId) // Exclude the current artwork
    .filter(a => 
      a.category === artwork.category || 
      a.tags.some(tag => artwork.tags.includes(tag))
    )
    .slice(0, limit);
}
