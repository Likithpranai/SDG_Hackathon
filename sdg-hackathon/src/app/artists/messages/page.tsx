"use client";

import React, { useState, useEffect } from 'react';
import { MainLayout, RouteGuard } from '@/components';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui';
import { MessageCircle, ChevronRight, User, X, Check } from 'lucide-react';
import { getUserConversations, getConversationMessages, createMessage, markMessagesAsRead } from '@/data/mock/messages';
import { mockUsers } from '@/data/mock/users';
import { Message, Conversation } from '@/types';

export default function ArtistMessagesPage() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Get conversations for the current artist
  const conversations = user ? getUserConversations(user.id) : [];
  
  // Get the buyer for the selected conversation
  const selectedBuyer = selectedConversation 
    ? mockUsers.find(u => selectedConversation.participants.includes(u.id) && u.id !== user?.id) 
    : null;
  
  // Handle conversation selection
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    
    // Get messages for this conversation
    if (user) {
      const conversationMessages = getConversationMessages(conversation.id);
      setMessages(conversationMessages);
      
      // Mark messages as read
      markMessagesAsRead(conversation.id, user.id);
    }
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!messageInput.trim() || !user || !selectedConversation || !selectedBuyer) return;
    
    // Create a new message
    const newMessage = createMessage(user.id, selectedBuyer.id, messageInput);
    
    // Update the local messages state
    setMessages(prev => [...prev, newMessage]);
    
    // Clear the input
    setMessageInput('');
  };
  
  return (
    <RouteGuard requiredUserType="artist">
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Your Messages</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left sidebar - Conversations list */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4">Conversations</h2>
              
              {conversations.length > 0 ? (
                <div className="space-y-2">
                  {conversations.map(conversation => {
                    // Find the other participant (buyer)
                    const buyerId = conversation.participants.find(id => id !== user?.id);
                    const buyer = buyerId ? mockUsers.find(u => u.id === buyerId) : null;
                    
                    if (!buyer) return null;
                    
                    return (
                      <div 
                        key={conversation.id}
                        className={`p-3 rounded-lg cursor-pointer flex items-center ${
                          selectedConversation?.id === conversation.id 
                            ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                        } ${conversation.unreadCount > 0 ? 'font-semibold' : ''}`}
                        onClick={() => handleSelectConversation(conversation)}
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <img 
                            src={buyer.profileImage || '/placeholder-user.jpg'} 
                            alt={buyer.name}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{buyer.name}</h3>
                          <p className="text-xs text-gray-500 truncate max-w-[150px]">
                            {conversation.lastMessage?.content}
                          </p>
                        </div>
                        {conversation.unreadCount > 0 && (
                          <div className="bg-indigo-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">You don't have any messages yet.</p>
                  <p className="text-sm text-gray-400 mt-2">
                    When buyers contact you, their messages will appear here.
                  </p>
                </div>
              )}
            </div>
            
            {/* Right side - Conversation */}
            <div className="lg:col-span-2">
              {selectedConversation && selectedBuyer ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md h-[600px] flex flex-col">
                  {/* Conversation header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img 
                        src={selectedBuyer.profileImage || '/placeholder-user.jpg'} 
                        alt={selectedBuyer.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedBuyer.name}</h3>
                      <p className="text-xs text-gray-500">{selectedBuyer.location}</p>
                    </div>
                    <button 
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length > 0 ? (
                      messages.map(message => (
                        <div 
                          key={message.id}
                          className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.senderId === user?.id 
                                ? 'bg-indigo-500 text-white' 
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                            }`}
                          >
                            {message.content}
                            <div className="text-xs opacity-70 mt-1 flex items-center justify-end">
                              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              {message.senderId === user?.id && (
                                <Check className={`h-3 w-3 ml-1 ${message.read ? 'text-blue-400' : ''}`} />
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center">
                        <MessageCircle className="h-12 w-12 text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Start a conversation</h3>
                        <p className="text-gray-500 max-w-md">
                          Reply to {selectedBuyer.name} about their inquiry or commission request.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Message input */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button 
                        className="rounded-l-none"
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim()}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md h-[600px] flex flex-col items-center justify-center text-center p-6">
                  <MessageCircle className="h-16 w-16 text-gray-300 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Select a conversation</h2>
                  <p className="text-gray-500 max-w-md mb-6">
                    Choose a conversation from the list to view messages and respond to buyer inquiries.
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
