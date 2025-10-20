import { Artist, Artwork } from '@/types/artwork';

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Mei Lin',
    location: 'Central, Hong Kong',
    bio: 'Contemporary artist specializing in traditional Chinese painting with modern influences.',
    profileImage: '/artists/artist1.jpg',
    socialLinks: {
      instagram: '@meilin_art',
      website: 'https://meilin-art.com',
    },
  },
  {
    id: '2',
    name: 'David Wong',
    location: 'Kowloon, Hong Kong',
    bio: 'Digital artist exploring the intersection of technology and traditional Hong Kong culture.',
    profileImage: '/artists/artist2.jpg',
    socialLinks: {
      instagram: '@david_wong_digital',
      twitter: '@davidwongart',
    },
  },
  {
    id: '3',
    name: 'Sarah Chen',
    location: 'Wan Chai, Hong Kong',
    bio: 'Mixed media artist focusing on urban landscapes and city life in Hong Kong.',
    profileImage: '/artists/artist3.jpg',
    socialLinks: {
      instagram: '@sarahchen_art',
      website: 'https://sarahchenart.com',
    },
  },
  {
    id: '4',
    name: 'Michael Zhang',
    location: 'Tsim Sha Tsui, Hong Kong',
    bio: 'Photographer capturing the contrast between Hong Kong\'s natural beauty and urban development.',
    profileImage: '/artists/artist4.jpg',
    socialLinks: {
      instagram: '@michael_zhang_photo',
    },
  },
  {
    id: '5',
    name: 'Lily Kwok',
    location: 'Sai Kung, Hong Kong',
    bio: 'Calligraphy artist blending traditional techniques with contemporary aesthetics.',
    profileImage: '/artists/artist5.jpg',
    socialLinks: {
      instagram: '@lily_calligraphy',
      website: 'https://lilykwok.art',
    },
  },
];

export const mockArtworks: Artwork[] = [
  {
    id: '1',
    title: 'Victoria Harbor at Dusk',
    description: 'A traditional Chinese painting depicting Victoria Harbor at dusk, showcasing the iconic Hong Kong skyline with traditional brushwork techniques.',
    artistId: '1',
    images: ['/artworks/artwork1.jpg'],
    type: 'physical',
    category: 'traditional-chinese',
    tags: ['landscape', 'harbor', 'skyline', 'traditional'],
    dimensions: {
      width: 60,
      height: 40,
      unit: 'cm',
    },
    price: 1200,
    currency: 'HKD',
    status: 'available',
    createdAt: '2023-09-15T14:30:00Z',
    location: 'Central, Hong Kong',
    views: 245,
    likes: 87,
  },
  {
    id: '2',
    title: 'Digital Kowloon',
    description: 'A digital artwork reimagining the streets of Kowloon with futuristic neon elements while preserving traditional architectural features.',
    artistId: '2',
    images: ['/artworks/artwork2.jpg'],
    type: 'digital',
    category: 'digital',
    tags: ['cyberpunk', 'neon', 'urban', 'futuristic'],
    price: 800,
    currency: 'HKD',
    status: 'available',
    createdAt: '2023-10-22T09:15:00Z',
    location: 'Kowloon, Hong Kong',
    views: 189,
    likes: 63,
  },
  {
    id: '3',
    title: 'Fragments of Wan Chai',
    description: 'A mixed media collage exploring the diverse textures and patterns found in Wan Chai\'s urban landscape.',
    artistId: '3',
    images: ['/artworks/artwork3.jpg'],
    type: 'physical',
    category: 'mixed-media',
    tags: ['collage', 'urban', 'texture', 'city life'],
    dimensions: {
      width: 50,
      height: 70,
      unit: 'cm',
    },
    price: 1500,
    currency: 'HKD',
    status: 'available',
    createdAt: '2023-11-05T16:45:00Z',
    location: 'Wan Chai, Hong Kong',
    views: 132,
    likes: 41,
  },
  {
    id: '4',
    title: 'Between Mountains and Skyscrapers',
    description: 'A photographic series exploring the unique geography of Hong Kong, where mountains meet urban development.',
    artistId: '4',
    images: ['/artworks/artwork4.jpg', '/artworks/artwork4-2.jpg', '/artworks/artwork4-3.jpg'],
    type: 'physical',
    category: 'photography',
    tags: ['nature', 'urban', 'contrast', 'landscape'],
    dimensions: {
      width: 80,
      height: 60,
      unit: 'cm',
    },
    price: 2200,
    currency: 'HKD',
    status: 'available',
    createdAt: '2023-12-10T11:20:00Z',
    location: 'Tsim Sha Tsui, Hong Kong',
    views: 276,
    likes: 94,
  },
  {
    id: '5',
    title: 'Poetic Strokes',
    description: 'A modern calligraphy piece featuring a traditional Chinese poem about Hong Kong\'s resilience and beauty.',
    artistId: '5',
    images: ['/artworks/artwork5.jpg'],
    type: 'physical',
    category: 'calligraphy',
    tags: ['poetry', 'traditional', 'chinese', 'characters'],
    dimensions: {
      width: 45,
      height: 90,
      unit: 'cm',
    },
    price: 1800,
    currency: 'HKD',
    status: 'available',
    createdAt: '2024-01-15T13:50:00Z',
    location: 'Sai Kung, Hong Kong',
    views: 157,
    likes: 52,
  },
  {
    id: '6',
    title: 'Urban Rhythm',
    description: 'An abstract painting capturing the energy and rhythm of Hong Kong\'s busy streets and markets.',
    artistId: '3',
    images: ['/artworks/artwork6.jpg'],
    type: 'physical',
    category: 'painting',
    tags: ['abstract', 'urban', 'colorful', 'movement'],
    dimensions: {
      width: 70,
      height: 90,
      unit: 'cm',
    },
    price: 1700,
    currency: 'HKD',
    status: 'sold',
    createdAt: '2023-08-20T10:15:00Z',
    location: 'Wan Chai, Hong Kong',
    views: 203,
    likes: 78,
  },
  {
    id: '7',
    title: 'Digital Memories of Hong Kong',
    description: 'A series of digital illustrations depicting nostalgic scenes from Hong Kong\'s past, blended with contemporary elements.',
    artistId: '2',
    images: ['/artworks/artwork7.jpg'],
    type: 'digital',
    category: 'illustration',
    tags: ['nostalgia', 'history', 'digital', 'illustration'],
    price: 950,
    currency: 'HKD',
    status: 'available',
    createdAt: '2023-09-05T14:30:00Z',
    location: 'Kowloon, Hong Kong',
    views: 167,
    likes: 59,
  },
  {
    id: '8',
    title: 'Bamboo Dreams',
    description: 'A delicate traditional Chinese painting featuring bamboo, symbolizing resilience and flexibility - qualities embodied by Hong Kong.',
    artistId: '1',
    images: ['/artworks/artwork8.jpg'],
    type: 'physical',
    category: 'traditional-chinese',
    tags: ['bamboo', 'traditional', 'ink', 'symbolic'],
    dimensions: {
      width: 40,
      height: 60,
      unit: 'cm',
    },
    price: 1100,
    currency: 'HKD',
    status: 'available',
    createdAt: '2023-10-12T09:45:00Z',
    location: 'Central, Hong Kong',
    views: 142,
    likes: 47,
  },
];

// Helper function to get artwork with artist data included
export function getArtworkWithArtist(artworkId: string): Artwork | undefined {
  const artwork = mockArtworks.find(a => a.id === artworkId);
  if (!artwork) return undefined;
  
  const artist = mockArtists.find(a => a.id === artwork.artistId);
  return {
    ...artwork,
    artist,
  };
}

// Helper function to get artworks by artist
export function getArtworksByArtist(artistId: string): Artwork[] {
  return mockArtworks.filter(artwork => artwork.artistId === artistId);
}

// Helper function to get similar artworks (by category or tags)
export function getSimilarArtworks(artworkId: string, limit: number = 4): Artwork[] {
  const artwork = mockArtworks.find(a => a.id === artworkId);
  if (!artwork) return [];
  
  return mockArtworks
    .filter(a => a.id !== artworkId) // Exclude the current artwork
    .filter(a => 
      a.category === artwork.category || 
      a.tags.some(tag => artwork.tags.includes(tag))
    )
    .slice(0, limit);
}
