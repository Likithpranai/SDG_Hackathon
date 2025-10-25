import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brush, Users, DollarSign } from "lucide-react";

import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { ArtworkCard } from "@/components/artwork/artwork-card";
import { ArtworkRecommendations } from "@/components/artwork/artwork-recommendations";
import { mockArtworks } from "@/data/mock/artworks";
import { mockArtists } from "@/data/mock/artists";
import { useArtworkRecommendations } from "@/hooks/use-artwork-recommendations";

export default function Home() {
  // Featured artworks (normally would be selected by an admin or algorithm)
  const featuredArtworks = mockArtworks.slice(0, 3);
  
  // Select the same artists as used in the matchmaking page
  const selectedArtistIds = ['1', '2', '3', '4']; // Mei Lin, David Wong, Sarah Chen, Michael Zhang
  const featuredArtists = mockArtists.filter(artist => selectedArtistIds.includes(artist.id));

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute inset-0 bg-[url('/pattern-dots.svg')] opacity-20"></div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center text-center">
          <div className="max-w-3xl">
            <div className="mb-8 inline-block">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="relative inline-block">
                  Aura
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-linear-to-r from-pink-400 to-purple-500 opacity-70 transform -rotate-1 rounded-full"></span>
                </span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-xl mx-auto">
              A vibrant platform where artists create, connect, and thrive
              together
            </p>
            {/* Buttons removed to keep the homepage simple */}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-white dark:bg-[#121225]">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700 dark:text-indigo-300">
            Why Join Aura?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg text-center shadow-sm">
              <div className="bg-indigo-100 dark:bg-indigo-800/50 p-3 rounded-full inline-flex mb-4">
                <Brush className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-indigo-700 dark:text-indigo-300">
                Recognition
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Showcase your art to a community that appreciates creativity and
                cultural expression.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg text-center shadow-sm">
              <div className="bg-purple-100 dark:bg-purple-800/50 p-3 rounded-full inline-flex mb-4">
                <DollarSign className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-700 dark:text-purple-300">
                Fair Compensation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect directly with buyers who value your work and are willing
                to pay fair prices.
              </p>
            </div>

            <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-lg text-center shadow-sm">
              <div className="bg-pink-100 dark:bg-pink-800/50 p-3 rounded-full inline-flex mb-4">
                <Users className="h-8 w-8 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-pink-700 dark:text-pink-300">
                Collaboration
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Find like-minded artists for collaboration, accountability, and
                creative growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-16 bg-indigo-50 dark:bg-indigo-900/10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">
              Featured Artworks
            </h2>
            <Link
              href="/explore"
              className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
            >
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16 bg-pink-50 dark:bg-pink-900/10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-pink-700 dark:text-pink-300">
              Featured Artists
            </h2>
            <Link
              href="/artists"
              className="text-pink-600 dark:text-pink-400 hover:underline flex items-center"
            >
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredArtists.map((artist) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.id}`}
                className="group"
              >
                <div className="bg-white dark:bg-[#1a1a2e] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:scale-[1.02] duration-300">
                  <div className="aspect-square relative">
                    <Image
                      src={artist.profileImage || "/placeholder-profile.jpg"}
                      alt={artist.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
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
      <section className="py-16 bg-linear-to-r from-indigo-600 to-purple-600 text-white">
        <div className="px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Choose Your Experience
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Select your role to get started with Aura
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10">
            <Link href="/artists/auth" className="inline-block">
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg px-10 flex items-center gap-2"
              >
                <Brush className="h-5 w-5" />
                For Artists
              </Button>
            </Link>
            <Link href="/buyers/auth" className="inline-block">
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-pink-600 hover:bg-pink-50 shadow-lg px-10 flex items-center gap-2"
              >
                <Users className="h-5 w-5" />
                For Buyers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
