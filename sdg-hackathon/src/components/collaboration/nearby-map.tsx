"use client";

import React, { useState } from 'react';
import { MapPin, Home, User } from 'lucide-react';

// Define types for map data
interface MapLocation {
  id: string;
  name: string;
  type: 'artist' | 'studio';
  address: string;
  details: string;
  price?: string; // Only for studios
  availability?: string; // Only for studios
  specialty?: string; // Only for artists
  distance?: string; // Distance from user
}

// Mock data for nearby artists and studios
const mockLocations: MapLocation[] = [
  {
    id: 'artist1',
    name: 'Sophia Wong',
    type: 'artist',
    address: 'Central, Hong Kong',
    details: 'Digital artist specializing in 3D modeling and animation',
    specialty: 'Digital Art, 3D Modeling',
    distance: '0.5 km'
  },
  {
    id: 'artist2',
    name: 'James Chen',
    type: 'artist',
    address: 'Sheung Wan, Hong Kong',
    details: 'Traditional painter with focus on Hong Kong landscapes',
    specialty: 'Traditional Painting, Landscapes',
    distance: '1.2 km'
  },
  {
    id: 'artist3',
    name: 'Mei Lin',
    type: 'artist',
    address: 'Causeway Bay, Hong Kong',
    details: 'Mixed media artist combining traditional Chinese art with modern techniques',
    specialty: 'Mixed Media, Chinese Art',
    distance: '3.5 km'
  },
  {
    id: 'studio1',
    name: 'Creative Hub Studio',
    type: 'studio',
    address: 'Sai Ying Pun, Hong Kong',
    details: 'Modern studio space with natural lighting and equipment for digital artists',
    price: 'HK$350/hour',
    availability: 'Mon-Sun, 9AM-10PM',
    distance: '0.8 km'
  },
  {
    id: 'studio2',
    name: 'Art Factory',
    type: 'studio',
    address: 'Wan Chai, Hong Kong',
    details: 'Large industrial space perfect for painting and sculpture work',
    price: 'HK$5,000/month',
    availability: '24/7 access for members',
    distance: '2.1 km'
  },
  {
    id: 'studio3',
    name: 'The Workshop',
    type: 'studio',
    address: 'Admiralty, Hong Kong',
    details: 'Cozy shared workspace with photography equipment and darkroom',
    price: 'HK$200/hour or HK$3,000/month',
    availability: 'Booking required 48 hours in advance',
    distance: '1.5 km'
  }
];

export function NearbyMap() {
  const [filterType, setFilterType] = useState<'all' | 'artist' | 'studio'>('all');
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  
  // Filter locations based on selected type
  const filteredLocations = filterType === 'all' 
    ? mockLocations 
    : mockLocations.filter(location => location.type === filterType);

  return (
    <div className="w-full rounded-lg overflow-hidden">
      {/* Filter controls */}
      <div className="mb-4 bg-white dark:bg-gray-800 rounded-md shadow-sm p-2 flex justify-center">
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filterType === 'all' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFilterType('all')}
          >
            All Nearby
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
              filterType === 'artist' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFilterType('artist')}
          >
            <User className="h-4 w-4 mr-1" /> Artists
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
              filterType === 'studio' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFilterType('studio')}
          >
            <Home className="h-4 w-4 mr-1" /> Studios
          </button>
        </div>
      </div>

      {/* Map visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 relative shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-900 dark:text-white flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-purple-600" /> 
            Nearby {filterType === 'all' ? 'Artists & Studios' : filterType === 'artist' ? 'Artists' : 'Studios'}
          </h3>
          <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            Hong Kong
          </div>
        </div>
        
        {/* Realistic map visualization */}
        <div className="h-[350px] rounded-lg overflow-hidden relative border border-gray-200 dark:border-gray-700">
          {/* Map background image with streets */}
          <div className="absolute inset-0 bg-[#f8f4ec] dark:bg-[#1a202c] overflow-hidden">
            {/* Street grid */}
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-70 dark:opacity-40">
              {/* Main roads */}
              <path d="M 0,150 L 800,150" stroke="#d1d5db" strokeWidth="6" fill="none" className="dark:stroke-gray-700" />
              <path d="M 0,250 L 800,250" stroke="#d1d5db" strokeWidth="6" fill="none" className="dark:stroke-gray-700" />
              <path d="M 200,0 L 200,400" stroke="#d1d5db" strokeWidth="6" fill="none" className="dark:stroke-gray-700" />
              <path d="M 400,0 L 400,400" stroke="#d1d5db" strokeWidth="6" fill="none" className="dark:stroke-gray-700" />
              <path d="M 600,0 L 600,400" stroke="#d1d5db" strokeWidth="6" fill="none" className="dark:stroke-gray-700" />
              
              {/* Secondary roads */}
              <path d="M 0,50 L 800,50" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              <path d="M 0,100 L 800,100" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              <path d="M 0,200 L 800,200" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              <path d="M 0,300 L 800,300" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              <path d="M 0,350 L 800,350" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              
              <path d="M 50,0 L 50,400" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              <path d="M 100,0 L 100,400" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              <path d="M 150,0 L 150,400" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              <path d="M 250,0 L 250,400" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              <path d="M 300,0 L 300,400" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              <path d="M 350,0 L 350,400" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              <path d="M 450,0 L 450,400" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              <path d="M 500,0 L 500,400" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              <path d="M 550,0 L 550,400" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              <path d="M 650,0 L 650,400" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              <path d="M 700,0 L 700,400" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              <path d="M 750,0 L 750,400" stroke="#e5e7eb" strokeWidth="3" fill="none" className="dark:stroke-gray-800" />
              
              {/* Parks and water */}
              <rect x="50" y="50" width="100" height="80" fill="#d1fae5" className="dark:fill-green-900/30" rx="5" />
              <rect x="500" y="250" width="150" height="80" fill="#d1fae5" className="dark:fill-green-900/30" rx="5" />
              <rect x="350" y="50" width="120" height="100" fill="#dbeafe" className="dark:fill-blue-900/30" rx="5" />
            </svg>
            
            {/* Building blocks */}
            <div className="absolute inset-0">
              {Array.from({ length: 20 }).map((_, i) => {
                const size = 20 + Math.random() * 30;
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                return (
                  <div 
                    key={i}
                    className="absolute bg-gray-200 dark:bg-gray-700 rounded-sm"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: `translate(-${size/2}px, -${size/2}px) rotate(${Math.random() * 45}deg)`
                    }}
                  />
                );
              })}
            </div>
          </div>
          
          {/* Map controls */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            <button className="w-8 h-8 bg-white dark:bg-gray-800 rounded-md shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="text-lg font-bold">+</span>
            </button>
            <button className="w-8 h-8 bg-white dark:bg-gray-800 rounded-md shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="text-lg font-bold">−</span>
            </button>
          </div>
          
          {/* Center marker (user location) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
              Your Location
            </div>
            {/* Pulsing effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
          </div>
          
          {/* Location markers */}
          {filteredLocations.map((location, index) => {
            // Calculate position based on index and distance
            const distanceValue = parseFloat(location.distance?.replace(' km', '') || '1');
            const angle = (index * (360 / filteredLocations.length)) * (Math.PI / 180);
            const distance = 80 + distanceValue * 40; // Scale distance based on km
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            return (
              <div 
                key={location.id}
                className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ 
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`
                }}
                onClick={() => setSelectedLocation(location === selectedLocation ? null : location)}
              >
                <div className={`flex flex-col items-center group`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${location.type === 'artist' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-300'} border border-white dark:border-gray-700 shadow-md group-hover:scale-110 transition-transform`}>
                    {location.type === 'artist' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Home className="h-4 w-4" />
                    )}
                  </div>
                  
                  {/* Distance line */}
                  {selectedLocation?.id === location.id && (
                    <svg 
                      className="absolute top-1/2 left-1/2 -z-10" 
                      width={Math.abs(x) * 2} 
                      height={Math.abs(y) * 2} 
                      style={{
                        transform: `translate(${x < 0 ? '0' : '-100%'}, ${y < 0 ? '0' : '-100%'})`
                      }}
                    >
                      <line 
                        x1={x < 0 ? 0 : Math.abs(x) * 2} 
                        y1={y < 0 ? 0 : Math.abs(y) * 2} 
                        x2={x < 0 ? Math.abs(x) * 2 : 0} 
                        y2={y < 0 ? Math.abs(y) * 2 : 0} 
                        stroke={location.type === 'artist' ? '#9333ea' : '#f97316'} 
                        strokeWidth="2" 
                        strokeDasharray="5,5" 
                        opacity="0.6" 
                      />
                    </svg>
                  )}
                  
                  <div className={`mt-1 bg-white dark:bg-gray-800 text-xs px-2 py-1 rounded shadow-md ${selectedLocation?.id === location.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                    <div className="font-medium">{location.name}</div>
                    <div className="text-gray-500 dark:text-gray-400">{location.distance}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Location list */}
      <div className="space-y-3">
        {filteredLocations.map(location => (
          <div 
            key={location.id}
            className={`p-4 rounded-lg transition-colors cursor-pointer ${selectedLocation?.id === location.id ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-transparent'}`}
            onClick={() => setSelectedLocation(location === selectedLocation ? null : location)}
          >
            <div className="flex items-start">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${location.type === 'artist' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-300'}`}>
                {location.type === 'artist' ? (
                  <User className="h-5 w-5" />
                ) : (
                  <Home className="h-5 w-5" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900 dark:text-white">{location.name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" /> {location.distance}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400">{location.address}</p>
                
                {selectedLocation?.id === location.id && (
                  <div className="mt-3 space-y-2 text-sm">
                    {location.type === 'artist' && location.specialty && (
                      <p><span className="font-medium text-gray-700 dark:text-gray-300">Specialty:</span> {location.specialty}</p>
                    )}
                    
                    {location.type === 'studio' && (
                      <>
                        {location.price && <p><span className="font-medium text-gray-700 dark:text-gray-300">Price:</span> {location.price}</p>}
                        {location.availability && <p><span className="font-medium text-gray-700 dark:text-gray-300">Availability:</span> {location.availability}</p>}
                      </>
                    )}
                    
                    <p className="text-gray-600 dark:text-gray-400">{location.details}</p>
                    
                    <div className="pt-2">
                      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        {location.type === 'artist' ? 'Contact Artist' : 'Book Studio'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
