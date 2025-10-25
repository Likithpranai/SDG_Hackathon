export interface Artist {
  id: string;
  name: string;
  location: string;
  bio: string;
  profileImage: string;
  contactInfo?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    website?: string;
    [key: string]: string | undefined;
  };
}
