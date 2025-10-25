"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Heart, BookmarkPlus } from 'lucide-react';
import { Button } from '@/components/ui';
import { Artwork } from '@/types';
import { cn } from '@/utils/cn';
import { motion, useAnimationControls, useMotionValue } from 'framer-motion';

interface ArtworkCarouselProps {
  artworks: Artwork[];
}

export function ArtworkCarousel({ artworks }: ArtworkCarouselProps) {
  const [savedArtworks, setSavedArtworks] = useState<Set<string>>(new Set());
  const [likedArtworks, setLikedArtworks] = useState<Set<string>>(new Set());
  const [isHovering, setIsHovering] = useState(false);
  
  // Animation controls
  const controls = useAnimationControls();
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  // Calculate carousel width for animation
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Handle saving artwork
  const handleSave = (artworkId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedArtworks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(artworkId)) {
        newSet.delete(artworkId);
      } else {
        newSet.add(artworkId);
      }
      return newSet;
    });
  };

  // Handle liking artwork
  const handleLike = (artworkId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedArtworks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(artworkId)) {
        newSet.delete(artworkId);
      } else {
        newSet.add(artworkId);
      }
      return newSet;
    });
  };
  
  // Measure the carousel and container widths
  useEffect(() => {
    if (!carouselRef.current) return;
    
    const updateWidths = () => {
      if (carouselRef.current) {
        // Total width of all items
        const scrollWidth = carouselRef.current.scrollWidth;
        // Visible width of the container
        const clientWidth = carouselRef.current.clientWidth;
        
        setCarouselWidth(scrollWidth);
        setContainerWidth(clientWidth);
      }
    };
    
    updateWidths();
    
    // Update measurements on window resize
    window.addEventListener('resize', updateWidths);
    return () => window.removeEventListener('resize', updateWidths);
  }, [artworks]);
  
  // Start the auto-scrolling animation
  useEffect(() => {
    if (carouselWidth === 0 || containerWidth === 0) return;
    
    // Calculate the distance to animate (total width of all items)
    const distance = -carouselWidth / 2;
    
    // Animation duration - slower when hovering
    const duration = isHovering ? 60 : 30; // seconds
    
    // Start the animation
    controls.start({
      x: distance,
      transition: {
        duration: duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop"
      }
    });
    
    return () => {
      controls.stop();
    };
  }, [controls, carouselWidth, containerWidth, isHovering]);
  
  // Handle hover events
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  
  // Create duplicate artworks for seamless infinite scroll effect
  const displayArtworks = [...artworks, ...artworks];

  return (
    <div 
      className="relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        ref={carouselRef}
        className="flex gap-4 pb-4 scrollbar-hide"
        animate={controls}
        style={{ x }}
      >
        {displayArtworks.map((artwork, index) => (
          <motion.div 
            key={`${artwork.id}-${index}`}
            className="min-w-[300px] w-[300px] shrink-0"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md h-full flex flex-col">
              {/* Artwork Image */}
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={artwork.images[0] || '/placeholder-image.jpg'}
                  alt={artwork.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                
                {/* Artist Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-3">
                  <p className="text-white font-medium text-sm">
                    {artwork.artist?.name || 'Unknown Artist'}
                  </p>
                </div>
              </div>
              
              {/* Artwork Details */}
              <div className="p-4 flex flex-col grow">
                <h3 className="font-medium text-lg line-clamp-1">{artwork.title}</h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                  {artwork.description}
                </p>
                
                <div className="mt-auto pt-3">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">
                      {artwork.price ? `${artwork.price.toLocaleString()} ${artwork.currency || 'HKD'}` : 'Price on request'}
                    </p>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => handleLike(artwork.id, e)}
                      >
                        <Heart 
                          className={cn(
                            "h-5 w-5", 
                            likedArtworks.has(artwork.id) 
                              ? "fill-red-500 text-red-500" 
                              : "text-gray-500"
                          )} 
                        />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => handleSave(artwork.id, e)}
                      >
                        <BookmarkPlus 
                          className={cn(
                            "h-5 w-5", 
                            savedArtworks.has(artwork.id) 
                              ? "fill-blue-500 text-blue-500" 
                              : "text-gray-500"
                          )} 
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Gradient overlays for infinite scroll effect */}
      <div className="absolute top-0 left-0 h-full w-12 bg-linear-to-r from-white dark:from-[#1a1a2e] to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 h-full w-12 bg-linear-to-l from-white dark:from-[#1a1a2e] to-transparent pointer-events-none"></div>
    </div>
  );
}
