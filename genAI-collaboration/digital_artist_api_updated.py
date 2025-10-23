"""
API for Digital Artist Collaboration Matcher
"""

from flask import Flask, request, jsonify, render_template, url_for
import os
import uuid
from werkzeug.utils import secure_filename
from digital_artist_matcher import DigitalArtistMatcher
from digital_artist_data import DIGITAL_ARTISTS

app = Flask(__name__)
matcher = DigitalArtistMatcher()

# Configure upload settings
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Create upload directory if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload size

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

def allowed_file(filename):
    """Check if file has an allowed extension"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload-artwork', methods=['POST'])
def upload_artwork():
    """Upload a new artwork for an artist"""
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    artist_id = request.form.get('artistId')
    title = request.form.get('title')
    year = request.form.get('year')
    medium = request.form.get('medium')
    description = request.form.get('description')
    
    if not artist_id:
        return jsonify({"error": "Artist ID is required"}), 400
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if not (title and year and medium):
        return jsonify({"error": "Title, year, and medium are required"}), 400
    
    # Find the artist
    artist = next((a for a in DIGITAL_ARTISTS if a["artistId"] == artist_id), None)
    if not artist:
        return jsonify({"error": "Artist not found"}), 404
    
    if file and allowed_file(file.filename):
        # Generate a unique filename
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        
        # Save the file
        file.save(file_path)
        
        # Create a URL for the file
        file_url = url_for('static', filename=f'uploads/{unique_filename}', _external=True)
        
        # Create a new artwork entry
        new_artwork = {
            "id": f"IMG{len(artist['completeGallery']) + 1:03d}",
            "title": title,
            "year": int(year) if year.isdigit() else year,
            "medium": medium,
            "url": file_url,
            "description": description or ""
        }
        
        # Add to the artist's gallery
        artist["completeGallery"].append(new_artwork)
        
        return jsonify({
            "success": True,
            "message": "Artwork uploaded successfully",
            "artwork": new_artwork
        })
    
    return jsonify({"error": "File type not allowed"}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
