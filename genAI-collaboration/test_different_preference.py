"""
Test the digital artist matcher with different chatbot preferences
"""

from digital_artist_matcher import DigitalArtistMatcher, format_match_output

def test_with_different_preferences():
    """Test the matcher with different chatbot preferences"""
    matcher = DigitalArtistMatcher()
    
    # Define test preferences
    test_preferences = [
        "Need photographers who edit cultural photos for books. Lightroom experience required.",
        "Looking for 2D animators for a mobile game with Korean mythology themes. ToonBoom preferred.",
        "Need digital artists who can create AR museum exhibits. Unity and Photoshop skills required."
    ]
    
    # Test each preference with the same artist
    artist_id = "ART001"  # Elena Vasquez
    
    for i, preference in enumerate(test_preferences, 1):
        print("\n" + "="*80)
        print(f"TEST {i}: {preference}")
        print("="*80 + "\n")
        
        # Find collaborators
        matches = matcher.find_collaborators(artist_id, preference)
        
        # Print the top match
        if matches:
            print("TOP MATCH:\n")
            print(format_match_output(matches[0]))
        else:
            print("No matches found.")
        
        print("\n")

if __name__ == "__main__":
    test_with_different_preferences()
