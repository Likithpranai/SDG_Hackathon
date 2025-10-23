export interface Artist {
  id: string;  // This will map to artistId in the digital_artist_data.py
  name: string;
  age?: number;
  location: string;
  email?: string;
  bio: string;
  website?: string;
  profileImage: string;
  skills?: string;
  experience?: string;
  primaryMedium?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    website?: string;
    [key: string]: string | undefined;
  };
  // This will be an array format that can be converted to the social array in digital_artist_data.py
  socialArray?: string[];
  // Gallery items with more detailed information
  gallery?: {
    id: string;
    title: string;
    year: number;
    medium: string;
    url: string;
    description: string;
  }[];
}

export type ArtworkType = 'physical' | 'digital';

export type ArtworkCategory = 
  | 'painting'
  | 'drawing'
  | 'sculpture'
  | 'photography'
  | 'digital'
  | 'mixed-media'
  | 'illustration'
  | 'traditional-chinese'
  | 'calligraphy'
  | 'other';

export type ArtworkStatus = 'available' | 'sold' | 'not-for-sale';

export interface Artwork {
  id: string;
  title: string;
  description: string;
  artistId: string;
  artist?: Artist;
  images: string[];
  type: ArtworkType;
  category: ArtworkCategory;
  tags: string[];
  dimensions?: {
    width: number;
    height: number;
    depth?: number;
    unit: 'cm' | 'in';
  };
  price?: number;
  currency?: string;
  status: ArtworkStatus;
  createdAt: string;
  location: string;
  views: number;
  likes: number;
}

export interface ArtworkFilters {
  search?: string;
  category?: ArtworkCategory;
  priceRange?: {
    min?: number;
    max?: number;
  };
  location?: string;
  artistId?: string;
  type?: ArtworkType;
  status?: ArtworkStatus;
  tags?: string[];
}
