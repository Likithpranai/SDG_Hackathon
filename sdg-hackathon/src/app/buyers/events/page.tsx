"use client";

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components';
import { RouteGuard } from '@/components/auth/route-guard';
import { Calendar, MapPin, Clock, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui';
import { EventCard, EventDetailModal, EventRegistrationModal, EventsFilter } from '@/components/events';
import { PlaceholderImage } from '@/components/placeholder-image';

export default function BuyerEventsPage() {
  // State for modals
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // State for filters
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    date: '',
    location: '',
  });
  
  // Enhanced mock events data
  const eventsData = [
    {
      id: '1',
      title: 'Contemporary Art Exhibition: Urban Perspectives',
      description: 'Featuring works from emerging Hong Kong artists exploring urban themes and cultural identity. This exhibition brings together diverse artistic voices that reflect on the rapidly changing cityscape and its impact on local communities. Through various mediums including painting, sculpture, and digital art, these artists offer unique perspectives on urban life in Hong Kong.',
      date: '2023-11-15',
      time: '10:00 AM - 6:00 PM',
      location: 'Hong Kong Arts Centre, Wan Chai',
      image: 'https://www.discoverhongkong.com/content/dam/dhk/intl/explore/arts-entertainment/an-art-lovers-guide-to-hong-kongs-top-galleries/gallery-with-paintings-1920x1080.jpg',
      category: 'Exhibition',
      organizer: 'Hong Kong Arts Centre',
      website: 'https://www.hkac.org.hk',
      ticketPrice: 'HK$120 (General), HK$60 (Students/Seniors)',
      featured: true,
      gallery: [],
      speakers: [
        {
          name: 'Sarah Wong',
          role: 'Lead Curator',
          image: undefined, // Using placeholder instead
        },
        {
          name: 'Michael Chen',
          role: 'Featured Artist',
          image: undefined, // Using placeholder instead
        },
      ],
      ticketTypes: [
        {
          id: 'general',
          name: 'General Admission',
          price: 120,
          description: 'Standard entry to the exhibition',
        },
        {
          id: 'student',
          name: 'Student/Senior',
          price: 60,
          description: 'Discounted entry with valid ID',
        },
        {
          id: 'vip',
          name: 'VIP Experience',
          price: 250,
          description: 'Includes guided tour and exhibition catalog',
        },
      ],
    },
    {
      id: '2',
      title: 'Traditional Chinese Painting Workshop',
      description: 'Learn the techniques of traditional Chinese painting with master artist Mei Lin. This hands-on workshop will introduce participants to the fundamental principles of Chinese brush painting, including brush techniques, composition, and the philosophical aspects of this ancient art form. All materials will be provided, and participants will create their own artwork to take home.',
      date: '2023-11-20',
      time: '2:00 PM - 5:00 PM',
      location: 'Hong Kong Cultural Centre, Tsim Sha Tsui',
      image: 'https://media.timeout.com/images/105772740/750/562/image.jpg',
      category: 'Workshop',
      organizer: 'Hong Kong Cultural Centre',
      website: 'https://www.hkculturalcentre.gov.hk',
      ticketPrice: 'HK$350 (includes materials)',
      featured: false,
      gallery: [],
      speakers: [
        {
          name: 'Mei Lin',
          role: 'Master Artist',
          image: undefined,
        },
      ],
      ticketTypes: [
        {
          id: 'standard',
          name: 'Workshop Participation',
          price: 350,
          description: 'Includes all materials and refreshments',
        },
        {
          id: 'group',
          name: 'Group Booking (3+ people)',
          price: 300,
          description: 'Per person price for group bookings',
        },
      ],
    },
    {
      id: '3',
      title: 'Digital Art Symposium: Future Perspectives',
      description: 'Discussions and presentations on the future of digital art in Hong Kong and beyond. This symposium brings together artists, technologists, curators, and collectors to explore emerging trends in digital art, NFTs, AI-generated artwork, and immersive experiences. The day will feature keynote presentations, panel discussions, and networking opportunities.',
      date: '2023-12-05',
      time: '9:00 AM - 4:00 PM',
      location: 'M+ Museum, West Kowloon',
      image: 'https://ichef.bbci.co.uk/images/ic/480xn/p0gg4033.jpg.webp',
      category: 'Symposium',
      organizer: 'M+ Museum',
      website: 'https://www.mplus.org.hk',
      ticketPrice: 'HK$200 (Full day), HK$120 (Half day)',
      featured: true,
      gallery: [],
      speakers: [
        {
          name: 'Dr. James Wong',
          role: 'Digital Art Curator, M+ Museum',
          image: undefined,
        },
        {
          name: 'Lisa Nakamura',
          role: 'NFT Artist',
          image: undefined,
        },
        {
          name: 'David Kim',
          role: 'AI Art Researcher',
          image: undefined,
        },
      ],
      ticketTypes: [
        {
          id: 'full',
          name: 'Full Day Pass',
          price: 200,
          description: 'Access to all sessions and lunch',
        },
        {
          id: 'half',
          name: 'Half Day Pass',
          price: 120,
          description: 'Morning or afternoon sessions only',
        },
        {
          id: 'vip',
          name: 'VIP Pass',
          price: 350,
          description: 'Includes private reception with speakers',
        },
      ],
    },
    {
      id: '4',
      title: 'Photography Exhibition: Urban Landscapes',
      description: 'A collection of photographs capturing the unique architecture and urban scenes of Hong Kong. This exhibition showcases the work of both established and emerging photographers who have documented the city\'s ever-changing landscape, from iconic skylines to hidden corners and everyday street scenes. The exhibition explores themes of urban development, preservation, and the human experience within built environments.',
      date: '2023-12-10',
      time: '11:00 AM - 7:00 PM',
      location: 'F11 Foto Museum, Happy Valley',
      image: 'https://images.lifestyleasia.com/wp-content/uploads/sites/2/2023/12/20165239/697552521889758137.jpg',
      category: 'Exhibition',
      organizer: 'F11 Foto Museum',
      website: 'https://www.f11.com',
      ticketPrice: 'HK$80',
      featured: false,
      gallery: [],
      speakers: [
        {
          name: 'Thomas Chan',
          role: 'Photographer',
          image: undefined,
        },
      ],
      ticketTypes: [
        {
          id: 'standard',
          name: 'Standard Admission',
          price: 80,
          description: 'General entry to the exhibition',
        },
        {
          id: 'guided',
          name: 'Guided Tour',
          price: 120,
          description: 'Includes 45-minute guided tour',
        },
      ],
    },
    {
      id: '5',
      title: 'Art Basel Hong Kong',
      description: 'The premier international art fair in Asia, featuring leading galleries from around the world. Art Basel Hong Kong presents modern and contemporary artwork by established and emerging artists, showcasing paintings, sculptures, installations, photographs, films, and editioned works of the highest quality. This year\'s edition includes special sections for large-scale installations, film screenings, and conversations with artists and curators.',
      date: '2024-03-28',
      time: '12:00 PM - 8:00 PM',
      location: 'Hong Kong Convention and Exhibition Centre, Wan Chai',
      image: 'https://d2u3kfwd92fzu7.cloudfront.net/asset/cms/04-11.jpg',
      category: 'Fair',
      organizer: 'Art Basel',
      website: 'https://www.artbasel.com/hong-kong',
      ticketPrice: 'HK$250-950 (various passes available)',
      featured: false,
      gallery: [],
      speakers: [],
      ticketTypes: [
        {
          id: 'day',
          name: 'Day Pass',
          price: 250,
          description: 'Single day admission',
        },
        {
          id: 'vip',
          name: 'VIP Preview',
          price: 950,
          description: 'Early access and VIP lounge',
        },
      ],
    },
    {
      id: '6',
      title: 'Ink Art Masterclass',
      description: 'An intensive workshop on contemporary ink art techniques led by renowned artist Wong Fei. This masterclass will explore how traditional Chinese ink painting techniques can be adapted for contemporary artistic expression. Participants will learn about materials, brush techniques, composition, and conceptual approaches to ink art. Suitable for intermediate to advanced level artists.',
      date: '2024-01-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Hong Kong Visual Arts Centre, Central',
      image: 'https://cdn.tatlerasia.com/tatlerasia/i/2023/04/27091900-social_cover_1200x630.jpg',
      category: 'Workshop',
      organizer: 'Hong Kong Visual Arts Centre',
      website: 'https://www.lcsd.gov.hk/CE/Museum/APO/en_US/web/apo/va_main.html',
      ticketPrice: 'HK$480 (includes materials)',
      featured: false,
      gallery: [],
      speakers: [
        {
          name: 'Wong Fei',
          role: 'Ink Artist',
          image: undefined,
        },
      ],
      ticketTypes: [
        {
          id: 'standard',
          name: 'Masterclass',
          price: 480,
          description: 'Full day workshop with materials included',
        },
      ],
    },
  ];

  // Filter events based on current filters
  const filteredEvents = eventsData.filter(event => {
    // Search filter
    if (filters.search && !event.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !event.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (filters.category && event.category !== filters.category) {
      return false;
    }
    
    // Location filter
    if (filters.location && !event.location.includes(filters.location)) {
      return false;
    }
    
    // Date filter - simplified for demo
    if (filters.date === 'this-month') {
      const eventDate = new Date(event.date);
      const today = new Date();
      if (eventDate.getMonth() !== today.getMonth() || eventDate.getFullYear() !== today.getFullYear()) {
        return false;
      }
    }
    
    return true;
  });

  // Get featured events
  const featuredEvents = filteredEvents.filter(event => event.featured);
  
  // Get non-featured events
  const regularEvents = filteredEvents.filter(event => !event.featured);
  
  // Extract unique categories and locations for filters
  const categories = Array.from(new Set(eventsData.map(event => event.category || ''))).filter(Boolean);
  const locations = Array.from(new Set(eventsData.map(event => {
    const locationParts = event.location.split(',');
    return locationParts[locationParts.length - 1].trim();
  }))).filter(Boolean);

  // Handle filter changes
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  // Handle view details
  const handleViewDetails = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsDetailModalOpen(true);
  };

  // Handle register
  const handleRegister = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsRegistrationModalOpen(true);
  };

  // Get selected event
  const selectedEvent = selectedEventId ? eventsData.find(event => event.id === selectedEventId) : null;

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
            <div className="flex items-center space-x-2">
              <div className="bg-white dark:bg-gray-800 rounded-md flex p-1 shadow-sm">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <EventsFilter 
            onFilterChange={handleFilterChange} 
            categories={categories}
            locations={locations}
          />

          {/* Featured Events */}
          {featuredEvents.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-amber-100 dark:bg-amber-900/30 p-1.5 rounded-full mr-2">
                  <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </span>
                Featured Events
              </h2>
              <div className="space-y-6">
                {featuredEvents.map(event => (
                  <EventCard 
                    key={event.id}
                    event={event}
                    onViewDetails={handleViewDetails}
                    onRegister={handleRegister}
                    variant="featured"
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Events */}
          <div>
            <h2 className="text-xl font-semibold mb-4">All Events</h2>
            {regularEvents.length === 0 ? (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No events found matching your filters.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({ search: '', category: '', date: '', location: '' })}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
              }>
                {regularEvents.map(event => (
                  <EventCard 
                    key={event.id}
                    event={event}
                    onViewDetails={handleViewDetails}
                    onRegister={handleRegister}
                    variant={viewMode === 'list' ? 'featured' : 'default'}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <EventDetailModal
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            onRegister={() => {
              setIsDetailModalOpen(false);
              setIsRegistrationModalOpen(true);
            }}
            event={selectedEvent}
          />
        )}

        {/* Event Registration Modal */}
        {selectedEvent && (
          <EventRegistrationModal
            isOpen={isRegistrationModalOpen}
            onClose={() => setIsRegistrationModalOpen(false)}
            event={selectedEvent}
          />
        )}
      </MainLayout>
    </RouteGuard>
  );
}
