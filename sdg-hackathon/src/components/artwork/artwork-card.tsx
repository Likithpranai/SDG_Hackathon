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
      className={cn("overflow-hidden transition-all duration-300 h-full flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-gray-200 hover:border-primary-300 dark:border-gray-800 dark:hover:border-primary-700", className)}
    >
      <Link href={`/artwork/${artwork.id}`} className="group block relative aspect-4/3 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <Image
          src={artwork.images[0] || '/placeholder-image.jpg'}
          alt={artwork.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          <div className="flex justify-between items-center">
            <span className="text-white text-sm font-medium truncate">{artwork.title}</span>
            <div className="flex space-x-2">
              <span className="bg-black/50 backdrop-blur-sm text-white rounded-full h-7 w-7 flex items-center justify-center">
                <Heart className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
        {artwork.status === 'sold' && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg z-20">
            Sold
          </div>
        )}
      </Link>
      
      <CardContent className="grow p-5">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-1 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            <Link href={`/artwork/${artwork.id}`} className="hover:underline decoration-primary-400 decoration-2 underline-offset-2">
              {artwork.title}
            </Link>
          </h3>
          <Badge variant={artwork.type === 'physical' ? 'primary' : 'secondary'} className="shadow-sm">
            {artwork.type === 'physical' ? 'Physical' : 'Digital'}
          </Badge>
        </div>
        
        <Link href={`/artists/${artwork.artistId}`} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 mt-2 flex items-center">
          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 mr-2 flex-shrink-0"></div>
          {artwork.artist?.name || 'Unknown Artist'}
        </Link>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mt-3 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 w-fit">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{artwork.location}</span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-2 bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 p-3 rounded-lg border-l-2 border-primary-300 dark:border-primary-700">
          {artwork.description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {artwork.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors cursor-pointer animate-fade-in-up">
              #{tag}
            </Badge>
          ))}
          {artwork.tags.length > 3 && (
            <Badge variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
              +{artwork.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="font-medium">
          {artwork.price ? (
            <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">{artwork.price.toLocaleString()} {artwork.currency || 'HKD'}</span>
          ) : (
            <span className="text-gray-500 italic">Price on request</span>
          )}
        </div>
        
        <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
          <div className="flex items-center text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Eye className="h-3.5 w-3.5 mr-1 text-primary-500" />
            <span>{artwork.views}</span>
          </div>
          <div className="flex items-center text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
            <Heart className="h-3.5 w-3.5 mr-1 group-hover:text-red-500 transition-colors" />
            <span className="group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">{artwork.likes}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
