'use client'
import React, { useState } from 'react';
import { Filter, X, Grid, List } from 'lucide-react';
import { ArtworkCard } from './artwork-card';
import { FilterSidebar } from './filter-sidebar';
import { Button } from '@/components/ui/button';
import { Artwork, ArtworkFilters } from '@/types/artwork';

interface ArtworkGalleryProps {
  artworks: Artwork[];
  title?: string;
  description?: string;
}

export function ArtworkGallery({ artworks, title = 'Explore Artworks', description }: ArtworkGalleryProps) {
  const [filters, setFilters] = useState<ArtworkFilters>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleFilterChange = (newFilters: ArtworkFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  // Apply filters to artworks
  const filteredArtworks = artworks.filter((artwork) => {
    // Filter by category
    if (filters.category && artwork.category !== filters.category) {
      return false;
    }

    // Filter by type
    if (filters.type && artwork.type !== filters.type) {
      return false;
    }

    // Filter by price range
    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      if (min !== undefined && (!artwork.price || artwork.price < min)) {
        return false;
      }
      if (max !== undefined && (artwork.price && artwork.price > max)) {
        return false;
      }
    }

    // Filter by location
    if (filters.location && artwork.location !== filters.location) {
      return false;
    }

    // Filter by search term (if implemented)
    if (filters.search && filters.search.trim() !== '') {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        artwork.title.toLowerCase().includes(searchLower) ||
        artwork.description.toLowerCase().includes(searchLower) ||
        artwork.tags.some((tag) => tag.toLowerCase().includes(searchLower));
      
      if (!matchesSearch) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {description && <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>}
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleMobileFilter}
            className="md:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <div className="hidden md:flex items-center space-x-2 border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Filter Sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            className="sticky top-20"
          />
        </div>

        {/* Mobile Filter Sidebar (Overlay) */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 p-4 overflow-y-auto">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                isMobile
                onCloseMobile={toggleMobileFilter}
              />
            </div>
          </div>
        )}

        {/* Artwork Grid/List */}
        <div className="grow">
          {/* Active Filters */}
          {(filters.category || filters.type || filters.location || (filters.priceRange?.min !== undefined || filters.priceRange?.max !== undefined)) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {filters.category && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm flex items-center">
                  <span className="capitalize">{filters.category.replace('-', ' ')}</span>
                  <button
                    onClick={() => setFilters({ ...filters, category: undefined })}
                    className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {filters.type && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm flex items-center">
                  <span className="capitalize">{filters.type}</span>
                  <button
                    onClick={() => setFilters({ ...filters, type: undefined })}
                    className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {filters.location && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm flex items-center">
                  <span>{filters.location}</span>
                  <button
                    onClick={() => setFilters({ ...filters, location: undefined })}
                    className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {(filters.priceRange?.min !== undefined || filters.priceRange?.max !== undefined) && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm flex items-center">
                  <span>
                    {filters.priceRange.min !== undefined ? `${filters.priceRange.min} HKD` : '0 HKD'} 
                    {' - '} 
                    {filters.priceRange.max !== undefined ? `${filters.priceRange.max} HKD` : 'Any'}
                  </span>
                  <button
                    onClick={() => setFilters({ ...filters, priceRange: undefined })}
                    className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              <button
                onClick={clearFilters}
                className="text-primary-600 dark:text-primary-400 text-sm hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          {filteredArtworks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No artworks found matching your filters.</p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-4"
              >
                Clear filters
              </Button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredArtworks.map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  className="flex-row h-auto"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
