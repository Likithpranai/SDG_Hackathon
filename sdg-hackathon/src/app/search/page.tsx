"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Loader2, Search } from 'lucide-react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { ArtworkCard } from '@/components/artwork';
import { Button } from '@/components/ui';
import { Artwork } from '@/types';
import { ROUTES } from '@/constants';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (response.ok) {
          setResults(data.results || []);
        } else {
          setError(data.error || 'Failed to fetch search results');
          setResults([]);
        }
      } catch (err) {
        console.error('Search error:', err);
        setError('An unexpected error occurred');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href={ROUTES.BUYER_MARKETPLACE} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Marketplace
          </Link>
        </div>

        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Search className="h-6 w-6 mr-2 text-blue-500" />
            Search Results
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {query ? `Showing results for "${query}"` : 'Enter a search query to find artworks'}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Searching for artworks...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.href = ROUTES.BUYER_MARKETPLACE}
            >
              Return to Marketplace
            </Button>
          </div>
        )}

        {/* Empty Results */}
        {!isLoading && !error && results.length === 0 && query && (
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center mb-8">
            <h2 className="text-xl font-medium mb-2">No artworks found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn't find any artworks matching your search. Try different keywords or browse our collections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                onClick={() => window.location.href = ROUTES.BUYER_MARKETPLACE}
              >
                Return to Marketplace
              </Button>
              <Button 
                onClick={() => window.location.href = ROUTES.BUYER_MATCHMAKING}
              >
                Find an Artist Instead
              </Button>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && !error && results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        )}

        {/* No Query State */}
        {!isLoading && !query && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
            <h2 className="text-xl font-medium mb-2">Start your search</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enter a search query to find artworks that match your interests.
            </p>
            <Button onClick={() => window.location.href = ROUTES.BUYER_MARKETPLACE}>
              Go to Marketplace
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
