/**
 * Service for getting AI-generated pricing suggestions for artwork
 */

export interface ArtworkDetails {
  title?: string;
  medium?: string;
  dimensions?: string;
  year?: string;
  description?: string;
}

export interface PricingSuggestion {
  priceRange: string;
  rationale: string;
  fullResponse: string;
}

/**
 * Get AI-generated pricing suggestion for an artwork
 * @param imageUrl - URL of the artwork image
 * @param artworkDetails - Optional details about the artwork
 * @returns Pricing suggestion with price range and rationale
 */
export async function getArtworkPricingSuggestion(
  imageUrl: string,
  artworkDetails?: ArtworkDetails
): Promise<PricingSuggestion> {
  try {
    console.log("🔍 Starting API call for artwork pricing suggestion...");
    console.log("📝 Image URL length:", imageUrl?.length || 0);
    console.log("📝 Artwork details:", JSON.stringify(artworkDetails, null, 2));
    
    if (!imageUrl) {
      console.error("❌ Missing image URL for pricing suggestion");
      throw new Error("Image URL is required for pricing suggestion");
    }
    
    // Set up AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

    try {
      // Call our API route
      const response = await fetch('/api/grok-pricing', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl, artworkDetails }),
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
      
      if (!data.success) {
        console.error("❌ Invalid response format:", data);
        throw new Error("Invalid API response format");
      }
      
      return {
        priceRange: data.priceRange || "Unable to determine price range",
        rationale: data.rationale || "No rationale provided",
        fullResponse: data.fullResponse || ""
      };
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
    console.error("❌ Error in artwork pricing API call:", error);
    throw error;
  }
}
