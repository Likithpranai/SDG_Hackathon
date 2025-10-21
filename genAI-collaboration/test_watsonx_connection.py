"""
Test script to verify watsonx API connection
"""

import requests
import json
from config import WATSON_API_KEY, WATSON_API_URL, WATSON_PROJECT_ID, WATSON_PLATFORM_URL

def test_watsonx_connection():
    """Test connection to watsonx API"""
    print("Testing watsonx API connection...")
    print(f"API Key (first 5 chars): {WATSON_API_KEY[:5]}...")
    print(f"API URL: {WATSON_API_URL}")
    print(f"Platform URL: {WATSON_PLATFORM_URL}")
    print(f"Project ID: {WATSON_PROJECT_ID}")
    
    # Test headers
    headers = {
        "Authorization": f"Bearer {WATSON_API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    # Simple test prompt
    prompt = "Hello, watsonx! Please respond with a simple greeting."
    
    # Test payload for watsonx.ai
    payload = {
        "model_id": "ibm/granite-13b-instruct-v2",
        "input": prompt,
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
        # Try to connect to the watsonx API
        print("\nAttempting to connect to watsonx.ai...")
        response = requests.post(
            f"{WATSON_PLATFORM_URL}/ml/v1-beta/generation/text",
            headers=headers,
            json=payload
        )
        
        print(f"Response status code: {response.status_code}")
        print(f"Response headers: {response.headers}")
        
        if response.status_code == 200:
            result = response.json()
            print("\nSuccess! Response from watsonx:")
            print(json.dumps(result, indent=2))
        else:
            print("\nError response content:")
            print(response.text)
            
            # Try an alternative endpoint format
            print("\nTrying alternative endpoint format...")
            alt_url = f"{WATSON_API_URL}/v1/watson-foundation/generate"
            print(f"Alternative URL: {alt_url}")
            
            alt_response = requests.post(
                alt_url,
                headers=headers,
                json=payload
            )
            
            print(f"Alternative response status code: {alt_response.status_code}")
            if alt_response.status_code == 200:
                alt_result = alt_response.json()
                print("\nSuccess with alternative endpoint! Response:")
                print(json.dumps(alt_result, indent=2))
            else:
                print("\nAlternative endpoint error response:")
                print(alt_response.text)
    
    except Exception as e:
        print(f"Exception occurred: {e}")
    
    # Try IBM Watson NLU service
    try:
        print("\nTesting IBM Watson Natural Language Understanding API...")
        nlu_url = f"{WATSON_API_URL}/natural-language-understanding/api/v1/analyze?version=2022-04-07"
        
        nlu_payload = {
            "text": "IBM Watson is an AI platform for business.",
            "features": {
                "entities": {
                    "limit": 3
                },
                "keywords": {
                    "limit": 3
                }
            }
        }
        
        nlu_response = requests.post(
            nlu_url,
            headers=headers,
            json=nlu_payload
        )
        
        print(f"NLU response status code: {nlu_response.status_code}")
        
        if nlu_response.status_code == 200:
            nlu_result = nlu_response.json()
            print("\nSuccess! NLU Response:")
            print(json.dumps(nlu_result, indent=2))
        else:
            print("\nNLU error response:")
            print(nlu_response.text)
    
    except Exception as e:
        print(f"NLU Exception occurred: {e}")
    
    # Print IBM Cloud documentation reference
    print("\nIBM Cloud Documentation References:")
    print("- Watson Natural Language Understanding: https://cloud.ibm.com/apidocs/natural-language-understanding")
    print("- watsonx.ai: https://cloud.ibm.com/apidocs/watsonx-ai")
    print("- IBM Cloud API Authentication: https://cloud.ibm.com/docs/account?topic=account-iamtoken_from_apikey")

if __name__ == "__main__":
    test_watsonx_connection()
