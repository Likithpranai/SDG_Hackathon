"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  Upload, 
  Image as ImageIcon, 
  MessageSquare, 
  Send, 
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
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [chatInput, setChatInput] = useState("");
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
        
        // Create a thumbnail version of the image to avoid localStorage quota issues
        let thumbnailImage = '';
        if (originalImage) {
          // Store a reference to the image instead of the full base64 data
          // If it's a public URL, store that directly
          if (originalImage.startsWith('/')) {
            thumbnailImage = originalImage;
          } else {
            // For uploaded images, we'll just use a placeholder instead of storing the full image
            // In a real app, you'd use a proper image storage service like S3 or Firebase Storage
            try {
              // Just store a reference to the placeholder image
              thumbnailImage = '/placeholder-image.jpg';
              
              // Note: The proper way would be to upload the image to a server
              // and then store the URL, but that's beyond the scope of this demo
            } catch (error) {
              console.error('Error creating thumbnail:', error);
              // Fallback to a placeholder
              thumbnailImage = '/placeholder-image.jpg';
            }
          }
        }
        
        const feedbackSession: FeedbackSession = {
          id: `session-${Date.now()}`,
          title: title.length > 30 ? title.substring(0, 30) + '...' : title,
          description: description.length > 100 ? description.substring(0, 100) + '...' : description,
          date: new Date().toLocaleDateString(),
          image: thumbnailImage || '/placeholder-image.jpg',
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

  const handleChatSubmit = async () => {
    if (!chatInput.trim() || !originalImage) return;
    
    const newMessages = [
      ...chatMessages,
      { role: 'user' as const, content: chatInput }
    ];
    
    setChatMessages(newMessages);
    setChatInput("");
    setIsSubmitting(true);
    
    try {
      // Call our API endpoint for chat
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
          originalImage: originalImage
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to process chat');
      }
      
      const data = await response.json();
      
      // Add AI response to chat
      setChatMessages([
        ...newMessages,
        { role: 'assistant' as const, content: data.reply }
      ]);
    } catch (error) {
      console.error("Error in chat:", error);
      // Add error message to chat
      setChatMessages([
        ...newMessages,
        { role: 'assistant' as const, content: "I'm sorry, I encountered an error processing your request. Please try again." }
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setDescription("");
    setFeedback("");
    setChatMessages([]);
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

                {/* Chat Interface */}
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 border-b border-gray-200 dark:border-gray-800">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Follow-up Questions
                    </h4>
                  </div>
                  
                  <div className="p-3 max-h-[200px] overflow-y-auto space-y-3">
                    {chatMessages.length > 0 ? (
                      chatMessages.map((msg, index) => (
                        <div 
                          key={index} 
                          className={cn(
                            "p-3 rounded-lg max-w-[80%]",
                            msg.role === 'user' 
                              ? "bg-blue-100 dark:bg-blue-900/30 ml-auto text-blue-800 dark:text-blue-200" 
                              : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                          )}
                        >
                          {msg.content}
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-2">
                        Ask questions or provide additional context to refine the feedback
                      </p>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-800 p-3 flex">
                    <Textarea
                      placeholder="Ask a question or provide more context..."
                      className="min-h-[40px] bg-gray-50 dark:bg-gray-900 text-sm resize-none flex-1 mr-2"
                      value={chatInput}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setChatInput(e.target.value)}
                      onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleChatSubmit();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleChatSubmit}
                      disabled={!chatInput.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white h-10 w-10 p-0 flex items-center justify-center"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
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
