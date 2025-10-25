import { NextRequest, NextResponse } from 'next/server';
import { analyzeArtwork } from '@/services/ai/image-analyzer';

export async function POST(request: NextRequest) {
  try {
    // Debug environment variables
    console.log('API Route Environment Check:');
    console.log('- XAI_API_KEY exists:', !!process.env.XAI_API_KEY);
    console.log('- OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
    
    const body = await request.json();
    const { image, description } = body;

    if (!image || !description) {
      return NextResponse.json(
        { error: 'Image and description are required' },
        { status: 400 }
      );
    }

    // Extract the base64 data from the image string
    // The image string is typically in the format: data:image/jpeg;base64,/9j/4AAQSkZJRg...
    const base64Data = image.split(',')[1];
    
    if (!base64Data) {
      return NextResponse.json(
        { error: 'Invalid image format' },
        { status: 400 }
      );
    }

    // Set OPENAI_API_KEY environment variable directly as a fallback
    if (process.env.XAI_API_KEY && !process.env.OPENAI_API_KEY) {
      process.env.OPENAI_API_KEY = process.env.XAI_API_KEY;
    }
    
    // Call our Grok API analysis function to get professional artist feedback
    const feedback = await analyzeArtwork(base64Data);
    
    // Return the feedback without any enhanced image
    return NextResponse.json({
      feedback: feedback    // Return the AI artist feedback
    });
  } catch (error) {
    console.error('Error analyzing artwork:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: 'Failed to analyze artwork', 
        details: errorMessage,
        // Add a more user-friendly message
        message: "We couldn't analyze your artwork at this time. Please check your API key and try again."
      },
      { status: 500 }
    );
  }
}
