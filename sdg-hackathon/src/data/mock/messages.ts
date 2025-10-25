import { Message, Conversation } from '@/types';
import { mockUsers } from './users';
import { mockArtists } from './artists';

// Sample buyer ID (matching the auto-login buyer in auth-context)
const buyerId = 'mock-buyer-1';

// Create mock messages
export const mockMessages: Message[] = [
  // Conversation with Mei Lin about custom traditional Chinese painting
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
  
  // Conversation with David Wong about digital art commission
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
  
  // Conversation with Sarah Chen about mixed media work
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
  
  // Conversation with Michael Zhang about photography
  {
    id: '10',
    senderId: buyerId,
    receiverId: mockArtists[3].id,
    content: 'I really liked your photography of Hong Kong\'s urban landscapes. Do you sell prints of your work?',
    timestamp: '2024-03-18T15:20:00Z',
    read: true,
  },
  {
    id: '11',
    senderId: mockArtists[3].id,
    receiverId: buyerId,
    content: 'Thank you for your interest in my photography! Yes, I do offer limited edition prints of most of my work. Which pieces were you interested in?',
    timestamp: '2024-03-18T16:45:00Z',
    read: true,
  },
  {
    id: '12',
    senderId: buyerId,
    receiverId: mockArtists[3].id,
    content: 'I particularly loved your "Neon Reflections" series. The one with the rain-soaked streets in Mong Kok is stunning.',
    timestamp: '2024-03-18T17:30:00Z',
    read: true,
  },
  {
    id: '13',
    senderId: mockArtists[3].id,
    receiverId: buyerId,
    content: 'That\'s one of my favorites too! I have that available in three sizes. Would you like me to send you the pricing and availability information?',
    timestamp: '2024-03-18T18:15:00Z',
    read: true,
  },
  {
    id: '14',
    senderId: buyerId,
    receiverId: mockArtists[3].id,
    content: 'Yes, please. I\'m also wondering if you do custom sizes or framing options?',
    timestamp: '2024-03-19T09:10:00Z',
    read: false,
  },
  
  // Conversation with Lily Kwok about calligraphy
  {
    id: '15',
    senderId: buyerId,
    receiverId: mockArtists[4].id,
    content: 'Hello, I\'ve been following your calligraphy work and I\'m interested in commissioning a piece for my home office.',
    timestamp: '2024-03-05T10:25:00Z',
    read: true,
  },
  {
    id: '16',
    senderId: mockArtists[4].id,
    receiverId: buyerId,
    content: 'Hello! Thank you for your interest in my calligraphy. I would be delighted to create a custom piece for you. Did you have any specific characters or phrases in mind?',
    timestamp: '2024-03-05T11:40:00Z',
    read: true,
  },
  {
    id: '17',
    senderId: buyerId,
    receiverId: mockArtists[4].id,
    content: 'I was thinking of a piece with the characters for "harmony" and "balance" - something that would bring a sense of calm to my workspace.',
    timestamp: '2024-03-05T13:15:00Z',
    read: true,
  },
  {
    id: '18',
    senderId: mockArtists[4].id,
    receiverId: buyerId,
    content: 'That\'s a beautiful concept. I can create something that captures both the meaning and the aesthetic you\'re looking for. Would you prefer a traditional or more contemporary style?',
    timestamp: '2024-03-05T14:30:00Z',
    read: true,
  },
  {
    id: '19',
    senderId: buyerId,
    receiverId: mockArtists[4].id,
    content: 'I think a blend of both would be perfect - something that honors the traditional form but has a modern sensibility to it.',
    timestamp: '2024-03-05T15:45:00Z',
    read: true,
  },
  {
    id: '20',
    senderId: mockArtists[4].id,
    receiverId: buyerId,
    content: 'I specialize in exactly that kind of fusion. I can prepare some concept sketches for you to review. What size were you thinking for your office space?',
    timestamp: '2024-03-05T16:20:00Z',
    read: true,
  },
  
  // Conversation with Emma Wong about ceramics
  {
    id: '21',
    senderId: buyerId,
    receiverId: mockArtists[6].id,
    content: 'Hi Emma, I saw your ceramic pieces at the recent Hong Kong Craft Fair and was really impressed. Do you take custom orders for dinnerware sets?',
    timestamp: '2024-03-22T14:10:00Z',
    read: true,
  },
  {
    id: '22',
    senderId: mockArtists[6].id,
    receiverId: buyerId,
    content: 'Thank you for reaching out! Yes, I do create custom dinnerware sets. I\'d be happy to discuss what you\'re looking for. How many pieces were you thinking of?',
    timestamp: '2024-03-22T15:30:00Z',
    read: false,
  },
  
  // Conversation with Sophia Chan about textile art
  {
    id: '23',
    senderId: buyerId,
    receiverId: mockArtists[8].id,
    content: 'Hello Sophia, I\'m interested in your textile art for my new apartment. Do you have any pieces that would work well in a living room with a coastal theme?',
    timestamp: '2024-03-20T11:05:00Z',
    read: true,
  },
  {
    id: '24',
    senderId: mockArtists[8].id,
    receiverId: buyerId,
    content: 'Hi there! Thanks for your interest in my work. I actually have several pieces with blue and teal tones that would complement a coastal theme beautifully. Would you like me to send you some photos?',
    timestamp: '2024-03-20T12:15:00Z',
    read: true,
  },
  {
    id: '25',
    senderId: buyerId,
    receiverId: mockArtists[8].id,
    content: 'That would be great! I\'m particularly looking for something that could be a focal point above my sofa. My space has lots of natural light and white walls.',
    timestamp: '2024-03-20T13:40:00Z',
    read: true,
  },
  {
    id: '26',
    senderId: mockArtists[8].id,
    receiverId: buyerId,
    content: 'Perfect! I have a few larger pieces that would work wonderfully as a focal point. I\'ll send you images of my "Ocean Currents" series and "Coastal Memories" collection. The textures really come alive in natural light.',
    timestamp: '2024-03-20T14:25:00Z',
    read: false,
  },
  
  // Conversation with Victoria Lam about purchasing a seascape painting
  {
    id: '27',
    senderId: buyerId,
    receiverId: mockArtists[10].id,
    content: 'Hello Victoria, I just saw your seascape collection at the Hong Kong Art Fair and I\'m absolutely in love with your work. I\'m interested in purchasing "Morning Tides at Repulse Bay" - is it still available?',
    timestamp: '2024-03-23T10:15:00Z',
    read: true,
  },
  {
    id: '28',
    senderId: mockArtists[10].id,
    receiverId: buyerId,
    content: 'Thank you so much for your interest in my work! Yes, "Morning Tides at Repulse Bay" is still available. It\'s one of my favorite pieces from that collection.',
    timestamp: '2024-03-23T11:30:00Z',
    read: true,
  },
  {
    id: '29',
    senderId: buyerId,
    receiverId: mockArtists[10].id,
    content: 'That\'s great news! Could you let me know the price and dimensions? Also, do you handle delivery or would I need to arrange pickup?',
    timestamp: '2024-03-23T12:45:00Z',
    read: true,
  },
  {
    id: '30',
    senderId: mockArtists[10].id,
    receiverId: buyerId,
    content: 'The piece is 90cm x 120cm, oil on canvas, priced at HK$28,000. I can arrange delivery within Hong Kong for a small fee, or you\'re welcome to pick it up from my studio in Repulse Bay.',
    timestamp: '2024-03-23T13:20:00Z',
    read: true,
  },
  {
    id: '31',
    senderId: buyerId,
    receiverId: mockArtists[10].id,
    content: 'Perfect! I\'d like to purchase it with delivery. What payment methods do you accept? And when could you deliver?',
    timestamp: '2024-03-23T14:05:00Z',
    read: true,
  },
  {
    id: '32',
    senderId: mockArtists[10].id,
    receiverId: buyerId,
    content: 'Wonderful! I accept bank transfer or PayPal. Once payment is received, I can arrange delivery within 3-5 business days. Would you like me to send you an invoice with the details?',
    timestamp: '2024-03-23T14:30:00Z',
    read: true,
  },
  {
    id: '33',
    senderId: buyerId,
    receiverId: mockArtists[10].id,
    content: 'Yes, please send the invoice. I\'ll do a bank transfer right away. I\'m really excited to have this piece in my home!',
    timestamp: '2024-03-23T15:00:00Z',
    read: true,
  },
  {
    id: '34',
    senderId: mockArtists[10].id,
    receiverId: buyerId,
    content: 'Invoice sent to your email. Thank you so much for your support of my work! I\'m thrilled that "Morning Tides" will be going to a good home. Please let me know when you receive the painting!',
    timestamp: '2024-03-23T15:45:00Z',
    read: false,
  },
  
  // Conversation with Ryan Chow about purchasing prints
  {
    id: '35',
    senderId: buyerId,
    receiverId: mockArtists[11].id,
    content: 'Hi Ryan, I saw your prints at the Sham Shui Po exhibition last weekend. I really liked your "Street Market Series" - do you sell these prints online?',
    timestamp: '2024-03-24T09:20:00Z',
    read: true,
  },
  {
    id: '36',
    senderId: mockArtists[11].id,
    receiverId: buyerId,
    content: 'Hello! Thanks for reaching out. Yes, I do sell prints online through my website. The Street Market Series has been quite popular - which specific prints caught your eye?',
    timestamp: '2024-03-24T10:15:00Z',
    read: true,
  },
  {
    id: '37',
    senderId: buyerId,
    receiverId: mockArtists[11].id,
    content: 'I particularly liked the "Midnight Vendors" and "Morning Flowers" prints. What sizes do you offer and what are your prices?',
    timestamp: '2024-03-24T11:30:00Z',
    read: true,
  },
  {
    id: '38',
    senderId: mockArtists[11].id,
    receiverId: buyerId,
    content: 'Great choices! Both are available in three sizes: A4 (HK$450), A3 (HK$750), and A2 (HK$1,200). Each print is signed and numbered, and comes with a certificate of authenticity. Would you like to purchase them?',
    timestamp: '2024-03-24T12:45:00Z',
    read: true,
  },
  {
    id: '39',
    senderId: buyerId,
    receiverId: mockArtists[11].id,
    content: 'Yes, I\'d like to buy both in A3 size. Do you ship them framed or unframed?',
    timestamp: '2024-03-24T13:20:00Z',
    read: true,
  },
  {
    id: '40',
    senderId: mockArtists[11].id,
    receiverId: buyerId,
    content: 'They come unframed by default, but I can arrange framing for an additional cost. Basic black frames would be HK$350 each. Would you like them framed?',
    timestamp: '2024-03-24T14:05:00Z',
    read: false,
  },
  
  // Conversation with Benjamin Ho about abstract painting
  {
    id: '41',
    senderId: buyerId,
    receiverId: mockArtists[13].id,
    content: 'Hello Benjamin, I recently visited your exhibition at the Hong Kong Arts Centre and was captivated by your abstract work. I\'m particularly interested in "Urban Fragments #3" - is it still available for purchase?',
    timestamp: '2024-03-25T10:30:00Z',
    read: true,
  },
  {
    id: '42',
    senderId: mockArtists[13].id,
    receiverId: buyerId,
    content: 'Thank you for your interest in my work! I\'m glad you enjoyed the exhibition. "Urban Fragments #3" is indeed still available. It\'s one of my favorite pieces from that series.',
    timestamp: '2024-03-25T11:45:00Z',
    read: true,
  },
  {
    id: '43',
    senderId: buyerId,
    receiverId: mockArtists[13].id,
    content: 'Wonderful! Could you tell me more about the piece? I\'m curious about your process and the inspiration behind it.',
    timestamp: '2024-03-25T13:20:00Z',
    read: true,
  },
  {
    id: '44',
    senderId: mockArtists[13].id,
    receiverId: buyerId,
    content: '"Urban Fragments #3" is part of my exploration of Hong Kong\'s changing urban landscape. I created it using layers of acrylic with collage elements from old maps and architectural drawings of North Point. The piece measures 100cm x 120cm and is priced at HK$32,000.',
    timestamp: '2024-03-25T14:10:00Z',
    read: true,
  },
  {
    id: '45',
    senderId: buyerId,
    receiverId: mockArtists[13].id,
    content: 'The concept and execution sound fascinating. I\'d like to purchase it for my office. Do you offer installation services as well?',
    timestamp: '2024-03-25T15:30:00Z',
    read: false,
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
  {
    id: '4',
    participants: [buyerId, mockArtists[3].id],
    lastMessage: mockMessages[14],
    unreadCount: 1,
    createdAt: '2024-03-18T15:20:00Z',
    updatedAt: '2024-03-19T09:10:00Z',
  },
  {
    id: '5',
    participants: [buyerId, mockArtists[4].id],
    lastMessage: mockMessages[20],
    unreadCount: 0,
    createdAt: '2024-03-05T10:25:00Z',
    updatedAt: '2024-03-05T16:20:00Z',
  },
  {
    id: '6',
    participants: [buyerId, mockArtists[6].id],
    lastMessage: mockMessages[22],
    unreadCount: 1,
    createdAt: '2024-03-22T14:10:00Z',
    updatedAt: '2024-03-22T15:30:00Z',
  },
  {
    id: '7',
    participants: [buyerId, mockArtists[8].id],
    lastMessage: mockMessages[26],
    unreadCount: 1,
    createdAt: '2024-03-20T11:05:00Z',
    updatedAt: '2024-03-20T14:25:00Z',
  },
  {
    id: '8',
    participants: [buyerId, mockArtists[10].id],
    lastMessage: mockMessages[34],
    unreadCount: 1,
    createdAt: '2024-03-23T10:15:00Z',
    updatedAt: '2024-03-23T15:45:00Z',
  },
  {
    id: '9',
    participants: [buyerId, mockArtists[11].id],
    lastMessage: mockMessages[40],
    unreadCount: 1,
    createdAt: '2024-03-24T09:20:00Z',
    updatedAt: '2024-03-24T14:05:00Z',
  },
  {
    id: '10',
    participants: [buyerId, mockArtists[13].id],
    lastMessage: mockMessages[45],
    unreadCount: 1,
    createdAt: '2024-03-25T10:30:00Z',
    updatedAt: '2024-03-25T15:30:00Z',
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
