# Artist Collaboration Matcher

This module uses IBM Watson AI to match artists for collaboration based on their profiles, preferences, and project descriptions.

## Features

- **Profile Analysis**: Analyzes artist profiles using Watson NLP to extract key attributes
- **Project Analysis**: Understands project requirements through natural language processing
- **Compatibility Scoring**: Calculates compatibility scores between artists based on multiple factors
- **Collaboration Insights**: Provides specific insights on why artists would be good collaborators

## Setup

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Configure IBM Watson credentials:
   - The credentials are already set in `config.py`
   - If needed, you can update them with your own credentials

## Usage

### Direct Python Usage

```python
from artist_collaboration_matcher import ArtistCollaborationMatcher

# Create matcher instance
matcher = ArtistCollaborationMatcher()

# Find collaborators
matches = matcher.find_collaborators(
    artist_profile,  # Dictionary with artist information
    project_description,  # String describing the project
    available_artists  # List of dictionaries with available artists
)

# Process results
for match in matches:
    print(f"Artist: {match['artist']['name']}")
    print(f"Compatibility Score: {match['compatibility_score']}")
    print(f"Insights: {match['insights']}")
```

### API Usage

Start the API server:
```
python api.py
```

#### Endpoints:

1. **Analyze Profile**
   - `POST /api/analyze-profile`
   - Request body: Artist profile JSON

2. **Find Collaborators**
   - `POST /api/find-collaborators`
   - Request body:
     ```json
     {
       "artist_profile": {...},
       "project_description": "Project details...",
       "available_artists": [{...}, {...}]
     }
     ```

## Compatibility Factors

The algorithm considers several factors when matching artists:

1. **Skill Complementarity (30%)**: How well the artists' skills complement each other
2. **Style Compatibility (25%)**: Similarity in artistic styles
3. **Project Relevance (25%)**: How relevant the collaborator's skills are to the specific project
4. **Past Collaboration Success (20%)**: Track record of successful collaborations

## Example

See the `example_usage()` function in `artist_collaboration_matcher.py` for a complete example.
