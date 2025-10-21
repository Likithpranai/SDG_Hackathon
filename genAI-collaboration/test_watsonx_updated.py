"""
Updated test script for watsonx API using correct endpoints
"""

import requests
import json
from config_updated import WATSON_API_KEY, WATSONX_URL, WATSONX_INSTANCE_ID, WATSONX_VERSION, WATSON_PROJECT_ID

def test_watsonx_connection():
    """Test connection to watsonx API with updated endpoints"""
    print("Testing watsonx API connection with updated endpoints...")
    print(f"API Key (first 5 chars): {WATSON_API_KEY[:5]}...")
    print(f"watsonx URL: {WATSONX_URL}")
    print(f"Instance ID: {WATSONX_INSTANCE_ID}")
    print(f"Project ID: {WATSON_PROJECT_ID}")
    
    # Set up headers with IAM token
    headers = {
        "Authorization": f"Bearer {WATSON_API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-IBM-Client-Id": WATSONX_INSTANCE_ID
    }
    
    # Simple test prompt
    prompt = "Hello, watsonx! Please respond with a simple greeting."
    
    # Test payload for watsonx
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
        
        # Try the first endpoint format
        url = f"{WATSONX_URL}?version={WATSONX_VERSION}"
        print(f"URL: {url}")
        
        response = requests.post(
            url,
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
            
            # Try alternative endpoint format
            print("\nTrying alternative endpoint format...")
            alt_url = "https://us-south.ml.cloud.ibm.com/ml/v1-beta/generation/text"
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
                
                # Try one more endpoint format
                print("\nTrying one more endpoint format...")
                final_url = "https://us-south.ml.cloud.ibm.com/v1/watson-foundation/foundation-models/generate"
                print(f"Final URL attempt: {final_url}")
                
                final_payload = {
                    "model_id": "ibm/granite-13b-instruct-v2",
                    "inputs": [prompt],
                    "parameters": {
                        "max_new_tokens": 50,
                        "min_new_tokens": 10,
                        "stop_sequences": [],
                        "repetition_penalty": 1.0
                    }
                }
                
                final_response = requests.post(
                    final_url,
                    headers=headers,
                    json=final_payload
                )
                
                print(f"Final response status code: {final_response.status_code}")
                if final_response.status_code == 200:
                    final_result = final_response.json()
                    print("\nSuccess with final endpoint! Response:")
                    print(json.dumps(final_result, indent=2))
                else:
                    print("\nFinal endpoint error response:")
                    print(final_response.text)
    
    except Exception as e:
        print(f"Exception occurred: {e}")
    
    # Print IBM Cloud documentation reference
    print("\nIBM Cloud Documentation References:")
    print("- watsonx.ai API: https://cloud.ibm.com/apidocs/watsonx-ai")
    print("- IBM Cloud API Authentication: https://cloud.ibm.com/docs/account?topic=account-iamtoken_from_apikey")
    print("- watsonx Foundation Models: https://cloud.ibm.com/docs/watsonx?topic=watsonx-fm-models")

if __name__ == "__main__":
    test_watsonx_connection()
