import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin } from 'lucide-react';

import { MainLayout } from '@/components/layout/main-layout';
import { Input } from '@/components/ui/input';
import { mockArtists } from '@/data/mock';

export default function ArtistsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Artists</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Discover talented artists from Hong Kong
            </p>
          </div>
          
          <div className="w-full md:w-64 mt-4 md:mt-0">
            <Input
              type="search"
              placeholder="Search artists..."
              leftIcon={<Search className="h-4 w-4 text-gray-400" />}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockArtists.map((artist) => (
            <Link key={artist.id} href={`/artists/${artist.id}`} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="aspect-square relative">
                  <Image 
                    src={artist.profileImage || '/placeholder-profile.jpg'} 
                    alt={artist.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {artist.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{artist.location}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 text-sm">
                    {artist.bio}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
