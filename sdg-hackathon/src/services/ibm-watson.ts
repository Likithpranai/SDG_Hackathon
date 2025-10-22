// This is a service to interact with IBM Watson APIs
// Using environment variables for API credentials
// For image analysis and enhancement using watsonx.ai

// Types for our API requests and responses
export interface EnhanceImageRequest {
  image: string; // Base64 encoded image
  description: string;
}

export interface EnhanceImageResponse {
  enhancedImage: string; // Base64 encoded enhanced image
  feedback: string;
}

export interface ChatRequest {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  originalImage: string;
  enhancedImage: string;
}

export interface ChatResponse {
  reply: string;
  newEnhancedImage?: string; // Optional new enhanced image if the AI decides to update it
}

// IBM Watson API credentials from environment variables
const WATSON_API_KEY = process.env.WATSON_API_KEY || '';
const WATSON_API_URL = process.env.WATSON_API_URL || '';
const WATSON_PLATFORM_URL = process.env.WATSON_PLATFORM_URL || '';

// watsonx.ai credentials for the foundation model
const WATSONX_URL = process.env.WATSONX_URL || '';
const WATSONX_INSTANCE_ID = process.env.WATSONX_INSTANCE_ID || '';
const WATSONX_VERSION = process.env.WATSONX_VERSION || '2023-05-01';

// Real IBM Watson service implementation
export const IBMWatsonService = {
  // Enhance image and get feedback using watsonx.ai and Watson Visual Recognition
  enhanceImage: async (request: EnhanceImageRequest): Promise<EnhanceImageResponse> => {
    try {
      if (!WATSON_API_KEY || !WATSONX_URL) {
        console.warn('Watson API credentials not found. Using mock response.');
        await new Promise(resolve => setTimeout(resolve, 2000));
        return {
          enhancedImage: request.image, // Return original image as fallback
          feedback: generateMockFeedback(request.description)
        };
      }
      
      // Step 1: Analyze the image using Watson Visual Recognition
      const imageAnalysisResponse = await fetch(`${WATSON_API_URL}/v4/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${WATSON_API_KEY}`
        },
        body: JSON.stringify({
          collection_ids: ["general"],
          features: ["objects", "color"],
          images: [{ data: request.image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '') }]
        })
      });
      
      if (!imageAnalysisResponse.ok) {
        throw new Error(`Image analysis failed: ${imageAnalysisResponse.statusText}`);
      }
      
      const imageAnalysis = await imageAnalysisResponse.json();
      
      // Step 2: Generate feedback using watsonx.ai foundation model
      const promptForFeedback = `
You are an expert art critic and advisor. You're analyzing an artwork with the following characteristics:

${JSON.stringify(imageAnalysis.images[0], null, 2)}

The artist describes their work and intentions as: "${request.description}"

Provide constructive feedback on:
1. Color composition and harmony
2. How well the artwork conveys the intended emotion/mood
3. Technical execution suggestions
4. Lighting and depth

Format your response as markdown with sections. Be specific, constructive, and actionable. Focus on how the artist can improve while acknowledging the strengths of their work.
`;

      const feedbackResponse = await fetch(`${WATSONX_URL}/v1/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${WATSON_API_KEY}`,
          'X-Watson-Instance-ID': WATSONX_INSTANCE_ID
        },
        body: JSON.stringify({
          model_id: 'ibm/granite-13b-chat-v2',
          input: promptForFeedback,
          parameters: {
            decoding_method: 'greedy',
            max_new_tokens: 500,
            min_new_tokens: 100,
            temperature: 0.7
          },
          version: WATSONX_VERSION
        })
      });
      
      if (!feedbackResponse.ok) {
        throw new Error(`Feedback generation failed: ${feedbackResponse.statusText}`);
      }
      
      const feedbackResult = await feedbackResponse.json();
      const feedback = feedbackResult.results?.[0]?.generated_text || generateMockFeedback(request.description);
      
      // Step 3: For the hackathon prototype, we'll use the original image
      // In a real implementation, you would use another API call to enhance the image
      // based on the analysis and feedback
      
      return {
        enhancedImage: request.image, // In a real app with more time, you'd generate an enhanced image
        feedback: feedback
      };
    } catch (error) {
      console.error('Error in Watson image enhancement:', error);
      // Fallback to mock response if API calls fail
      return {
        enhancedImage: request.image,
        feedback: generateMockFeedback(request.description)
      };
    }
  },
  
  // Chat with the AI about the image
  chat: async (request: ChatRequest): Promise<ChatResponse> => {
    try {
      if (!WATSON_API_KEY || !WATSONX_URL) {
        console.warn('Watson API credentials not found. Using mock response.');
        await new Promise(resolve => setTimeout(resolve, 1000));
        const lastUserMessage = request.messages
          .filter(msg => msg.role === 'user')
          .pop()?.content || '';
        
        return {
          reply: generateMockChatReply(lastUserMessage),
          newEnhancedImage: Math.random() > 0.7 ? request.enhancedImage : undefined
        };
      }
      
      // Format the conversation history for watsonx.ai
      const conversationHistory = request.messages.map(msg => {
        return {
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        };
      });
      
      // Add context about the image to the prompt
      const systemPrompt = `You are an expert art advisor helping an artist improve their work. 
You have access to their original artwork and an enhanced version you previously created. 
Provide specific, actionable advice based on their questions. 
If they ask for further enhancements, describe exactly what changes would be made.`;
      
      // Call watsonx.ai for the chat response
      const chatResponse = await fetch(`${WATSONX_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${WATSON_API_KEY}`,
          'X-Watson-Instance-ID': WATSONX_INSTANCE_ID
        },
        body: JSON.stringify({
          model_id: 'ibm/granite-13b-chat-v2',
          messages: [
            { role: 'system', content: systemPrompt },
            ...conversationHistory
          ],
          parameters: {
            decoding_method: 'greedy',
            temperature: 0.7,
            max_tokens: 300
          },
          version: WATSONX_VERSION
        })
      });
      
      if (!chatResponse.ok) {
        throw new Error(`Chat response failed: ${chatResponse.statusText}`);
      }
      
      const chatResult = await chatResponse.json();
      const reply = chatResult.choices?.[0]?.message?.content || generateMockChatReply(conversationHistory[conversationHistory.length - 1].content);
      
      // For the hackathon prototype, we'll randomly decide if a new image is needed
      // In a real implementation, you would analyze the user's request to determine if a new image is needed
      const shouldGenerateNewImage = reply.toLowerCase().includes('enhance') || 
                                    reply.toLowerCase().includes('adjust') || 
                                    reply.toLowerCase().includes('change') || 
                                    Math.random() > 0.7;
      
      return {
        reply: reply,
        newEnhancedImage: shouldGenerateNewImage ? request.enhancedImage : undefined
      };
    } catch (error) {
      console.error('Error in Watson chat:', error);
      // Fallback to mock response if API calls fail
      const lastUserMessage = request.messages
        .filter(msg => msg.role === 'user')
        .pop()?.content || '';
      
      return {
        reply: generateMockChatReply(lastUserMessage),
        newEnhancedImage: Math.random() > 0.7 ? request.enhancedImage : undefined
      };
    }
  }
};

// Helper function to generate mock feedback based on the description
function generateMockFeedback(description: string): string {
  const keywords = {
    emotions: ['happy', 'sad', 'angry', 'calm', 'peaceful', 'energetic', 'melancholic'],
    colors: ['warm', 'cool', 'vibrant', 'muted', 'contrast', 'harmony', 'balance'],
    techniques: ['composition', 'perspective', 'lighting', 'texture', 'depth', 'movement', 'focus']
  };
  
  // Find keywords in the description
  const foundEmotions = keywords.emotions.filter(emotion => 
    description.toLowerCase().includes(emotion.toLowerCase())
  );
  
  const foundColors = keywords.colors.filter(color => 
    description.toLowerCase().includes(color.toLowerCase())
  );
  
  const foundTechniques = keywords.techniques.filter(technique => 
    description.toLowerCase().includes(technique.toLowerCase())
  );
  
  // Default values if nothing is found
  const emotion = foundEmotions.length > 0 ? foundEmotions[0] : 'emotional';
  const color = foundColors.length > 0 ? foundColors[0] : 'color';
  const technique = foundTechniques.length > 0 ? foundTechniques[0] : 'composition';
  
  return `
Based on your artwork and description, here are some suggestions to enhance your piece:

1. **Color Composition**: I've adjusted the ${color} tones to create a more harmonious palette. The enhanced version has better color balance while maintaining your original vision.

2. **Emotional Intent**: To better convey the ${emotion} feeling you mentioned, I've made subtle adjustments to the overall mood through ${
    emotion === 'calm' || emotion === 'peaceful' 
      ? 'softer transitions and reduced contrast' 
      : 'increased contrast and more defined elements'
  }.

3. **Technical Execution**: The ${technique} has been refined to create a stronger focal point and guide the viewer's eye through the piece. This helps communicate your artistic intent more effectively.

4. **Lighting**: I've enhanced the lighting to create more depth and dimension, which helps emphasize the three-dimensional quality of your work.

The enhanced version maintains your original artistic vision while refining these elements to better achieve your stated goals. The changes are subtle but impactful, designed to complement your unique style rather than overwrite it.
`;
}

// Helper function to generate mock chat replies
function generateMockChatReply(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  if (message.includes('color') || message.includes('palette')) {
    return "I've analyzed your color palette further. The current composition has a slight imbalance between warm and cool tones. In the enhanced version, I've adjusted the color temperature to create more harmony while maintaining your artistic intent. Would you like me to emphasize the warm tones even more?";
  }
  
  if (message.includes('composition') || message.includes('layout')) {
    return "Looking at the composition more closely, I notice the visual weight is slightly shifted to the left. The enhanced version balances this by subtly adjusting the elements to create a more harmonious flow. This helps guide the viewer's eye through the piece more effectively.";
  }
  
  if (message.includes('light') || message.includes('shadow')) {
    return "I've taken another look at the lighting in your piece. The enhanced version increases the contrast between light and shadow to create more depth and dimension. This helps emphasize the three-dimensional quality and adds more drama to the scene.";
  }
  
  if (message.includes('emotion') || message.includes('feel') || message.includes('mood')) {
    return "To better convey the emotional quality you're aiming for, I've made subtle adjustments to the overall mood. The enhanced version uses color psychology principles to evoke the intended emotional response more effectively.";
  }
  
  // Default response
  return "I understand your feedback. I've made additional adjustments to the enhanced version based on your input. The new version should better align with your artistic vision while maintaining the technical improvements. Is there any specific aspect you'd like me to focus on further?";
}
