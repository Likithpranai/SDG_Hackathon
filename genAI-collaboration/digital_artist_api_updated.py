"""
API for Digital Artist Collaboration Matcher
"""

from flask import Flask, request, jsonify, render_template
from digital_artist_matcher import DigitalArtistMatcher
from digital_artist_data import DIGITAL_ARTISTS

app = Flask(__name__)
matcher = DigitalArtistMatcher()

@app.route('/')
def index():
    """Render the main page"""
    return render_template('digital_artist_index.html')

@app.route('/api/artists', methods=['GET'])
def get_artists():
    """Get all artists"""
    # Return simplified artist data (without analysis)
    simplified_artists = []
    for artist in DIGITAL_ARTISTS:
        simplified_artists.append({
            "artistId": artist["artistId"],
            "basicInfo": artist["basicInfo"],
            "galleryCount": len(artist["completeGallery"])
        })
    
    return jsonify(simplified_artists)

@app.route('/api/artists/<artist_id>', methods=['GET'])
def get_artist(artist_id):
    """Get a specific artist by ID"""
    artist = next((a for a in DIGITAL_ARTISTS if a["artistId"] == artist_id), None)
    if not artist:
        return jsonify({"error": "Artist not found"}), 404
    
    # Analyze the artist's tools and art types
    analyzed_artist = matcher.extract_art_types(
        matcher.extract_tools_and_skills(artist)
    )
    
    return jsonify(analyzed_artist)

@app.route('/api/match', methods=['POST'])
def find_matches():
    """Find matches based on artist ID and chatbot preference"""
    if not request.json:
        return jsonify({"error": "No data provided"}), 400
    
    artist_id = request.json.get('artistId')
    chatbot_preference = request.json.get('chatbotPreference')
    
    if not artist_id:
        return jsonify({"error": "Artist ID is required"}), 400
    
    # Find the requesting artist
    requesting_artist = next((a for a in DIGITAL_ARTISTS if a["artistId"] == artist_id), None)
    if not requesting_artist:
        return jsonify({"error": "Artist not found"}), 404
    
    # If no chatbot preference provided, use the one from the artist profile
    if not chatbot_preference:
        chatbot_preference = requesting_artist.get("chatbotPreferences", {}).get("preferenceText", "")
    
    # Find matches
    matches = matcher.find_collaborators(artist_id, chatbot_preference)
    
    # Return the matches
    return jsonify({
        "requestingArtist": requesting_artist,
        "chatbotPreference": chatbot_preference,
        "matches": matches
    })

@app.route('/api/analyze-preference', methods=['POST'])
def analyze_preference():
    """Analyze a chatbot preference"""
    if not request.json:
        return jsonify({"error": "No data provided"}), 400
    
    preference_text = request.json.get('preferenceText')
    
    if not preference_text:
        return jsonify({"error": "Preference text is required"}), 400
    
    # Analyze the preference
    analysis = matcher.analyze_chatbot_preference(preference_text)
    
    return jsonify(analysis)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
