"""
watsonx integration with proper IAM token authentication
"""

import requests
import json
import time
from config_updated import WATSON_API_KEY, WATSONX_URL, WATSONX_INSTANCE_ID, WATSONX_VERSION, WATSON_PROJECT_ID

class WatsonXIntegration:
    """Class to handle watsonx API integration with proper authentication"""
    
    def __init__(self):
        """Initialize with API credentials"""
        self.api_key = WATSON_API_KEY
        self.watsonx_url = WATSONX_URL
        self.instance_id = WATSONX_INSTANCE_ID
        self.version = WATSONX_VERSION
        self.project_id = WATSON_PROJECT_ID
        self.token = None
        self.token_expiry = 0
    
    def get_iam_token(self):
        """Get an IAM token from IBM Cloud"""
        if self.token and time.time() < self.token_expiry:
            return self.token
            
        print("Getting new IAM token...")
        url = "https://iam.cloud.ibm.com/identity/token"
        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        }
        data = {
            "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
            "apikey": self.api_key
        }
        
        response = requests.post(url, headers=headers, data=data)
        
        if response.status_code == 200:
            result = response.json()
            self.token = result.get("access_token")
            # Set token expiry to 10 minutes before actual expiry
            expires_in = result.get("expires_in", 3600)
            self.token_expiry = time.time() + expires_in - 600
            return self.token
        else:
            print(f"Error getting IAM token: {response.status_code}")
            print(response.text)
            return None
    
    def generate_text(self, prompt, model_id="ibm/granite-13b-instruct-v2", max_tokens=100):
        """Generate text using watsonx API"""
        token = self.get_iam_token()
        if not token:
            return {"error": "Failed to get IAM token"}
        
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        
        # Add instance ID if provided
        if self.instance_id:
            headers["X-IBM-Client-Id"] = self.instance_id
        
        payload = {
            "model_id": model_id,
            "input": prompt,
            "parameters": {
                "decoding_method": "greedy",
                "max_new_tokens": max_tokens,
                "min_new_tokens": 10,
                "stop_sequences": [],
                "repetition_penalty": 1.0
            },
            "project_id": self.project_id
        }
        
        # Try both endpoint formats
        endpoints = [
            f"{self.watsonx_url}?version={self.version}",
            "https://us-south.ml.cloud.ibm.com/ml/v1-beta/generation/text"
        ]
        
        for endpoint in endpoints:
            print(f"Trying endpoint: {endpoint}")
            try:
                response = requests.post(
                    endpoint,
                    headers=headers,
                    json=payload
                )
                
                print(f"Response status code: {response.status_code}")
                
                if response.status_code == 200:
                    return response.json()
                else:
                    print(f"Error response: {response.text}")
                    # Only continue to next endpoint if this one failed
                    continue
                    
            except Exception as e:
                print(f"Exception with endpoint {endpoint}: {e}")
        
        return {"error": "All endpoints failed"}
    
    def analyze_artist_preference(self, preference_text):
        """Analyze artist preference using watsonx"""
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
        
        return self.generate_text(prompt, max_tokens=500)
    
    def generate_compatibility_score(self, artist1_info, artist2_info, preference_text):
        """Generate compatibility score between two artists"""
        prompt = f"""
        Evaluate the compatibility between two digital artists for collaboration.
        
        Artist 1 (Requesting Collaboration):
        Name: {artist1_info.get('name', '')}
        Bio: {artist1_info.get('bio', '')}
        
        Artist 2 (Potential Collaborator):
        Name: {artist2_info.get('name', '')}
        Bio: {artist2_info.get('bio', '')}
        
        Recent Work by {artist2_info.get('name', '')}:
        {artist2_info.get('recent_work', '')}
        
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
        
        return self.generate_text(prompt, max_tokens=500)


def test_watsonx_integration():
    """Test the watsonx integration"""
    watsonx = WatsonXIntegration()
    
    # Test simple text generation
    print("\n" + "="*80)
    print("TESTING SIMPLE TEXT GENERATION")
    print("="*80)
    
    result = watsonx.generate_text("Hello, watsonx! Please respond with a simple greeting.", max_tokens=50)
    print(json.dumps(result, indent=2))
    
    # Test artist preference analysis
    print("\n" + "="*80)
    print("TESTING ARTIST PREFERENCE ANALYSIS")
    print("="*80)
    
    preference = "Looking for a 3D artist who specializes in architectural visualization using Blender. Need someone with experience in photorealistic rendering and environment design for a luxury real estate project."
    
    analysis_result = watsonx.analyze_artist_preference(preference)
    print(json.dumps(analysis_result, indent=2))
    
    # Test compatibility score generation
    print("\n" + "="*80)
    print("TESTING COMPATIBILITY SCORE GENERATION")
    print("="*80)
    
    artist1 = {
        "name": "Elena Vasquez",
        "bio": "Digital abstract painter using Procreate & Photoshop. 5+ years experience."
    }
    
    artist2 = {
        "name": "Aisha Thompson",
        "bio": "Digital 3D sculptor - Blender, ZBrush, Substance Painter. 6+ years.",
        "recent_work": "- Wasted Earth (Blender + ZBrush): Polar bear model with 2M polygons. AR filter for Climate Week NYC.\n- Rising Waters (3D Scan + Blender): Photogrammetry house model. Brooklyn Museum VR tour.\n- Carbon Footprint (Substance Painter): Tire textures hand-painted. UN Climate Summit metaverse installation."
    }
    
    compatibility_result = watsonx.generate_compatibility_score(artist1, artist2, preference)
    print(json.dumps(compatibility_result, indent=2))


if __name__ == "__main__":
    test_watsonx_integration()
