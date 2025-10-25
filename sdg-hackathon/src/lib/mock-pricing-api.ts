/**
 * Mock implementation for artwork pricing suggestions
 * This provides realistic pricing suggestions without API calls
 */
import { ArtworkDetails, PricingSuggestion } from './artwork-pricing-api';

/**
 * Generate mock pricing suggestions for artwork
 * @param imageUrl - URL of the artwork image (not used in mock)
 * @param artworkDetails - Optional details about the artwork
 * @returns Mock pricing suggestion with price range and rationale
 */
export async function getMockArtworkPricingSuggestion(
  imageUrl: string,
  artworkDetails?: ArtworkDetails
): Promise<PricingSuggestion> {
  console.log("🔍 Using mock pricing API with details:", artworkDetails);
  
  // Simulate API delay (but much shorter than the real API)
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Base price range based on medium
  let basePriceRange = "$500 - $1,500";
  let baseRationale = "Based on standard market rates for emerging artists.";
  
  // Adjust pricing based on artwork details if provided
  if (artworkDetails) {
    // Adjust for medium
    if (artworkDetails.medium) {
      const medium = artworkDetails.medium.toLowerCase();
      
      if (medium.includes("digital") || medium.includes("procreate") || medium.includes("photoshop")) {
        basePriceRange = "$300 - $1,200";
        baseRationale = "Digital artworks typically sell for less than traditional media but can be reproduced.";
      } else if (medium.includes("oil") || medium.includes("acrylic")) {
        basePriceRange = "$800 - $2,500";
        baseRationale = "Traditional painting media command higher prices due to material costs and perceived value.";
      } else if (medium.includes("sculpture") || medium.includes("3d")) {
        basePriceRange = "$1,000 - $3,500";
        baseRationale = "Three-dimensional works require more materials and technical skill, increasing their value.";
      } else if (medium.includes("mixed")) {
        basePriceRange = "$600 - $2,000";
        baseRationale = "Mixed media works offer unique textures and visual interest, appealing to collectors.";
      }
    }
    
    // Adjust for dimensions if provided
    if (artworkDetails.dimensions) {
      if (artworkDetails.dimensions.includes("×")) {
        // Extract dimensions
        const dimensions = artworkDetails.dimensions.split("×").map(d => parseFloat(d));
        if (dimensions.length >= 2 && !isNaN(dimensions[0]) && !isNaN(dimensions[1])) {
          const area = dimensions[0] * dimensions[1];
          
          // Adjust price based on area
          if (area > 1000) { // Large piece
            basePriceRange = adjustPriceRange(basePriceRange, 1.5);
            baseRationale += " The large size of this piece increases its value significantly.";
          } else if (area > 500) { // Medium piece
            basePriceRange = adjustPriceRange(basePriceRange, 1.2);
            baseRationale += " The medium size of this piece adds to its value.";
          } else if (area < 100) { // Small piece
            basePriceRange = adjustPriceRange(basePriceRange, 0.7);
            baseRationale += " The smaller size makes this piece more affordable.";
          }
        }
      }
    }
    
    // Adjust for year if recent
    if (artworkDetails.year) {
      const year = parseInt(artworkDetails.year);
      const currentYear = new Date().getFullYear();
      
      if (!isNaN(year) && year >= currentYear - 1) {
        basePriceRange = adjustPriceRange(basePriceRange, 1.1);
        baseRationale += " Recent works often command higher prices due to their contemporary relevance.";
      } else if (!isNaN(year) && year <= currentYear - 10) {
        basePriceRange = adjustPriceRange(basePriceRange, 1.2);
        baseRationale += " Older works with historical significance can command premium prices.";
      }
    }
  }
  
  // Generate a detailed rationale
  const rationale = `
Based on my analysis of the artwork${artworkDetails?.title ? ` "${artworkDetails.title}"` : ""}, I would suggest a price range of ${basePriceRange}.

${baseRationale}

Additional pricing factors to consider:
1. Your reputation and exhibition history as an artist
2. The uniqueness and complexity of the piece
3. Current market demand for similar works
4. Whether the piece is part of a limited series or one-of-a-kind
5. Local market conditions in your area

For digital works, consider offering limited edition prints at different price points to maximize revenue.
  `.trim();
  
  return {
    priceRange: basePriceRange,
    rationale: rationale,
    fullResponse: rationale
  };
}

/**
 * Helper function to adjust a price range by a factor
 */
function adjustPriceRange(priceRange: string, factor: number): string {
  const prices = priceRange.match(/\$([0-9,]+)/g);
  if (prices && prices.length === 2) {
    const lowerPrice = parseInt(prices[0].replace(/[$,]/g, ''));
    const upperPrice = parseInt(prices[1].replace(/[$,]/g, ''));
    
    const newLowerPrice = Math.round(lowerPrice * factor / 100) * 100;
    const newUpperPrice = Math.round(upperPrice * factor / 100) * 100;
    
    return `$${newLowerPrice.toLocaleString()} - $${newUpperPrice.toLocaleString()}`;
  }
  return priceRange;
}
