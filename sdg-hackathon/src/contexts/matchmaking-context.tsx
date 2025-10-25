"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Artist, User } from '@/types';
import { useAuth } from './auth-context';
import { mockArtists } from '@/data/mock';

interface MatchmakingContextType {
  savedArtists: Artist[];
  matchWithArtist: (artistId: string) => void;
  unmatchWithArtist: (artistId: string) => void;
  isMatched: (artistId: string) => boolean;
}

const MatchmakingContext = createContext<MatchmakingContextType | undefined>(undefined);

export function MatchmakingProvider({ children }: { children: React.ReactNode }) {
  const { user, updateUser } = useAuth();
  const [savedArtists, setSavedArtists] = useState<Artist[]>([]);

  // Initialize saved artists from user data
  useEffect(() => {
    if (user?.savedArtists && user.savedArtists.length > 0) {
      const artists = mockArtists.filter(artist => 
        user.savedArtists?.includes(artist.id)
      );
      setSavedArtists(artists);
    }
  }, [user]);

  // Match with an artist
  const matchWithArtist = (artistId: string) => {
    if (!user) return;
    
    // Check if already matched
    if (user.savedArtists?.includes(artistId)) return;
    
    // Find the artist
    const artist = mockArtists.find(a => a.id === artistId);
    if (!artist) return;
    
    // Update saved artists
    const updatedSavedArtists = [...(user.savedArtists || []), artistId];
    
    // Update user
    updateUser({
      ...user,
      savedArtists: updatedSavedArtists
    });
    
    // Update local state
    setSavedArtists(prev => [...prev, artist]);
  };

  // Unmatch with an artist
  const unmatchWithArtist = (artistId: string) => {
    if (!user || !user.savedArtists) return;
    
    // Update saved artists
    const updatedSavedArtists = user.savedArtists.filter(id => id !== artistId);
    
    // Update user
    updateUser({
      ...user,
      savedArtists: updatedSavedArtists
    });
    
    // Update local state
    setSavedArtists(prev => prev.filter(artist => artist.id !== artistId));
  };

  // Check if matched with an artist
  const isMatched = (artistId: string) => {
    return user?.savedArtists?.includes(artistId) || false;
  };

  const value = {
    savedArtists,
    matchWithArtist,
    unmatchWithArtist,
    isMatched
  };

  return (
    <MatchmakingContext.Provider value={value}>
      {children}
    </MatchmakingContext.Provider>
  );
}

export function useMatchmaking() {
  const context = useContext(MatchmakingContext);
  if (context === undefined) {
    throw new Error('useMatchmaking must be used within a MatchmakingProvider');
  }
  return context;
}
