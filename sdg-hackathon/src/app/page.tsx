import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brush, Users, DollarSign } from "lucide-react";

import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { ArtworkCard } from "@/components/artwork/artwork-card";
import { ArtworkRecommendations } from "@/components/artwork/artwork-recommendations";
import { mockArtworks, mockArtists } from "@/lib/mock-data";
import { useArtworkRecommendations } from "@/hooks/use-artwork-recommendations";

export default function Home() {
  // Featured artworks (normally would be selected by an admin or algorithm)
  const featuredArtworks = mockArtworks.slice(0, 3);
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-primary-900 to-secondary-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <Image 
            src="/hero-bg.jpg" 
            alt="Art background" 
            fill 
            className="object-cover" 
            priority
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Connect, Create, and Thrive in Hong Kong's Art Community
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              A platform for Hong Kong artists to gain recognition, fair compensation, 
              and collaboration opportunities in a vibrant creative ecosystem.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                size="lg"
                className="bg-white text-primary-900 hover:bg-gray-100"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                <Link href="/explore">
                  Explore Artworks
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/upload">
                  Upload Your Art
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Artworks</h2>
            <Link href="/explore" className="text-primary-600 dark:text-primary-400 hover:underline flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArtworks.map(artwork => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join ArtConnect?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg text-center">
              <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full inline-flex mb-4">
                <Brush className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Recognition</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Showcase your art to a community that appreciates creativity and cultural expression.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg text-center">
              <div className="bg-secondary-100 dark:bg-secondary-900 p-3 rounded-full inline-flex mb-4">
                <DollarSign className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fair Compensation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect directly with buyers who value your work and are willing to pay fair prices.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg text-center">
              <div className="bg-accent-100 dark:bg-accent-900 p-3 rounded-full inline-flex mb-4">
                <Users className="h-8 w-8 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Find like-minded artists for collaboration, accountability, and creative growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Artists</h2>
            <Link href="/artists" className="text-primary-600 dark:text-primary-400 hover:underline flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {mockArtists.map(artist => (
              <Link key={artist.id} href={`/artists/${artist.id}`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {artist.location}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Community?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Upload your artwork, connect with other artists, and start your journey with ArtConnect today.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            className="bg-white text-primary-900 hover:bg-gray-100"
          >
            <Link href="/signup">
              Get Started
            </Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
