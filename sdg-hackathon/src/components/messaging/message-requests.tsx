"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";
import { MessageRequest } from "@/types/messaging";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface MessageRequestsProps {
  request: MessageRequest;
  onAccept: (request: MessageRequest) => void;
  onDecline: (requestId: string) => void;
}

export function MessageRequests({ request, onAccept, onDecline }: MessageRequestsProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b dark:border-gray-800 p-4">
        <div className="flex items-center">
          <img 
            src={request.senderAvatar} 
            alt={request.senderName} 
            className="h-12 w-12 rounded-full object-cover mr-4"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/40?text=?";
            }}
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{request.senderName}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sent {formatDistanceToNow(new Date(request.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>
      </div>

      {/* Message content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-gray-100 dark:bg-gray-900/70 p-4 rounded-lg">
          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{request.content}</p>
        </div>
        
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            This is a new message request. Would you like to respond?
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            If you accept, you'll be able to message with this buyer. If you decline, this request will be removed.
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="border-t dark:border-gray-800 p-4 flex justify-end space-x-3">
        <Button
          variant="outline"
          onClick={() => onDecline(request.id)}
          className="flex items-center"
        >
          <X className="h-4 w-4 mr-2" />
          Decline
        </Button>
        <Button
          onClick={() => onAccept(request)}
          className="flex items-center bg-blue-600 hover:bg-blue-700"
        >
          <Check className="h-4 w-4 mr-2" />
          Accept
        </Button>
      </div>
    </div>
  );
}
