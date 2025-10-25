"use client";

import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl, ViewStateChangeEvent } from 'react-map-gl';
import { MapPin, Home, User } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

// Define types for map data
interface MapLocation {
  id: string;
  name: string;
  type: 'artist' | 'studio';
  latitude: number;
  longitude: number;
  address: string;
  details: string;
  price?: string; // Only for studios
  availability?: string; // Only for studios
  specialty?: string; // Only for artists
}

// Mock data for nearby artists and studios
const mockLocations: MapLocation[] = [
  {
    id: 'artist1',
    name: 'Sophia Wong',
    type: 'artist',
    latitude: 22.2788,
    longitude: 114.1722,
    address: 'Central, Hong Kong',
    details: 'Digital artist specializing in 3D modeling and animation',
    specialty: 'Digital Art, 3D Modeling'
  },
  {
    id: 'artist2',
    name: 'James Chen',
    type: 'artist',
    latitude: 22.2829,
    longitude: 114.1531,
    address: 'Sheung Wan, Hong Kong',
    details: 'Traditional painter with focus on Hong Kong landscapes',
    specialty: 'Traditional Painting, Landscapes'
  },
  {
    id: 'artist3',
    name: 'Mei Lin',
    type: 'artist',
    latitude: 22.3193,
    longitude: 114.1694,
    address: 'Causeway Bay, Hong Kong',
    details: 'Mixed media artist combining traditional Chinese art with modern techniques',
    specialty: 'Mixed Media, Chinese Art'
  },
  {
    id: 'studio1',
    name: 'Creative Hub Studio',
    type: 'studio',
    latitude: 22.2808,
    longitude: 114.1571,
    address: 'Sai Ying Pun, Hong Kong',
    details: 'Modern studio space with natural lighting and equipment for digital artists',
    price: 'HK$350/hour',
    availability: 'Mon-Sun, 9AM-10PM'
  },
  {
    id: 'studio2',
    name: 'Art Factory',
    type: 'studio',
    latitude: 22.3089,
    longitude: 114.1700,
    address: 'Wan Chai, Hong Kong',
    details: 'Large industrial space perfect for painting and sculpture work',
    price: 'HK$5,000/month',
    availability: '24/7 access for members'
  },
  {
    id: 'studio3',
    name: 'The Workshop',
    type: 'studio',
    latitude: 22.2764,
    longitude: 114.1825,
    address: 'Admiralty, Hong Kong',
    details: 'Cozy shared workspace with photography equipment and darkroom',
    price: 'HK$200/hour or HK$3,000/month',
    availability: 'Booking required 48 hours in advance'
  }
];

interface NearbyMapProps {
  userLocation?: { latitude: number; longitude: number };
}

export function NearbyMap({ userLocation = { latitude: 22.2855, longitude: 114.1577 } }: NearbyMapProps) {
  const [viewState, setViewState] = useState({
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    zoom: 13
  });
  
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'artist' | 'studio'>('all');
  const [locations, setLocations] = useState<MapLocation[]>(mockLocations);

  // Filter locations based on selected type
  useEffect(() => {
    if (filterType === 'all') {
      setLocations(mockLocations);
    } else {
      setLocations(mockLocations.filter(location => location.type === filterType));
    }
  }, [filterType]);

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden relative">
      {/* Filter controls */}
      <div className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-800 rounded-md shadow-md p-2">
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filterType === 'all' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFilterType('all')}
          >
            All
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center ${
              filterType === 'artist' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFilterType('artist')}
          >
            <User className="h-3 w-3 mr-1" /> Artists
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center ${
              filterType === 'studio' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFilterType('studio')}
          >
            <Home className="h-3 w-3 mr-1" /> Studios
          </button>
        </div>
      </div>

      <Map
        {...viewState}
        onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken="pk.eyJ1IjoibGlraXRocHJhbmFpIiwiYSI6ImNsZXpwMTZtZzA2MnYzcW9jMHYyZ2JhZXAifQ.9Wy2Ux0Qh4LqkPyHLKlDGQ"
        style={{ width: '100%', height: '100%' }}
      >
        {/* User location marker */}
        <Marker
          longitude={userLocation.longitude}
          latitude={userLocation.latitude}
          anchor="bottom"
        >
          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </Marker>

        {/* Location markers */}
        {locations.map(location => (
          <Marker
            key={location.id}
            longitude={location.longitude}
            latitude={location.latitude}
            anchor="bottom"
            onClick={(e: React.MouseEvent) => {
              // Using type assertion since we know the structure
              const evt = e as unknown as { originalEvent: MouseEvent };
              evt.originalEvent.stopPropagation();
              setSelectedLocation(location);
            }}
          >
            <div className={`cursor-pointer transition-transform hover:scale-110 ${
              location.type === 'artist' ? 'text-purple-600' : 'text-orange-500'
            }`}>
              {location.type === 'artist' ? (
                <User className="h-6 w-6" />
              ) : (
                <Home className="h-6 w-6" />
              )}
            </div>
          </Marker>
        ))}

        {/* Popup for selected location */}
        {selectedLocation && (
          <Popup
            longitude={selectedLocation.longitude}
            latitude={selectedLocation.latitude}
            anchor="bottom"
            onClose={() => setSelectedLocation(null)}
            closeOnClick={false}
            className="z-50"
          >
            <div className="p-2 max-w-[250px]">
              <h3 className="font-bold text-sm">{selectedLocation.name}</h3>
              <p className="text-xs text-gray-500">{selectedLocation.address}</p>
              
              {selectedLocation.type === 'artist' && (
                <p className="text-xs mt-1"><span className="font-medium">Specialty:</span> {selectedLocation.specialty}</p>
              )}
              
              {selectedLocation.type === 'studio' && (
                <>
                  <p className="text-xs mt-1"><span className="font-medium">Price:</span> {selectedLocation.price}</p>
                  <p className="text-xs"><span className="font-medium">Availability:</span> {selectedLocation.availability}</p>
                </>
              )}
              
              <p className="text-xs mt-1">{selectedLocation.details}</p>
              
              <button className="mt-2 text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 transition-colors w-full">
                {selectedLocation.type === 'artist' ? 'Contact Artist' : 'Book Studio'}
              </button>
            </div>
          </Popup>
        )}

        {/* Navigation controls */}
        <NavigationControl position="bottom-right" />
      </Map>
    </div>
  );
}
