import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Tag, 
  DollarSign, 
  Ruler, 
  Calendar, 
  Eye, 
  ArrowLeft 
} from 'lucide-react';

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArtworkRecommendations } from '@/components/artwork/artwork-recommendations';
import { getArtworkWithArtist, getSimilarArtworks } from '@/lib/mock-data';

interface ArtworkDetailPageProps {
  params: {
    id: string;
  };
}

export default function ArtworkDetailPage({ params }: ArtworkDetailPageProps) {
  const artwork = getArtworkWithArtist(params.id);
  
  if (!artwork) {
    notFound();
  }
  
  const similarArtworks = getSimilarArtworks(params.id);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/explore" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Explore
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Artwork Images */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
              <Image
                src={artwork.images[0] || '/placeholder-image.jpg'}
                alt={artwork.title}
                fill
                className="object-contain"
                priority
              />
              {artwork.status === 'sold' && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Sold
                </div>
              )}
            </div>
            
            {artwork.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {artwork.images.map((image, index) => (
                  <div 
                    key={index} 
                    className="w-20 h-20 relative rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 shrink-0 cursor-pointer hover:border-primary-500"
                  >
                    <Image
                      src={image}
                      alt={`${artwork.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Artwork Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
            
            {/* Artist Info */}
            {artwork.artist && (
              <Link 
                href={`/artists/${artwork.artist.id}`}
                className="flex items-center mb-4 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <div className="w-10 h-10 relative rounded-full overflow-hidden mr-3">
                  <Image
                    src={artwork.artist.profileImage || '/placeholder-profile.jpg'}
                    alt={artwork.artist.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{artwork.artist.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{artwork.artist.location}</p>
                </div>
              </Link>
            )}
            
            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {artwork.description}
            </p>
            
            {/* Price */}
            <div className="mb-6">
              {artwork.price ? (
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-700 dark:text-gray-300 mr-2" />
                  <span className="text-2xl font-bold">
                    {artwork.price.toLocaleString()} {artwork.currency || 'HKD'}
                  </span>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">Price on request</p>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              {artwork.status !== 'sold' && (
                <Button variant="primary" size="lg">
                  Contact Artist
                </Button>
              )}
              <Button variant="outline" size="lg" leftIcon={<Heart className="h-4 w-4" />}>
                Save
              </Button>
              <Button variant="outline" size="lg" leftIcon={<Share2 className="h-4 w-4" />}>
                Share
              </Button>
            </div>
            
            {/* Artwork Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p>{artwork.location}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                  <p>{new Date(artwork.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              {artwork.dimensions && (
                <div className="flex items-start">
                  <Ruler className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Dimensions</p>
                    <p>
                      {artwork.dimensions.width} × {artwork.dimensions.height}
                      {artwork.dimensions.depth && ` × ${artwork.dimensions.depth}`} {artwork.dimensions.unit}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <Tag className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                  <p className="capitalize">{artwork.category.replace('-', ' ')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Views</p>
                  <p>{artwork.views}</p>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            {artwork.tags.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Similar Artworks */}
        {similarArtworks.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {similarArtworks.map((artwork) => (
                <Link key={artwork.id} href={`/artwork/${artwork.id}`} className="block">
                  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-square relative">
                      <Image
                        src={artwork.images[0] || '/placeholder-image.jpg'}
                        alt={artwork.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        {artwork.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {artwork.price ? `${artwork.price.toLocaleString()} ${artwork.currency || 'HKD'}` : 'Price on request'}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
