"""
API for the Artist Collaboration Matcher

This module provides API endpoints to interact with the Artist Collaboration Matcher.
"""

from flask import Flask, request, jsonify
from artist_collaboration_matcher import ArtistCollaborationMatcher

app = Flask(__name__)
matcher = ArtistCollaborationMatcher()

@app.route('/api/analyze-profile', methods=['POST'])
def analyze_profile():
    """Analyze an artist profile."""
    if not request.json:
        return jsonify({"error": "No profile provided"}), 400
    
    artist_profile = request.json
    analyzed_profile = matcher.analyze_artist_profile(artist_profile)
    
    return jsonify(analyzed_profile)

@app.route('/api/find-collaborators', methods=['POST'])
def find_collaborators():
    """Find suitable collaborators for an artist."""
    if not request.json:
        return jsonify({"error": "Invalid request"}), 400
    
    data = request.json
    artist_profile = data.get('artist_profile')
    project_description = data.get('project_description')
    available_artists = data.get('available_artists', [])
    
    if not artist_profile or not project_description or not available_artists:
        return jsonify({"error": "Missing required parameters"}), 400
    
    matches = matcher.find_collaborators(artist_profile, project_description, available_artists)
    
    return jsonify({
        "matches": matches,
        "count": len(matches)
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
