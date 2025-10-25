export type UserType = 'artist' | 'buyer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  profileImage?: string | null;
  bio?: string | null;
  location?: string | null;
  experience?: string | null;
  primaryMedium?: string | null;
  skills?: string | null;
  socialLinks?: { platform: string; url: string }[];
  savedArtists?: string[]; // IDs of artists the user has matched with
}
