"use client";

import React from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui';
import Image from 'next/image';
import { PlaceholderImage } from '@/components/placeholder-image';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image?: string;
    category?: string;
    organizer?: string;
    featured?: boolean;
  };
  onViewDetails: (eventId: string) => void;
  onRegister: (eventId: string) => void;
  variant?: 'default' | 'featured';
}

export function EventCard({ event, onViewDetails, onRegister, variant = 'default' }: EventCardProps) {
  const isFeatured = variant === 'featured';

  return isFeatured ? (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="md:flex">
        <div className="md:w-1/2 h-64 md:h-auto relative">
          {event.image ? (
            <div className="relative w-full h-full">
              <Image 
                src={event.image} 
                alt={event.title} 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <PlaceholderImage 
                text={event.title}
                type="event"
                width="100%"
                height="100%"
                className="w-full h-full"
              />
            </div>
          )}
          
          {/* Category badge */}
          {event.category && (
            <div className="absolute top-4 left-4">
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {event.category}
              </span>
            </div>
          )}
        </div>
        <div className="p-6 md:w-1/2">
          <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-300 mb-2">
            {event.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {event.description}
          </p>
          <div className="space-y-2 mb-6">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
              <span>{event.location}</span>
            </div>
            {event.organizer && (
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <User className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
                <span>{event.organizer}</span>
              </div>
            )}
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => onViewDetails(event.id)}
            >
              View Details
            </Button>
            <Button 
              onClick={() => onRegister(event.id)}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 relative">
        {event.image ? (
          <div className="relative w-full h-full">
            <Image 
              src={event.image} 
              alt={event.title} 
              fill 
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-full relative">
            <PlaceholderImage 
              text={event.title}
              type="event"
              width="100%"
              height="100%"
              className="w-full h-full"
            />
          </div>
        )}
        
        {/* Category badge */}
        {event.category && (
          <div className="absolute top-3 left-3">
            <span className="bg-amber-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
              {event.category}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
          {event.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
          {event.description}
        </p>
        <div className="space-y-1 mb-4">
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-amber-600 dark:text-amber-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-amber-600 dark:text-amber-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <MapPin className="h-3.5 w-3.5 mr-1.5 text-amber-600 dark:text-amber-400" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewDetails(event.id)}
            className="w-full"
          >
            Details
          </Button>
          <Button 
            size="sm"
            onClick={() => onRegister(event.id)}
            className="w-full"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
