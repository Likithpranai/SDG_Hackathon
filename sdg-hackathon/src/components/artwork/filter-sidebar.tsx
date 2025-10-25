'use client'
import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArtworkFilters, ArtworkCategory, ArtworkType } from '@/types/artwork';

interface FilterSidebarProps {
  filters: ArtworkFilters;
  onFilterChange: (filters: ArtworkFilters) => void;
  onClearFilters: () => void;
  className?: string;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onClearFilters,
  className,
  isMobile = false,
  onCloseMobile,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    type: true,
    location: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category: ArtworkCategory) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? undefined : category,
    });
  };

  const handleTypeChange = (type: ArtworkType) => {
    onFilterChange({
      ...filters,
      type: filters.type === type ? undefined : type,
    });
  };

  const handlePriceChange = (min?: number, max?: number) => {
    onFilterChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        ...(min !== undefined && { min }),
        ...(max !== undefined && { max }),
      },
    });
  };

  const handleLocationChange = (location: string) => {
    onFilterChange({
      ...filters,
      location: location || undefined,
    });
  };

  const categories: ArtworkCategory[] = [
    'painting',
    'drawing',
    'sculpture',
    'photography',
    'digital',
    'mixed-media',
    'illustration',
    'traditional-chinese',
    'calligraphy',
    'other',
  ];

  const locations = [
    'Central, Hong Kong',
    'Wan Chai, Hong Kong',
    'Kowloon, Hong Kong',
    'Tsim Sha Tsui, Hong Kong',
    'Sai Kung, Hong Kong',
  ];

  return (
    <div className={`bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Filters</h2>
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCloseMobile}
            className="p-1"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onClearFilters}
        className="w-full mb-4"
      >
        Clear All Filters
      </Button>

      {/* Categories */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full text-left font-medium mb-2"
          onClick={() => toggleSection('category')}
        >
          <span>Categories</span>
          {expandedSections.category ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={filters.category === category}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor={`category-${category}`}
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize"
                >
                  {category.replace('-', ' ')}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full text-left font-medium mb-2"
          onClick={() => toggleSection('price')}
        >
          <span>Price Range</span>
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.price && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.priceRange?.min || ''}
                onChange={(e) => handlePriceChange(Number(e.target.value) || undefined, filters.priceRange?.max)}
                className="w-full"
              />
              <span className="text-gray-500">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.priceRange?.max || ''}
                onChange={(e) => handlePriceChange(filters.priceRange?.min, Number(e.target.value) || undefined)}
                className="w-full"
              />
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePriceChange(0, 1000)}
                className="text-xs"
              >
                &lt; 1000
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePriceChange(1000, 5000)}
                className="text-xs"
              >
                1000-5000
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePriceChange(5000, undefined)}
                className="text-xs"
              >
                &gt; 5000
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Type */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full text-left font-medium mb-2"
          onClick={() => toggleSection('type')}
        >
          <span>Type</span>
          {expandedSections.type ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.type && (
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="type-physical"
                checked={filters.type === 'physical'}
                onChange={() => handleTypeChange('physical')}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label
                htmlFor="type-physical"
                className="ml-2 text-sm text-gray-700 dark:text-gray-300"
              >
                Physical
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="type-digital"
                checked={filters.type === 'digital'}
                onChange={() => handleTypeChange('digital')}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label
                htmlFor="type-digital"
                className="ml-2 text-sm text-gray-700 dark:text-gray-300"
              >
                Digital
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Location */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full text-left font-medium mb-2"
          onClick={() => toggleSection('location')}
        >
          <span>Location</span>
          {expandedSections.location ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.location && (
          <div className="space-y-2">
            {locations.map((location) => (
              <div key={location} className="flex items-center">
                <input
                  type="checkbox"
                  id={`location-${location}`}
                  checked={filters.location === location}
                  onChange={() => handleLocationChange(location)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor={`location-${location}`}
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  {location}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {isMobile && (
        <Button
          variant="primary"
          size="lg"
          onClick={onCloseMobile}
          className="w-full mt-4"
        >
          Apply Filters
        </Button>
      )}
    </div>
  );
}
