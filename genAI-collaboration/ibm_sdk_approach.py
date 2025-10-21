"""
IBM Cloud SDK approach for watsonx integration
"""

import os
import json
import requests
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from config_updated import WATSON_API_KEY, WATSON_PROJECT_ID

class IBMWatsonXIntegration:
    """Class to handle IBM watsonx integration using the official SDK approach"""
    
    def __init__(self):
        """Initialize with API credentials"""
        self.api_key = WATSON_API_KEY
        self.project_id = WATSON_PROJECT_ID
        self.authenticator = IAMAuthenticator(self.api_key)
        self.token = None
    
    def get_token(self):
        """Get IAM token"""
        if not self.token:
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
            else:
                print(f"Error getting IAM token: {response.status_code}")
                print(response.text)
        
        return self.token
    
    def list_instances(self):
        """List watsonx instances"""
        token = self.get_token()
        if not token:
            return {"error": "Failed to get token"}
        
        url = "https://api.dataplatform.cloud.ibm.com/v2/instances"
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        
        try:
            response = requests.get(url, headers=headers)
            print(f"List instances response code: {response.status_code}")
            
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Error response: {response.text}")
                return {"error": response.text}
        except Exception as e:
            print(f"Exception: {e}")
            return {"error": str(e)}
    
    def list_projects(self):
        """List watsonx projects"""
        token = self.get_token()
        if not token:
            return {"error": "Failed to get token"}
        
        url = "https://api.dataplatform.cloud.ibm.com/v2/projects"
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        
        try:
            response = requests.get(url, headers=headers)
            print(f"List projects response code: {response.status_code}")
            
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Error response: {response.text}")
                return {"error": response.text}
        except Exception as e:
            print(f"Exception: {e}")
            return {"error": str(e)}
    
    def get_project_details(self):
        """Get details of the specific project"""
        token = self.get_token()
        if not token:
            return {"error": "Failed to get token"}
        
        url = f"https://api.dataplatform.cloud.ibm.com/v2/projects/{self.project_id}"
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        
        try:
            response = requests.get(url, headers=headers)
            print(f"Project details response code: {response.status_code}")
            
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Error response: {response.text}")
                return {"error": response.text}
        except Exception as e:
            print(f"Exception: {e}")
            return {"error": str(e)}
    
    def list_available_models(self):
        """List available models in watsonx"""
        token = self.get_token()
        if not token:
            return {"error": "Failed to get token"}
        
        # Try different endpoints to find available models
        endpoints = [
            "https://api.dataplatform.cloud.ibm.com/v2/wx/models",
            "https://us-south.ml.cloud.ibm.com/ml/v1/models?version=2023-05-29",
            "https://us-south.ml.cloud.ibm.com/ml/v1-beta/models?version=2023-05-29"
        ]
        
        results = {}
        
        for endpoint in endpoints:
            headers = {
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            
            try:
                print(f"Trying to list models from: {endpoint}")
                response = requests.get(endpoint, headers=headers)
                print(f"Response status code: {response.status_code}")
                
                if response.status_code == 200:
                    results[endpoint] = response.json()
                else:
                    print(f"Error response: {response.text}")
                    results[endpoint] = {"error": response.text}
            except Exception as e:
                print(f"Exception with endpoint {endpoint}: {e}")
                results[endpoint] = {"error": str(e)}
        
        return results
    
    def try_direct_api_call(self):
        """Try direct API call to watsonx.ai"""
        token = self.get_token()
        if not token:
            return {"error": "Failed to get token"}
        
        # Try different endpoints and models
        endpoints = [
            "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29",
            "https://us-south.ml.cloud.ibm.com/ml/v1-beta/generation/text?version=2023-05-29",
            "https://api.dataplatform.cloud.ibm.com/v2/wx/text-generation?version=2023-05-29"
        ]
        
        models = [
            "google/flan-ul2",
            "ibm/granite-13b-chat-v2",
            "ibm/mpt-7b-instruct2",
            "meta-llama/llama-2-70b-chat"
        ]
        
        results = {}
        
        for endpoint in endpoints:
            for model in models:
                model_key = f"{endpoint}_{model}"
                headers = {
                    "Authorization": f"Bearer {token}",
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
                
                payload = {
                    "model_id": model,
                    "input": "Hello, IBM watsonx! Please provide a brief greeting.",
                    "parameters": {
                        "decoding_method": "greedy",
                        "max_new_tokens": 50,
                        "min_new_tokens": 10,
                        "stop_sequences": [],
                        "repetition_penalty": 1.0
                    },
                    "project_id": self.project_id
                }
                
                try:
                    print(f"Trying endpoint: {endpoint} with model: {model}")
                    response = requests.post(endpoint, headers=headers, json=payload)
                    print(f"Response status code: {response.status_code}")
                    
                    if response.status_code == 200:
                        results[model_key] = response.json()
                    else:
                        print(f"Error response: {response.text}")
                        results[model_key] = {"error": response.text}
                except Exception as e:
                    print(f"Exception with endpoint {endpoint} and model {model}: {e}")
                    results[model_key] = {"error": str(e)}
        
        return results


def run_ibm_sdk_test():
    """Run tests using IBM SDK approach"""
    integration = IBMWatsonXIntegration()
    
    # Test token generation
    print("\n" + "="*80)
    print("TESTING TOKEN GENERATION")
    print("="*80)
    token = integration.get_token()
    if token:
        print(f"Token successfully generated: {token[:10]}...")
    else:
        print("Failed to generate token")
    
    # List instances
    print("\n" + "="*80)
    print("LISTING INSTANCES")
    print("="*80)
    instances = integration.list_instances()
    print(json.dumps(instances, indent=2))
    
    # List projects
    print("\n" + "="*80)
    print("LISTING PROJECTS")
    print("="*80)
    projects = integration.list_projects()
    print(json.dumps(projects, indent=2))
    
    # Get project details
    print("\n" + "="*80)
    print("GETTING PROJECT DETAILS")
    print("="*80)
    project_details = integration.get_project_details()
    print(json.dumps(project_details, indent=2))
    
    # List available models
    print("\n" + "="*80)
    print("LISTING AVAILABLE MODELS")
    print("="*80)
    models = integration.list_available_models()
    print(json.dumps(models, indent=2))
    
    # Try direct API call
    print("\n" + "="*80)
    print("TRYING DIRECT API CALL")
    print("="*80)
    api_results = integration.try_direct_api_call()
    print(json.dumps(api_results, indent=2))


if __name__ == "__main__":
    run_ibm_sdk_test()
