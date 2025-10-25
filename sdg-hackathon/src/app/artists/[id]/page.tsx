import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Instagram, Twitter, Globe, ArrowLeft } from 'lucide-react';

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { ArtworkCard } from '@/components/artwork/artwork-card';
import { mockArtists, getArtworksByArtist } from '@/data/mock';

interface ArtistDetailPageProps {
  params: {
    id: string;
  };
}

export default function ArtistDetailPage({ params }: ArtistDetailPageProps) {
  const artist = mockArtists.find(a => a.id === params.id);
  
  if (!artist) {
    notFound();
  }
  
  const artistArtworks = getArtworksByArtist(artist.id);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/artists" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Artists
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Artist Profile */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                <Image
                  src={artist.profileImage || '/placeholder-profile.jpg'}
                  alt={artist.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              <h1 className="text-2xl font-bold mb-2">{artist.name}</h1>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{artist.location}</span>
              </div>
              
              {/* Social Links */}
              {artist.socialLinks && (
                <div className="flex space-x-3 mb-6">
                  {artist.socialLinks.instagram && (
                    <a 
                      href={`https://instagram.com/${artist.socialLinks.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                  )}
                  
                  {artist.socialLinks.twitter && (
                    <a 
                      href={`https://twitter.com/${artist.socialLinks.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </a>
                  )}
                  
                  {artist.socialLinks.website && (
                    <a 
                      href={artist.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                    >
                      <Globe className="h-5 w-5" />
                      <span className="sr-only">Website</span>
                    </a>
                  )}
                </div>
              )}
              
              <Button variant="primary" className="w-full mb-3">
                Contact Artist
              </Button>
              
              <Button variant="outline" className="w-full">
                Follow
              </Button>
            </div>
          </div>
          
          {/* Artist Content */}
          <div className="lg:col-span-3">
            {/* Bio */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-700 dark:text-gray-300">
                {artist.bio}
              </p>
            </div>
            
            {/* Artworks */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Artworks by {artist.name}</h2>
              
              {artistArtworks.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                  This artist hasn't uploaded any artworks yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artistArtworks.map((artwork) => (
                    <ArtworkCard key={artwork.id} artwork={artwork} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
