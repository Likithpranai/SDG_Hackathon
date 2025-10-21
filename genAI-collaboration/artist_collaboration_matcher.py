"""
Artist Collaboration Matcher using IBM Watson AI

This module provides functionality to match artists for collaboration based on their profiles,
preferences, and project descriptions using IBM Watson AI services.
"""

import os
import json
import requests
from typing import Dict, List, Any, Tuple
from config import WATSON_API_KEY, WATSON_API_URL, WATSON_PLATFORM_URL, WATSON_PROJECT_ID

class ArtistCollaborationMatcher:
    """
    A class to match artists for collaboration using IBM Watson AI.
    """
    
    def __init__(self):
        """Initialize the ArtistCollaborationMatcher with Watson API credentials."""
        self.api_key = WATSON_API_KEY
        self.api_url = WATSON_API_URL
        self.platform_url = WATSON_PLATFORM_URL
        self.project_id = WATSON_PROJECT_ID
        self.token = self._get_auth_token()
        
    def _get_auth_token(self) -> str:
        """
        Get authentication token from IBM Watson.
        
        Returns:
            str: Authentication token
        """
        auth_url = f"{self.platform_url}/v1/authorize"
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        auth_data = {
            "apikey": self.api_key,
            "grant_type": "urn:ibm:params:oauth:grant-type:apikey"
        }
        
        response = requests.post(auth_url, headers=headers, json=auth_data)
        if response.status_code == 200:
            return response.json().get("access_token")
        else:
            raise Exception(f"Authentication failed: {response.text}")
    
    def analyze_artist_profile(self, artist_profile: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze an artist's profile using Watson NLP to extract key attributes.
        
        Args:
            artist_profile: Dictionary containing artist profile information
            
        Returns:
            Dict: Analyzed profile with extracted attributes
        """
        # Extract relevant information from the profile
        name = artist_profile.get("name", "")
        bio = artist_profile.get("bio", "")
        skills = artist_profile.get("skills", [])
        past_projects = artist_profile.get("past_projects", [])
        style = artist_profile.get("style", "")
        preferences = artist_profile.get("collaboration_preferences", {})
        
        # Combine text for analysis
        analysis_text = f"""
        Artist Name: {name}
        Bio: {bio}
        Skills: {', '.join(skills)}
        Style: {style}
        Past Projects: {', '.join([p.get('title', '') for p in past_projects])}
        """
        
        # Use Watson NLP to analyze the profile
        analyzed_profile = self._call_watson_nlp(analysis_text)
        
        # Combine original profile with analysis
        enhanced_profile = {
            **artist_profile,
            "analysis": analyzed_profile
        }
        
        return enhanced_profile
    
    def _call_watson_nlp(self, text: str) -> Dict[str, Any]:
        """
        Call Watson NLP service to analyze text.
        
        Args:
            text: Text to analyze
            
        Returns:
            Dict: Analysis results
        """
        nlp_url = f"{self.api_url}/ml/v1/natural-language-understanding?version=2022-04-07"
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {self.token}"
        }
        
        payload = {
            "text": text,
            "features": {
                "keywords": {
                    "sentiment": True,
                    "emotion": True,
                    "limit": 10
                },
                "entities": {
                    "sentiment": True,
                    "limit": 10
                },
                "concepts": {
                    "limit": 5
                },
                "categories": {
                    "limit": 3
                }
            }
        }
        
        response = requests.post(nlp_url, headers=headers, json=payload)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"NLP analysis failed: {response.text}")
            return {}
    
    def find_collaborators(self, 
                          artist_profile: Dict[str, Any], 
                          project_description: str, 
                          available_artists: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Find suitable collaborators for an artist based on a project description.
        
        Args:
            artist_profile: Profile of the artist seeking collaborators
            project_description: Description of the project
            available_artists: List of available artists to consider for collaboration
            
        Returns:
            List: Ranked list of potential collaborators with compatibility scores
        """
        # Analyze the project description
        project_analysis = self._analyze_project(project_description)
        
        # Analyze the artist's profile
        analyzed_artist = self.analyze_artist_profile(artist_profile)
        
        # Analyze all available artists
        analyzed_available_artists = [
            self.analyze_artist_profile(artist) for artist in available_artists
        ]
        
        # Calculate compatibility scores
        collaborator_matches = []
        for candidate in analyzed_available_artists:
            # Skip if the candidate is the same as the requesting artist
            if candidate.get("id") == artist_profile.get("id"):
                continue
                
            compatibility_score, insights = self._calculate_compatibility(
                analyzed_artist, 
                candidate, 
                project_analysis
            )
            
            collaborator_matches.append({
                "artist": candidate,
                "compatibility_score": compatibility_score,
                "insights": insights
            })
        
        # Sort by compatibility score (highest first)
        collaborator_matches.sort(key=lambda x: x["compatibility_score"], reverse=True)
        
        return collaborator_matches
    
    def _analyze_project(self, project_description: str) -> Dict[str, Any]:
        """
        Analyze a project description using Watson NLP.
        
        Args:
            project_description: Description of the project
            
        Returns:
            Dict: Analysis of the project
        """
        return self._call_watson_nlp(project_description)
    
    def _calculate_compatibility(self, 
                               artist1: Dict[str, Any], 
                               artist2: Dict[str, Any], 
                               project_analysis: Dict[str, Any]) -> Tuple[float, List[str]]:
        """
        Calculate compatibility score between two artists for a specific project.
        
        Args:
            artist1: First artist profile with analysis
            artist2: Second artist profile with analysis
            project_analysis: Analysis of the project
            
        Returns:
            Tuple: Compatibility score (0-100) and list of insights
        """
        insights = []
        score_components = []
        
        # 1. Skill complementarity (30%)
        artist1_skills = set(artist1.get("skills", []))
        artist2_skills = set(artist2.get("skills", []))
        
        # Unique skills that artist2 brings
        unique_skills = artist2_skills - artist1_skills
        complementary_skill_score = min(len(unique_skills) * 10, 30)
        score_components.append(("skill_complementarity", complementary_skill_score, 0.3))
        
        if unique_skills:
            insights.append(f"Brings {len(unique_skills)} complementary skills: {', '.join(list(unique_skills)[:3])}")
        
        # 2. Style compatibility (25%)
        # Extract style keywords from both artists
        artist1_style = artist1.get("style", "").lower()
        artist2_style = artist2.get("style", "").lower()
        
        # Simple text similarity for style
        style_words1 = set(artist1_style.split())
        style_words2 = set(artist2_style.split())
        
        if style_words1 and style_words2:
            style_similarity = len(style_words1.intersection(style_words2)) / len(style_words1.union(style_words2))
            style_score = style_similarity * 25
        else:
            style_score = 0
            
        score_components.append(("style_compatibility", style_score, 0.25))
        
        if style_score > 15:
            insights.append("Has a compatible artistic style")
        
        # 3. Project relevance (25%)
        # Check if artist2's skills and experience match project needs
        project_keywords = []
        if project_analysis.get("keywords"):
            project_keywords = [k.get("text", "").lower() for k in project_analysis.get("keywords", [])]
        
        relevance_matches = 0
        for skill in artist2_skills:
            if any(skill.lower() in keyword for keyword in project_keywords):
                relevance_matches += 1
                
        project_relevance_score = min(relevance_matches * 5, 25)
        score_components.append(("project_relevance", project_relevance_score, 0.25))
        
        if project_relevance_score > 15:
            insights.append("Skills highly relevant to this specific project")
        
        # 4. Past collaboration success (20%)
        # This would ideally use actual collaboration history data
        # For now, use a placeholder based on number of past projects
        past_projects = len(artist2.get("past_projects", []))
        collaboration_score = min(past_projects * 4, 20)
        score_components.append(("past_success", collaboration_score, 0.2))
        
        if past_projects > 3:
            insights.append(f"Experienced with {past_projects} past collaborative projects")
        
        # Calculate weighted total score
        total_score = sum(score * weight for _, score, weight in score_components)
        
        # Add specific insights based on analysis
        if artist2.get("analysis", {}).get("categories"):
            top_category = artist2.get("analysis", {}).get("categories", [{}])[0].get("label", "")
            if top_category:
                insights.append(f"Specializes in {top_category}")
        
        return total_score, insights


def example_usage():
    """Example usage of the ArtistCollaborationMatcher."""
    # Sample artist profiles
    requesting_artist = {
        "id": "artist1",
        "name": "Alex Rivera",
        "bio": "Visual artist specializing in digital illustrations and concept art for games.",
        "skills": ["digital illustration", "concept art", "character design"],
        "style": "Vibrant sci-fi with bold colors",
        "past_projects": [
            {"title": "Neon Dreams Game", "role": "Lead Artist"},
            {"title": "Future City Exhibition", "role": "Contributor"}
        ],
        "collaboration_preferences": {
            "preferred_skills": ["3D modeling", "animation"],
            "preferred_experience_level": "intermediate to advanced"
        }
    }
    
    available_artists = [
        {
            "id": "artist2",
            "name": "Jordan Chen",
            "bio": "3D artist and animator with 5 years of experience in game development.",
            "skills": ["3D modeling", "animation", "texturing", "rigging"],
            "style": "Realistic with sci-fi elements",
            "past_projects": [
                {"title": "Space Explorer Game", "role": "3D Artist"},
                {"title": "Robot Wars", "role": "Character Animator"},
                {"title": "Future City Exhibition", "role": "3D Environment Artist"},
                {"title": "Mech Fighters", "role": "Lead Animator"}
            ]
        },
        {
            "id": "artist3",
            "name": "Taylor Kim",
            "bio": "Traditional painter transitioning to digital art. Specializes in landscapes and environments.",
            "skills": ["traditional painting", "environment design", "color theory"],
            "style": "Atmospheric landscapes with dramatic lighting",
            "past_projects": [
                {"title": "Mountain Vistas Gallery", "role": "Featured Artist"},
                {"title": "Digital Horizons", "role": "Contributor"}
            ]
        }
    ]
    
    project_description = """
    Looking for collaborators on a sci-fi game project that needs character designs and 3D models.
    The game is set in a futuristic city with neon aesthetics and cyberpunk elements.
    Need someone who can help translate 2D concept art into 3D models and animations.
    """
    
    # Create matcher and find collaborators
    matcher = ArtistCollaborationMatcher()
    matches = matcher.find_collaborators(requesting_artist, project_description, available_artists)
    
    # Print results
    print("Potential Collaborators:")
    for i, match in enumerate(matches, 1):
        print(f"\n{i}. {match['artist']['name']} - Compatibility Score: {match['compatibility_score']:.1f}/100")
        print(f"   Skills: {', '.join(match['artist']['skills'])}")
        print("   Why they're a good match:")
        for insight in match['insights']:
            print(f"   - {insight}")


if __name__ == "__main__":
    example_usage()
