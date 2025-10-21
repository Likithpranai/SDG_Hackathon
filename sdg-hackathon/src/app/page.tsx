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
      <section className="relative bg-gradient-to-br from-primary-900 via-secondary-900 to-accent-900 text-white py-20 md:py-28 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-60 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-secondary-900/30 to-accent-900/30 mix-blend-multiply"></div>
          <Image 
            src="/hero-bg.jpg" 
            alt="Art background" 
            fill 
            className="object-cover scale-105 animate-slow-zoom" 
            priority
            quality={90}
          />
          
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Additional decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-500/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary-400/20 rounded-full blur-2xl animate-float-slow"></div>
          
          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-repeat opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/20 shadow-glow-sm">
              <span className="text-sm font-medium flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-accent-400 mr-2 animate-pulse"></span>Empowering Hong Kong Artists</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-accent-200 to-gray-300">Connect, Create, and Thrive in Hong Kong's Art Community</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-100 leading-relaxed backdrop-blur-sm bg-black/10 p-4 rounded-lg border border-white/10 shadow-glow-sm">
              A platform for Hong Kong artists to gain recognition, fair compensation, 
              and collaboration opportunities in a vibrant creative ecosystem.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                size="lg"
                className="bg-gradient-to-r from-white to-gray-100 text-primary-900 hover:from-gray-100 hover:to-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
                rightIcon={<ArrowRight className="h-5 w-5 ml-1 animate-bounce-x" />}
              >
                <Link href="/explore">
                  Explore Artworks
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/50 text-white hover:bg-white/20 backdrop-blur-sm shadow-glow-sm hover:shadow-glow border-2 hover:border-white"
              >
                <Link href="/upload">
                  Upload Your Art
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow">
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowRight className="h-5 w-5 transform rotate-90" />
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
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
      <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-100/30 dark:bg-primary-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary-100/20 dark:bg-secondary-900/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 dark:from-primary-400 dark:via-secondary-400 dark:to-accent-400">Why Join ArtConnect?</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16">Join a vibrant community of artists and art enthusiasts dedicated to celebrating Hong Kong's creative talent.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 p-8 rounded-xl text-center border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600"></div>
              <div className="absolute -right-12 -top-12 w-24 h-24 bg-primary-100/30 dark:bg-primary-900/20 rounded-full blur-2xl group-hover:bg-primary-200/40 dark:group-hover:bg-primary-800/30 transition-all duration-300"></div>
              
              <div className="bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900 dark:to-primary-800 p-4 rounded-full inline-flex mb-6 shadow-lg relative">
                <Brush className="h-10 w-10 text-primary-600 dark:text-primary-400 group-hover:animate-wiggle" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Recognition</h3>
              
              <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors duration-300">
                Showcase your art to a community that appreciates creativity and cultural expression.
              </p>
              
              <div className="mt-6 h-1 w-12 bg-primary-500/50 mx-auto rounded-full group-hover:w-24 transition-all duration-300"></div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 p-8 rounded-xl text-center border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-400 to-secondary-600"></div>
              <div className="absolute -right-12 -top-12 w-24 h-24 bg-secondary-100/30 dark:bg-secondary-900/20 rounded-full blur-2xl group-hover:bg-secondary-200/40 dark:group-hover:bg-secondary-800/30 transition-all duration-300"></div>
              
              <div className="bg-gradient-to-br from-secondary-100 to-secondary-50 dark:from-secondary-900 dark:to-secondary-800 p-4 rounded-full inline-flex mb-6 shadow-lg relative">
                <DollarSign className="h-10 w-10 text-secondary-600 dark:text-secondary-400 group-hover:animate-wiggle" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors duration-300">Fair Compensation</h3>
              
              <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors duration-300">
                Connect directly with buyers who value your work and are willing to pay fair prices.
              </p>
              
              <div className="mt-6 h-1 w-12 bg-secondary-500/50 mx-auto rounded-full group-hover:w-24 transition-all duration-300"></div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 p-8 rounded-xl text-center border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-400 to-accent-600"></div>
              <div className="absolute -right-12 -top-12 w-24 h-24 bg-accent-100/30 dark:bg-accent-900/20 rounded-full blur-2xl group-hover:bg-accent-200/40 dark:group-hover:bg-accent-800/30 transition-all duration-300"></div>
              
              <div className="bg-gradient-to-br from-accent-100 to-accent-50 dark:from-accent-900 dark:to-accent-800 p-4 rounded-full inline-flex mb-6 shadow-lg relative">
                <Users className="h-10 w-10 text-accent-600 dark:text-accent-400 group-hover:animate-wiggle" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">Collaboration</h3>
              
              <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors duration-300">
                Find like-minded artists for collaboration, accountability, and creative growth.
              </p>
              
              <div className="mt-6 h-1 w-12 bg-accent-500/50 mx-auto rounded-full group-hover:w-24 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16 bg-gradient-to-t from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent-100/20 dark:bg-accent-900/10 rounded-full blur-3xl"></div>
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
      <section className="py-20 bg-gradient-to-r from-primary-800 via-primary-900 to-secondary-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float-slow"></div>
        
        {/* Animated pattern overlay */}
        <div className="absolute inset-0 bg-repeat opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/20 shadow-glow-sm animate-fade-in-up">
            <span className="text-sm font-medium flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-accent-400 mr-2 animate-pulse"></span>Limited Time Offer</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-accent-200 to-gray-300 animate-fade-in-up" style={{ animationDelay: '200ms' }}>Ready to Join the Community?</h2>
          
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm bg-black/10 p-4 rounded-lg border border-white/10 shadow-glow-sm animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            Upload your artwork, connect with other artists, and start your journey with ArtConnect today. Join hundreds of Hong Kong artists already thriving on our platform.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <Button 
              variant="primary" 
              size="lg"
              className="bg-gradient-to-r from-white to-gray-100 text-primary-900 hover:from-gray-100 hover:to-white shadow-glow hover:shadow-glow-lg transition-all duration-300 px-8"
            >
              <Link href="/signup" className="flex items-center">
                Get Started <ArrowRight className="ml-2 h-5 w-5 animate-bounce-x" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/50 text-white hover:bg-white/20 backdrop-blur-sm shadow-glow-sm hover:shadow-glow border-2 hover:border-white px-8"
            >
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
