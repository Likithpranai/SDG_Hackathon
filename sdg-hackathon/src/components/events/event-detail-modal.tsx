"use client";

import React from 'react';
import { X, Calendar, Clock, MapPin, User, Tag, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui';
import Image from 'next/image';
import { PlaceholderImage } from '@/components/placeholder-image';

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
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
    website?: string;
    ticketPrice?: string;
    featured?: boolean;
    gallery?: string[];
    speakers?: {
      name: string;
      role: string;
      image?: string;
    }[];
    ticketTypes?: {
      id: string;
      name: string;
      price: number;
      description?: string;
    }[];
  };
}

export function EventDetailModal({ isOpen, onClose, onRegister, event }: EventDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Header image */}
          <div className="h-64 relative">
            {event.image ? (
              <div className="w-full h-full relative">
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
            )}
            
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            
            {/* Category badge */}
            {event.category && (
              <div className="absolute top-4 left-4">
                <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {event.category}
                </span>
              </div>
            )}
            
            {/* Title on image */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-3xl font-bold text-white">{event.title}</h2>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main content - 2/3 width on desktop */}
              <div className="md:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold mb-2">About This Event</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {event.description}
                  </p>
                </div>
                
                {/* Gallery if available */}
                {event.gallery && event.gallery.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-3">Gallery</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {event.gallery.map((img, index) => (
                        <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                        {img ? (
                          <Image 
                            src={img} 
                            alt={`Gallery image ${index + 1}`} 
                            fill 
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <PlaceholderImage 
                            text={`${event.title} - Gallery ${index + 1}`}
                            type="gallery"
                            width="100%"
                            height="100%"
                            className="w-full h-full hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Speakers/Artists if available */}
                {event.speakers && event.speakers.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-3">Featured Speakers</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {event.speakers.map((speaker, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex-shrink-0 overflow-hidden relative">
                            <Image 
                              src={speaker.image || '/placeholder-profile.jpg'} 
                              alt={speaker.name} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-3">
                            <h4 className="font-medium">{speaker.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{speaker.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Sidebar - 1/3 width on desktop */}
              <div className="space-y-6">
                {/* Event details card */}
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h3 className="font-bold mb-3">Event Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-3 text-amber-600 dark:text-amber-400 mt-0.5" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-gray-600 dark:text-gray-400">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-3 text-amber-600 dark:text-amber-400 mt-0.5" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-gray-600 dark:text-gray-400">{event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 text-amber-600 dark:text-amber-400 mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-600 dark:text-gray-400">{event.location}</p>
                      </div>
                    </div>
                    {event.organizer && (
                      <div className="flex items-start">
                        <User className="h-5 w-5 mr-3 text-amber-600 dark:text-amber-400 mt-0.5" />
                        <div>
                          <p className="font-medium">Organizer</p>
                          <p className="text-gray-600 dark:text-gray-400">{event.organizer}</p>
                        </div>
                      </div>
                    )}
                    {event.ticketPrice && (
                      <div className="flex items-start">
                        <Tag className="h-5 w-5 mr-3 text-amber-600 dark:text-amber-400 mt-0.5" />
                        <div>
                          <p className="font-medium">Admission</p>
                          <p className="text-gray-600 dark:text-gray-400">{event.ticketPrice}</p>
                        </div>
                      </div>
                    )}
                    {event.website && (
                      <div className="flex items-start">
                        <ExternalLink className="h-5 w-5 mr-3 text-amber-600 dark:text-amber-400 mt-0.5" />
                        <div>
                          <p className="font-medium">Website</p>
                          <a 
                            href={event.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-amber-600 dark:text-amber-400 hover:underline"
                          >
                            Visit website
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Ticket types if available */}
                {event.ticketTypes && event.ticketTypes.length > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-bold mb-3">Ticket Options</h3>
                    <div className="space-y-3">
                      {event.ticketTypes.map((ticket) => (
                        <div key={ticket.id} className="border-b border-gray-200 dark:border-gray-600 pb-2 last:border-0 last:pb-0">
                          <div className="flex justify-between">
                            <span className="font-medium">{ticket.name}</span>
                            <span className="font-medium">HK${ticket.price}</span>
                          </div>
                          {ticket.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{ticket.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Register button */}
                <Button onClick={onRegister} className="w-full">
                  Register for This Event
                </Button>
                
                {/* Close button */}
                <Button variant="outline" onClick={onClose} className="w-full">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
