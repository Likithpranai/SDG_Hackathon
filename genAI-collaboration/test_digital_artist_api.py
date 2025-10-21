"""
Test script for the Digital Artist API
"""

import requests
import json

def test_api():
    """Test the Digital Artist API"""
    base_url = "http://localhost:8080/api"
    
    # Test 1: Get all artists
    print("\n=== Test 1: Get all artists ===")
    response = requests.get(f"{base_url}/artists")
    if response.status_code == 200:
        artists = response.json()
        print(f"Found {len(artists)} artists")
        for artist in artists[:2]:  # Show first 2 artists
            print(f"- {artist['basicInfo']['name']} ({artist['artistId']})")
    else:
        print(f"Error: {response.status_code}")
    
    # Test 2: Get a specific artist
    print("\n=== Test 2: Get a specific artist ===")
    artist_id = "ART001"
    response = requests.get(f"{base_url}/artists/{artist_id}")
    if response.status_code == 200:
        artist = response.json()
        print(f"Artist: {artist['basicInfo']['name']}")
        print(f"Bio: {artist['basicInfo']['bio']}")
        print(f"Primary Tools: {', '.join(artist['extracted_tools']['primary_tools'])}")
        print(f"Primary Art Types: {', '.join(artist['extracted_art_types']['primary_art_types'])}")
    else:
        print(f"Error: {response.status_code}")
    
    # Test 3: Find matches with default preference
    print("\n=== Test 3: Find matches with default preference ===")
    data = {
        "artistId": "ART001"
    }
    response = requests.post(f"{base_url}/match", json=data)
    if response.status_code == 200:
        result = response.json()
        print(f"Requesting Artist: {result['requestingArtist']['basicInfo']['name']}")
        print(f"Preference: {result['chatbotPreference']}")
        print("\nTop 3 Matches:")
        for i, match in enumerate(result['matches'][:3], 1):
            print(f"{i}. {match['artist']['basicInfo']['name']} - Score: {match['compatibility_score']}")
    else:
        print(f"Error: {response.status_code}")
    
    # Test 4: Find matches with custom preference
    print("\n=== Test 4: Find matches with custom preference ===")
    data = {
        "artistId": "ART001",
        "chatbotPreference": "Looking for 3D artists who work in Blender for an NFT project. Need someone with AR/VR experience."
    }
    response = requests.post(f"{base_url}/match", json=data)
    if response.status_code == 200:
        result = response.json()
        print(f"Requesting Artist: {result['requestingArtist']['basicInfo']['name']}")
        print(f"Custom Preference: {result['chatbotPreference']}")
        print("\nTop 3 Matches:")
        for i, match in enumerate(result['matches'][:3], 1):
            print(f"{i}. {match['artist']['basicInfo']['name']} - Score: {match['compatibility_score']}")
            print(f"   Primary Tools: {', '.join(match['artist'].get('extracted_tools', {}).get('primary_tools', []))}")
            print(f"   Primary Art Types: {', '.join(match['artist'].get('extracted_art_types', {}).get('primary_art_types', []))}")
            print(f"   Insights: {', '.join(match['insights'][:2])}")
    else:
        print(f"Error: {response.status_code}")
    
    # Test 5: Analyze a preference
    print("\n=== Test 5: Analyze a preference ===")
    data = {
        "preferenceText": "Need digital artists who can create animated NFTs with After Effects and Blender. AR/VR experience is a plus."
    }
    response = requests.post(f"{base_url}/analyze-preference", json=data)
    if response.status_code == 200:
        analysis = response.json()
        print(f"Tools: {', '.join(analysis['tools'])}")
        print(f"Art Types: {', '.join(analysis['art_types'])}")
        print(f"Keywords: {', '.join(analysis['keywords'][:5])}")
    else:
        print(f"Error: {response.status_code}")

if __name__ == "__main__":
    test_api()
