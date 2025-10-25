"use client";

import React, { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Conversation, MessageData } from "@/types/messaging";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { cn } from "@/utils/cn";

interface ConversationViewProps {
  conversation: Conversation;
  onSendMessage: (conversationId: string, content: string) => void;
  currentUserId: string;
  isTyping?: boolean;
}

export function ConversationView({ conversation, onSendMessage, currentUserId, isTyping = false }: ConversationViewProps) {
  const [messageInput, setMessageInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages]);

  const handleSendMessage = () => {
    if (messageInput.trim() && !isSending) {
      // Set sending state
      setIsSending(true);
      
      // Store message content before clearing input
      const messageContent = messageInput;
      
      // Clear the input field immediately for better UX
      setMessageInput("");
      
      // Call the parent component's onSendMessage function
      onSendMessage(conversation.id, messageContent);
      
      // Reset sending state after a short delay
      setTimeout(() => {
        setIsSending(false);
        // Scroll to bottom after sending
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Group messages by date for better readability
  const groupedMessages: { [date: string]: MessageData[] } = {};
  
  // Ensure we're using the latest messages from the conversation prop
  useEffect(() => {
    // Force re-render when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages.length]);
  
  // Group messages by date
  conversation.messages.forEach(message => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b dark:border-gray-800 p-4">
        <div className="flex items-center">
          <img 
            src={conversation.participantAvatar} 
            alt={conversation.participantName} 
            className="h-12 w-12 rounded-full object-cover mr-4"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/40?text=?";
            }}
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {conversation.participantName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {conversation.lastMessage.timestamp ? 
                `Last active ${formatDistanceToNow(new Date(conversation.lastMessage.timestamp), { addSuffix: true })}` : 
                "Just now"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {Object.keys(groupedMessages).map(date => (
          <div key={date}>
            <div className="flex justify-center my-4">
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full">
                {date === new Date().toLocaleDateString() ? "Today" : date}
              </span>
            </div>
            
            {groupedMessages[date].map(message => (
              <div 
                key={message.id}
                className={cn(
                  "mb-4 max-w-[80%]",
                  message.senderId === currentUserId ? "ml-auto" : "mr-auto"
                )}
              >
                <div className={cn(
                  "p-3 rounded-lg",
                  message.senderId === currentUserId 
                    ? "bg-blue-600 text-white rounded-br-none" 
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
                )}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                <div className={cn(
                  "text-xs mt-1",
                  message.senderId === currentUserId ? "text-right" : "text-left",
                  "text-gray-500 dark:text-gray-400"
                )}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {message.senderId === currentUserId && (
                    <span className="ml-1">
                      {message.read ? "• Read" : "• Sent"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="mb-4 max-w-[80%] mr-auto">
            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none inline-flex">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 mr-1 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 mr-1 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></span>
              </span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="border-t dark:border-gray-800 p-4">
        <div className="flex items-center">
          <div className="grow relative">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full resize-none border rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white transition-all"
              rows={2}
              autoFocus
            />
            <div className="absolute right-2 bottom-2">
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || isSending}
                className={`h-9 w-9 p-0 rounded-full transition-all ${isSending ? 'bg-green-600' : messageInput.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 dark:bg-gray-700'}`}
                aria-label="Send message"
              >
                {isSending ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Press Enter to send, Shift+Enter for new line
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {messageInput.length > 0 ? `${messageInput.length} characters` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
