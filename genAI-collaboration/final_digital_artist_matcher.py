"""
Final Digital Artist Collaboration Matcher with Detailed Descriptions

This module provides functionality to match digital artists for collaboration based on their profiles,
artwork gallery, and chatbot preferences, with enhanced detailed descriptions.
"""

import re
import string
from typing import Dict, List, Any, Tuple
from collections import Counter
from digital_artist_data import DIGITAL_ARTISTS
from detailed_match_formatter import format_detailed_match, format_project_requirements

class FinalDigitalArtistMatcher:
    """
    A class to match digital artists for collaboration based on their profiles and preferences,
    with enhanced detailed descriptions.
    """
    
    def __init__(self):
        """Initialize the FinalDigitalArtistMatcher."""
        self.artists = DIGITAL_ARTISTS
        self.stopwords = self._get_stopwords()
        
    def _get_stopwords(self) -> set:
        """Get a set of common stopwords to filter out from text analysis."""
        return {
            "a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "by", "in",
            "of", "with", "about", "against", "between", "into", "through", "during", "before",
            "after", "above", "below", "from", "up", "down", "is", "are", "was", "were", "be",
            "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing",
            "this", "that", "these", "those", "i", "you", "he", "she", "it", "we", "they",
            "their", "his", "her", "its", "our", "their", "which", "who", "whom", "whose",
            "what", "why", "where", "when", "how", "who", "need", "want", "looking"
        }
    
    def extract_tools_and_skills(self, artist: Dict[str, Any]) -> Dict[str, Any]:
        """
        Extract digital tools and skills from an artist's bio and gallery.
        
        Args:
            artist: Dictionary containing artist information
            
        Returns:
            Dict: Artist with extracted tools and skills
        """
        bio = artist.get("basicInfo", {}).get("bio", "")
        gallery = artist.get("completeGallery", [])
        
        # Extract tools from bio
        tools_in_bio = self._extract_tools_from_text(bio)
        
        # Extract tools from gallery descriptions
        all_tools = tools_in_bio.copy()
        for artwork in gallery:
            medium = artwork.get("medium", "")
            description = artwork.get("description", "")
            
            tools_in_medium = self._extract_tools_from_text(medium)
            tools_in_desc = self._extract_tools_from_text(description)
            
            all_tools.extend(tools_in_medium)
            all_tools.extend(tools_in_desc)
        
        # Count tool frequencies
        tool_counts = Counter(all_tools)
        
        # Add tools to artist profile
        enhanced_artist = artist.copy()
        enhanced_artist["extracted_tools"] = {
            "tools": dict(tool_counts),
            "primary_tools": [tool for tool, _ in tool_counts.most_common(3)]
        }
        
        return enhanced_artist
    
    def _extract_tools_from_text(self, text: str) -> List[str]:
        """
        Extract digital tools and software from text.
        
        Args:
            text: Text to extract tools from
            
        Returns:
            List: Extracted tools
        """
        # List of common digital art tools and software
        known_tools = {
            "procreate", "photoshop", "illustrator", "after effects", "premiere", "indesign",
            "blender", "zbrush", "substance painter", "maya", "3ds max", "cinema 4d", "c4d",
            "lightroom", "capture one", "figma", "sketch", "xd", "clip studio", "toonboom",
            "spine", "unity", "unreal", "touchdesigner", "resolume", "ableton", "ar", "vr",
            "spark ar", "lens studio", "nft", "v-ray", "vray"
        }
        
        # Normalize text
        text = text.lower()
        
        # Find all tools
        found_tools = []
        for tool in known_tools:
            if tool in text:
                found_tools.append(tool)
        
        return found_tools
    
    def extract_art_types(self, artist: Dict[str, Any]) -> Dict[str, Any]:
        """
        Extract art types and styles from an artist's gallery.
        
        Args:
            artist: Dictionary containing artist information
            
        Returns:
            Dict: Artist with extracted art types
        """
        gallery = artist.get("completeGallery", [])
        bio = artist.get("basicInfo", {}).get("bio", "")
        
        # Art types to look for
        art_types = {
            "illustration": ["illustration", "illustrator", "illustrate"],
            "animation": ["animation", "animator", "animate"],
            "3d": ["3d", "blender", "zbrush", "maya", "substance", "model"],
            "photography": ["photo", "photography", "photographer"],
            "ui/ux": ["ui", "ux", "interface", "figma", "sketch", "xd"],
            "concept art": ["concept art", "concept artist"],
            "mural": ["mural", "street art"],
            "nft": ["nft", "blockchain", "crypto"],
            "ar/vr": ["ar", "vr", "augmented", "virtual", "filter"],
            "motion graphics": ["motion", "motion graphics", "after effects"],
            "video": ["video", "film", "cinema"],
            "music visual": ["music", "audio", "sound", "spotify", "ableton"]
        }
        
        # Count art type occurrences
        art_type_counts = {art_type: 0 for art_type in art_types}
        
        # Check bio
        bio_lower = bio.lower()
        for art_type, keywords in art_types.items():
            for keyword in keywords:
                if keyword in bio_lower:
                    art_type_counts[art_type] += 3  # Higher weight for bio mentions
        
        # Check gallery
        for artwork in gallery:
            title = artwork.get("title", "").lower()
            medium = artwork.get("medium", "").lower()
            description = artwork.get("description", "").lower()
            
            combined_text = f"{title} {medium} {description}"
            
            for art_type, keywords in art_types.items():
                for keyword in keywords:
                    if keyword in combined_text:
                        art_type_counts[art_type] += 1
        
        # Filter to only art types with counts > 0
        active_art_types = {k: v for k, v in art_type_counts.items() if v > 0}
        
        # Add art types to artist profile
        enhanced_artist = artist.copy()
        enhanced_artist["extracted_art_types"] = {
            "art_types": active_art_types,
            "primary_art_types": [art_type for art_type, _ in 
                                 sorted(active_art_types.items(), key=lambda x: x[1], reverse=True)[:3]]
        }
        
        return enhanced_artist
    
    def analyze_chatbot_preference(self, preference_text: str) -> Dict[str, Any]:
        """
        Analyze chatbot preference text to extract requirements.
        
        Args:
            preference_text: Chatbot preference text
            
        Returns:
            Dict: Extracted requirements
        """
        text = preference_text.lower()
        
        # Extract tools mentioned
        tools = self._extract_tools_from_text(text)
        
        # Extract art types mentioned
        art_types = []
        art_type_keywords = {
            "illustration": ["illustration", "illustrator", "illustrate"],
            "animation": ["animation", "animator", "animate", "2d animation"],
            "3d": ["3d", "3d model", "3d artist", "sculptor"],
            "photography": ["photo", "photography", "photographer"],
            "ui/ux": ["ui", "ux", "interface", "ui/ux"],
            "concept art": ["concept art", "concept artist"],
            "mural": ["mural", "street art"],
            "nft": ["nft"],
            "ar/vr": ["ar", "vr", "augmented reality", "virtual reality", "filter"],
            "motion graphics": ["motion", "motion graphics"],
            "video": ["video", "film", "cinema"],
            "music visual": ["music", "audio", "sound", "visual"]
        }
        
        for art_type, keywords in art_type_keywords.items():
            for keyword in keywords:
                if keyword in text:
                    art_types.append(art_type)
                    break
        
        # Extract other keywords
        words = self._preprocess_text(text)
        keywords = [word for word in words if len(word) > 3]
        
        return {
            "tools": tools,
            "art_types": art_types,
            "keywords": keywords,
            "original_text": preference_text
        }
    
    def _preprocess_text(self, text: str) -> List[str]:
        """
        Preprocess text by removing punctuation, converting to lowercase, and removing stopwords.
        
        Args:
            text: Text to preprocess
            
        Returns:
            List: Preprocessed words
        """
        # Remove punctuation and convert to lowercase
        text = text.lower()
        text = text.translate(str.maketrans('', '', string.punctuation))
        
        # Split into words and remove stopwords
        words = text.split()
        words = [word for word in words if word not in self.stopwords and len(word) > 2]
        
        return words
    
    def find_collaborators(self, 
                          artist_id: str, 
                          chatbot_preference: str = None) -> List[Dict[str, Any]]:
        """
        Find suitable collaborators for an artist based on their profile and chatbot preference.
        
        Args:
            artist_id: ID of the artist seeking collaborators
            chatbot_preference: Optional custom chatbot preference text
            
        Returns:
            List: Ranked list of potential collaborators with compatibility scores
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
        
        # Enhance the requesting artist with tool and art type analysis
        analyzed_requesting_artist = self.extract_art_types(
            self.extract_tools_and_skills(requesting_artist)
        )
        
        # Analyze all available artists
        analyzed_available_artists = []
        for artist in self.artists:
            if artist["artistId"] != artist_id:
                analyzed_artist = self.extract_art_types(
                    self.extract_tools_and_skills(artist)
                )
                analyzed_available_artists.append(analyzed_artist)
        
        # Calculate compatibility scores
        collaborator_matches = []
        for candidate in analyzed_available_artists:
            compatibility_score, score_breakdown, insights = self._calculate_compatibility(
                analyzed_requesting_artist, 
                candidate, 
                preference_analysis
            )
            
            collaborator_matches.append({
                "artist": candidate,
                "compatibility_score": compatibility_score,
                "score_breakdown": score_breakdown,
                "insights": insights,
                "preference_text": chatbot_preference,
                "preference_analysis": preference_analysis
            })
        
        # Sort by compatibility score (highest first)
        collaborator_matches.sort(key=lambda x: x["compatibility_score"], reverse=True)
        
        return collaborator_matches
    
    def _calculate_compatibility(self, 
                               artist1: Dict[str, Any], 
                               artist2: Dict[str, Any], 
                               preference_analysis: Dict[str, Any]) -> Tuple[float, Dict[str, float], List[str]]:
        """
        Calculate compatibility score between two artists based on preference analysis.
        
        Args:
            artist1: First artist profile with analysis
            artist2: Second artist profile with analysis
            preference_analysis: Analyzed chatbot preference
            
        Returns:
            Tuple: Compatibility score (0-100), score breakdown, and list of insights
        """
        insights = []
        score_breakdown = {}
        
        # 1. Tool match (30%)
        requested_tools = set(preference_analysis.get("tools", []))
        artist2_tools = set(artist2.get("extracted_tools", {}).get("primary_tools", []))
        
        tool_match_score = 0
        if requested_tools:
            matching_tools = requested_tools.intersection(artist2_tools)
            tool_match_score = min(len(matching_tools) * 10, 30)
            
            if matching_tools:
                insights.append(f"Uses requested tools: {', '.join(matching_tools)}")
        else:
            # If no specific tools requested, give partial score for having digital tools
            tool_match_score = min(len(artist2_tools) * 5, 15)
        
        score_breakdown["tool_match"] = tool_match_score
        
        # 2. Art type match (30%)
        requested_art_types = set(preference_analysis.get("art_types", []))
        artist2_art_types = set(artist2.get("extracted_art_types", {}).get("primary_art_types", []))
        
        art_type_match_score = 0
        if requested_art_types:
            matching_art_types = requested_art_types.intersection(artist2_art_types)
            art_type_match_score = min(len(matching_art_types) * 10, 30)
            
            if matching_art_types:
                insights.append(f"Specializes in requested art types: {', '.join(matching_art_types)}")
        else:
            # If no specific art types requested, give partial score for having digital art types
            art_type_match_score = min(len(artist2_art_types) * 5, 15)
        
        score_breakdown["art_type_match"] = art_type_match_score
        
        # 3. Keyword relevance (20%)
        preference_keywords = set(preference_analysis.get("keywords", []))
        
        # Extract keywords from artist2's bio and gallery descriptions
        artist2_bio = artist2.get("basicInfo", {}).get("bio", "")
        artist2_bio_words = set(self._preprocess_text(artist2_bio))
        
        artist2_descriptions = []
        for artwork in artist2.get("completeGallery", []):
            artist2_descriptions.append(artwork.get("description", ""))
        
        artist2_desc_words = set()
        for desc in artist2_descriptions:
            artist2_desc_words.update(self._preprocess_text(desc))
        
        artist2_words = artist2_bio_words.union(artist2_desc_words)
        
        keyword_match_score = 0
        if preference_keywords:
            matching_keywords = preference_keywords.intersection(artist2_words)
            keyword_match_score = min(len(matching_keywords) * 5, 20)
            
            if matching_keywords:
                insights.append(f"Profile matches key terms: {', '.join(list(matching_keywords)[:3])}")
        
        score_breakdown["keyword_relevance"] = keyword_match_score
        
        # 4. Experience level (10%)
        experience_score = 0
        bio = artist2.get("basicInfo", {}).get("bio", "")
        
        # Look for years of experience
        experience_match = re.search(r'(\d+)\+?\s*years?', bio)
        if experience_match:
            years = int(experience_match.group(1))
            experience_score = min(years * 2, 10)
            insights.append(f"Has {years}+ years of experience")
        
        score_breakdown["experience"] = experience_score
        
        # 5. Portfolio quality (10%)
        portfolio_score = 0
        gallery = artist2.get("completeGallery", [])
        
        # More artworks = better portfolio
        portfolio_score += min(len(gallery) * 2, 5)
        
        # Look for indicators of quality in descriptions
        quality_indicators = ["featured", "award", "exhibition", "museum", "published", "viral", 
                             "1m", "million", "k+", "downloads", "views", "sold"]
        
        quality_count = 0
        for artwork in gallery:
            description = artwork.get("description", "").lower()
            for indicator in quality_indicators:
                if indicator in description:
                    quality_count += 1
                    break
        
        portfolio_score += min(quality_count, 5)
        score_breakdown["portfolio_quality"] = portfolio_score
        
        # Add location insight
        artist2_location = artist2.get("basicInfo", {}).get("location", "")
        if artist2_location:
            insights.append(f"Based in {artist2_location}")
        
        # Calculate total score
        total_score = sum(score_breakdown.values())
        
        return total_score, score_breakdown, insights


def run_example():
    """
    Run an example of the final digital artist collaboration matcher.
    """
    # Create the matcher
    matcher = FinalDigitalArtistMatcher()
    
    # Select a requesting artist
    artist_id = "ART001"  # Elena Vasquez
    
    # Custom chatbot preference
    chatbot_preference = "Looking for a 3D artist who specializes in architectural visualization using Blender and V-Ray. Need someone with experience in photorealistic rendering and environment design for a luxury real estate project. Must have at least 3 years of experience and a portfolio that demonstrates attention to lighting, materials, and spatial composition."
    
    # Find collaborators
    matches = matcher.find_collaborators(artist_id, chatbot_preference)
    
    # Get the requesting artist
    requesting_artist = next((a for a in matcher.artists if a["artistId"] == artist_id), None)
    
    # Analyze the preference
    preference_analysis = matcher.analyze_chatbot_preference(chatbot_preference)
    
    # Print the project requirements
    print("\n" + "="*80)
    print("PROJECT REQUIREMENTS:")
    print("="*80 + "\n")
    print(format_project_requirements(chatbot_preference, preference_analysis))
    
    # Print the requesting artist
    print("\n" + "="*80)
    print(f"REQUESTING ARTIST: {requesting_artist['basicInfo']['name']}")
    print(f"Bio: {requesting_artist['basicInfo']['bio']}")
    print(f"Location: {requesting_artist['basicInfo']['location']}")
    print("="*80 + "\n")
    
    # Print the top match with detailed formatting
    if matches:
        print("TOP MATCH WITH DETAILED ANALYSIS:\n")
        print(format_detailed_match(matches[0]))
    else:
        print("No matches found.")


if __name__ == "__main__":
    run_example()
