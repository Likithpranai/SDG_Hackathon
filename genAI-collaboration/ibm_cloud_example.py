"""
IBM Cloud example script based on official documentation
"""

import requests
import json
from config_updated import WATSON_API_KEY, WATSON_PROJECT_ID

def get_iam_token(api_key):
    """Get an IAM token from IBM Cloud"""
    print("Getting IAM token...")
    url = "https://iam.cloud.ibm.com/identity/token"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
    }
    data = {
        "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
        "apikey": api_key
    }
    
    response = requests.post(url, headers=headers, data=data)
    
    if response.status_code == 200:
        result = response.json()
        return result.get("access_token")
    else:
        print(f"Error getting IAM token: {response.status_code}")
        print(response.text)
        return None

def test_foundation_models():
    """Test IBM Foundation Models API"""
    token = get_iam_token(WATSON_API_KEY)
    if not token:
        print("Failed to get IAM token")
        return
    
    print("\nTesting IBM Foundation Models API...")
    
    # Example 1: Using the watsonx foundation models API
    url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    # Try different model IDs from IBM documentation
    model_ids = [
        "ibm/granite-13b-chat-v2",
        "ibm/granite-13b-instruct-v2",
        "ibm/mpt-7b-instruct2",
        "ibm/granite-13b-instruct-v1",
        "ibm/mistralai/mixtral-8x7b-instruct-v01"
    ]
    
    for model_id in model_ids:
        print(f"\nTrying model: {model_id}")
        
        payload = {
            "model_id": model_id,
            "input": "Hello, IBM watsonx! Please provide a brief greeting.",
            "parameters": {
                "decoding_method": "greedy",
                "max_new_tokens": 50,
                "min_new_tokens": 10,
                "stop_sequences": [],
                "repetition_penalty": 1.0
            },
            "project_id": WATSON_PROJECT_ID
        }
        
        try:
            response = requests.post(url, headers=headers, json=payload)
            print(f"Response status code: {response.status_code}")
            
            if response.status_code == 200:
                result = response.json()
                print("Success! Response:")
                print(json.dumps(result, indent=2))
                
                # If successful, try artist preference analysis
                if "results" in result:
                    print("\nTrying artist preference analysis with this model...")
                    analyze_artist_preference(token, model_id)
                    return  # Exit after finding a working model
            else:
                print(f"Error response: {response.text}")
        
        except Exception as e:
            print(f"Exception: {e}")

def analyze_artist_preference(token, model_id):
    """Analyze artist preference using a working model"""
    url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    preference_text = "Looking for a 3D artist who specializes in architectural visualization using Blender. Need someone with experience in photorealistic rendering and environment design for a luxury real estate project."
    
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
    
    payload = {
        "model_id": model_id,
        "input": prompt,
        "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 500,
            "min_new_tokens": 50,
            "stop_sequences": [],
            "repetition_penalty": 1.0
        },
        "project_id": WATSON_PROJECT_ID
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        print(f"Response status code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("Success! Artist preference analysis:")
            print(json.dumps(result, indent=2))
            
            # If successful, try compatibility score
            if "results" in result:
                print("\nTrying compatibility score with this model...")
                generate_compatibility_score(token, model_id)
        else:
            print(f"Error response: {response.text}")
    
    except Exception as e:
        print(f"Exception: {e}")

def generate_compatibility_score(token, model_id):
    """Generate compatibility score between two artists"""
    url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    artist1 = {
        "name": "Elena Vasquez",
        "bio": "Digital abstract painter using Procreate & Photoshop. 5+ years experience."
    }
    
    artist2 = {
        "name": "Aisha Thompson",
        "bio": "Digital 3D sculptor - Blender, ZBrush, Substance Painter. 6+ years.",
        "recent_work": "- Wasted Earth (Blender + ZBrush): Polar bear model with 2M polygons. AR filter for Climate Week NYC.\n- Rising Waters (3D Scan + Blender): Photogrammetry house model. Brooklyn Museum VR tour.\n- Carbon Footprint (Substance Painter): Tire textures hand-painted. UN Climate Summit metaverse installation."
    }
    
    preference_text = "Looking for a 3D artist who specializes in architectural visualization using Blender. Need someone with experience in photorealistic rendering and environment design for a luxury real estate project."
    
    prompt = f"""
    Evaluate the compatibility between two digital artists for collaboration.
    
    Artist 1 (Requesting Collaboration):
    Name: {artist1["name"]}
    Bio: {artist1["bio"]}
    
    Artist 2 (Potential Collaborator):
    Name: {artist2["name"]}
    Bio: {artist2["bio"]}
    
    Recent Work by {artist2["name"]}:
    {artist2["recent_work"]}
    
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
    
    payload = {
        "model_id": model_id,
        "input": prompt,
        "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 500,
            "min_new_tokens": 50,
            "stop_sequences": [],
            "repetition_penalty": 1.0
        },
        "project_id": WATSON_PROJECT_ID
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        print(f"Response status code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("Success! Compatibility score:")
            print(json.dumps(result, indent=2))
        else:
            print(f"Error response: {response.text}")
    
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    test_foundation_models()
