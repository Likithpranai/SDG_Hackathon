"use client";

import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ArtworkUpload } from '@/components/artwork/artwork-upload';

export default function UploadPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Upload Your Artwork</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
          Share your creative work with the Hong Kong art community. Uploading your artwork makes it 
          discoverable to potential buyers, collaborators, and art enthusiasts.
        </p>
        
        <ArtworkUpload 
          onSubmit={(formData) => {
            // In a real app, this would send the data to an API
            console.log('Form submitted:', formData);
            alert('Artwork uploaded successfully! (This is a demo)');
          }} 
        />
      </div>
    </MainLayout>
  );
}
