# Digital Artist Collaboration Matcher with IBM watsonx.ai

This module uses IBM watsonx.ai to match digital artists for collaboration based on their profiles, preferences, and project requirements. It leverages advanced AI capabilities to provide intelligent artist matching for creative projects.

## Features

- **AI-Powered Profile Analysis**: Analyzes artist profiles using IBM watsonx.ai to extract key attributes, skills, and experience
- **Project Requirement Analysis**: Uses natural language processing to understand project requirements and extract technical needs
- **Compatibility Scoring**: Calculates detailed compatibility scores between artists based on multiple factors
- **AI-Generated Collaboration Insights**: Provides specific insights on why artists would be good collaborators
- **Detailed Match Formatting**: Presents matches with comprehensive analysis and portfolio highlights

## Implementations

This repository contains several implementations of the Digital Artist Matcher:

1. **Basic Implementation** (`digital_artist_matcher.py`): Rule-based matching algorithm
2. **Final Implementation** (`final_digital_artist_matcher.py`): Enhanced matching with detailed formatting
3. **watsonx.ai SDK Implementation** (`watsonx_artist_matcher_sdk.py`): Integration with IBM watsonx.ai SDK
4. **Final watsonx.ai Implementation** (`final_watsonx_artist_matcher.py`): Complete solution with watsonx.ai integration

## Setup

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Configure IBM watsonx.ai credentials:
   - The credentials are already set in `config.py`
   - If needed, you can update them with your own credentials from IBM Cloud

## Usage

### Direct Python Usage

```python
from final_watsonx_artist_matcher import FinalWatsonXArtistMatcher

# Create matcher instance
matcher = FinalWatsonXArtistMatcher()

# Find collaborators
matches = matcher.find_collaborators(
    artist_id="ART001",  # ID of the artist seeking collaborators
    chatbot_preference="Looking for a 3D artist who specializes in architectural visualization using Blender."
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

1. **Analyze Preference**
   - `POST /api/analyze-preference`
   - Request body: `{"preference_text": "Looking for a 3D artist..."}`

2. **Find Collaborators**
   - `POST /api/find-collaborators`
   - Request body:
     ```json
     {
       "artist_id": "ART001",
       "preference_text": "Looking for a 3D artist..."
     }
     ```

## Compatibility Factors

The algorithm considers several factors when matching artists:

1. **Tool Expertise (30%)**: How well the artist's tools match the project requirements
2. **Art Type Alignment (30%)**: How well the artist's art types align with the project needs
3. **Project Relevance (20%)**: How relevant the artist's experience is to the specific project
4. **Experience Level (10%)**: The artist's years of experience in the field
5. **Portfolio Quality (10%)**: The quality and relevance of the artist's portfolio

## IBM watsonx.ai Integration

The system leverages IBM watsonx.ai for:

1. **Preference Analysis**: Extracting technical requirements, art types, and keywords from project descriptions
2. **Compatibility Scoring**: Generating detailed compatibility scores between artists
3. **Collaboration Insights**: Providing AI-generated insights about potential collaborations

### Supported Models

The system is designed to work with various IBM watsonx.ai models, including:

- `ibm/granite-13b-instruct-v2`
- `ibm/granite-3-8b-instruct`
- `meta-llama/llama-3-3-70b-instruct`

## Example Output

The system provides detailed match information including:

- Compatibility score
- Detailed compatibility breakdown
- Collaboration potential assessment
- Specific collaboration insights
- Portfolio highlights
- Contact information

## Demo

Run the demo to see the system in action:

```
python final_watsonx_artist_matcher.py
```

This will run several test scenarios and display the results.
