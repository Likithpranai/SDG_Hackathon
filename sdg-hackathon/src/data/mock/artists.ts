import { Artist } from '@/types';

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
