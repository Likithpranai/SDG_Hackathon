"""
WatsonX-powered Digital Artist Collaboration Matcher

This module enhances the digital artist matcher with IBM watsonx GenAI capabilities
for more advanced and nuanced artist matching.
"""

import os
import json
from typing import Dict, List, Any, Tuple
import requests
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import NaturalLanguageUnderstandingV1
from ibm_watson.natural_language_understanding_v1 import Features, EntitiesOptions, KeywordsOptions, CategoriesOptions
from digital_artist_data import DIGITAL_ARTISTS
from config import WATSON_API_KEY, WATSON_API_URL, WATSON_PROJECT_ID, WATSON_PLATFORM_URL

class WatsonXArtistMatcher:
    """
    A class to match digital artists using IBM watsonx GenAI capabilities.
    """
    
    def __init__(self):
        """Initialize the WatsonXArtistMatcher with IBM watsonx credentials."""
        self.artists = DIGITAL_ARTISTS
        self.api_key = WATSON_API_KEY
        self.api_url = WATSON_API_URL
        self.project_id = WATSON_PROJECT_ID
        self.platform_url = WATSON_PLATFORM_URL
        
        # Initialize Watson NLU service
        self.authenticator = IAMAuthenticator(self.api_key)
        self.nlu = NaturalLanguageUnderstandingV1(
            version='2022-04-07',
            authenticator=self.authenticator
        )
        self.nlu.set_service_url(f"{self.api_url}/natural-language-understanding/api")
        
        # Initialize watsonx.ai headers
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    
    def analyze_artist_with_nlu(self, artist: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze an artist's profile and artwork descriptions using Watson NLU.
        
        Args:
            artist: Dictionary containing artist information
            
        Returns:
            Dict: Artist with enhanced NLU analysis
        """
        # Combine all text from the artist profile
        bio = artist.get("basicInfo", {}).get("bio", "")
        
        # Get artwork descriptions
        artwork_texts = []
        for artwork in artist.get("completeGallery", []):
            title = artwork.get("title", "")
            medium = artwork.get("medium", "")
            description = artwork.get("description", "")
            artwork_texts.append(f"{title}. {medium}. {description}")
        
        # Combine all text
        all_text = bio + " " + " ".join(artwork_texts)
        
        try:
            # Analyze with Watson NLU
            response = self.nlu.analyze(
                text=all_text,
                features=Features(
                    entities=EntitiesOptions(limit=10),
                    keywords=KeywordsOptions(limit=15),
                    categories=CategoriesOptions(limit=5)
                )
            ).get_result()
            
            # Create enhanced artist profile
            enhanced_artist = artist.copy()
            enhanced_artist["watson_analysis"] = {
                "entities": response.get("entities", []),
                "keywords": response.get("keywords", []),
                "categories": response.get("categories", [])
            }
            
            return enhanced_artist
        
        except Exception as e:
            print(f"Error analyzing artist with Watson NLU: {e}")
            return artist
    
    def analyze_preference_with_watsonx(self, preference_text: str) -> Dict[str, Any]:
        """
        Analyze preference text using watsonx.ai for deeper understanding.
        
        Args:
            preference_text: Chatbot preference text
            
        Returns:
            Dict: Enhanced preference analysis
        """
        # Prepare prompt for watsonx.ai
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
            # Call watsonx.ai for analysis
            payload = {
                "model_id": "ibm/granite-13b-instruct-v2",
                "input": prompt,
                "parameters": {
                    "decoding_method": "greedy",
                    "max_new_tokens": 500,
                    "min_new_tokens": 50,
                    "stop_sequences": [],
                    "repetition_penalty": 1.0
                },
                "project_id": self.project_id
            }
            
            response = requests.post(
                f"{self.platform_url}/ml/v1-beta/generation/text",
                headers=self.headers,
                json=payload
            )
            
            if response.status_code == 200:
                result = response.json()
                generated_text = result.get("results", [{}])[0].get("generated_text", "")
                
                # Extract JSON from the response
                try:
                    # Find JSON in the response
                    json_start = generated_text.find('{')
                    json_end = generated_text.rfind('}') + 1
                    
                    if json_start >= 0 and json_end > json_start:
                        json_str = generated_text[json_start:json_end]
                        analysis = json.loads(json_str)
                    else:
                        # Fallback: create structured data from the text
                        analysis = {
                            "technical_skills": self._extract_skills_from_text(generated_text),
                            "art_types": self._extract_art_types_from_text(generated_text),
                            "project_requirements": self._extract_requirements_from_text(generated_text),
                            "experience_level": self._extract_experience_from_text(generated_text),
                            "other_factors": self._extract_other_factors_from_text(generated_text)
                        }
                    
                    return {
                        "watsonx_analysis": analysis,
                        "original_text": preference_text
                    }
                
                except json.JSONDecodeError:
                    print("Error parsing JSON from watsonx response")
                    return {"original_text": preference_text}
            else:
                print(f"Error from watsonx API: {response.status_code} - {response.text}")
                return {"original_text": preference_text}
        
        except Exception as e:
            print(f"Error calling watsonx.ai: {e}")
            return {"original_text": preference_text}
    
    def _extract_skills_from_text(self, text: str) -> List[str]:
        """Extract technical skills from text."""
        skills = []
        skill_keywords = ["Blender", "Photoshop", "After Effects", "Procreate", "ZBrush", 
                         "Unity", "Unreal", "3D", "animation", "illustration", "AR", "VR"]
        
        for skill in skill_keywords:
            if skill.lower() in text.lower():
                skills.append(skill)
        
        return skills
    
    def _extract_art_types_from_text(self, text: str) -> List[str]:
        """Extract art types from text."""
        art_types = []
        type_keywords = ["3D", "animation", "illustration", "photography", "UI/UX", 
                        "concept art", "mural", "NFT", "AR/VR", "motion graphics"]
        
        for art_type in type_keywords:
            if art_type.lower() in text.lower():
                art_types.append(art_type)
        
        return art_types
    
    def _extract_requirements_from_text(self, text: str) -> List[str]:
        """Extract project requirements from text."""
        requirements = []
        text_lower = text.lower()
        
        requirement_phrases = [
            "need", "require", "must have", "looking for", "should have", 
            "project", "work on", "create", "develop"
        ]
        
        # Simple extraction based on sentences containing requirement phrases
        sentences = text.split('.')
        for sentence in sentences:
            for phrase in requirement_phrases:
                if phrase in sentence.lower():
                    clean_sentence = sentence.strip()
                    if clean_sentence and len(clean_sentence) > 10:
                        requirements.append(clean_sentence)
                    break
        
        return requirements[:3]  # Limit to top 3 requirements
    
    def _extract_experience_from_text(self, text: str) -> str:
        """Extract experience level from text."""
        text_lower = text.lower()
        
        if "senior" in text_lower or "expert" in text_lower or "5+ years" in text_lower or "experienced" in text_lower:
            return "Senior/Expert (5+ years)"
        elif "mid" in text_lower or "3+ years" in text_lower or "intermediate" in text_lower:
            return "Mid-level (3-5 years)"
        elif "junior" in text_lower or "1+ year" in text_lower or "entry" in text_lower:
            return "Junior (1-3 years)"
        else:
            return "Not specified"
    
    def _extract_other_factors_from_text(self, text: str) -> List[str]:
        """Extract other important factors from text."""
        factors = []
        factor_keywords = ["budget", "timeline", "deadline", "location", "remote", 
                          "style", "aesthetic", "collaboration", "team"]
        
        # Simple extraction based on sentences containing factor keywords
        sentences = text.split('.')
        for sentence in sentences:
            for keyword in factor_keywords:
                if keyword in sentence.lower():
                    clean_sentence = sentence.strip()
                    if clean_sentence and len(clean_sentence) > 10:
                        factors.append(clean_sentence)
                    break
        
        return factors[:3]  # Limit to top 3 factors
    
    def find_collaborators_with_watsonx(self, 
                                       artist_id: str, 
                                       chatbot_preference: str = None) -> List[Dict[str, Any]]:
        """
        Find suitable collaborators using watsonx-powered analysis.
        
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
        preference_analysis = self.analyze_preference_with_watsonx(chatbot_preference)
        
        # Enhance the requesting artist with Watson NLU
        analyzed_requesting_artist = self.analyze_artist_with_nlu(requesting_artist)
        
        # Analyze all available artists with Watson NLU
        analyzed_available_artists = []
        for artist in self.artists:
            if artist["artistId"] != artist_id:
                analyzed_artist = self.analyze_artist_with_nlu(artist)
                analyzed_available_artists.append(analyzed_artist)
        
        # Generate compatibility scores and insights using watsonx
        collaborator_matches = []
        for candidate in analyzed_available_artists:
            compatibility_score, insights = self._generate_compatibility_with_watsonx(
                analyzed_requesting_artist, 
                candidate, 
                preference_analysis,
                chatbot_preference
            )
            
            collaborator_matches.append({
                "artist": candidate,
                "compatibility_score": compatibility_score,
                "insights": insights,
                "preference_text": chatbot_preference,
                "preference_analysis": preference_analysis
            })
        
        # Sort by compatibility score (highest first)
        collaborator_matches.sort(key=lambda x: x["compatibility_score"], reverse=True)
        
        return collaborator_matches
    
    def _generate_compatibility_with_watsonx(self, 
                                           artist1: Dict[str, Any], 
                                           artist2: Dict[str, Any], 
                                           preference_analysis: Dict[str, Any],
                                           preference_text: str) -> Tuple[float, List[str]]:
        """
        Generate compatibility score and insights using watsonx.ai.
        
        Args:
            artist1: First artist profile with analysis
            artist2: Second artist profile with analysis
            preference_analysis: Analyzed chatbot preference
            preference_text: Original preference text
            
        Returns:
            Tuple: Compatibility score (0-100) and list of insights
        """
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
        
        # Prepare prompt for watsonx.ai
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
            # Call watsonx.ai for compatibility analysis
            payload = {
                "model_id": "ibm/granite-13b-instruct-v2",
                "input": prompt,
                "parameters": {
                    "decoding_method": "greedy",
                    "max_new_tokens": 500,
                    "min_new_tokens": 100,
                    "stop_sequences": [],
                    "repetition_penalty": 1.0
                },
                "project_id": self.project_id
            }
            
            response = requests.post(
                f"{self.platform_url}/ml/v1-beta/generation/text",
                headers=self.headers,
                json=payload
            )
            
            if response.status_code == 200:
                result = response.json()
                generated_text = result.get("results", [{}])[0].get("generated_text", "")
                
                # Extract JSON from the response
                try:
                    # Find JSON in the response
                    json_start = generated_text.find('{')
                    json_end = generated_text.rfind('}') + 1
                    
                    if json_start >= 0 and json_end > json_start:
                        json_str = generated_text[json_start:json_end]
                        analysis = json.loads(json_str)
                        
                        score = float(analysis.get("score", 50))
                        insights = analysis.get("insights", [])
                        
                        return score, insights
                    else:
                        # Fallback: extract score and insights manually
                        score = self._extract_score_from_text(generated_text)
                        insights = self._extract_insights_from_text(generated_text)
                        
                        return score, insights
                
                except json.JSONDecodeError:
                    print("Error parsing JSON from watsonx response")
                    # Fallback to rule-based scoring
                    return self._fallback_compatibility_score(artist1, artist2, preference_text)
            else:
                print(f"Error from watsonx API: {response.status_code} - {response.text}")
                # Fallback to rule-based scoring
                return self._fallback_compatibility_score(artist1, artist2, preference_text)
        
        except Exception as e:
            print(f"Error calling watsonx.ai: {e}")
            # Fallback to rule-based scoring
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
                                    preference_text: str) -> Tuple[float, List[str]]:
        """
        Fallback method to calculate compatibility score using rule-based approach.
        
        Args:
            artist1: First artist profile
            artist2: Second artist profile
            preference_text: Preference text
            
        Returns:
            Tuple: Compatibility score (0-100) and list of insights
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
        
        return score, insights


def run_example():
    """
    Run an example of the WatsonX-powered digital artist collaboration matcher.
    """
    # Create the matcher
    matcher = WatsonXArtistMatcher()
    
    # Select a requesting artist
    artist_id = "ART001"  # Elena Vasquez
    
    # Custom chatbot preference
    chatbot_preference = "Looking for a 3D artist who specializes in architectural visualization using Blender. Need someone with experience in photorealistic rendering and environment design for a luxury real estate project."
    
    print("\n" + "="*80)
    print("ANALYZING PREFERENCE WITH WATSONX...")
    print("="*80)
    
    # Analyze the preference with watsonx
    preference_analysis = matcher.analyze_preference_with_watsonx(chatbot_preference)
    print(json.dumps(preference_analysis, indent=2))
    
    print("\n" + "="*80)
    print("FINDING COLLABORATORS WITH WATSONX...")
    print("="*80)
    
    # Find collaborators with watsonx
    matches = matcher.find_collaborators_with_watsonx(artist_id, chatbot_preference)
    
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
