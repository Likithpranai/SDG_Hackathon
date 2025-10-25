import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, DollarSign, ThumbsUp, ThumbsDown } from 'lucide-react';

interface PricingSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  artworkTitle?: string;
  priceRange: string;
  rationale: string;
  isLoading: boolean;
  error?: string;
}

export function PricingSuggestionModal({
  isOpen,
  onClose,
  imageUrl,
  artworkTitle,
  priceRange,
  rationale,
  isLoading,
  error
}: PricingSuggestionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary-500" />
            AI Pricing Suggestion
          </DialogTitle>
          <DialogDescription>
            {artworkTitle ? `For "${artworkTitle}"` : "For your artwork"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary-500 mb-4" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Analyzing your artwork and generating pricing suggestions...
              </p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              <p className="text-sm mt-2">Please try again later.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <div className="aspect-square relative rounded-md overflow-hidden border border-gray-200 dark:border-gray-800">
                    {imageUrl && (
                      <img 
                        src={imageUrl} 
                        alt={artworkTitle || "Artwork"} 
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-4 rounded-lg border border-primary-100 dark:border-primary-800">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-primary-500" />
                      <h3 className="font-medium">Suggested Price Range</h3>
                    </div>
                    <p className="text-lg font-bold text-primary-700 dark:text-primary-300">
                      {priceRange}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Pricing Rationale:</h4>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-sm">
                  {rationale.split('\n').map((paragraph, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-xs text-blue-600 dark:text-blue-400">
                <p>This is an AI-generated suggestion based on the visual analysis of your artwork and current market trends. Actual pricing may vary based on additional factors.</p>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              disabled={isLoading}
            >
              <ThumbsUp className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:inline">Helpful</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              disabled={isLoading}
            >
              <ThumbsDown className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:inline">Not Helpful</span>
            </Button>
          </div>
          <Button onClick={onClose} disabled={isLoading}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
