import { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Lee',
    email: 'john.lee@example.com',
    userType: 'buyer',
    profileImage: 'https://images.unsplash.com/photo-1628563694622-5a76957fd09c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000',
    bio: 'Art enthusiast and collector with a passion for contemporary Asian art.',
    location: 'Central, Hong Kong',
    savedArtists: ['1', '2', '3', '4', '6', '8'], // IDs of artists the user has matched with
  },
  {
    id: 'user2',
    name: 'Sarah Wong',
    email: 'sarah.wong@example.com',
    userType: 'buyer',
    profileImage: 'https://thepicturesdp.in/wp-content/uploads/2025/07/profile-pic-for-instagram-for-girl-14.jpg',
    bio: 'Interior designer looking for unique pieces for client projects.',
    location: 'Wan Chai, Hong Kong',
  },
  {
    id: 'user3',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    userType: 'buyer',
    profileImage: 'https://wallpapers.com/images/hd/cool-profile-picture-paper-bag-head-4co57dtwk64fb7lv.jpg',
    bio: 'Corporate art consultant helping businesses build meaningful collections.',
    location: 'Tsim Sha Tsui, Hong Kong',
  }
];
