"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (preferences: string) => void;
  isLoading: boolean;
}

export function ChatbotModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: ChatbotModalProps) {
  const [preferences, setPreferences] = useState("");

  const handleSubmit = () => {
    if (preferences.trim()) {
      onSubmit(preferences);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-purple-700 dark:text-purple-300">
            <MessageSquare className="h-5 w-5 mr-2" />
            Tell us about your ideal collaborator
          </DialogTitle>
          <DialogDescription>
            Describe your preferences for artist collaboration. Include details about art style, 
            tools, experience level, and any specific skills you're looking for.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Textarea
            placeholder="Example: I'm looking for a digital artist who specializes in 3D modeling and has experience with Blender. I prefer someone with at least 3 years of experience who can help with character design for my game project..."
            className="min-h-[150px]"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!preferences.trim() || isLoading}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Finding Perfect Matches...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Find Collaborators
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
