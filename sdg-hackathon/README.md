# Aura - Hong Kong's Art Community Platform

## About Aura

Aura is a community-based social platform designed to address key challenges faced by artists in Hong Kong. The platform focuses on providing artists with recognition, fair pay, and collaboration opportunities, which are often lacking in the Hong Kong art ecosystem.

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
- **AI Integration**: Grok API for artwork analysis and feedback

## Getting Started

First, install the dependencies:

```bash
npm install
```

Next, create a `.env.local` file in the root directory with the required environment variables. You can use the provided `env.example` file as a template:

```bash
# Copy the example file and rename it
cp env.example .env.local

# Then edit .env.local to add your actual API keys
```

To get a Grok API key:
1. Sign up for an account at [x.ai](https://x.ai)
2. Navigate to the API section in your account settings
3. Generate a new API key
4. Copy the key to your `.env.local` file

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

This project was created for the SDG Hackathon with a specific focus on using GenAI for social good. Aura aims to create a more equitable art ecosystem in Hong Kong by:

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
