# ArtConnect - Hong Kong's Art Community Platform

## About ArtConnect

ArtConnect is a community-based social platform designed to address key challenges faced by artists in Hong Kong. The platform focuses on providing artists with recognition, fair pay, and collaboration opportunities, which are often lacking in the Hong Kong art ecosystem.

### Key Features

- **Artwork Showcase and Discovery**: Artists can upload high-resolution images/videos of physical/digital art with descriptions, pricing, and availability information.
- **AI-Powered Recommendations**: The platform uses AI to suggest art matching buyer preferences based on profile data and past views.
- **Artist Profiles**: Detailed artist profiles to showcase their work, bio, and contact information.
- **Filtering and Search**: Buyers can browse/search via filters (e.g., artist location in HK, style, price range).
- **Community Features**: Tools for artists to connect, collaborate, and keep each other accountable.

## Technology Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with responsive design
- **State Management**: React hooks and context
- **AI Integration**: Mock implementation (to be replaced with real AI service)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/                # Next.js app router pages
├── components/         # React components
│   ├── artwork/        # Artwork-related components
│   ├── layout/         # Layout components (navbar, footer)
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and mock data
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## SDG Hackathon Focus

This project was created for the SDG Hackathon with a specific focus on using GenAI for social good. ArtConnect aims to create a more equitable art ecosystem in Hong Kong by:

1. Providing a platform for underrepresented artists to gain visibility
2. Connecting artists with fair-paying opportunities
3. Building a supportive community that helps artists thrive
4. Preserving and promoting both traditional and digital art forms

## Future Enhancements

- Integration with real AI services for personalized recommendations
- User authentication and profiles
- Payment processing for artwork sales
- Community forums and messaging
- Virtual exhibitions and events
- Mobile application
