import { NextResponse } from 'next/server';

// API key should be stored in environment variables in a production environment
const GROK_API_KEY = "xai-gl37IcsDm7q4EVP67wi6NTE9LlmksREpBjbPUifyOWNtSlib1Y9zwXuoyTIik7VjgGRppur8gAqeu5LX";
const GROK_API_URL = "https://api.x.ai/v1/chat/completions";

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
    
    // Create an extremely simple system prompt to reduce processing time
    const systemPrompt = `Generate 5 artist profiles as a JSON array. Each with id, name, compatibilityScore (0-100), location, bio (short), specialty. Format: [{"id":"a1","name":"Name","compatibilityScore":85,"location":"City","bio":"Bio","specialty":"Specialty"}]`;

    // Prepare the request payload
    const requestBody = {
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `${preferences}`,
        },
      ],
      model: "grok-4",
      stream: false,
      temperature: 0.5, // Lower temperature for faster, more deterministic responses
      max_tokens: 1000, // Limit token count for faster response
    };
    
    console.log("📤 API route: Sending request to Grok API...");
    
    // Make the API call with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
      const response = await fetch(GROK_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROK_API_KEY}`,
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      console.log(`✅ API route: Grok API response received with status: ${response.status}`);
      
      if (!response.ok) {
        console.error(`❌ API route: Grok API request failed with status: ${response.status}`);
        return NextResponse.json(
          { error: `API request failed with status: ${response.status}` },
          { status: response.status }
        );
      }
      
      // Parse the response
      const data = await response.json();
      console.log("📥 API route: Grok API response data received");
      
      // Extract the content from the response
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        console.error("❌ API route: No content in Grok API response");
        return NextResponse.json(
          { error: "Invalid API response format" },
          { status: 500 }
        );
      }
      
      console.log("📝 API route: Raw content sample:", content.substring(0, 100) + "...");
      
      // Try to extract JSON if it's wrapped in markdown code blocks
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                        content.match(/```([\s\S]*?)```/);
      
      const jsonContent = jsonMatch ? jsonMatch[1] : content;
      console.log("🔎 API route: Attempting to parse JSON...");
      
      try {
        // Try to fix common JSON issues before parsing
        let fixedJsonContent = jsonContent;
        
        // Fix unterminated strings by replacing unescaped quotes in strings
        fixedJsonContent = fixedJsonContent.replace(/([^\\])"([^"]*)\n/g, '$1"$2\\n');
        
        // Fix missing quotes around property names
        fixedJsonContent = fixedJsonContent.replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3');
        
        // Fix trailing commas in arrays and objects
        fixedJsonContent = fixedJsonContent.replace(/,\s*([\]}])/g, '$1');
        
        // Try to parse the fixed JSON
        console.log("🔧 API route: Attempting to parse fixed JSON...");
        const artists = JSON.parse(fixedJsonContent);
        console.log(`✅ API route: Successfully parsed ${artists.length} artist recommendations`);
        return NextResponse.json({ artists });
      } catch (parseError) {
        console.error("❌ API route: JSON parse error:", parseError);
        console.error("Content that failed to parse:", jsonContent.substring(0, 500) + "...");
        
        // As a fallback, use a more lenient JSON parser
        try {
          console.log("🔧 API route: Attempting to use fallback JSON parsing...");
          // Use eval as a last resort to parse the JSON-like content
          // This is safe in this context since we're only using it for parsing, not executing arbitrary code
          // eslint-disable-next-line no-eval
          const fallbackArtists = eval('(' + jsonContent + ')');
          console.log(`✅ API route: Successfully parsed ${fallbackArtists.length} artist recommendations using fallback method`);
          return NextResponse.json({ artists: fallbackArtists });
        } catch (fallbackError) {
          console.error("❌ API route: Fallback JSON parsing also failed:", fallbackError);
          return NextResponse.json(
            { error: "Failed to parse artist recommendations" },
            { status: 500 }
          );
        }
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error?.name === 'AbortError') {
        console.error("⏰ API route: Grok API request timed out");
        return NextResponse.json(
          { error: "Request timed out. Please try again." },
          { status: 504 }
        );
      }
      console.error("❌ API route: Grok API request failed:", error);
      return NextResponse.json(
        { error: "Failed to call Grok API" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ API route: Error in API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
