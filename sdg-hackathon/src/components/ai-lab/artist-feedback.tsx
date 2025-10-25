"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  Upload, 
  Image as ImageIcon, 
  X,
  Loader2,
  RefreshCw,
  Download,
  ThumbsUp,
  ThumbsDown,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { cn } from "@/utils/cn";

// Custom components for ReactMarkdown to enhance styling
const MarkdownComponents = {
  h2: ({ children, ...props }: React.ComponentPropsWithoutRef<'h2'>) => {
    // Extract emoji from children if it exists
    const childrenArray = React.Children.toArray(children);
    const firstChild = childrenArray[0];
    const restChildren = childrenArray.slice(1);
    
    // Check if the first child is a string and starts with an emoji (simpler approach)
    const hasEmoji = typeof firstChild === 'string' && /^\s*[\p{Emoji}]/u.test(firstChild);
    
    if (hasEmoji) {
      // Extract emoji and text with a simpler regex
      const match = (firstChild as string).match(/^\s*([\p{Emoji}])\s*(.*)$/u);
      if (match) {
        const [, emoji, text] = match;
        return (
          <h2 className="flex items-center gap-3 mt-8 first:mt-2 pb-2" {...props}>
            <span className="text-2xl">{emoji}</span>
            <span>{text}</span>
            {restChildren}
          </h2>
        );
      }
    }
    
    // Default rendering if no emoji is found
    return <h2 className="flex items-center gap-2 mt-8 first:mt-2" {...props}>{children}</h2>;
  },
  p: ({ children, ...props }: React.ComponentPropsWithoutRef<'p'>) => {
    return <p className="my-4" {...props}>{children}</p>;
  },
  ul: ({ children, ...props }: React.ComponentPropsWithoutRef<'ul'>) => {
    return <ul className="my-4 space-y-3" {...props}>{children}</ul>;
  },
  li: ({ children, ...props }: React.ComponentPropsWithoutRef<'li'>) => {
    return (
      <li className="ml-2 relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-3 before:h-3 before:bg-blue-100 dark:before:bg-blue-900/50 before:rounded-full" {...props}>
        {children}
      </li>
    );
  },
};

interface FeedbackSession {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  feedback: string;
}

interface ArtistFeedbackProps {
  onClose?: () => void;
  onFeedbackSaved?: (session: FeedbackSession) => void;
  initialSession?: FeedbackSession;
}

export function ArtistFeedback({ onClose, onFeedbackSaved, initialSession }: ArtistFeedbackProps) {
  // Initialize with the provided session if available
  const [step, setStep] = useState<'upload' | 'processing' | 'results'>(initialSession ? 'results' : 'upload');
  const [originalImage, setOriginalImage] = useState<string | null>(initialSession?.image || null);
  const [description, setDescription] = useState(initialSession?.description || "");
  const [feedback, setFeedback] = useState(initialSession?.feedback || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Set the title for the page
  const sessionTitle = initialSession?.title || "New Artwork Feedback";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          setOriginalImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!originalImage || !description) return;
    
    setIsSubmitting(true);
    setStep('processing');
    
    try {
      // Call our API endpoint that connects to AI service
      const response = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: originalImage,
          description: description
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze artwork');
      }
      
      const data = await response.json();
      setFeedback(data.feedback);
      setStep('results');
      
      // Save the feedback session if the callback is provided
      if (onFeedbackSaved) {
        const title = description.split('.')[0].trim();
        
        // Process the image for storage
        let imageToStore = '';
        if (originalImage) {
          // If it's a public URL, store that directly
          if (originalImage.startsWith('/')) {
            imageToStore = originalImage;
          } else {
            // For uploaded images (base64), create a smaller version to save space
            try {
              // Create a temporary canvas to resize the image
              const img = new Image() as HTMLImageElement;
              img.src = originalImage;
              
              // Wait for the image to load
              await new Promise((resolve) => {
                img.onload = resolve;
              });
              
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              
              // Calculate new dimensions (max 300px width/height while preserving aspect ratio)
              const maxDimension = 300;
              let width = img.width;
              let height = img.height;
              
              if (width > height && width > maxDimension) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              } else if (height > maxDimension) {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
              
              // Set canvas dimensions and draw resized image
              canvas.width = width;
              canvas.height = height;
              ctx?.drawImage(img, 0, 0, width, height);
              
              // Convert to JPEG with reduced quality
              imageToStore = canvas.toDataURL('image/jpeg', 0.7);
            } catch (error) {
              console.error('Error creating thumbnail:', error);
              // Fallback to the original image if there's an error
              imageToStore = originalImage;
            }
          }
        } else {
          // If no image, use placeholder
          imageToStore = '/placeholder-image.jpg';
        }
        
        const feedbackSession: FeedbackSession = {
          id: `session-${Date.now()}`,
          title: title.length > 30 ? title.substring(0, 30) + '...' : title,
          description: description.length > 100 ? description.substring(0, 100) + '...' : description,
          date: new Date().toLocaleDateString(),
          image: imageToStore || '/placeholder-image.jpg',
          feedback: data.feedback
        };
        onFeedbackSaved(feedbackSession);
      }
    } catch (error) {
      console.error("Error analyzing artwork:", error);
      
      // Try to extract error message from response if available
      let errorMessage = "Failed to analyze artwork. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      // If it's a response error, try to get the detailed message
      if (error instanceof Response || (error as any)?.json) {
        try {
          const data = await (error as Response).json();
          if (data.message) {
            errorMessage = data.message;
          }
        } catch (e) {
          // Ignore JSON parsing errors
        }
      }
      
      // Set feedback to error message with markdown formatting
      setFeedback(`## ❌ Error Analyzing Artwork

${errorMessage}

&nbsp;

## 🔧 Troubleshooting Tips

- **Check Connection**: Ensure your internet connection is stable
- **API Key**: Verify your API key is correctly set in .env.local
- **Image Format**: Try uploading a different image format (JPG or PNG)
- **File Size**: Make sure your image isn't too large (keep under 5MB)

&nbsp;

Please try again after addressing these potential issues.`);
      
      // Still show results screen but with error message
      setStep('results');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Chat functionality removed

  const handleReset = () => {
    setOriginalImage(null);
    setDescription("");
    setFeedback("");
    setStep('upload');
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Palette className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">AI Artist Feedback</h2>
            {initialSession && (
              <p className="text-sm text-gray-600 dark:text-gray-400">Viewing: {sessionTitle}</p>
            )}
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {step === 'upload' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Your Artwork
              </label>
              <div 
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-colors",
                  originalImage 
                    ? "border-blue-500 dark:border-blue-500" 
                    : "border-gray-300 dark:border-gray-700"
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                {originalImage ? (
                  <div className="relative w-full aspect-square max-w-md mx-auto">
                    <Image 
                      src={originalImage} 
                      alt="Original artwork" 
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-center">
                      <Upload className="h-10 w-10 text-blue-500 dark:text-blue-400" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Describe Your Artwork & Vision
              </label>
              <Textarea
                placeholder="Describe your artwork, what it represents, the mood you're trying to convey, and any specific aspects you'd like feedback on..."
                className="min-h-[120px] bg-gray-50 dark:bg-gray-900"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                The more details you provide, the better the AI can understand your artistic goals.
              </p>
            </div>

            <div className="flex justify-end">
              <Button
                className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                onClick={handleSubmit}
                disabled={!originalImage || !description || isSubmitting}
              >
                <Palette className="h-4 w-4 mr-2" />
                Get Artist Feedback
              </Button>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="py-12 text-center">
            <Loader2 className="h-12 w-12 text-blue-500 dark:text-blue-400 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Analyzing Your Artwork
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Our AI artist is analyzing your artwork, understanding your vision, and preparing personalized feedback...
            </p>
          </div>
        )}

        {step === 'results' && originalImage && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Original Image */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Artwork</h3>
                <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <Image 
                    src={originalImage} 
                    alt="Original artwork" 
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Description</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                </div>
              </div>

              {/* Feedback */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Professional Feedback</h3>
                
                <div className="bg-linear-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900/50 rounded-lg p-6 shadow-md border border-blue-100 dark:border-blue-900/50">
                  <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-4 flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900/40 p-1.5 rounded-full mr-2">
                      <Palette className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    AI Artist Feedback
                  </h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400 prose dark:prose-invert max-w-none
                    prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-blue-600 dark:prose-h2:text-blue-300 prose-h2:pb-2 prose-h2:border-b prose-h2:border-blue-100 dark:prose-h2:border-blue-900/30
                    prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-purple-600 dark:prose-h3:text-purple-300
                    prose-p:my-4 prose-p:leading-relaxed
                    prose-ul:my-4 prose-ul:space-y-3
                    prose-li:my-2 prose-li:leading-relaxed prose-li:ml-2
                    prose-strong:text-blue-700 dark:prose-strong:text-blue-300 prose-strong:font-semibold
                    ">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]} 
                      components={MarkdownComponents}
                    >
                      {feedback}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                    onClick={() => {
                      // In a real app, this would download the feedback as a PDF
                      const element = document.createElement('a');
                      const file = new Blob([feedback], {type: 'text/plain'});
                      element.href = URL.createObjectURL(file);
                      element.download = 'artwork-feedback.txt';
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Feedback
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-gray-300 dark:border-gray-700"
                    onClick={handleReset}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Get Feedback on New Artwork
                  </Button>

                  <div className="flex ml-auto">
                    <Button
                      variant="ghost"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20 h-10 w-10 p-0"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 h-10 w-10 p-0"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
