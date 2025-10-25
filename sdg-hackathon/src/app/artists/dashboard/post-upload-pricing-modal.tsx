"use client";

import React, { useEffect, useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DollarSign, Sparkles, ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";
// Use the real Grok API for market-specific pricing suggestions
import { getArtworkPricingSuggestion } from "@/lib/artwork-pricing-api";
import { ArtworkFormData } from "./upload-artwork-modal";

interface PostUploadPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  artworkData: ArtworkFormData | null;
}

export default function PostUploadPricingModal({ 
  isOpen, 
  onClose,
  artworkData 
}: PostUploadPricingModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pricingSuggestion, setPricingSuggestion] = useState<{
    priceRange: string;
    rationale: string;
  } | null>(null);

  // Get pricing suggestion when modal opens
  useEffect(() => {
    console.log('Pricing modal open state changed:', isOpen);
    console.log('Artwork data received:', artworkData);
    
    if (isOpen && artworkData && artworkData.imagePreview) {
      console.log('Conditions met, getting pricing suggestion...');
      getPricingSuggestion();
    } else if (isOpen) {
      console.log('Modal is open but missing artwork data or image preview');
    }
  }, [isOpen, artworkData]);

  const getPricingSuggestion = async () => {
    if (!artworkData || !artworkData.imagePreview) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Gather artwork details for better pricing accuracy
      const artworkDetails = {
        title: artworkData.title,
        medium: artworkData.medium,
        description: artworkData.description,
        year: artworkData.year?.toString()
      };
      
      // Get pricing suggestion using the real Grok API
      const suggestion = await getArtworkPricingSuggestion(artworkData.imagePreview, artworkDetails);
      
      // Update state with suggestion
      setPricingSuggestion({
        priceRange: suggestion.priceRange,
        rationale: suggestion.rationale
      });
    } catch (error) {
      console.error('Error getting pricing suggestion:', error);
      setError(error instanceof Error ? error.message : 'Failed to get pricing suggestion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-2 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
              AI Pricing Analysis
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <div className="h-20 w-20 rounded-full border-4 border-indigo-100 dark:border-indigo-900 flex items-center justify-center">
                  <Loader2 className="h-12 w-12 animate-spin text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-indigo-500 p-2 rounded-full">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-6 font-medium">
                Analyzing your artwork...
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                Our AI is evaluating market trends and collector preferences
              </p>
            </div>
          ) : error ? (
            <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 p-6 rounded-lg text-center border border-red-200 dark:border-red-800 shadow-sm">
              <p className="text-red-600 dark:text-red-400 mb-4 font-medium">{error}</p>
              <Button onClick={getPricingSuggestion} variant="outline" size="sm" className="bg-white dark:bg-gray-800">
                Try Again
              </Button>
            </div>
          ) : pricingSuggestion ? (
            <div className="space-y-6">
              {/* Artwork Preview with Info */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 w-full max-w-[220px] shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 mix-blend-overlay"></div>
                  {artworkData?.imagePreview && (
                    <img 
                      src={artworkData.imagePreview} 
                      alt={artworkData.title || "Artwork"} 
                      className="w-full h-48 object-contain bg-white dark:bg-gray-900"
                    />
                  )}
                  <div className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-700 dark:text-gray-300">
                    {artworkData?.year}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h3 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                      {artworkData?.title || "Untitled"}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">
                      {artworkData?.medium || "Mixed Media"}
                    </p>
                    {artworkData?.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-3 italic border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                        "{artworkData.description}"
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Price Suggestion */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-purple-100 dark:border-indigo-800 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-2 rounded-lg">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-medium text-lg">Suggested Price Range</h3>
                  </div>
                  <div className="bg-white/80 dark:bg-gray-900/80 px-2 py-1 rounded-full text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-purple-500" />
                    AI Generated
                  </div>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 mb-6 shadow-inner border border-purple-50 dark:border-indigo-900/30">
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-center">
                    {pricingSuggestion.priceRange}
                  </p>
                </div>
                
                {/* Market Analysis Section */}
                {pricingSuggestion.rationale.includes('##') ? (
                  <div className="bg-white/90 dark:bg-gray-900/90 rounded-lg shadow-inner overflow-auto max-h-[60vh] border border-purple-50 dark:border-indigo-900/30">
                    <div className="divide-y divide-purple-100 dark:divide-indigo-900/30">
                      {/* Parse markdown headings and lists */}
                      {pricingSuggestion.rationale.split('\n').reduce<Array<{type: string; content: string; items: string[]}>>((
                        sections, line, i) => {
                        // Handle main heading (title)
                        if (line.startsWith('## ')) {
                          sections.push({
                            type: 'title',
                            content: line.replace('## ', ''),
                            items: []
                          });
                        }
                        // Handle section headings
                        else if (line.startsWith('### ')) {
                          sections.push({
                            type: 'section',
                            content: line.replace('### ', ''),
                            items: []
                          });
                        }
                        // Handle list items
                        else if (line.startsWith('- ')) {
                          if (sections.length > 0) {
                            sections[sections.length - 1].items.push(line.replace('- ', ''));
                          }
                        }
                        // Handle regular paragraphs
                        else if (line.trim() !== '' && !line.startsWith('This analysis')) {
                          sections.push({
                            type: 'paragraph',
                            content: line,
                            items: []
                          });
                        }
                        return sections;
                      }, []).map((section, idx) => {
                        if (section.type === 'title') {
                          return (
                            <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10">
                              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                                {section.content}
                              </h2>
                            </div>
                          );
                        } else if (section.type === 'section') {
                          return (
                            <div key={idx} className="p-4">
                              <h3 className="text-lg font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                {section.content}
                              </h3>
                              {section.items.length > 0 && (
                                <div className="ml-4 space-y-2 mt-2">
                                  {section.items.map((item: string, i: number) => (
                                    <div key={i} className="flex items-start gap-2">
                                      <div className="rounded-full bg-indigo-200 dark:bg-indigo-800 h-1.5 w-1.5 mt-2 flex-shrink-0"></div>
                                      <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        } else {
                          return (
                            <div key={idx} className="p-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400">{section.content}</p>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                ) : (
                  // Fallback for non-markdown content
                  <div className="bg-white/50 dark:bg-black/20 p-4 rounded-lg text-sm">
                    {pricingSuggestion.rationale.split('\n').map((paragraph, i) => (
                      <p key={i} className={i > 0 ? 'mt-2' : ''}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 p-4 rounded-lg border border-blue-100 dark:border-purple-900/20 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                    <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">AI-Generated Market Analysis</p>
                    <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">
                      This analysis is based on current market trends, collector preferences, and visual assessment of your artwork. 
                      Consider it as a starting point for your pricing strategy. Actual pricing may vary based on your reputation, 
                      exhibition history, and specific market conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p>No pricing suggestion available.</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-between items-center border-t border-gray-100 dark:border-gray-800 pt-4 mt-2">
          <div className="flex gap-2">
            {!isLoading && !error && pricingSuggestion && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <ThumbsUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">Helpful</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <ThumbsDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <span className="text-gray-700 dark:text-gray-300">Not Helpful</span>
                </Button>
              </div>
            )}
          </div>
          <Button 
            onClick={onClose}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
