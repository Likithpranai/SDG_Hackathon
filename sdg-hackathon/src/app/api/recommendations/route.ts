import { NextRequest, NextResponse } from 'next/server';
import { getSimilarArtworks } from '@/services/ai/artwork-search';
import { mockArtworks } from '@/data/mock';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const artworkId = searchParams.get('artworkId');
    const countParam = searchParams.get('count');
    const count = countParam ? parseInt(countParam, 10) : 4;
    
    if (!artworkId) {
      return NextResponse.json(
        { error: 'Artwork ID is required' },
        { status: 400 }
      );
    }

    // Find the reference artwork
    const referenceArtwork = mockArtworks.find(artwork => artwork.id === artworkId);
    
    if (!referenceArtwork) {
      return NextResponse.json(
        { error: 'Artwork not found' },
        { status: 404 }
      );
    }

    // Get similar artworks based on the reference artwork
    const similarArtworks = await getSimilarArtworks(referenceArtwork, mockArtworks, count);
    
    return NextResponse.json({
      similarArtworks,
      referenceArtworkId: artworkId
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
