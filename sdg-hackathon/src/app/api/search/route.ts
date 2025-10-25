import { NextRequest, NextResponse } from 'next/server';
import { searchArtworks, getSearchSuggestions } from '@/services/ai/artwork-search';
import { mockArtworks } from '@/data/mock';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    
    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Get search results based on the query
    const results = await searchArtworks(query, mockArtworks);
    
    return NextResponse.json({
      results,
      query
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { partialQuery } = body;
    
    if (!partialQuery) {
      return NextResponse.json(
        { error: 'Partial query is required' },
        { status: 400 }
      );
    }

    // Get search suggestions based on the partial query
    const suggestions = await getSearchSuggestions(partialQuery);
    
    return NextResponse.json({
      suggestions
    });
  } catch (error) {
    console.error('Suggestions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
