/**
 * Application routes
 */
export const ROUTES = {
  // Public routes
  HOME: '/',
  ABOUT: '/about',
  EXPLORE: '/explore',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SIGNUP_BUYER: '/signup/buyer',
  
  // Artist routes
  ARTIST_DASHBOARD: '/artists/dashboard',
  ARTIST_PROFILE: (id: string) => `/artists/${id}`,
  ARTIST_COLLABORATION: '/artists/collaboration',
  ARTIST_AI_LAB: '/artists/ai-lab',
  ARTIST_UPLOAD: '/upload',
  
  // Buyer routes
  BUYER_DASHBOARD: '/buyers/dashboard',
  BUYER_SAVED: '/buyers/saved',
  BUYER_MARKETPLACE: '/marketplace',
  BUYER_EVENTS: '/buyers/events',
  BUYER_MATCHMAKING: '/buyers/matchmaking',
  SEARCH: '/search',
  LOGIN_BUYER: '/login/buyer',
  LOGIN_ARTIST: '/login/artist',
  
  // Artwork routes
  ARTWORK_DETAIL: (id: string) => `/artwork/${id}`,
  
  // API routes
  API: {
    AUTH: {
      LOGIN: '/api/auth/login',
      SIGNUP: '/api/auth/signup',
      USER: '/api/auth/user',
    },
    AI: {
      ENHANCE: '/api/ai/enhance',
      CHAT: '/api/ai/chat',
    },
  },
};
