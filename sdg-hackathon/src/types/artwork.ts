import { Artist } from './artist';

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
