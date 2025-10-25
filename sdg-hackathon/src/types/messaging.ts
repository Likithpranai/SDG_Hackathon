// Basic message data structure
export interface MessageData {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

// Conversation structure
export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: MessageData;
  messages: MessageData[];
  unreadCount: number;
}

// Message request from a buyer to an artist
export interface MessageRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  timestamp: string;
  content: string;
  read: boolean;
}
