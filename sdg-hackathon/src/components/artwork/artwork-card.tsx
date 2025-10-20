import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, MapPin } from 'lucide-react';
import { Artwork } from '@/types/artwork';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/cn';

interface ArtworkCardProps {
  artwork: Artwork;
  className?: string;
}

export function ArtworkCard({ artwork, className }: ArtworkCardProps) {
  return (
    <Card 
      hoverable 
      className={cn("overflow-hidden transition-all duration-300 h-full flex flex-col", className)}
    >
      <Link href={`/artwork/${artwork.id}`} className="block relative aspect-4/3 overflow-hidden">
        <Image
          src={artwork.images[0] || '/placeholder-image.jpg'}
          alt={artwork.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {artwork.status === 'sold' && (
          <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-medium">
            Sold
          </div>
        )}
      </Link>
      
      <CardContent className="grow p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg line-clamp-1 hover:text-primary-600 transition-colors">
            <Link href={`/artwork/${artwork.id}`}>
              {artwork.title}
            </Link>
          </h3>
          <Badge variant={artwork.type === 'physical' ? 'primary' : 'secondary'}>
            {artwork.type === 'physical' ? 'Physical' : 'Digital'}
          </Badge>
        </div>
        
        <Link href={`/artists/${artwork.artistId}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mt-1 block">
          {artwork.artist?.name || 'Unknown Artist'}
        </Link>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mt-2">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{artwork.location}</span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
          {artwork.description}
        </p>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {artwork.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {artwork.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{artwork.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
        <div className="font-medium">
          {artwork.price ? (
            <span>{artwork.price.toLocaleString()} {artwork.currency || 'HKD'}</span>
          ) : (
            <span className="text-gray-500">Price on request</span>
          )}
        </div>
        
        <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
          <div className="flex items-center text-xs">
            <Eye className="h-4 w-4 mr-1" />
            <span>{artwork.views}</span>
          </div>
          <div className="flex items-center text-xs">
            <Heart className="h-4 w-4 mr-1" />
            <span>{artwork.likes}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
