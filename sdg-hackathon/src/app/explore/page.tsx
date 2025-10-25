import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ArtworkGallery } from '@/components/artwork/artwork-gallery';
import { mockArtworks } from '@/data/mock';

export default function ExplorePage() {
  return (
    <MainLayout>
      <ArtworkGallery 
        artworks={mockArtworks} 
        title="Explore Artworks"
        description="Discover unique artworks from talented Hong Kong artists"
      />
    </MainLayout>
  );
}
