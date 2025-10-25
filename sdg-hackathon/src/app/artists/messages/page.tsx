"use client";

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { RouteGuard } from "@/components/auth/route-guard";
import { useAuth } from "@/contexts/auth-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageList } from "@/components/messaging/message-list";
import { ConversationView } from "@/components/messaging/conversation-view";
import { MessageRequests } from "@/components/messaging/message-requests";
import { MessageData, Conversation, MessageRequest } from "@/types/messaging";

export default function Messages() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("requests");
  const [messageRequests, setMessageRequests] = useState<MessageRequest[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<MessageRequest | null>(null);
  const [typingBuyers, setTypingBuyers] = useState<{[key: string]: boolean}>({});

  // Load mock data on component mount
  useEffect(() => {
    // Mock message requests
    const mockRequests: MessageRequest[] = [
      {
        id: "req1",
        senderId: "buyer1",
        senderName: "Emma Thompson",
        senderAvatar: "https://media.istockphoto.com/id/521577939/photo/advance-of-inner-paint.jpg?s=612x612&w=0&k=20&c=cUO1rlOng7aqJPXUrCiG0KmC-9y7LgCxkYSuj2tRito=",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        content: "Hello! I'm interested in commissioning a piece similar to your 'Ocean Dreams' artwork. Would you be available to discuss details?",
        read: false,
      },
      {
        id: "req2",
        senderId: "buyer2",
        senderName: "Michael Chen",
        senderAvatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTqrRd2tzsFIxaDNe8k-OPCbXXVUVQ1xF0w&s",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        content: "Hi there! I run a small gallery in San Francisco and I'm curating an exhibition on urban landscapes next month. I'd love to feature some of your work if you're interested.",
        read: false,
      },
      {
        id: "req3",
        senderId: "buyer3",
        senderName: "Sarah Williams",
        senderAvatar: "https://wallpapers.com/images/hd/cool-profile-picture-minion-13pu7815v42uvrsg.jpg",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
        content: "I've been following your work for years and I'm interested in purchasing 'Midnight Forest'. Is it still available? I'd also like to know if you offer framing options.",
        read: true,
      },
    ];

    // Mock conversations
    const mockConversations: Conversation[] = [
      {
        id: "conv1",
        participantId: "buyer4",
        participantName: "David Rodriguez",
        participantAvatar: "https://danforth.framingham.edu/wp-content/uploads/2020/03/1991.3-815x1024.jpg",
        lastMessage: {
          id: "msg1",
          senderId: "buyer4",
          content: "That sounds perfect! I'll send over the deposit today.",
          timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
          read: false,
        },
        messages: [
          {
            id: "msg1-1",
            senderId: "buyer4",
            content: "Hi! I'm interested in commissioning a custom piece for my new apartment.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
            read: true,
          },
          {
            id: "msg1-2",
            senderId: user?.id || "artist",
            content: "Hello David! I'd be happy to discuss a custom piece. What did you have in mind?",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
            read: true,
          },
          {
            id: "msg1-3",
            senderId: "buyer4",
            content: "I'm looking for something abstract with blues and greens, around 36x48 inches.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(), // 22 hours ago
            read: true,
          },
          {
            id: "msg1-4",
            senderId: user?.id || "artist",
            content: "I can definitely create something like that. My rate for a piece that size would be $1,200. I'd need a 50% deposit to get started, and it would take about 3 weeks to complete.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(), // 20 hours ago
            read: true,
          },
          {
            id: "msg1-5",
            senderId: "buyer4",
            content: "That sounds perfect! I'll send over the deposit today.",
            timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
            read: false,
          },
        ],
        unreadCount: 1,
      },
      {
        id: "conv2",
        participantId: "buyer5",
        participantName: "Olivia Johnson",
        participantAvatar: "https://images.unsplash.com/photo-1636690513351-0af1763f6237?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWJzdHJhY3QlMjBwcm9maWxlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
        lastMessage: {
          id: "msg2",
          senderId: user?.id || "artist",
          content: "I just shipped your print! Here's the tracking number: USPS12345678",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
          read: true,
        },
        messages: [
          {
            id: "msg2-1",
            senderId: "buyer5",
            content: "Hello! I'd like to purchase a print of 'Sunset Horizon'.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
            read: true,
          },
          {
            id: "msg2-2",
            senderId: user?.id || "artist",
            content: "Hi Olivia! Thank you for your interest. The print is available for $95 plus shipping. Would you like me to send you a payment link?",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 47).toISOString(), // 47 hours ago
            read: true,
          },
          {
            id: "msg2-3",
            senderId: "buyer5",
            content: "Yes, please! My shipping address is 123 Main St, Apt 4B, New York, NY 10001.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 46).toISOString(), // 46 hours ago
            read: true,
          },
          {
            id: "msg2-4",
            senderId: user?.id || "artist",
            content: "Perfect! Here's the payment link: [payment.link/sunset-horizon]. I'll ship it as soon as payment is confirmed.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 24 hours ago
            read: true,
          },
          {
            id: "msg2-5",
            senderId: "buyer5",
            content: "Payment sent! Looking forward to receiving the print.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
            read: true,
          },
          {
            id: "msg2-6",
            senderId: user?.id || "artist",
            content: "I just shipped your print! Here's the tracking number: USPS12345678",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
            read: true,
          },
        ],
        unreadCount: 0,
      },
      {
        id: "conv3",
        participantId: "buyer6",
        participantName: "James Wilson",
        participantAvatar: "https://images.unsplash.com/photo-1469719847081-4757697d117a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWJzdHJhY3QlMjBwcm9maWxlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
        lastMessage: {
          id: "msg3",
          senderId: "buyer6",
          content: "When do you think you'll have new pieces available in your shop?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
          read: false,
        },
        messages: [
          {
            id: "msg3-1",
            senderId: "buyer6",
            content: "I love your work! Just purchased 'City Lights' and it looks amazing in my living room.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
            read: true,
          },
          {
            id: "msg3-2",
            senderId: user?.id || "artist",
            content: "Thank you so much, James! I'm thrilled to hear you're enjoying it. Would love to see a photo of it in your space if you'd like to share!",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 70).toISOString(), // 70 hours ago
            read: true,
          },
          {
            id: "msg3-3",
            senderId: "buyer6",
            content: "Here's a photo! [image: city-lights-installed.jpg]",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
            read: true,
          },
          {
            id: "msg3-4",
            senderId: user?.id || "artist",
            content: "It looks perfect in that space! Thank you for sharing.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 47).toISOString(), // 47 hours ago
            read: true,
          },
          {
            id: "msg3-5",
            senderId: "buyer6",
            content: "When do you think you'll have new pieces available in your shop?",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
            read: false,
          },
        ],
        unreadCount: 1,
      },
    ];

    setMessageRequests(mockRequests);
    setConversations(mockConversations);
  }, [user?.id]);

  // Handle accepting a message request
  const handleAcceptRequest = (request: MessageRequest) => {
    // Create a new conversation from the request
    const newConversation: Conversation = {
      id: `conv-${request.id}`,
      participantId: request.senderId,
      participantName: request.senderName,
      participantAvatar: request.senderAvatar,
      lastMessage: {
        id: request.id,
        senderId: request.senderId,
        content: request.content,
        timestamp: request.timestamp,
        read: true,
      },
      messages: [
        {
          id: request.id,
          senderId: request.senderId,
          content: request.content,
          timestamp: request.timestamp,
          read: true,
        },
      ],
      unreadCount: 0,
    };

    // Add the new conversation and remove the request
    setConversations([newConversation, ...conversations]);
    setMessageRequests(messageRequests.filter(req => req.id !== request.id));
    setSelectedConversation(newConversation);
    setSelectedRequest(null);
    setActiveTab("conversations");
  };

  // Handle declining a message request
  const handleDeclineRequest = (requestId: string) => {
    setMessageRequests(messageRequests.filter(req => req.id !== requestId));
    setSelectedRequest(null);
  };

  // Handle sending a message in a conversation
  const handleSendMessage = (conversationId: string, content: string) => {
    if (!content.trim() || !user) return;

    // Create a new message
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };

    // Update the conversations with the new message
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          lastMessage: newMessage,
          messages: [...conv.messages, newMessage],
        };
      }
      return conv;
    });

    // Update state
    setConversations(updatedConversations);
    
    // Update the selected conversation to show the new message immediately
    const updatedSelectedConversation = updatedConversations.find(c => c.id === conversationId);
    if (updatedSelectedConversation) {
      setSelectedConversation(updatedSelectedConversation);
    }
    
    // Note: We've removed the automatic buyer response simulation
    // Messages are now just sent to the buyer without an automatic response
  };

  // Handle selecting a conversation
  const handleSelectConversation = (conversation: Conversation) => {
    // Mark conversation as read
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversation.id) {
        return {
          ...conv,
          unreadCount: 0,
          messages: conv.messages.map(msg => ({
            ...msg,
            read: true,
          })),
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setSelectedConversation(conversation);
    setSelectedRequest(null);
  };

  // Handle selecting a request
  const handleSelectRequest = (request: MessageRequest) => {
    // Mark request as read
    const updatedRequests = messageRequests.map(req => {
      if (req.id === request.id) {
        return {
          ...req,
          read: true,
        };
      }
      return req;
    });

    setMessageRequests(updatedRequests);
    setSelectedRequest(request);
    setSelectedConversation(null);
  };

  // Count unread messages
  const unreadRequestsCount = messageRequests.filter(req => !req.read).length;
  const unreadConversationsCount = conversations.reduce((count, conv) => count + conv.unreadCount, 0);

  return (
    <RouteGuard>
      <MainLayout>
        <div className="container mx-auto py-8 max-w-7xl">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Messages</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
            {/* Left sidebar with tabs and message lists */}
            <div className="md:col-span-1 border rounded-lg overflow-hidden bg-white dark:bg-[#1a1a2e] shadow-sm">
              <Tabs defaultValue="requests" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger 
                    value="requests" 
                    className="relative"
                  >
                    Message Requests
                    {unreadRequestsCount > 0 && (
                      <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadRequestsCount}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="conversations" 
                    className="relative"
                  >
                    Conversations
                    {unreadConversationsCount > 0 && (
                      <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadConversationsCount}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="requests" className="m-0">
                  <MessageList 
                    items={messageRequests} 
                    selectedId={selectedRequest?.id} 
                    onSelect={(item) => handleSelectRequest(item as MessageRequest)} 
                    emptyMessage="No new message requests"
                  />
                </TabsContent>
                
                <TabsContent value="conversations" className="m-0">
                  <MessageList 
                    items={conversations} 
                    selectedId={selectedConversation?.id} 
                    onSelect={(item) => handleSelectConversation(item as Conversation)} 
                    emptyMessage="No conversations yet"
                  />
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right content area */}
            <div className="md:col-span-2 border rounded-lg overflow-hidden bg-white dark:bg-[#1a1a2e] shadow-sm">
              {activeTab === "requests" && selectedRequest ? (
                <MessageRequests 
                  request={selectedRequest} 
                  onAccept={handleAcceptRequest} 
                  onDecline={handleDeclineRequest} 
                />
              ) : activeTab === "conversations" && selectedConversation ? (
                <ConversationView 
                  conversation={selectedConversation} 
                  onSendMessage={handleSendMessage} 
                  currentUserId={user?.id || "artist"}
                  isTyping={typingBuyers[selectedConversation.participantId] || false}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500 dark:text-gray-400">
                  <p className="mb-2 text-lg">
                    {activeTab === "requests" 
                      ? "Select a message request to view details" 
                      : "Select a conversation to start chatting"}
                  </p>
                  <p className="text-sm">
                    {activeTab === "requests" 
                      ? "You can accept or decline message requests from potential buyers" 
                      : "Your ongoing conversations with buyers will appear here"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </RouteGuard>
  );
}
