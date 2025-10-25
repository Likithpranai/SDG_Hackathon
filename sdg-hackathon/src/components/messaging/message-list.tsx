"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";
import { MessageData, Conversation, MessageRequest } from "@/types/messaging";
import { cn } from "@/utils/cn";

type ListItem = Conversation | MessageRequest;

interface MessageListProps {
  items: ListItem[];
  selectedId: string | undefined;
  onSelect: (item: ListItem) => void;
  emptyMessage: string;
}

export function MessageList({ items, selectedId, onSelect, emptyMessage }: MessageListProps) {
  // Function to determine if an item is a conversation
  const isConversation = (item: ListItem): item is Conversation => {
    return 'participantId' in item;
  };

  // Function to get the appropriate display name
  const getDisplayName = (item: ListItem): string => {
    return isConversation(item) ? item.participantName : item.senderName;
  };

  // Function to get the appropriate avatar
  const getAvatar = (item: ListItem): string => {
    return isConversation(item) ? item.participantAvatar : item.senderAvatar;
  };

  // Function to get the message preview
  const getMessagePreview = (item: ListItem): string => {
    if (isConversation(item)) {
      return item.lastMessage.content;
    } else {
      return item.content;
    }
  };

  // Function to get the timestamp
  const getTimestamp = (item: ListItem): string => {
    const timestamp = isConversation(item) ? item.lastMessage.timestamp : item.timestamp;
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  // Function to check if item is unread
  const isUnread = (item: ListItem): boolean => {
    if (isConversation(item)) {
      return item.unreadCount > 0;
    } else {
      return !item.read;
    }
  };

  return (
    <div className="h-[calc(100vh-14rem)] overflow-y-auto">
      {items.length === 0 ? (
        <div className="flex items-center justify-center h-full p-4 text-gray-500 dark:text-gray-400">
          {emptyMessage}
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {items.map((item: ListItem) => (
            <li 
              key={item.id}
              onClick={() => onSelect(item)}
              className={cn(
                "flex p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer transition-colors",
                selectedId === item.id && "bg-gray-100 dark:bg-gray-900/70",
                isUnread(item) && "bg-blue-50 dark:bg-blue-900/20"
              )}
            >
              <div className="shrink-0 mr-4">
                <div className="relative">
                  <img 
                    src={getAvatar(item)} 
                    alt={getDisplayName(item)} 
                    className="h-12 w-12 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/40?text=?";
                    }}
                  />
                  {isUnread(item) && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 rounded-full h-3 w-3"></span>
                  )}
                </div>
              </div>
              <div className="min-w-0 grow">
                <div className="flex justify-between">
                  <p className={cn(
                    "text-sm font-medium text-gray-900 dark:text-white truncate",
                    isUnread(item) && "font-semibold"
                  )}>
                    {getDisplayName(item)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {getTimestamp(item)}
                  </p>
                </div>
                <p className={cn(
                  "text-sm text-gray-500 dark:text-gray-400 truncate",
                  isUnread(item) && "text-gray-900 dark:text-gray-200 font-medium"
                )}>
                  {getMessagePreview(item)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
