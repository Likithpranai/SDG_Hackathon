/**
 * Grok API integration service
 * This service handles communication with our API route that calls the Grok API
 */

export interface ArtistRecommendation {
  id: string;
  name: string;
  compatibilityScore: number;
  location: string;
  bio: string;
  specialty: string;
  detailedAnalysis: {
    toolExpertise: {
      score: number;
      maxScore: number;
      rating: string;
      description: string;
    };
    artTypeAlignment: {
      score: number;
      maxScore: number;
      rating: string;
      description: string;
    };
    projectRelevance: {
      score: number;
      maxScore: number;
      rating: string;
      description: string;
    };
    experienceLevel: {
      score: number;
      maxScore: number;
      rating: string;
      description: string;
    };
    portfolioQuality: {
      score: number;
      maxScore: number;
      rating: string;
      description: string;
    };
  };
  collaborationPotential: {
    rating: string;
    description: string;
  };
  collaborationInsights: string[];
  portfolioHighlights: Array<{
    title: string;
    year: string;
    medium: string;
    description: string;
    status: string;
  }>;
  contactInformation: {
    website?: string;
    email?: string;
    social?: string;
  };
}

/**
 * Get artist recommendations based on user preferences
 * @param preferences - User's preferences for artist collaboration
 * @returns Array of artist recommendations
 */
export async function getArtistRecommendations(
  preferences: string
): Promise<ArtistRecommendation[]> {
  try {
    console.log("🔍 Starting API call to our server route...");
    
    // Set up AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

    try {
      // Call our API route
      const response = await fetch('/api/grok', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ preferences }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log(`✅ API response received with status: ${response.status}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API request failed with status: ${response.status}`);
      }

      // Parse the response
      const data = await response.json();
      console.log("📥 Response data received");
      
      if (!data.artists || !Array.isArray(data.artists)) {
        console.error("❌ Invalid response format:", data);
        throw new Error("Invalid API response format");
      }
      
      // Enhance the artist objects with missing fields if needed
      const enhancedArtists = data.artists.map((artist: any) => {
        // Create a complete artist object with default values for missing fields
        // Create detailed analysis with default values if not provided
        const detailedAnalysis = artist.detailedAnalysis || {
          toolExpertise: {
            score: Math.floor(Math.random() * 10) + 20,
            maxScore: 30,
            rating: "Strong",
            description: "Proficient in various artistic tools and techniques."
          },
          artTypeAlignment: {
            score: Math.floor(Math.random() * 10) + 20,
            maxScore: 30,
            rating: "Strong",
            description: "Works in styles that align well with your preferences."
          },
          projectRelevance: {
            score: Math.floor(Math.random() * 5) + 15,
            maxScore: 20,
            rating: "Strong",
            description: "Has experience with similar collaborative projects."
          },
          experienceLevel: {
            score: Math.floor(Math.random() * 3) + 7,
            maxScore: 10,
            rating: "Strong",
            description: "Several years of professional experience in their field."
          },
          portfolioQuality: {
            score: Math.floor(Math.random() * 3) + 7,
            maxScore: 10,
            rating: "Strong",
            description: "High-quality portfolio with impressive works."
          }
        };
        
        // Calculate the compatibility score as the sum of individual scores
        const calculatedScore = 
          detailedAnalysis.toolExpertise.score +
          detailedAnalysis.artTypeAlignment.score +
          detailedAnalysis.projectRelevance.score +
          detailedAnalysis.experienceLevel.score +
          detailedAnalysis.portfolioQuality.score;
        
        return {
          id: artist.id || `artist-${Math.random().toString(36).substring(2, 9)}`,
          name: artist.name || "Unknown Artist",
          compatibilityScore: calculatedScore, // Use calculated score
          location: artist.location || "Unknown Location",
          bio: artist.bio || "Artist bio not available",
          specialty: artist.specialty || "Mixed Media",
          detailedAnalysis,
          collaborationPotential: artist.collaborationPotential || (() => {
            // Determine rating based on calculated score
            if (calculatedScore >= 90) {
              return {
                rating: "Excellent Match (90-100%)",
                description: "This artist would be an exceptional collaborator for your project."
              };
            } else if (calculatedScore >= 75) {
              return {
                rating: "Strong Match (75-89%)",
                description: "This artist would be a very good collaborator for your project."
              };
            } else if (calculatedScore >= 60) {
              return {
                rating: "Good Match (60-74%)",
                description: "This artist would be a suitable collaborator for your project."
              };
            } else {
              return {
                rating: "Moderate Match (Below 60%)",
                description: "This artist may be a potential collaborator, but there might be some compatibility challenges."
              };
            }
          })(),
          collaborationInsights: artist.collaborationInsights || [
            "Experienced in collaborative projects",
            "Complementary skill set to yours",
            "Similar artistic vision"
          ],
          portfolioHighlights: artist.portfolioHighlights || [
            {
              title: "Major Project",
              year: "2024",
              medium: "Mixed Media",
              description: "Significant work showcasing the artist's talents",
              status: "Completed"
            },
            {
              title: "Exhibition Piece",
              year: "2023",
              medium: "Digital",
              description: "Work featured in a prominent exhibition",
              status: "Exhibited"
            },
            {
              title: "Collaborative Work",
              year: "2022",
              medium: "Various",
              description: "Previous successful collaboration",
              status: "Published"
            }
          ],
          contactInformation: artist.contactInformation || {
            website: "artistwebsite.com",
            email: `${artist.name?.toLowerCase().replace(/\s+/g, ".")}@example.com`,
            social: `@${artist.name?.toLowerCase().replace(/\s+/g, "")}`
          }
        };
      });
      
      // Sort artists by compatibility score in descending order (highest first)
      const sortedArtists = enhancedArtists.sort((a: ArtistRecommendation, b: ArtistRecommendation) => b.compatibilityScore - a.compatibilityScore);
      
      console.log(`✅ Successfully received and enhanced ${sortedArtists.length} artist recommendations`);
      console.log(`🔢 Artists sorted by compatibility score (highest first)`);
      return sortedArtists;
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error?.name === 'AbortError') {
        console.error("⏰ API request timed out");
        throw new Error("Request timed out. Please try again.");
      }
      console.error("❌ API request failed:", error);
      throw error;
    }
  } catch (error) {
    console.error("❌ Error in API call:", error);
    throw error;
  }
}
