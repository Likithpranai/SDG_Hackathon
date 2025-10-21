"""
Test the digital artist matcher with detailed output formatting
"""

from digital_artist_matcher import DigitalArtistMatcher
from detailed_match_formatter import format_detailed_match, format_project_requirements

def test_detailed_matcher():
    """Test the matcher with detailed output formatting"""
    matcher = DigitalArtistMatcher()
    
    # Define test preferences
    test_preferences = [
        "Looking for 3D artists who specialize in architectural visualization using Blender and V-Ray. Need someone with experience in photorealistic rendering and environment design for a luxury real estate project.",
        "Need a digital illustrator with strong character design skills for a children's book series. Must be proficient in Procreate and have experience with watercolor-style digital art. The theme involves magical animals in forest settings."
    ]
    
    # Test each preference with different artists
    test_artists = ["ART003", "ART007"]  # Aisha Thompson (3D sculptor), Kim Ji-yoon (2D Animator)
    artist_names = {
        "ART003": "Aisha Thompson (3D Sculptor)",
        "ART007": "Kim Ji-yoon (2D Animator)"
    }
    
    for artist_id in test_artists:
        for preference in test_preferences:
            print("\n" + "="*100)
            print(f"REQUESTING ARTIST: {artist_names[artist_id]}")
            print("="*100)
            
            # Analyze the preference
            preference_analysis = matcher.analyze_chatbot_preference(preference)
            
            # Print detailed project requirements
            print(format_project_requirements(preference, preference_analysis))
            print("\n" + "-"*100 + "\n")
            
            # Find collaborators
            matches = matcher.find_collaborators(artist_id, preference)
            
            # Print the top match with detailed formatting
            if matches:
                print("TOP MATCH WITH DETAILED ANALYSIS:\n")
                print(format_detailed_match(matches[0]))
            else:
                print("No matches found.")
            
            print("\n")

if __name__ == "__main__":
    test_detailed_matcher()
