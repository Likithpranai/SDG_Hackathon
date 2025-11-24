"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MainLayout, RouteGuard } from '@/components';
import { useMatchmaking } from '@/contexts/matchmaking-context';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui';
import { MessageCircle, ChevronRight, User, X, Loader2 } from 'lucide-react';
import { getUserConversations, getConversationMessages, createMessage } from '@/data/mock/messages';
import { mockArtists } from '@/data/mock';
import { Message } from '@/types';
import Link from 'next/link';

// Client component that uses useSearchParams
function ConversationsContent() {
  const { user } = useAuth();
  const { savedArtists } = useMatchmaking();
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const searchParams = useSearchParams();
  
  // Get conversations for the current user
  const conversations = user ? getUserConversations(user.id) : [];
  
  // Check if an artist ID was passed in the URL query
  useEffect(() => {
    const artistId = searchParams.get('artistId');
    if (artistId && savedArtists.some(artist => artist.id === artistId)) {
      handleSelectArtist(artistId);
    }
  }, [searchParams, savedArtists]);
  
  // Get the selected artist
  const selectedArtist = selectedArtistId 
    ? mockArtists.find(artist => artist.id === selectedArtistId) 
    : null;
  
  // Handle artist selection
  const handleSelectArtist = (artistId: string) => {
    setSelectedArtistId(artistId);
    
    // Get messages for this conversation
    if (user) {
      const conversation = conversations.find(
        conv => conv.participants.includes(artistId) && conv.participants.includes(user.id)
      );
      
      if (conversation) {
        const conversationMessages = getConversationMessages(conversation.id);
        setMessages(conversationMessages);
      } else {
        setMessages([]);
      }
    }
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!messageInput.trim() || !user || !selectedArtistId) return;
    
    // Create a new message
    const newMessage = createMessage(user.id, selectedArtistId, messageInput);
    
    // Update the local messages state
    setMessages(prev => [...prev, newMessage]);
    
    // Clear the input
    setMessageInput('');
  };
  
  return (
    <RouteGuard requiredUserType="buyer">
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Your Artist Conversations</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left sidebar - Artists list */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4">Matched Artists</h2>
              
              {savedArtists.length > 0 ? (
                <div className="space-y-2">
                  {savedArtists.map(artist => (
                    <div 
                      key={artist.id}
                      className={`p-3 rounded-lg cursor-pointer flex items-center ${
                        selectedArtistId === artist.id 
                          ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => handleSelectArtist(artist.id)}
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img 
                          src={artist.profileImage} 
                          alt={artist.name}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{artist.name}</h3>
                        <p className="text-xs text-gray-500">{artist.location}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">You haven't matched with any artists yet.</p>
                  <Link href="/buyers/matchmaking">
                    <Button className="mt-4">Find Artists</Button>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Right side - Conversation */}
            <div className="lg:col-span-2">
              {selectedArtist ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md h-[600px] flex flex-col">
                  {/* Conversation header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img 
                        src={selectedArtist.profileImage} 
                        alt={selectedArtist.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedArtist.name}</h3>
                      <p className="text-xs text-gray-500">{selectedArtist.location}</p>
                    </div>
                    <button 
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setSelectedArtistId(null)}
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
                            <div className="text-xs opacity-70 mt-1">
                              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center">
                        <MessageCircle className="h-12 w-12 text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Start a conversation</h3>
                        <p className="text-gray-500 max-w-md">
                          Send a message to {selectedArtist.name} about commissioning artwork or ask questions about their work.
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
                  <h2 className="text-xl font-semibold mb-2">Select an artist to start chatting</h2>
                  <p className="text-gray-500 max-w-md mb-6">
                    Choose an artist from your matches to start a conversation about commissioning artwork or to ask questions about their work.
                  </p>
                  {savedArtists.length === 0 && (
                    <Link href="/buyers/matchmaking">
                      <Button>Find Artists to Match With</Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </RouteGuard>
  );
}

// Main page component that wraps the client component in Suspense
export default function BuyerConversationsPage() {
  return (
    <Suspense fallback={
      <RouteGuard requiredUserType="buyer">
        <MainLayout>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Your Artist Conversations</h1>
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading conversations...</p>
            </div>
          </div>
        </MainLayout>
      </RouteGuard>
    }>
      <ConversationsContent />
    </Suspense>
  );
}
