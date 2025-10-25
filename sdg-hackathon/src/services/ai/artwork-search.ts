import OpenAI from "openai";
import { Artwork } from "@/types";
import { mockArtworks } from "@/data/mock";

// Use the same API key setup as in image-analyzer.ts
const envApiKey = process.env.XAI_API_KEY
const apiKey = envApiKey;

// Create the OpenAI client with explicit configuration
const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: "https://api.x.ai/v1",
});

/**
 * Search for artworks based on a user query using Grok AI
 * @param query - The user's search query
 * @param allArtworks - The collection of artworks to search through
 * @returns A ranked list of artworks matching the query
 */
export async function searchArtworks(query: string, allArtworks: Artwork[] = mockArtworks): Promise<Artwork[]> {
  try {
    // For common search terms, use a more reliable direct matching approach
    const lowerQuery = query.toLowerCase();
    
    // Direct matching for common search terms to ensure results
    if (
      lowerQuery.includes('traditional') || 
      lowerQuery.includes('painting') || 
      lowerQuery.includes('chinese') ||
      lowerQuery.includes('landscape')
    ) {
      return allArtworks.filter((artwork: Artwork) => 
        artwork.category?.toLowerCase().includes('traditional') ||
        artwork.tags?.some((tag: string) => tag.toLowerCase().includes('traditional')) ||
        artwork.description?.toLowerCase().includes('traditional') ||
        artwork.title?.toLowerCase().includes('traditional')
      );
    }
    
    if (
      lowerQuery.includes('digital') || 
      lowerQuery.includes('modern') || 
      lowerQuery.includes('contemporary')
    ) {
      return allArtworks.filter((artwork: Artwork) => 
        artwork.category?.toLowerCase().includes('digital') ||
        artwork.tags?.some((tag: string) => tag.toLowerCase().includes('digital') || tag.toLowerCase().includes('modern')) ||
        artwork.description?.toLowerCase().includes('digital') ||
        artwork.title?.toLowerCase().includes('digital')
      );
    }
    
    if (
      lowerQuery.includes('photography') || 
      lowerQuery.includes('photo') || 
      lowerQuery.includes('photograph')
    ) {
      return allArtworks.filter((artwork: Artwork) => 
        artwork.category?.toLowerCase().includes('photo') ||
        artwork.tags?.some((tag: string) => tag.toLowerCase().includes('photo')) ||
        artwork.description?.toLowerCase().includes('photo') ||
        artwork.title?.toLowerCase().includes('photo')
      );
    }

    // Try to use Grok AI for more complex queries
    try {
      // Prepare artwork data for the AI to analyze
      const artworkData = allArtworks.map((artwork: Artwork) => ({
        id: artwork.id,
        title: artwork.title,
        description: artwork.description,
        category: artwork.category,
        tags: artwork.tags,
        type: artwork.type,
      }));

      // Create the completion request
      const completion = await openai.chat.completions.create({
        model: "grok-4",
        messages: [
          {
            role: "system",
            content: "You are an art expert assistant that helps match user queries with relevant artworks. Your task is to analyze the user's query and return the IDs of artworks that best match their interests, ranked by relevance."
          },
          {
            role: "user",
            content: `I'm looking for artwork that matches this description: "${query}". Here are the available artworks: ${JSON.stringify(artworkData)}. Return only a JSON object with a key 'artworkIds' containing an array of artwork IDs ranked by relevance to my query, with the most relevant first.`
          }
        ],
        response_format: { type: "json_object" }
      });

      // Parse the AI's response
      const responseContent = completion.choices[0].message.content || "{}";
      const parsedResponse = JSON.parse(responseContent);
      
      // Extract artwork IDs from the response
      const matchingIds = parsedResponse.artworkIds || [];
      
      // Map IDs back to full artwork objects and filter out any that don't exist
      const matchingArtworks = matchingIds
        .map((id: string) => allArtworks.find((artwork: Artwork) => artwork.id === id))
        .filter((artwork): artwork is Artwork => artwork !== undefined);
      
      // If AI returned results, use them
      if (matchingArtworks.length > 0) {
        return matchingArtworks;
      }
    } catch (aiError) {
      console.error("AI search error, falling back to keyword search:", aiError);
      // Continue to fallback method if AI fails
    }
    
    // Fallback to basic keyword matching if AI fails or returns no results
    return allArtworks.filter((artwork: Artwork) => {
      const searchableText = [
        artwork.title || '',
        artwork.description || '',
        artwork.category || '',
        ...(artwork.tags || [])
      ].join(' ').toLowerCase();
      
      // Split query into keywords and check if any match
      const keywords = lowerQuery.split(/\s+/);
      return keywords.some(keyword => keyword.length > 2 && searchableText.includes(keyword));
    });
  } catch (error) {
    console.error("Error searching artworks:", error);
    // In case of error, return empty array to avoid breaking the UI
    return [];
  }
}

/**
 * Get similar artwork recommendations based on a reference artwork
 * @param referenceArtwork - The artwork to find similar pieces to
 * @param allArtworks - The collection of artworks to search through
 * @param count - Number of recommendations to return
 * @returns A list of similar artworks
 */
export async function getSimilarArtworks(
  referenceArtwork: Artwork, 
  allArtworks: Artwork[] = mockArtworks,
  count: number = 4
): Promise<Artwork[]> {
  try {
    // Filter out the reference artwork from the collection
    const otherArtworks = allArtworks.filter((artwork: Artwork) => artwork.id !== referenceArtwork.id);
    
    // Direct matching based on category and tags for reliable results
    if (referenceArtwork.category || (referenceArtwork.tags && referenceArtwork.tags.length > 0)) {
      // Find artworks with the same category or matching tags
      const categoryMatches = referenceArtwork.category ? 
        otherArtworks.filter((artwork: Artwork) => artwork.category === referenceArtwork.category) : [];
      
      const tagMatches = referenceArtwork.tags && referenceArtwork.tags.length > 0 ?
        otherArtworks.filter((artwork: Artwork) => {
          return artwork.tags && referenceArtwork.tags?.some(tag => artwork.tags?.includes(tag));
        }) : [];
      
      // Combine and deduplicate matches
      const directMatches = [...categoryMatches];
      tagMatches.forEach(artwork => {
        if (!directMatches.some(match => match.id === artwork.id)) {
          directMatches.push(artwork);
        }
      });
      
      // If we have enough direct matches, return them
      if (directMatches.length >= count) {
        return directMatches.slice(0, count);
      }
      
      // If we have some direct matches but not enough, prioritize them
      if (directMatches.length > 0) {
        // Get additional random artworks to fill the count
        const remainingCount = count - directMatches.length;
        const remainingArtworks = otherArtworks
          .filter((artwork: Artwork) => !directMatches.some(match => match.id === artwork.id))
          .sort(() => 0.5 - Math.random())
          .slice(0, remainingCount);
        
        return [...directMatches, ...remainingArtworks];
      }
    }
    
    // Try to use Grok AI for recommendations
    try {
      // Prepare artwork data for the AI to analyze
      const artworkData = otherArtworks.map(artwork => ({
        id: artwork.id,
        title: artwork.title,
        description: artwork.description,
        category: artwork.category,
        tags: artwork.tags,
        type: artwork.type,
      }));

      // Create the completion request
      const completion = await openai.chat.completions.create({
        model: "grok-4",
        messages: [
          {
            role: "system",
            content: "You are an art recommendation system that finds similar artworks based on style, theme, subject matter, and artistic techniques."
          },
          {
            role: "user",
            content: `Find artworks similar to this reference: ${JSON.stringify({
              title: referenceArtwork.title,
              description: referenceArtwork.description,
              category: referenceArtwork.category,
              tags: referenceArtwork.tags,
              type: referenceArtwork.type,
            })}. Here are the available artworks to choose from: ${JSON.stringify(artworkData)}. Return a JSON object with a key 'similarArtworkIds' containing an array of artwork IDs ranked by similarity, with the most similar first. Limit to ${count} results.`
          }
        ],
        response_format: { type: "json_object" }
      });

      // Parse the AI's response
      const responseContent = completion.choices[0].message.content || "{}";
      const parsedResponse = JSON.parse(responseContent);
      
      // Extract artwork IDs from the response
      const similarIds = parsedResponse.similarArtworkIds || [];
      
      // Map IDs back to full artwork objects and filter out any that don't exist
      const similarArtworks = similarIds
        .map((id: string) => allArtworks.find((artwork: Artwork) => artwork.id === id))
        .filter((artwork): artwork is Artwork => artwork !== undefined);
      
      // If AI returned results, use them
      if (similarArtworks.length > 0) {
        return similarArtworks.slice(0, count);
      }
    } catch (aiError) {
      console.error("AI recommendation error, falling back to random selection:", aiError);
      // Continue to fallback method if AI fails
    }
    
    // Fallback: return random artworks
    return otherArtworks
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  } catch (error) {
    console.error("Error finding similar artworks:", error);
    // In case of error, return random artworks to avoid breaking the UI
    return allArtworks
      .filter((artwork: Artwork) => artwork.id !== referenceArtwork.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }
}

/**
 * Generate search suggestions based on a partial query
 * @param partialQuery - The user's partial search query
 * @returns A list of suggested search queries
 */
export async function getSearchSuggestions(partialQuery: string): Promise<string[]> {
  try {
    // Create the completion request
    const completion = await openai.chat.completions.create({
      model: "grok-4",
      messages: [
        {
          role: "system",
          content: "You are an art search assistant that helps users discover artwork by suggesting relevant search terms."
        },
        {
          role: "user",
          content: `Based on my partial search query "${partialQuery}", suggest 5 complete search queries that would help me find interesting artwork. Return only a JSON object with a key 'suggestions' containing an array of strings.`
        }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the AI's response
    const responseContent = completion.choices[0].message.content || "{}";
    const parsedResponse = JSON.parse(responseContent);
    
    // Extract suggestions from the response
    const suggestions = parsedResponse.suggestions || [];
    
    return suggestions.slice(0, 5);
  } catch (error) {
    console.error("Error generating search suggestions:", error);
    // In case of error, return empty array
    return [];
  }
}
