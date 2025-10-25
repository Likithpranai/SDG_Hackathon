import { NextRequest, NextResponse } from 'next/server';
import { IBMWatsonService } from '@/services/ibm-watson';

// Server-side access to environment variables
const WATSON_API_KEY = process.env.WATSON_API_KEY;
const WATSON_API_URL = process.env.WATSON_API_URL;
const WATSON_PLATFORM_URL = process.env.WATSON_PLATFORM_URL;
const WATSONX_URL = process.env.WATSONX_URL;
const WATSONX_INSTANCE_ID = process.env.WATSONX_INSTANCE_ID;
const WATSONX_VERSION = process.env.WATSONX_VERSION || '2023-05-01';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, originalImage, enhancedImage } = body;

    if (!messages || !originalImage || !enhancedImage) {
      return NextResponse.json(
        { error: 'Messages, original image, and enhanced image are required' },
        { status: 400 }
      );
    }

    // Call the IBM Watson service
    const response = await IBMWatsonService.chat({
      messages,
      originalImage,
      enhancedImage
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in AI chat:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
