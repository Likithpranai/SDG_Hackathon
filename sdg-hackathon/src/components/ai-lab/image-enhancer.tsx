"use client";

import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  MessageSquare, 
  Send, 
  X,
  Loader2,
  RefreshCw,
  Download,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { cn } from "@/utils/cn";

interface ImageEnhancerProps {
  onClose?: () => void;
}

export function ImageEnhancer({ onClose }: ImageEnhancerProps) {
  const [step, setStep] = useState<'upload' | 'processing' | 'results'>('upload');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [feedback, setFeedback] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [chatInput, setChatInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      // Call our API endpoint that connects to IBM Watson
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
        throw new Error('Failed to enhance image');
      }
      
      const data = await response.json();
      setEnhancedImage(data.enhancedImage);
      setFeedback(data.feedback);
      setStep('results');
    } catch (error) {
      console.error("Error enhancing image:", error);
      alert("Failed to enhance image. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim() || !originalImage || !enhancedImage) return;
    
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
          originalImage: originalImage,
          enhancedImage: enhancedImage
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
      
      // If the AI generated a new enhanced image, update it
      if (data.newEnhancedImage) {
        setEnhancedImage(data.newEnhancedImage);
      }
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
    setEnhancedImage(null);
    setDescription("");
    setFeedback("");
    setChatMessages([]);
    setStep('upload');
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // This function is no longer needed as we're using the API
  // Keeping it commented for reference
  /*
  const generateMockFeedback = (desc: string): string => {
    return `
Based on your artwork and description, here are some suggestions to enhance your piece:

1. **Color Composition**: The color palette could be more harmonious. I've adjusted the saturation of the blues and added warmer tones in the highlights to create more depth.

2. **Emotional Intent**: To better convey the ${desc.includes("calm") ? "calm" : "dynamic"} feeling you mentioned, I've ${desc.includes("calm") ? "softened the contrast and added more gradual transitions" : "increased the contrast and added more defined edges"}.

3. **Technical Execution**: The ${desc.includes("perspective") ? "perspective" : "composition"} has been slightly adjusted to create a stronger focal point and guide the viewer's eye through the piece.

4. **Lighting**: I've enhanced the lighting to create more dramatic shadows and highlights, which helps emphasize the three-dimensional quality of your work.

The enhanced version maintains your original artistic vision while refining these elements to better achieve your stated goals.
`;
  };
  */

  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">AI Art Enhancement</h2>
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
                <Sparkles className="h-4 w-4 mr-2" />
                Enhance & Get Feedback
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
              Our AI is analyzing your artwork, understanding your vision, and creating an enhanced version with personalized feedback...
            </p>
          </div>
        )}

        {step === 'results' && originalImage && enhancedImage && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Original Image */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Original Artwork</h3>
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
                        Ask questions or provide additional context to refine the enhancement
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

              {/* Enhanced Image */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Enhanced Artwork</h3>
                <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <Image 
                    src={enhancedImage} 
                    alt="Enhanced artwork" 
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">AI Feedback</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400 prose dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: feedback.replace(/\n/g, '<br />') }} />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                    onClick={() => {
                      // In a real app, this would download the enhanced image
                      const link = document.createElement('a');
                      link.href = enhancedImage;
                      link.download = 'enhanced-artwork.png';
                      link.click();
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Enhanced
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-gray-300 dark:border-gray-700"
                    onClick={handleReset}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Start New Enhancement
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
