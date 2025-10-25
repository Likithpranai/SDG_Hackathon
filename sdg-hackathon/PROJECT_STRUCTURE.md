# Project Structure

This document outlines the organization of the ArtConnect project codebase.

## Directory Structure

```
src/
├── app/                    # Next.js app directory (pages and API routes)
│   ├── api/                # API routes
│   │   ├── ai/             # AI-related API endpoints
│   │   └── auth/           # Authentication API endpoints
│   ├── artists/            # Artist-related pages
│   ├── artwork/            # Artwork detail pages
│   ├── buyers/             # Buyer-related pages
│   ├── explore/            # Artwork exploration page
│   ├── login/              # Login page
│   ├── marketplace/        # Buyer's marketplace page
│   ├── signup/             # Signup pages
│   └── upload/             # Artwork upload page
├── components/             # React components
│   ├── ai-lab/             # AI lab components
│   ├── artwork/            # Artwork-related components
│   ├── auth/               # Authentication components
│   ├── buyers/             # Buyer-specific components
│   ├── layout/             # Layout components
│   ├── marketplace/        # Marketplace components
│   ├── theme/              # Theme components
│   └── ui/                 # UI components
├── constants/              # Application constants
├── contexts/               # React contexts
├── data/                   # Data sources
│   └── mock/               # Mock data for development
├── hooks/                  # Custom React hooks
├── lib/                    # Library code
├── services/               # Service layer
│   ├── ai/                 # AI services
│   └── auth/               # Authentication services
├── styles/                 # Global styles
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

## Import Structure

The project uses a modular import structure with index files for cleaner imports:

```typescript
// Import from a specific file
import { Button } from '@/components/ui/button';

// Import from an index file (preferred)
import { Button } from '@/components/ui';

// Import multiple components
import { Button, Card, Input } from '@/components/ui';
```

## Key Concepts

### Components

Components are organized by feature or domain:

- **UI Components**: Basic UI elements like buttons, inputs, cards
- **Layout Components**: Page layouts, navigation, footer
- **Feature Components**: Components specific to features like artwork, marketplace

### Data Flow

- **Services**: Handle API calls and data processing
- **Contexts**: Provide global state management
- **Hooks**: Encapsulate reusable logic

### Styling

- Uses Tailwind CSS for styling
- Custom utility classes in `src/styles/utilities.css`

## Best Practices

1. Use index files for cleaner imports
2. Group related components together
3. Keep components focused on a single responsibility
4. Use TypeScript for type safety
5. Follow consistent naming conventions
