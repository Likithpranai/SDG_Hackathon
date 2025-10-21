# Digital Artist Collaboration Matcher

An AI-powered platform for matching digital artists with compatible collaborators based on their profiles, artwork galleries, and chatbot preferences.

## Overview

This platform analyzes digital artist profiles and their artwork to find ideal collaborators for creative projects. It uses natural language processing to understand:

- Digital tools and software used by artists
- Art types and styles
- Chatbot preferences for collaboration
- Portfolio quality and experience

The system then generates compatibility scores and detailed insights explaining why specific artists would be good matches for a project.

## Features

- **Digital Tool Analysis**: Extracts tools and software from artist bios and artwork descriptions
- **Art Type Classification**: Identifies primary art types (3D, animation, illustration, etc.)
- **Chatbot Preference Analysis**: Understands collaboration requirements through natural language processing
- **Compatibility Scoring**: Calculates multi-factor compatibility scores between artists
- **Collaboration Insights**: Provides specific insights on why artists would be good collaborators

## Components

### Core Algorithm

The matching algorithm evaluates multiple factors:

1. **Tool Match (30%)**: How well the candidate's tools match the requested tools in the chatbot preference
2. **Art Type Match (30%)**: How well the candidate's art types match the requested art types
3. **Keyword Relevance (20%)**: How relevant the candidate's profile is to the keywords in the preference
4. **Experience Level (10%)**: The candidate's years of experience in digital art
5. **Portfolio Quality (10%)**: The quality and quantity of the candidate's portfolio

### API Endpoints

The platform provides the following API endpoints:

- `GET /api/artists`: Get a list of all artists
- `GET /api/artists/<artist_id>`: Get a specific artist with analysis
- `POST /api/match`: Find matches based on artist ID and chatbot preference
- `POST /api/analyze-preference`: Analyze a chatbot preference
- `GET /api/health`: Health check endpoint

## Setup

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Run the API:
   ```
   python digital_artist_api.py
   ```

3. Test the API:
   ```
   python test_digital_artist_api.py
   ```

## Usage

### Direct Python Usage

```python
from digital_artist_matcher import DigitalArtistMatcher

# Create matcher instance
matcher = DigitalArtistMatcher()

# Find collaborators
artist_id = "ART001"  # Elena Vasquez
chatbot_preference = "Looking for 3D artists who work in Blender for an NFT project"
matches = matcher.find_collaborators(artist_id, chatbot_preference)

# Process results
for match in matches:
    print(f"Artist: {match['artist']['basicInfo']['name']}")
    print(f"Compatibility Score: {match['compatibility_score']}")
    print(f"Insights: {match['insights']}")
```

### API Usage

```python
import requests

# Find matches
response = requests.post("http://localhost:8080/api/match", json={
    "artistId": "ART001",
    "chatbotPreference": "Looking for 3D artists who work in Blender for an NFT project"
})

# Process results
result = response.json()
for match in result["matches"]:
    print(f"Artist: {match['artist']['basicInfo']['name']}")
    print(f"Compatibility Score: {match['compatibility_score']}")
```

## Example Output

For each potential collaborator, the system provides:

- **Compatibility Score**: Overall match score (0-100)
- **Score Breakdown**: Detailed breakdown of scoring factors
- **Collaboration Insights**: Specific reasons why the artist is a good match
- **Tool Analysis**: Key digital tools identified in the artist's profile
- **Art Type Analysis**: Primary art types identified in the artist's work
- **Portfolio Information**: Recent work and portfolio highlights

## Data Structure

The system uses the following data structure for digital artists:

```json
{
  "artistId": "ART001",
  "basicInfo": {
    "name": "Elena Vasquez",
    "age": 32,
    "location": "Mexico City, Mexico",
    "email": "elena@vasquezart.com",
    "bio": "Digital abstract painter using Procreate & Photoshop. 5+ years experience.",
    "website": "vasquezart.com",
    "social": ["@elenavasquez_art (IG)", "twitter.com/vasquezart"]
  },
  "chatbotPreferences": {
    "preferenceText": "Looking for digital artists who do emotional abstracts in Procreate. Mural-to-digital experience preferred."
  },
  "completeGallery": [
    {
      "id": "IMG001",
      "title": "Urban Pulse",
      "year": 2024,
      "medium": "Digital (Procreate)",
      "url": "https://example.com/image.jpg",
      "description": "Bold red/orange swirls in Procreate. 300 DPI export for mural printing."
    }
  ]
}
```
