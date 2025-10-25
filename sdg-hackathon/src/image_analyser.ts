import OpenAI from "openai";

// IMPORTANT: For production, you should use environment variables instead of hardcoded keys
// This is just a temporary solution for debugging purposes

// Option 1: Use environment variables (preferred in production)
const envApiKey = process.env.XAI_API_KEY

// Use environment variable only
const apiKey = envApiKey;

// Create the OpenAI client with explicit configuration
const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://api.x.ai/v1",
});

/**
 * Analyzes an artwork image using Grok AI and provides feedback
 * @param base64Image - Base64 encoded image string (without the data:image prefix)
 * @returns Feedback text from the AI analysis
 */
export async function analyzeArtwork(base64Image: string): Promise<string> {
    try {
        // Make sure the base64 string is properly padded
        let paddedBase64 = base64Image;
        while (paddedBase64.length % 4 > 0) {
            paddedBase64 += "=";
        }

        // Create the completion request
        const completion = await openai.chat.completions.create({
            model: "grok-4",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/jpeg;base64,${paddedBase64}`,
                                detail: "high",
                            },
                        },
                        {
                            type: "text",
                            text: "Analyze this artwork and provide concise, actionable feedback. Keep your response under 300 words total. Format your response using this exact markdown structure with proper spacing:\n\n## ✨ Strengths\n\n- **First strength**: Brief explanation\n- **Second strength**: Brief explanation\n- **Third strength**: Brief explanation\n\n&nbsp;\n\n## 🔍 Areas for Growth\n\n- **First suggestion**: Specific, actionable advice\n- **Second suggestion**: Specific, actionable advice\n- **Third suggestion**: Specific, actionable advice\n\n&nbsp;\n\n## 💭 Reflection\n\nOne thought-provoking question to help the artist develop their vision further\n\n&nbsp;\n\nDO NOT describe or summarize what the artwork depicts. Focus only on providing feedback about technique, composition, color, emotion, etc. Be specific, encouraging, and focused on helping the artist take their next steps.",
                        },
                    ],
                },
            ],
        });

        // Return the AI's response
        return completion.choices[0].message.content || "No feedback available";
    } catch (error) {
        console.error("Error analyzing artwork:", error);
        throw new Error(`Failed to analyze artwork: ${error instanceof Error ? error.message : String(error)}`);
    }
}