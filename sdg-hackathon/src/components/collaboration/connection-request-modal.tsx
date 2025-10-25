"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";

interface ConnectionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
  artistName: string;
}

export function ConnectionRequestModal({
  isOpen,
  onClose,
  onSubmit,
  artistName
}: ConnectionRequestModalProps) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate a short delay for better UX
    setTimeout(() => {
      onSubmit(message);
      setIsSubmitting(false);
      setMessage(""); // Reset the message
      onClose();
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Connect with {artistName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Send a personalized message to {artistName} explaining why you'd like to connect and collaborate.
          </p>
          
          <Textarea
            placeholder={`Hi ${artistName}, I'm interested in collaborating with you because...`}
            className="min-h-[120px] resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-500 flex justify-between">
            <span>This message will be sent along with your connection request.</span>
            <span>{message.length}/500 characters</span>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="mr-2"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            disabled={isSubmitting || message.trim().length === 0}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              <span className="flex items-center">
                <SendHorizontal className="h-4 w-4 mr-2" />
                Send Request
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
