import { NextResponse } from 'next/server';

// Get API key from environment variables
const GROK_API_KEY = process.env.GROK_API_KEY || "";
// Try the API key without the prefix
const GROK_API_KEY_NO_PREFIX = GROK_API_KEY.replace('xai-', '');

// Check if API key is available
if (!GROK_API_KEY) {
  console.warn("Warning: GROK_API_KEY environment variable is not set. API calls will fail.");
}
// Get API URL from environment variables
const GROK_API_URL = process.env.NEXT_PUBLIC_GROK_API_URL || "https://api.x.ai/v1/chat/completions";
const GROK_API_URL_ALT = "https://api.groq.com/openai/v1/chat/completions"; // Alternative endpoint

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { preferences } = await request.json();
    
    if (!preferences) {
      return NextResponse.json(
        { error: "Preferences are required" },
        { status: 400 }
      );
    }
    
    console.log("🔍 API route: Starting Grok API call...");
    
    // Extract keywords from preferences for portfolio highlights
    const keywords = extractKeywords(preferences);
    console.log("📝 API route: Extracted keywords:", keywords);
    
    // Create a system prompt that instructs Grok to respond with artist recommendations
    const system = `You are an art collaboration expert who helps artists find compatible collaborators based on their preferences. 
    Respond with a JSON array of 3-5 artist recommendations that match the user's preferences. 
    Each artist object should include: id (string), name (string), specialty (string), compatibilityScore (number 0-100), 
    location (string), bio (string), and other relevant fields. 
    Format your response as valid JSON only, with no additional text.`;
    
    // Create a user prompt based on the preferences
    const user = `Based on my preferences: "${preferences}", suggest artists I might want to collaborate with. 
    Consider current art market trends for 2024-2025, including digital art innovations, sustainability focus, 
    and cross-disciplinary collaborations. Provide detailed information about each artist's background, 
    specialty, and why we might work well together. Format as JSON.`;
    
    console.log("📤 API route: Sending request to Grok API...");
    console.log("API Key (first 10 chars):", GROK_API_KEY.substring(0, 10) + "...");
    console.log("API URL:", GROK_API_URL);
    
    // Set up AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
    
    try {
      console.log("Trying primary API endpoint:", GROK_API_URL);
      
      // Make the API call
      const response = await fetch(GROK_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROK_API_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: system },
            { role: "user", content: user }
          ],
          model: "grok-4",
          temperature: 0.7,
          max_tokens: 2000,
        }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      console.log("API route: Grok API response received with status:", response.status);
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      // Parse the response
      const data = await response.json();
      console.log("📥 API route: Grok API response data received");
      
      // Extract the content from the response
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error("No content in API response");
      }
      
      console.log("📝 API route: Raw content sample:", content.substring(0, 100) + "...");
      
      // Try to parse the content as JSON
      try {
        console.log("🔎 API route: Attempting to parse JSON...");
        
        // First attempt: Try direct JSON parsing
        try {
          const artists = JSON.parse(content);
          console.log(`✅ API route: Successfully parsed ${artists.length} artist recommendations`);
          
          // Enhance artists with keyword-based portfolio highlights
          const enhancedArtists = enhanceArtistsWithKeywordHighlights(artists, keywords);
          
          return NextResponse.json({ artists: enhancedArtists });
        } catch (directParseError) {
          console.log("⚠️ API route: Direct JSON parse failed, trying to extract JSON...");
          
          // Try to extract JSON from the content
          const jsonMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
          if (jsonMatch) {
            const jsonContent = jsonMatch[0];
            console.log("📝 API route: Extracted JSON content");
            
            // Try to parse the extracted JSON
            try {
              const artists = JSON.parse(jsonContent);
              console.log(`✅ API route: Successfully parsed ${artists.length} artist recommendations`);
              
              // Enhance artists with keyword-based portfolio highlights
              const enhancedArtists = enhanceArtistsWithKeywordHighlights(artists, keywords);
              
              return NextResponse.json({ artists: enhancedArtists });
            } catch (extractedParseError) {
              console.log("⚠️ API route: Extracted JSON parse failed, trying to fix JSON...");
              
              // Try to fix common JSON issues
              let fixedJsonContent = jsonContent;
              
              // Fix missing quotes around property names
              fixedJsonContent = fixedJsonContent.replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3');
              
              // Fix trailing commas
              fixedJsonContent = fixedJsonContent.replace(/,\s*([\]}])/g, '$1');
              
              // Try to parse the fixed JSON
              try {
                const artists = JSON.parse(fixedJsonContent);
                console.log(`✅ API route: Successfully parsed fixed JSON with ${artists.length} artist recommendations`);
                
                // Enhance artists with keyword-based portfolio highlights
                const enhancedArtists = enhanceArtistsWithKeywordHighlights(artists, keywords);
                
                return NextResponse.json({ artists: enhancedArtists });
              } catch (fixedParseError) {
                throw new Error("Failed to parse fixed JSON");
              }
            }
          } else {
            throw new Error("Could not extract JSON from content");
          }
        }
      } catch (jsonError) {
        console.error("❌ API route: JSON processing error:", jsonError);
        
        // Create a fallback response with basic artist recommendations
        console.log("🔧 API route: Creating fallback artist recommendations...");
        
        // Extract artist names if possible
        const nameMatches = content.match(/name[^\w]+(.*)/gi) || [];
        const names = nameMatches.map((match: string) => {
          const nameMatch = match.match(/name[^\w]+(.*)/i);
          return nameMatch ? nameMatch[1].trim() : null;
        }).filter(Boolean);
        
        // Extract specialties if possible
        const specialtyMatches = content.match(/specialty[^\w]+(.*)/gi) || [];
        const specialties = specialtyMatches.map((match: string) => {
          const specialtyMatch = match.match(/specialty[^\w]+(.*)/i);
          return specialtyMatch ? specialtyMatch[1].trim() : null;
        }).filter(Boolean);
        
        // Create fallback artists with keyword-based portfolio highlights
        const fallbackArtists = createFallbackArtists(names, specialties, keywords);
        
        console.log(`✅ API route: Created ${fallbackArtists.length} fallback artist recommendations`);
        return NextResponse.json({ artists: fallbackArtists });
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error("❌ API route: API call error:", error?.message || error);
      
      // Return a fallback response with keyword-based portfolio highlights
      const fallbackArtists = createFallbackArtists([], [], extractKeywords(preferences));
      
      return NextResponse.json({ artists: fallbackArtists });
    }
  } catch (error) {
    console.error("❌ API route: Error in API route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// Function to extract keywords from preferences
function extractKeywords(preferences: string): string[] {
  // Remove common words and extract meaningful keywords
  const commonWords = ['and', 'the', 'with', 'for', 'in', 'on', 'of', 'to', 'a', 'an', 'is', 'are', 'that', 'this', 'who', 'what', 'where', 'when', 'why', 'how'];
  
  // Split preferences into words, convert to lowercase, and filter out common words and short words
  const words = preferences.toLowerCase().split(/\W+/).filter(word => 
    word.length > 3 && !commonWords.includes(word)
  );
  
  // Get unique keywords
  const uniqueKeywords = [...new Set(words)];
  
  // Return up to 5 keywords
  return uniqueKeywords.slice(0, 5);
}

// Function to enhance artists with keyword-based portfolio highlights
function enhanceArtistsWithKeywordHighlights(artists: any[], keywords: string[]): any[] {
  return artists.map(artist => {
    // If the artist already has portfolio highlights, keep them
    if (artist.portfolioHighlights && Array.isArray(artist.portfolioHighlights) && artist.portfolioHighlights.length > 0) {
      return artist;
    }
    
    // Otherwise, create new portfolio highlights based on keywords and specialty
    const specialty = artist.specialty?.toLowerCase() || "mixed media";
    const portfolioHighlights = generatePortfolioHighlights(specialty, keywords);
    
    return {
      ...artist,
      portfolioHighlights
    };
  });
}

// Function to create fallback artists
function createFallbackArtists(names: string[], specialties: string[], keywords: string[]): any[] {
  const fallbackArtists = [];
  
  // Use extracted names and specialties if available
  if (names.length > 0) {
    for (let i = 0; i < Math.min(names.length, 5); i++) {
      const specialty = specialties[i] || "Mixed Media";
      fallbackArtists.push({
        id: `artist-${i + 1}`,
        name: names[i] || `Artist ${i + 1}`,
        specialty: specialty,
        compatibilityScore: Math.floor(Math.random() * 20) + 75, // Random score between 75-95
        location: "Unknown Location",
        bio: "Artist with unique style and vision",
        portfolioHighlights: generatePortfolioHighlights(specialty.toLowerCase(), keywords)
      });
    }
  } else {
    // Create default artists if no names could be extracted
    fallbackArtists.push(
      {
        id: "artist-1",
        name: "Alex Rivera",
        specialty: "Digital Art",
        compatibilityScore: 92,
        location: "New York, USA",
        bio: "Digital artist specializing in interactive experiences",
        portfolioHighlights: generatePortfolioHighlights("digital art", keywords)
      },
      {
        id: "artist-2",
        name: "Sophia Chen",
        specialty: "Mixed Media",
        compatibilityScore: 87,
        location: "Berlin, Germany",
        bio: "Mixed media artist with focus on sustainability",
        portfolioHighlights: generatePortfolioHighlights("mixed media", keywords)
      },
      {
        id: "artist-3",
        name: "Marcus Johnson",
        specialty: "Traditional Painting",
        compatibilityScore: 83,
        location: "London, UK",
        bio: "Traditional painter exploring contemporary themes",
        portfolioHighlights: generatePortfolioHighlights("traditional painting", keywords)
      }
    );
  }
  
  return fallbackArtists;
}

// Function to generate portfolio highlights based on specialty and keywords
function generatePortfolioHighlights(specialty: string, keywords: string[]): any[] {
  const currentYear = new Date().getFullYear();
  const highlights = [];
  
  // Art title prefixes based on specialty
  const titlePrefixes: {[key: string]: string[]} = {
    "digital": ["Digital", "Virtual", "Interactive", "Immersive", "Algorithmic"],
    "paint": ["Painted", "Chromatic", "Vibrant", "Textured", "Expressive"],
    "mixed": ["Hybrid", "Fusion", "Composite", "Integrated", "Blended"],
    "sculpture": ["Sculpted", "Dimensional", "Spatial", "Tactile", "Formed"],
    "photo": ["Captured", "Framed", "Exposed", "Documented", "Visual"],
    "illustration": ["Illustrated", "Narrative", "Conceptual", "Stylized", "Detailed"],
    "ceramic": ["Ceramic", "Glazed", "Fired", "Earthen", "Molded"],
    "textile": ["Woven", "Textile", "Fabric", "Threaded", "Stitched"],
    "print": ["Printed", "Impressed", "Transferred", "Reproduced", "Editioned"]
  };
  
  // Get appropriate prefixes based on specialty
  let prefixes = titlePrefixes["mixed"]; // Default to mixed media
  for (const [key, value] of Object.entries(titlePrefixes)) {
    if (specialty.includes(key)) {
      prefixes = value;
      break;
    }
  }
  
  // Media types based on specialty
  const mediaTypes: {[key: string]: string[]} = {
    "digital": ["Digital", "AI-assisted", "Generative", "Projection", "VR/AR", "NFT"],
    "paint": ["Oil on Canvas", "Acrylic", "Watercolor", "Mixed Paint Media", "Gouache"],
    "mixed": ["Mixed Media", "Various", "Multi-technique", "Hybrid Process", "Combined Materials"],
    "sculpture": ["Bronze", "Marble", "Wood", "Metal", "Found Objects", "3D Printed"],
    "photo": ["Digital Photography", "Film", "Alternative Process", "Photomontage", "Light Painting"],
    "illustration": ["Digital Illustration", "Ink", "Marker", "Colored Pencil", "Vector"],
    "ceramic": ["Porcelain", "Stoneware", "Earthenware", "Raku", "Clay"],
    "textile": ["Fabric", "Embroidery", "Weaving", "Fiber Art", "Textile Collage"],
    "print": ["Screenprint", "Lithography", "Etching", "Digital Print", "Monotype"]
  };
  
  // Get appropriate media types based on specialty
  let media = mediaTypes["mixed"]; // Default to mixed media
  for (const [key, value] of Object.entries(mediaTypes)) {
    if (specialty.includes(key)) {
      media = value;
      break;
    }
  }
  
  // Description templates for variety
  const descriptionTemplates = [
    // First artwork description templates
    [
      "A groundbreaking {specialty} piece exploring {keyword} through the lens of contemporary culture",
      "An innovative {specialty} work that reimagines {keyword} with cutting-edge techniques",
      "A visionary {specialty} creation that transforms the concept of {keyword} into tangible form",
      "A bold {specialty} statement examining {keyword} in relation to current social dynamics"
    ],
    // Second artwork description templates
    [
      "A collaborative {specialty} project merging {keyword} with sustainable practices",
      "An experimental {specialty} series investigating the intersection of technology and {keyword}",
      "A narrative-driven {specialty} installation that invites viewers to reconsider {keyword}",
      "A research-based {specialty} exploration documenting the evolution of {keyword} in modern contexts"
    ],
    // Third artwork description templates
    [
      "A critically acclaimed {specialty} collection featuring {keyword} as a central motif",
      "A boundary-pushing {specialty} exhibition challenging conventional interpretations of {keyword}",
      "A multi-layered {specialty} interpretation revealing hidden aspects of {keyword}",
      "A technically sophisticated {specialty} achievement showcasing new perspectives on {keyword}"
    ]
  ];
  
  // Generate 3 portfolio highlights using keywords
  for (let i = 0; i < 3; i++) {
    // Use keywords if available, otherwise use generic art themes
    const keyword = keywords[i] || ["nature", "identity", "urban", "memory", "future", "harmony", "contrast"][i % 7];
    const prefix = prefixes[i % prefixes.length];
    const medium = media[i % media.length];
    const year = (currentYear - i).toString();
    
    // Capitalize the first letter of the keyword
    const capitalizedKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);
    
    // Select a random description template for this artwork
    const templates = descriptionTemplates[i];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Fill in the template with the specialty and keyword
    const description = template
      .replace("{specialty}", specialty)
      .replace("{keyword}", keyword);
    
    highlights.push({
      title: `${prefix} ${capitalizedKeyword}`,
      year: year,
      medium: medium,
      description: description,
      status: ["Completed", "Exhibited", "Published", "Commissioned", "Award-winning"][i % 5]
    });
  }
  
  return highlights;
}
