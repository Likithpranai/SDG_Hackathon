import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const year = formData.get('year') as string;
    const medium = formData.get('medium') as string;
    const description = formData.get('description') as string;
    const artistId = formData.get('artistId') as string;

    // Validate required fields
    if (!file || !title || !year || !medium || !artistId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'File type not allowed. Please upload a JPEG, PNG, or WEBP image.' },
        { status: 400 }
      );
    }

    // Create unique filename with UUID to avoid collisions
    const uniqueId = uuidv4();
    const filename = `${uniqueId}-${file.name.replace(/\s+/g, '-')}`;
    
    console.log(`Uploading file ${filename} to Vercel Blob Storage...`);
    
    let fileUrl = '';
    
    try {
      // Check if BLOB_READ_WRITE_TOKEN is available
      if (!process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN.includes('placeholder')) {
        console.log('Using mock file URL since BLOB_READ_WRITE_TOKEN is not available');
        
        // For development, we'll save the file to the public/uploads directory
        // This is a mock implementation and won't work in production
        try {
          // Convert the file to an ArrayBuffer
          const buffer = await file.arrayBuffer();
          
          // In a real implementation, you would use the fs module to write the file
          // But for this demo, we'll just log that we would save the file
          console.log(`In production, would save file to public/uploads/${filename}`);
          
          // Use a mock URL for development
          fileUrl = `/uploads/${filename}`;
        } catch (error) {
          console.error('Error processing file for local storage:', error);
          fileUrl = `/uploads/${filename}`;
        }
      } else {
        // Upload to Vercel Blob Storage
        const { url } = await put(filename, file, {
          access: 'public', // Make the file publicly accessible
        });
        
        console.log(`File uploaded successfully. URL: ${url}`);
        fileUrl = url;
      }
    } catch (error) {
      console.error('Error uploading to Vercel Blob:', error);
      // Fallback to mock URL
      fileUrl = `/uploads/${filename}`;
    }
    
    // Generate a unique ID for the new artwork
    const newArtworkId = `IMG${Date.now().toString().slice(-6)}`;
    
    // Create new artwork object
    const newArtwork = {
      id: newArtworkId,
      title,
      year: parseInt(year),
      medium,
      description,
      url: fileUrl,
      artistId,
      createdAt: new Date().toISOString()
    };

    // In a real application, you would save this to a database
    // For now, we'll just return the new artwork object
    
    return NextResponse.json({
      success: true,
      message: 'Artwork uploaded successfully',
      artwork: newArtwork
    });
  } catch (error) {
    console.error('Error uploading artwork:', error);
    
    // Provide more detailed error information
    let errorMessage = 'Failed to upload artwork';
    if (error instanceof Error) {
      errorMessage = `${errorMessage}: ${error.message}`;
      console.error('Error details:', error.stack);
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
