"""
Final Digital Artist Collaboration Matcher with IBM watsonx.ai integration
"""

import json
from typing import Dict, List, Any
from ibm_watsonx_ai import APIClient
from ibm_watsonx_ai import Credentials
from ibm_watsonx_ai.foundation_models import ModelInference
from digital_artist_data import DIGITAL_ARTISTS
from config_updated import WATSON_API_KEY, WATSON_PROJECT_ID
from detailed_match_formatter import format_detailed_match, format_project_requirements

class FinalWatsonXArtistMatcher:
    """
    Final implementation of digital artist matcher with IBM watsonx.ai integration.
    """
    
    def __init__(self):
        """Initialize the FinalWatsonXArtistMatcher with IBM watsonx credentials."""
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
    
    def analyze_chatbot_preference(self, preference_text: str) -> Dict[str, Any]:
        """
        Analyze chatbot preference using watsonx.ai or fallback to rule-based analysis.
        
        Args:
            preference_text: Chatbot preference text
            
        Returns:
            Dict: Structured preference analysis
        """
        if self.model is None:
            return self._analyze_preference_rule_based(preference_text)
        
        prompt = f"""
        Analyze the following digital artist collaboration preference and extract key requirements:
        
        Preference: "{preference_text}"
        
        Extract and categorize the following information:
        1. Required technical skills and tools (e.g., Blender, Photoshop, After Effects)
        2. Art types and styles mentioned (e.g., 3D, animation, illustration)
        3. Project requirements and goals
        4. Experience level needed
        5. Other important keywords or requirements
        
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
                    
                    # Extract tools, art types, and keywords from the analysis
                    tools = []
                    art_types = []
                    keywords = []
                    
                    # Extract tools
                    if "technical_skills" in analysis:
                        if isinstance(analysis["technical_skills"], list):
                            tools = analysis["technical_skills"]
                        elif isinstance(analysis["technical_skills"], dict):
                            for tool, value in analysis["technical_skills"].items():
                                if isinstance(value, bool) and value:
                                    tools.append(tool)
                                elif isinstance(value, str):
                                    tools.append(tool)
                    
                    # Extract art types
                    if "art_types" in analysis:
                        if isinstance(analysis["art_types"], list):
                            art_types = analysis["art_types"]
                        elif isinstance(analysis["art_types"], dict):
                            for art_type, value in analysis["art_types"].items():
                                if isinstance(value, bool) and value:
                                    art_types.append(art_type)
                                elif isinstance(value, str):
                                    art_types.append(art_type)
                    
                    # Extract keywords
                    if "other_keywords" in analysis:
                        if isinstance(analysis["other_keywords"], list):
                            keywords = analysis["other_keywords"]
                        elif isinstance(analysis["other_keywords"], dict):
                            for keyword, value in analysis["other_keywords"].items():
                                if isinstance(value, bool) and value:
                                    keywords.append(keyword)
                                elif isinstance(value, str):
                                    keywords.append(keyword)
                    
                    return {
                        "tools": tools,
                        "art_types": art_types,
                        "keywords": keywords,
                        "raw_analysis": analysis
                    }
                else:
                    # Fallback to rule-based analysis
                    return self._analyze_preference_rule_based(preference_text)
            
            except json.JSONDecodeError:
                print("Error parsing JSON from watsonx response")
                return self._analyze_preference_rule_based(preference_text)
        
        except Exception as e:
            print(f"Error calling watsonx.ai: {e}")
            return self._analyze_preference_rule_based(preference_text)
    
    def _analyze_preference_rule_based(self, preference_text: str) -> Dict[str, Any]:
        """
        Rule-based analysis of chatbot preference.
        
        Args:
            preference_text: Chatbot preference text
            
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
        
        # Extract other keywords
        keywords = []
        important_keywords = ["artist", "specializes", "architectural", "visualization", "using",
                           "experience", "photorealistic", "rendering", "environment", "design",
                           "luxury", "real estate", "project", "years", "portfolio", "attention",
                           "lighting", "materials", "spatial", "composition"]
        
        for keyword in important_keywords:
            if keyword.lower() in preference_text.lower():
                keywords.append(keyword)
        
        return {
            "tools": tools,
            "art_types": art_types,
            "keywords": keywords,
            "raw_analysis": {
                "technical_skills": tools,
                "art_types": art_types,
                "other_keywords": keywords
            }
        }
    
    def calculate_compatibility_score(self, 
                                    artist: Dict[str, Any], 
                                    preference_analysis: Dict[str, Any]) -> Dict[str, Any]:
        """
        Calculate compatibility score between an artist and a preference.
        
        Args:
            artist: Artist profile
            preference_analysis: Analyzed preference
            
        Returns:
            Dict: Compatibility score and breakdown
        """
        # Extract artist information
        artist_bio = artist.get("basicInfo", {}).get("bio", "").lower()
        artist_name = artist.get("basicInfo", {}).get("name", "")
        
        # Initialize scores
        tool_score = 0
        art_type_score = 0
        keyword_score = 0
        experience_score = 0
        portfolio_score = 0
        
        # Calculate tool score (30 points max)
        tools = preference_analysis.get("tools", [])
        if tools:
            tool_matches = sum(1 for tool in tools if tool.lower() in artist_bio)
            tool_score = min(30, int(30 * (tool_matches / len(tools))))
        
        # Calculate art type score (30 points max)
        art_types = preference_analysis.get("art_types", [])
        if art_types:
            art_type_matches = sum(1 for art_type in art_types if art_type.lower() in artist_bio)
            art_type_score = min(30, int(30 * (art_type_matches / len(art_types))))
        
        # Calculate keyword score (20 points max)
        keywords = preference_analysis.get("keywords", [])
        if keywords:
            keyword_matches = sum(1 for keyword in keywords if keyword.lower() in artist_bio)
            keyword_score = min(20, int(20 * (keyword_matches / len(keywords))))
        
        # Calculate experience score (10 points max)
        if "6+ years" in artist_bio or "7+ years" in artist_bio or "8+ years" in artist_bio:
            experience_score = 10
        elif "4+ years" in artist_bio or "5+ years" in artist_bio:
            experience_score = 8
        elif "3+ years" in artist_bio:
            experience_score = 6
        elif "2+ years" in artist_bio:
            experience_score = 4
        elif "1+ year" in artist_bio:
            experience_score = 2
        
        # Calculate portfolio score (10 points max)
        gallery = artist.get("completeGallery", [])
        if gallery:
            if len(gallery) >= 3:
                portfolio_score = 10
            elif len(gallery) == 2:
                portfolio_score = 7
            elif len(gallery) == 1:
                portfolio_score = 5
        
        # Calculate total score
        total_score = tool_score + art_type_score + keyword_score + experience_score + portfolio_score
        
        # Generate compatibility level
        compatibility_level = ""
        if total_score >= 75:
            compatibility_level = "Excellent Match (75-100%)"
        elif total_score >= 60:
            compatibility_level = "Strong Match (60-74%)"
        elif total_score >= 45:
            compatibility_level = "Good Match (45-59%)"
        elif total_score >= 30:
            compatibility_level = "Fair Match (30-44%)"
        else:
            compatibility_level = "Poor Match (0-29%)"
        
        # Generate insights
        insights = []
        
        # Tool insights
        if tool_score >= 20:
            matching_tools = [tool for tool in tools if tool.lower() in artist_bio]
            if matching_tools:
                insights.append(f"Uses requested tools: {', '.join(matching_tools)}")
        
        # Art type insights
        if art_type_score >= 20:
            matching_art_types = [art_type for art_type in art_types if art_type.lower() in artist_bio]
            if matching_art_types:
                insights.append(f"Specializes in requested art types: {', '.join(matching_art_types)}")
        
        # Keyword insights
        if keyword_score >= 10:
            matching_keywords = [keyword for keyword in keywords if keyword.lower() in artist_bio]
            if matching_keywords:
                insights.append(f"Profile matches key terms: {', '.join(matching_keywords)}")
        
        # Experience insight
        if experience_score >= 6:
            if "6+ years" in artist_bio:
                insights.append("Has 6+ years of experience")
            elif "5+ years" in artist_bio:
                insights.append("Has 5+ years of experience")
            elif "4+ years" in artist_bio:
                insights.append("Has 4+ years of experience")
            elif "3+ years" in artist_bio:
                insights.append("Has 3+ years of experience")
        
        # Location insight
        artist_location = artist.get("basicInfo", {}).get("location", "")
        if artist_location:
            insights.append(f"Based in {artist_location}")
        
        return {
            "score": total_score,
            "tool_score": tool_score,
            "art_type_score": art_type_score,
            "keyword_score": keyword_score,
            "experience_score": experience_score,
            "portfolio_score": portfolio_score,
            "compatibility_level": compatibility_level,
            "insights": insights
        }
    
    def generate_ai_insights(self, 
                          artist1: Dict[str, Any], 
                          artist2: Dict[str, Any], 
                          preference_text: str) -> List[str]:
        """
        Generate AI-powered insights about the compatibility between two artists.
        
        Args:
            artist1: First artist profile
            artist2: Second artist profile
            preference_text: Preference text
            
        Returns:
            List: AI-generated insights
        """
        if self.model is None:
            return []
        
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
        
        Provide 3-5 specific insights about why they would be good collaborators, focusing on:
        1. How well Artist 2's skills match the collaboration request
        2. Complementary skills between the artists
        3. Potential synergies in their work styles and mediums
        
        Format your response as a JSON array of insight strings.
        """
        
        try:
            response = self.model.generate_text(prompt)
            print("Raw response from watsonx.ai:")
            print(response)
            
            # Try to extract JSON from the response
            try:
                # Find JSON in the response
                json_start = response.find('[')
                json_end = response.rfind(']') + 1
                
                if json_start >= 0 and json_end > json_start:
                    json_str = response[json_start:json_end]
                    insights = json.loads(json_str)
                    return insights
                else:
                    # Extract insights manually
                    return self._extract_insights_from_text(response)
            
            except json.JSONDecodeError:
                print("Error parsing JSON from watsonx response")
                return self._extract_insights_from_text(response)
        
        except Exception as e:
            print(f"Error calling watsonx.ai: {e}")
            return []
    
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
    
    def find_collaborators(self, 
                         artist_id: str, 
                         chatbot_preference: str = None) -> List[Dict[str, Any]]:
        """
        Find suitable collaborators for an artist.
        
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
        
        # Analyze the chatbot preference
        preference_analysis = self.analyze_chatbot_preference(chatbot_preference)
        
        # Find potential collaborators
        collaborator_matches = []
        for artist in self.artists:
            if artist["artistId"] != artist_id:
                # Calculate compatibility score
                compatibility = self.calculate_compatibility_score(artist, preference_analysis)
                
                # Generate AI insights if score is high enough
                ai_insights = []
                if compatibility["score"] >= 45:  # Only generate AI insights for good matches
                    ai_insights = self.generate_ai_insights(requesting_artist, artist, chatbot_preference)
                
                # Combine rule-based insights with AI insights
                insights = compatibility["insights"]
                if ai_insights:
                    insights = ai_insights
                
                # Create portfolio highlights
                portfolio_highlights = []
                for artwork in artist.get("completeGallery", [])[:3]:
                    portfolio_highlights.append({
                        "title": artwork.get("title", ""),
                        "year": artwork.get("year", ""),
                        "medium": artwork.get("medium", ""),
                        "description": artwork.get("description", "")
                    })
                
                # Create match object
                match = {
                    "artist": {
                        "name": artist.get("basicInfo", {}).get("name", ""),
                        "location": artist.get("basicInfo", {}).get("location", ""),
                        "bio": artist.get("basicInfo", {}).get("bio", "")
                    },
                    "compatibility_score": compatibility["score"],
                    "compatibility_breakdown": {
                        "tool_expertise": f"{compatibility['tool_score']}/30",
                        "art_type_alignment": f"{compatibility['art_type_score']}/30",
                        "project_relevance": f"{compatibility['keyword_score']}/20",
                        "experience_level": f"{compatibility['experience_score']}/10",
                        "portfolio_quality": f"{compatibility['portfolio_score']}/10"
                    },
                    "compatibility_level": compatibility["compatibility_level"],
                    "insights": insights,
                    "portfolio_highlights": portfolio_highlights,
                    "contact_info": {
                        "website": artist.get("basicInfo", {}).get("website", ""),
                        "email": artist.get("basicInfo", {}).get("email", ""),
                        "social": artist.get("basicInfo", {}).get("social", [])
                    }
                }
                
                collaborator_matches.append(match)
        
        # Sort by compatibility score (highest first)
        collaborator_matches.sort(key=lambda x: x["compatibility_score"], reverse=True)
        
        return collaborator_matches


def run_demo():
    """Run a demonstration of the Final WatsonX Artist Matcher"""
    # Create the matcher
    matcher = FinalWatsonXArtistMatcher()
    
    # Define test scenarios
    scenarios = [
        {
            "title": "3D Architectural Visualization",
            "artist_id": "ART001",  # Elena Vasquez (Digital abstract painter)
            "preference": "Looking for a 3D artist who specializes in architectural visualization using Blender. Need someone with experience in photorealistic rendering and environment design for a luxury real estate project."
        },
        {
            "title": "Children's Book Illustration",
            "artist_id": "ART003",  # Aisha Thompson (Digital 3D sculptor)
            "preference": "Need a digital illustrator with strong character design skills for a children's book series. Must be proficient in Procreate and have experience with watercolor-style digital art."
        }
    ]
    
    # Run each scenario
    for i, scenario in enumerate(scenarios, 1):
        print("\n" + "="*100)
        print(f"SCENARIO {i}: {scenario['title']}")
        print("="*100)
        
        # Get the requesting artist
        artist_id = scenario["artist_id"]
        requesting_artist = next((a for a in matcher.artists if a["artistId"] == artist_id), None)
        
        # Analyze the preference
        preference = scenario["preference"]
        preference_analysis = matcher.analyze_chatbot_preference(preference)
        
        # Print the requesting artist
        print(f"\nREQUESTING ARTIST: {requesting_artist['basicInfo']['name']}")
        print(f"Bio: {requesting_artist['basicInfo']['bio']}")
        print(f"Location: {requesting_artist['basicInfo']['location']}")
        
        # Print the project requirements
        print("\nPROJECT REQUIREMENTS:")
        print(format_project_requirements(preference, preference_analysis))
        
        # Find collaborators
        matches = matcher.find_collaborators(artist_id, preference)
        
        # Print the top 2 matches with detailed formatting
        if matches:
            print("\nTOP MATCH WITH DETAILED ANALYSIS:")
            print(format_detailed_match(matches[0]))
            
            if len(matches) > 1:
                print("\n" + "-"*80)
                print("\nSECOND BEST MATCH:")
                print(format_detailed_match(matches[1]))
        else:
            print("\nNo matches found.")


if __name__ == "__main__":
    run_demo()
