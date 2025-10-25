"use client";

import React, { useState } from "react";
import PostUploadPricingModal from "./post-upload-pricing-modal";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface UploadArtworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (artworkData: ArtworkFormData) => void;
}

export interface ArtworkFormData {
  title: string;
  year: number;
  medium: string;
  description: string;
  imageFile: File | null;
  imagePreview: string | null;
}

const initialFormState: ArtworkFormData = {
  title: "",
  year: new Date().getFullYear(),
  medium: "",
  description: "",
  imageFile: null,
  imagePreview: null
};

export default function UploadArtworkModal({ isOpen, onClose, onSubmit }: UploadArtworkModalProps) {
  const [formData, setFormData] = useState<ArtworkFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ success?: string; error?: string } | null>(null);
  
  // State for pricing suggestion modal
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [uploadedArtwork, setUploadedArtwork] = useState<ArtworkFormData | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) || new Date().getFullYear() : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadStatus(null);
    
    try {
      if (!formData.imageFile || !formData.title) {
        setUploadStatus({ error: 'Image and title are required' });
        return;
      }
      
      // Create form data to send to the API
      const apiFormData = new FormData();
      apiFormData.append('file', formData.imageFile);
      apiFormData.append('title', formData.title);
      apiFormData.append('year', formData.year.toString());
      apiFormData.append('medium', formData.medium);
      apiFormData.append('description', formData.description);
      apiFormData.append('artistId', 'ART001'); // Hardcoded for demo, should be dynamic
      
      // Send the data to our API endpoint
      const response = await fetch('/api/upload-artwork', {
        method: 'POST',
        body: apiFormData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload artwork');
      }
      
      const result = await response.json();
      
      // Show success message
      setUploadStatus({ success: 'Artwork uploaded successfully!' });
      
      // Pass the result to the parent component
      onSubmit(formData);
      
      // Save the uploaded artwork data for the pricing modal
      setUploadedArtwork(formData);
      
      // Close the upload modal and show pricing modal after a short delay
      console.log('Setting up to show pricing modal...');
      setTimeout(() => {
        console.log('Closing upload modal and opening pricing modal...');
        onClose();
        setIsPricingModalOpen(true);
        console.log('Pricing modal should be open now, artwork data:', formData);
      }, 1500);
      
      // Don't reset the form data yet - we need it for the pricing modal
    } catch (error: any) {
      console.error("Error uploading artwork:", error);
      setUploadStatus({ error: error.message || 'Failed to upload artwork' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      imageFile: null,
      imagePreview: null
    }));
  };

  // Reset form when modal is closed
  const handleClose = () => {
    // Only reset if we're not about to show the pricing modal
    if (!uploadedArtwork) {
      setFormData(initialFormState);
    }
    setUploadStatus(null);
    onClose();
  };
  
  // Handle closing the pricing modal
  const handlePricingModalClose = () => {
    setIsPricingModalOpen(false);
    // Now we can reset the form data
    setFormData(initialFormState);
    setUploadedArtwork(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Upload New Artwork</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="artwork-image" className="font-medium">Artwork Image</Label>
            
            {formData.imagePreview ? (
              <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                <img 
                  src={formData.imagePreview} 
                  alt="Artwork preview" 
                  className="w-full h-64 object-contain bg-gray-50 dark:bg-gray-900"
                />
                <button 
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-black/80"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <label 
                  htmlFor="artwork-image" 
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG or WEBP (MAX. 5MB)
                    </p>
                  </div>
                  <Input 
                    id="artwork-image" 
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="font-medium">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Urban Pulse"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          {/* Year */}
          <div className="space-y-2">
            <Label htmlFor="year" className="font-medium">Year</Label>
            <Input
              id="year"
              name="year"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              placeholder={new Date().getFullYear().toString()}
              value={formData.year}
              onChange={handleInputChange}
              required
            />
          </div>
          
          {/* Medium/Technique */}
          <div className="space-y-2">
            <Label htmlFor="medium" className="font-medium">Medium/Technique</Label>
            <Input
              id="medium"
              name="medium"
              placeholder="e.g., Digital (Procreate)"
              value={formData.medium}
              onChange={handleInputChange}
              required
            />
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="font-medium">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your artwork, including details like resolution, exhibitions, status, etc."
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </div>
          
          {/* Status Messages */}
          {uploadStatus?.error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-3 rounded-md mt-4">
              {uploadStatus.error}
            </div>
          )}
          {uploadStatus?.success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 p-3 rounded-md mt-4">
              {uploadStatus.success}
            </div>
          )}
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={!formData.imagePreview || !formData.title || isSubmitting}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Artwork
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      
      {/* Pricing Suggestion Modal */}
      <PostUploadPricingModal
        isOpen={isPricingModalOpen}
        onClose={handlePricingModalClose}
        artworkData={uploadedArtwork}
      />
    </Dialog>
  );
}
