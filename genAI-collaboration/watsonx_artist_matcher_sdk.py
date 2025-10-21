"""
Digital Artist Collaboration Matcher with IBM watsonx.ai integration
Using the official IBM watsonx.ai Python SDK
"""

import json
from typing import Dict, List, Any
from ibm_watsonx_ai import APIClient
from ibm_watsonx_ai import Credentials
from ibm_watsonx_ai.foundation_models import ModelInference
from digital_artist_data import DIGITAL_ARTISTS
from config_updated import WATSON_API_KEY, WATSON_PROJECT_ID

class WatsonXArtistMatcherSDK:
    """
    A class to match digital artists using IBM watsonx.ai SDK.
    """
    
    def __init__(self):
        """Initialize the WatsonXArtistMatcherSDK with IBM watsonx credentials."""
        self.artists = DIGITAL_ARTISTS
        self.api_key = WATSON_API_KEY
        self.project_id = WATSON_PROJECT_ID
        
        # Initialize watsonx.ai client
        self.credentials = Credentials(
            api_key=self.api_key,
            url="https://us-south.ml.cloud.ibm.com"  # Using the US South region endpoint
        )
        
        self.client = APIClient(self.credentials)
        
        # List of supported models to try
        self.models = [
            "ibm/granite-13b-instruct-v2",
            "ibm/granite-3-8b-instruct",
            "meta-llama/llama-3-3-70b-instruct"
        ]
        
        # Try to initialize with a working model
        self.model = None
        for model_id in self.models:
            try:
                print(f"Trying to initialize with model: {model_id}")
                self.model = ModelInference(
                    model_id=model_id,
                    api_client=self.client,
                    project_id=self.project_id,
                    params={
                        "decoding_method": "greedy",
                        "max_new_tokens": 500,
                        "min_new_tokens": 50
                    }
                )
                # Test the model with a simple prompt
                test_response = self.model.generate_text("Hello watsonx!")
                print(f"Model {model_id} initialized successfully")
                break
            except Exception as e:
                print(f"Error initializing model {model_id}: {e}")
                self.model = None
        
        if self.model is None:
            print("WARNING: Could not initialize any watsonx.ai model. Using fallback methods.")
    
    def analyze_artist_preference(self, preference_text: str) -> Dict[str, Any]:
        """
        Analyze artist preference using watsonx.ai.
        
        Args:
            preference_text: Chatbot preference text
            
        Returns:
            Dict: Enhanced preference analysis
        """
        if self.model is None:
            return self._fallback_preference_analysis(preference_text)
        
        prompt = f"""
        Analyze the following digital artist collaboration preference and extract key requirements:
        
        Preference: "{preference_text}"
        
        Extract and categorize the following information:
        1. Required technical skills and tools
        2. Art types and styles mentioned
        3. Project requirements and goals
        4. Experience level needed
        5. Other important factors
        
        Format your response as JSON with these categories.
        """
        
        try:
            response = self.model.generate_text(prompt)
            print("Raw response from watsonx.ai:")
            print(response)
            
            # Try to extract JSON from the response
            try:
                # Find JSON in the response
                json_start = response.find('{')
                json_end = response.rfind('}') + 1
                
                if json_start >= 0 and json_end > json_start:
                    json_str = response[json_start:json_end]
                    analysis = json.loads(json_str)
                    return {
                        "watsonx_analysis": analysis,
                        "original_text": preference_text
                    }
                else:
                    # Fallback to structured extraction
                    return self._fallback_preference_analysis(preference_text, response)
            
            except json.JSONDecodeError:
                print("Error parsing JSON from watsonx response")
                return self._fallback_preference_analysis(preference_text, response)
        
        except Exception as e:
            print(f"Error calling watsonx.ai: {e}")
            return self._fallback_preference_analysis(preference_text)
    
    def _fallback_preference_analysis(self, preference_text: str, ai_response: str = None) -> Dict[str, Any]:
        """
        Fallback method for preference analysis when watsonx.ai is unavailable.
        
        Args:
            preference_text: Chatbot preference text
            ai_response: Optional AI response to parse
            
        Returns:
            Dict: Structured preference analysis
        """
        # Extract tools from preference text
        tools = []
        tool_keywords = ["Blender", "Photoshop", "After Effects", "Procreate", "ZBrush", 
                       "Unity", "Unreal", "3D", "animation", "illustration", "AR", "VR"]
        
        for tool in tool_keywords:
            if tool.lower() in preference_text.lower():
                tools.append(tool)
        
        # Extract art types from preference text
        art_types = []
        type_keywords = ["3D", "animation", "illustration", "photography", "UI/UX", 
                       "concept art", "mural", "NFT", "AR/VR", "motion graphics"]
        
        for art_type in type_keywords:
            if art_type.lower() in preference_text.lower():
                art_types.append(art_type)
        
        # Extract experience level
        experience = "Not specified"
        if "senior" in preference_text.lower() or "expert" in preference_text.lower() or "5+ years" in preference_text.lower():
            experience = "Senior/Expert (5+ years)"
        elif "mid" in preference_text.lower() or "3+ years" in preference_text.lower() or "intermediate" in preference_text.lower():
            experience = "Mid-level (3-5 years)"
        elif "junior" in preference_text.lower() or "1+ year" in preference_text.lower() or "entry" in preference_text.lower():
            experience = "Junior (1-3 years)"
        
        # Extract project requirements
        requirements = []
        requirement_phrases = ["need", "require", "must have", "looking for", "should have"]
        
        sentences = preference_text.split('.')
        for sentence in sentences:
            for phrase in requirement_phrases:
                if phrase in sentence.lower():
                    clean_sentence = sentence.strip()
                    if clean_sentence and len(clean_sentence) > 10:
                        requirements.append(clean_sentence)
                    break
        
        analysis = {
            "technical_skills": tools,
            "art_types": art_types,
            "project_requirements": requirements[:3],
            "experience_level": experience,
            "other_factors": []
        }
        
        return {
            "analysis": analysis,
            "original_text": preference_text
        }
    
    def generate_compatibility_score(self, 
                                   artist1: Dict[str, Any], 
                                   artist2: Dict[str, Any], 
                                   preference_text: str) -> Dict[str, Any]:
        """
        Generate compatibility score between two artists using watsonx.ai.
        
        Args:
            artist1: First artist profile
            artist2: Second artist profile
            preference_text: Preference text
            
        Returns:
            Dict: Compatibility score and insights
        """
        if self.model is None:
            return self._fallback_compatibility_score(artist1, artist2, preference_text)
        
        # Prepare artist profiles for the prompt
        artist1_bio = artist1.get("basicInfo", {}).get("bio", "")
        artist1_name = artist1.get("basicInfo", {}).get("name", "")
        
        artist2_bio = artist2.get("basicInfo", {}).get("bio", "")
        artist2_name = artist2.get("basicInfo", {}).get("name", "")
        
        # Get artist2's gallery highlights
        gallery_highlights = []
        for artwork in artist2.get("completeGallery", [])[:3]:
            title = artwork.get("title", "")
            medium = artwork.get("medium", "")
            description = artwork.get("description", "")
            gallery_highlights.append(f"- {title} ({medium}): {description}")
        
        gallery_text = "\n".join(gallery_highlights)
        
        prompt = f"""
        Evaluate the compatibility between two digital artists for collaboration.
        
        Artist 1 (Requesting Collaboration):
        Name: {artist1_name}
        Bio: {artist1_bio}
        
        Artist 2 (Potential Collaborator):
        Name: {artist2_name}
        Bio: {artist2_bio}
        
        Recent Work by {artist2_name}:
        {gallery_text}
        
        Collaboration Request:
        "{preference_text}"
        
        Analyze the compatibility between these artists based on:
        1. How well Artist 2's skills match the collaboration request
        2. Complementary skills between the artists
        3. Potential synergies in their work styles and mediums
        4. Overall collaboration potential
        
        Provide:
        1. A compatibility score from 0-100
        2. 3-5 specific insights about why they would be good collaborators
        
        Format your response as JSON with "score" and "insights" fields.
        """
        
        try:
            response = self.model.generate_text(prompt)
            print("Raw response from watsonx.ai:")
            print(response)
            
            # Try to extract JSON from the response
            try:
                # Find JSON in the response
                json_start = response.find('{')
                json_end = response.rfind('}') + 1
                
                if json_start >= 0 and json_end > json_start:
                    json_str = response[json_start:json_end]
                    analysis = json.loads(json_str)
                    
                    score = float(analysis.get("score", 50))
                    insights = analysis.get("insights", [])
                    
                    return {
                        "score": score,
                        "insights": insights,
                        "raw_response": response
                    }
                else:
                    # Extract score and insights manually
                    score = self._extract_score_from_text(response)
                    insights = self._extract_insights_from_text(response)
                    
                    return {
                        "score": score,
                        "insights": insights,
                        "raw_response": response
                    }
            
            except json.JSONDecodeError:
                print("Error parsing JSON from watsonx response")
                score = self._extract_score_from_text(response)
                insights = self._extract_insights_from_text(response)
                
                return {
                    "score": score,
                    "insights": insights,
                    "raw_response": response
                }
        
        except Exception as e:
            print(f"Error calling watsonx.ai: {e}")
            return self._fallback_compatibility_score(artist1, artist2, preference_text)
    
    def _extract_score_from_text(self, text: str) -> float:
        """Extract compatibility score from text."""
        import re
        
        # Look for patterns like "score: 85" or "compatibility score: 85/100"
        score_patterns = [
            r"score:\s*(\d+)",
            r"compatibility score:\s*(\d+)",
            r"compatibility:\s*(\d+)",
            r"score of (\d+)",
            r"(\d+)/100",
            r"(\d+) out of 100"
        ]
        
        for pattern in score_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                try:
                    score = int(match.group(1))
                    return min(max(score, 0), 100)  # Ensure score is between 0-100
                except ValueError:
                    continue
        
        return 50  # Default score if no score found
    
    def _extract_insights_from_text(self, text: str) -> List[str]:
        """Extract insights from text."""
        insights = []
        
        # Split by common list markers
        for marker in ["1.", "2.", "3.", "4.", "5.", "-", "•"]:
            if marker in text:
                parts = text.split(marker)
                for part in parts[1:]:  # Skip the first part (before the first marker)
                    # Get the first sentence
                    sentence = part.split(".")[0].strip()
                    if sentence and len(sentence) > 10:
                        insights.append(sentence)
        
        # If no insights found with markers, try extracting sentences with key phrases
        if not insights:
            key_phrases = ["would be", "could", "skills", "experience", "complementary", "synergy"]
            sentences = text.split(".")
            for sentence in sentences:
                for phrase in key_phrases:
                    if phrase in sentence.lower():
                        clean_sentence = sentence.strip()
                        if clean_sentence and len(clean_sentence) > 10:
                            insights.append(clean_sentence)
                        break
        
        # Limit to 5 insights and ensure they're unique
        unique_insights = []
        for insight in insights:
            if insight not in unique_insights and len(unique_insights) < 5:
                unique_insights.append(insight)
        
        return unique_insights if unique_insights else ["Compatible based on skills and experience"]
    
    def _fallback_compatibility_score(self, 
                                    artist1: Dict[str, Any], 
                                    artist2: Dict[str, Any], 
                                    preference_text: str) -> Dict[str, Any]:
        """
        Fallback method to calculate compatibility score using rule-based approach.
        
        Args:
            artist1: First artist profile
            artist2: Second artist profile
            preference_text: Preference text
            
        Returns:
            Dict: Compatibility score and insights
        """
        score = 50  # Default middle score
        insights = []
        
        # Extract tools mentioned in bios
        artist1_bio = artist1.get("basicInfo", {}).get("bio", "").lower()
        artist2_bio = artist2.get("basicInfo", {}).get("bio", "").lower()
        
        # Check for tool matches
        tools = ["blender", "photoshop", "procreate", "after effects", "zbrush", "unity", "3d", "animation"]
        matching_tools = []
        
        for tool in tools:
            if tool in artist2_bio and tool in preference_text.lower():
                matching_tools.append(tool)
                score += 5  # Increase score for each matching tool
        
        if matching_tools:
            insights.append(f"Uses requested tools: {', '.join(matching_tools)}")
        
        # Check for experience level
        experience_match = None
        for exp in ["years", "experience", "expert", "senior"]:
            if exp in artist2_bio and exp in preference_text.lower():
                experience_match = exp
                score += 10
                break
        
        if experience_match:
            insights.append(f"Has relevant {experience_match} mentioned in the request")
        
        # Check for art type matches
        art_types = ["illustration", "animation", "3d", "concept", "mural", "nft", "ar", "vr"]
        matching_art_types = []
        
        for art_type in art_types:
            if art_type in artist2_bio and art_type in preference_text.lower():
                matching_art_types.append(art_type)
                score += 5  # Increase score for each matching art type
        
        if matching_art_types:
            insights.append(f"Specializes in requested art types: {', '.join(matching_art_types)}")
        
        # Add location insight
        artist2_location = artist2.get("basicInfo", {}).get("location", "")
        if artist2_location:
            insights.append(f"Based in {artist2_location}")
        
        # Ensure score is between 0-100
        score = min(max(score, 0), 100)
        
        return {
            "score": score,
            "insights": insights
        }
    
    def find_collaborators(self, 
                         artist_id: str, 
                         chatbot_preference: str = None) -> List[Dict[str, Any]]:
        """
        Find suitable collaborators using watsonx.ai-powered analysis.
        
        Args:
            artist_id: ID of the artist seeking collaborators
            chatbot_preference: Optional custom chatbot preference text
            
        Returns:
            List: Ranked list of potential collaborators with compatibility scores and insights
        """
        # Find the requesting artist
        requesting_artist = next((a for a in self.artists if a["artistId"] == artist_id), None)
        if not requesting_artist:
            return []
        
        # Use provided chatbot preference or the one from the artist profile
        if chatbot_preference is None:
            chatbot_preference = requesting_artist.get("chatbotPreferences", {}).get("preferenceText", "")
        
        # Analyze the chatbot preference with watsonx
        preference_analysis = self.analyze_artist_preference(chatbot_preference)
        
        # Generate compatibility scores and insights using watsonx
        collaborator_matches = []
        for candidate in self.artists:
            if candidate["artistId"] != artist_id:
                compatibility_result = self.generate_compatibility_score(
                    requesting_artist, 
                    candidate, 
                    chatbot_preference
                )
                
                collaborator_matches.append({
                    "artist": candidate,
                    "compatibility_score": compatibility_result.get("score", 50),
                    "insights": compatibility_result.get("insights", []),
                    "preference_text": chatbot_preference,
                    "preference_analysis": preference_analysis
                })
        
        # Sort by compatibility score (highest first)
        collaborator_matches.sort(key=lambda x: x["compatibility_score"], reverse=True)
        
        return collaborator_matches


def run_example():
    """
    Run an example of the WatsonX-powered digital artist collaboration matcher.
    """
    # Create the matcher
    matcher = WatsonXArtistMatcherSDK()
    
    # Select a requesting artist
    artist_id = "ART001"  # Elena Vasquez
    
    # Custom chatbot preference
    chatbot_preference = "Looking for a 3D artist who specializes in architectural visualization using Blender. Need someone with experience in photorealistic rendering and environment design for a luxury real estate project."
    
    print("\n" + "="*80)
    print("ANALYZING PREFERENCE WITH WATSONX...")
    print("="*80)
    
    # Analyze the preference with watsonx
    preference_analysis = matcher.analyze_artist_preference(chatbot_preference)
    print(json.dumps(preference_analysis, indent=2))
    
    print("\n" + "="*80)
    print("FINDING COLLABORATORS WITH WATSONX...")
    print("="*80)
    
    # Find collaborators with watsonx
    matches = matcher.find_collaborators(artist_id, chatbot_preference)
    
    # Get the requesting artist
    requesting_artist = next((a for a in matcher.artists if a["artistId"] == artist_id), None)
    
    # Print the requesting artist
    print(f"\nREQUESTING ARTIST: {requesting_artist['basicInfo']['name']}")
    print(f"Bio: {requesting_artist['basicInfo']['bio']}")
    print(f"Location: {requesting_artist['basicInfo']['location']}")
    print(f"Preference: {chatbot_preference}")
    
    # Print the top matches
    print("\nTOP MATCHES:\n")
    for i, match in enumerate(matches[:3], 1):
        artist = match["artist"]
        score = match["compatibility_score"]
        insights = match["insights"]
        
        print(f"{i}. {artist['basicInfo']['name']} - Compatibility Score: {score}/100")
        print(f"   Bio: {artist['basicInfo']['bio']}")
        print(f"   Location: {artist['basicInfo']['location']}")
        print("   Insights:")
        for insight in insights:
            print(f"   - {insight}")
        print()


if __name__ == "__main__":
    run_example()
