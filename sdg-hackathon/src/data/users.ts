// Mock user database for the prototype
// In a real application, this would be stored in a database

export interface User {
  id: string;
  email: string;
  password: string; // In a real app, this would be hashed
  name: string;
  userType: 'artist' | 'buyer' | 'admin';
  profileImage?: string;
  bio?: string;
  location?: string;
  experience?: string;
  primaryMedium?: string;
  skills?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

export const users: User[] = [
  {
    id: '1',
    email: 'sofia@artist.com',
    password: 'password123', // Never store plain text passwords in a real app
    name: 'Sofia Rodriguez',
    userType: 'artist',
    profileImage: '/placeholder-profile.jpg',
    bio: 'Contemporary visual artist specializing in mixed media and digital art. Drawing inspiration from urban landscapes and natural patterns to create vibrant, thought-provoking pieces that challenge perception.',
    location: 'Barcelona, Spain',
    experience: '8 years',
    primaryMedium: 'Mixed Media, Digital Art',
    skills: 'Blender, VFX, 3D modelling, Oil Painting, Watercoloring',
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/sofia.creates' },
      { platform: 'twitter', url: 'https://twitter.com/sofia_art' },
      { platform: 'website', url: 'https://sofiaart.com' },
    ],
  },
  {
    id: '2',
    email: 'alex@buyer.com',
    password: 'password123',
    name: 'Alex Johnson',
    userType: 'buyer',
    profileImage: '/placeholder-buyer.jpg',
    bio: 'Art enthusiast and collector with a passion for contemporary pieces.',
    location: 'New York, USA',
  },
  {
    id: '3',
    email: 'maya@artist.com',
    password: 'password123',
    name: 'Maya Patel',
    userType: 'artist',
    profileImage: '/placeholder-artist-2.jpg',
    bio: 'Digital artist creating surreal landscapes and character designs.',
    location: 'London, UK',
    experience: '5 years',
    primaryMedium: 'Digital Art, Illustration',
    skills: 'Procreate, Photoshop, Concept Art, Character Design',
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/maya.creates' },
      { platform: 'website', url: 'https://mayaart.com' },
    ],
  },
];

// Helper function to find a user by email
export function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}

// Helper function to find a user by ID
export function findUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}
