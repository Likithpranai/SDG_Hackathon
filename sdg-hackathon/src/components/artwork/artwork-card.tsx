"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, MapPin } from 'lucide-react';
import { Artwork } from '@/types/artwork';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/cn';
import { AddToCartButton } from './add-to-cart-button';
import { PlaceholderImage } from '@/components/placeholder-image';

interface ArtworkCardProps {
  artwork: Artwork;
  className?: string;
}

export function ArtworkCard({ artwork, className }: ArtworkCardProps) {
  return (
    <Card 
      hoverable 
      className={cn("overflow-hidden transition-all duration-300 h-full flex flex-col bg-white dark:bg-gray-900 border-gray-200 hover:border-primary-300 dark:border-gray-800 dark:hover:border-primary-700", className)}
    >
      {/* Artwork Image */}
      <Link href={`/artwork/${artwork.id}`} className="group block relative aspect-4/3 overflow-hidden">
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        
        {/* Image */}
        {artwork.images && artwork.images[0] ? (
          <Image
            src={artwork.images[0]}
            alt={artwork.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full">
            <PlaceholderImage 
              text={artwork.title} 
              width={400} 
              height={300} 
              className="w-full h-full"
            />
          </div>
        )}
        
        {/* Status badge */}
        {artwork.status === 'sold' && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg z-20">
            Sold
          </div>
        )}
        
        {/* Type badge */}
        <div className="absolute top-3 left-3 z-20">
          <Badge variant={artwork.type === 'physical' ? 'primary' : 'secondary'} className="shadow-md">
            {artwork.type === 'physical' ? 'Physical' : 'Digital'}
          </Badge>
        </div>
      </Link>
      
      <CardContent className="grow p-4">
        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1">
          <Link href={`/artwork/${artwork.id}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {artwork.title}
          </Link>
        </h3>
        
        {/* Artist */}
        <Link 
          href={`/artists/${artwork.artistId}`} 
          className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 mb-3 flex items-center"
        >
          <div className="h-5 w-5 rounded-full bg-linear-to-br from-primary-500 to-secondary-500 mr-2 shrink-0"></div>
          {artwork.artist?.name || 'Unknown Artist'}
        </Link>
        
        {/* Description - now more integrated and cleaner */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {artwork.description}
        </p>
        
        {/* Location */}
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mb-3">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{artwork.location}</span>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {artwork.tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="text-xs px-2 py-0.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              #{tag}
            </Badge>
          ))}
          {artwork.tags.length > 3 && (
            <Badge 
              variant="outline" 
              className="text-xs px-2 py-0.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              +{artwork.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
        {/* Price */}
        <div className="font-medium">
          {artwork.price ? (
            <span className="text-lg text-primary-600 dark:text-primary-400">
              {artwork.price.toLocaleString()} {artwork.currency || 'HKD'}
            </span>
          ) : (
            <span className="text-gray-500 italic">Price on request</span>
          )}
        </div>
        
        {/* Engagement stats */}
        <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
          <div className="flex items-center text-xs">
            <Eye className="h-3.5 w-3.5 mr-1 text-primary-500" />
            <span>{artwork.views}</span>
          </div>
          <div className="flex items-center text-xs cursor-pointer group">
            <Heart className="h-3.5 w-3.5 mr-1 group-hover:text-red-500 transition-colors" />
            <span className="group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">{artwork.likes}</span>
          </div>
        </div>
      </CardFooter>
      
      {/* Add to cart button */}
      {artwork.status === 'available' && (
        <div className="px-4 pb-4">
          <AddToCartButton artwork={artwork} className="w-full" size="sm" />
        </div>
      )}
    </Card>
  );
}
