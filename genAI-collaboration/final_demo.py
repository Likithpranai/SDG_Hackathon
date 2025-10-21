"""
Final demonstration of the Digital Artist Collaboration Matcher
"""

from final_digital_artist_matcher import FinalDigitalArtistMatcher
from detailed_match_formatter import format_detailed_match, format_project_requirements

def run_final_demo():
    """Run a comprehensive demonstration of the Digital Artist Collaboration Matcher"""
    # Create the matcher
    matcher = FinalDigitalArtistMatcher()
    
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
        },
        {
            "title": "AR/VR Museum Experience",
            "artist_id": "ART005",  # Sofia Ramirez (Digital photographer)
            "preference": "Looking for digital artists who can create interactive AR exhibits for a museum installation. Need experience with Unity or similar platforms and a strong portfolio of cultural/historical work."
        },
        {
            "title": "Music Video Animation",
            "artist_id": "ART006",  # Marco Rossi (Digital music visualizer)
            "preference": "Need a 2D animator who can create a music video with a surreal, dreamlike aesthetic. Looking for someone experienced in After Effects and character animation who can work with audio-reactive elements."
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
            for j, match in enumerate(matches[:2], 1):
                print(f"\nTOP MATCH #{j}:\n")
                print(format_detailed_match(match))
                if j < len(matches[:2]):
                    print("\n" + "-"*80)
        else:
            print("\nNo matches found.")

if __name__ == "__main__":
    run_final_demo()
