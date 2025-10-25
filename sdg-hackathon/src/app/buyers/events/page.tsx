"use client";

import React from 'react';
import { MainLayout, RouteGuard } from '@/components';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui';

export default function BuyerEventsPage() {
  // Mock events data
  const events = [
    {
      id: '1',
      title: 'Contemporary Art Exhibition',
      description: 'Featuring works from emerging Hong Kong artists exploring urban themes and cultural identity.',
      date: '2023-11-15',
      time: '10:00 AM - 6:00 PM',
      location: 'Hong Kong Arts Centre, Wan Chai',
      image: '/events/event1.jpg',
      featured: true,
    },
    {
      id: '2',
      title: 'Traditional Chinese Painting Workshop',
      description: 'Learn the techniques of traditional Chinese painting with master artist Mei Lin.',
      date: '2023-11-20',
      time: '2:00 PM - 5:00 PM',
      location: 'Hong Kong Cultural Centre, Tsim Sha Tsui',
      image: '/events/event2.jpg',
      featured: false,
    },
    {
      id: '3',
      title: 'Digital Art Symposium',
      description: 'Discussions and presentations on the future of digital art in Hong Kong and beyond.',
      date: '2023-12-05',
      time: '9:00 AM - 4:00 PM',
      location: 'M+ Museum, West Kowloon',
      image: '/events/event3.jpg',
      featured: true,
    },
    {
      id: '4',
      title: 'Photography Exhibition: Urban Landscapes',
      description: 'A collection of photographs capturing the unique architecture and urban scenes of Hong Kong.',
      date: '2023-12-10',
      time: '11:00 AM - 7:00 PM',
      location: 'F11 Foto Museum, Happy Valley',
      image: '/events/event4.jpg',
      featured: false,
    },
  ];

  return (
    <RouteGuard requiredUserType="buyer">
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-amber-700 dark:text-amber-300">Events & Exhibitions</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Discover art events and exhibitions happening in Hong Kong
              </p>
            </div>
          </div>

          {/* Featured Event */}
          {events.filter(event => event.featured)[0] && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-amber-100 dark:bg-amber-900/30 p-1.5 rounded-full mr-2">
                  <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </span>
                Featured Event
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                <div className="md:flex">
                  <div className="md:w-1/3 h-64 md:h-auto relative">
                    <div className="absolute inset-0 bg-linear-to-r from-amber-500/20 to-transparent"></div>
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${events.filter(event => event.featured)[0].image})` }}
                    ></div>
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                      {events.filter(event => event.featured)[0].title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {events.filter(event => event.featured)[0].description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{events.filter(event => event.featured)[0].date}</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{events.filter(event => event.featured)[0].time}</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{events.filter(event => event.featured)[0].location}</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button>Register Interest</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upcoming Events */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.filter(event => !event.featured).map(event => (
                <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.image})` }}
                  ></div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </RouteGuard>
  );
}
