import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
  try {
    console.log('Testing Vercel Blob Storage configuration...');
    
    // Check if the BLOB_READ_WRITE_TOKEN environment variable is set
    const hasToken = !!process.env.BLOB_READ_WRITE_TOKEN;
    console.log(`BLOB_READ_WRITE_TOKEN is ${hasToken ? 'set' : 'not set'}`);
    
    // Try to list blobs to test the connection
    const blobs = await list();
    console.log(`Successfully listed ${blobs.blobs.length} blobs`);
    
    return NextResponse.json({
      success: true,
      message: 'Blob Storage is configured correctly',
      blobCount: blobs.blobs.length,
      hasToken: hasToken
    });
  } catch (error) {
    console.error('Error testing Blob Storage:', error);
    
    let errorMessage = 'Failed to test Blob Storage';
    if (error instanceof Error) {
      errorMessage = `${errorMessage}: ${error.message}`;
      console.error('Error details:', error.stack);
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: errorMessage,
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
