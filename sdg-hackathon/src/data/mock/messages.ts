import { Message, Conversation } from '@/types';
import { mockUsers } from './users';
import { mockArtists } from './artists';

// Sample buyer ID (assuming first user is a buyer)
const buyerId = mockUsers[0].id;

// Create mock messages
export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: buyerId,
    receiverId: mockArtists[0].id,
    content: 'Hello, I really love your traditional Chinese paintings. Would you be interested in creating a custom piece for my living room?',
    timestamp: '2024-03-15T09:30:00Z',
    read: true,
  },
  {
    id: '2',
    senderId: mockArtists[0].id,
    receiverId: buyerId,
    content: 'Thank you for your interest! I would be happy to discuss a custom piece. Could you tell me more about what you have in mind?',
    timestamp: '2024-03-15T10:45:00Z',
    read: true,
  },
  {
    id: '3',
    senderId: buyerId,
    receiverId: mockArtists[0].id,
    content: 'I was thinking of a landscape painting featuring Victoria Harbor at sunset, with traditional brushwork but some contemporary elements.',
    timestamp: '2024-03-15T11:20:00Z',
    read: true,
  },
  {
    id: '4',
    senderId: mockArtists[0].id,
    receiverId: buyerId,
    content: 'That sounds like an interesting project! I can definitely work with that concept. What size were you thinking of?',
    timestamp: '2024-03-15T14:05:00Z',
    read: false,
  },
  {
    id: '5',
    senderId: buyerId,
    receiverId: mockArtists[1].id,
    content: 'Hi, I saw your digital artwork and I\'m impressed by your cyberpunk style. Would you be available for a commission?',
    timestamp: '2024-03-14T16:20:00Z',
    read: true,
  },
  {
    id: '6',
    senderId: mockArtists[1].id,
    receiverId: buyerId,
    content: 'Hello! Thanks for reaching out. I am currently taking commissions. What kind of piece did you have in mind?',
    timestamp: '2024-03-14T17:45:00Z',
    read: true,
  },
  {
    id: '7',
    senderId: buyerId,
    receiverId: mockArtists[1].id,
    content: 'I\'d like a futuristic interpretation of Hong Kong\'s skyline that I could use as a digital display in my office.',
    timestamp: '2024-03-14T18:30:00Z',
    read: false,
  },
  {
    id: '8',
    senderId: buyerId,
    receiverId: mockArtists[2].id,
    content: 'Hello, I\'m interested in your mixed media work. Do you create pieces that incorporate textiles?',
    timestamp: '2024-03-10T11:15:00Z',
    read: true,
  },
  {
    id: '9',
    senderId: mockArtists[2].id,
    receiverId: buyerId,
    content: 'Hi there! Yes, I do work with textiles in my mixed media pieces. I\'d be happy to discuss what you\'re looking for.',
    timestamp: '2024-03-10T13:40:00Z',
    read: true,
  },
];

// Create mock conversations
export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [buyerId, mockArtists[0].id],
    lastMessage: mockMessages[3],
    unreadCount: 1,
    createdAt: '2024-03-15T09:30:00Z',
    updatedAt: '2024-03-15T14:05:00Z',
  },
  {
    id: '2',
    participants: [buyerId, mockArtists[1].id],
    lastMessage: mockMessages[6],
    unreadCount: 1,
    createdAt: '2024-03-14T16:20:00Z',
    updatedAt: '2024-03-14T18:30:00Z',
  },
  {
    id: '3',
    participants: [buyerId, mockArtists[2].id],
    lastMessage: mockMessages[8],
    unreadCount: 0,
    createdAt: '2024-03-10T11:15:00Z',
    updatedAt: '2024-03-10T13:40:00Z',
  },
];

// Helper function to get messages for a conversation
export function getConversationMessages(conversationId: string): Message[] {
  const conversation = mockConversations.find(c => c.id === conversationId);
  if (!conversation) return [];
  
  const [user1, user2] = conversation.participants;
  return mockMessages.filter(
    message => 
      (message.senderId === user1 && message.receiverId === user2) || 
      (message.senderId === user2 && message.receiverId === user1)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}

// Helper function to get conversations for a user
export function getUserConversations(userId: string): Conversation[] {
  return mockConversations
    .filter(conversation => conversation.participants.includes(userId))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

// Helper function to get a conversation between two users
export function getConversationBetweenUsers(userId1: string, userId2: string): Conversation | undefined {
  return mockConversations.find(
    conversation => 
      conversation.participants.includes(userId1) && 
      conversation.participants.includes(userId2)
  );
}

// Helper function to create a new message
export function createMessage(senderId: string, receiverId: string, content: string): Message {
  const newMessage: Message = {
    id: `msg_${Date.now()}`,
    senderId,
    receiverId,
    content,
    timestamp: new Date().toISOString(),
    read: false,
  };
  
  mockMessages.push(newMessage);
  
  // Update or create conversation
  let conversation = getConversationBetweenUsers(senderId, receiverId);
  
  if (conversation) {
    conversation.lastMessage = newMessage;
    conversation.updatedAt = newMessage.timestamp;
    conversation.unreadCount += 1;
  } else {
    const newConversation: Conversation = {
      id: `conv_${Date.now()}`,
      participants: [senderId, receiverId],
      lastMessage: newMessage,
      unreadCount: 1,
      createdAt: newMessage.timestamp,
      updatedAt: newMessage.timestamp,
    };
    mockConversations.push(newConversation);
  }
  
  return newMessage;
}

// Helper function to mark messages as read
export function markMessagesAsRead(conversationId: string, userId: string): void {
  const conversation = mockConversations.find(c => c.id === conversationId);
  if (!conversation) return;
  
  const otherUserId = conversation.participants.find(id => id !== userId);
  if (!otherUserId) return;
  
  mockMessages.forEach(message => {
    if (message.senderId === otherUserId && message.receiverId === userId) {
      message.read = true;
    }
  });
  
  conversation.unreadCount = 0;
}
