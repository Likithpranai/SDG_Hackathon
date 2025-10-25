import { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Lee',
    email: 'john.lee@example.com',
    userType: 'buyer',
    profileImage: '/users/user1.jpg',
    bio: 'Art enthusiast and collector with a passion for contemporary Asian art.',
    location: 'Central, Hong Kong',
    savedArtists: ['1', '2'], // IDs of artists the user has matched with
  },
  {
    id: 'user2',
    name: 'Sarah Wong',
    email: 'sarah.wong@example.com',
    userType: 'buyer',
    profileImage: '/users/user2.jpg',
    bio: 'Interior designer looking for unique pieces for client projects.',
    location: 'Wan Chai, Hong Kong',
  },
  {
    id: 'user3',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    userType: 'buyer',
    profileImage: '/users/user3.jpg',
    bio: 'Corporate art consultant helping businesses build meaningful collections.',
    location: 'Tsim Sha Tsui, Hong Kong',
  }
];
