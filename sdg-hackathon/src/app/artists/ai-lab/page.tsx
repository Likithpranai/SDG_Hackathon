"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/contexts/auth-context";
import { RouteGuard } from "@/components/auth/route-guard";
import { Palette, Image as ImageIcon, ChevronRight, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArtistFeedback } from "@/components/ai-lab/artist-feedback";

// Define the feedback session type
interface FeedbackSession {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  feedback: string;
}

export default function AILab() {
  const router = useRouter();
  const { user } = useAuth();
  const [showFeedbackTool, setShowFeedbackTool] = useState(false);
  const [recentFeedback, setRecentFeedback] = useState<FeedbackSession[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackSession | null>(null);

  // Load saved feedback sessions from localStorage on component mount
  useEffect(() => {
    const savedFeedback = localStorage.getItem('artist-feedback-sessions');
    if (savedFeedback) {
      try {
        const parsedFeedback = JSON.parse(savedFeedback);
        setRecentFeedback(parsedFeedback);
      } catch (error) {
        console.error('Failed to parse saved feedback sessions:', error);
      }
    } else {
      // Initialize with example feedback if none exists
      const initialFeedback: FeedbackSession[] = [
        {
          id: 'example-1',
          title: "Abstract Cityscape",
          description: "Urban landscape with geometric shapes and vibrant colors",
          date: "Yesterday",
          image: "/artworks/digital_kowloon.jpg",
          feedback: "## ✨ Strengths\n\n- **Bold color choices**: Your use of vibrant colors creates visual impact\n- **Geometric composition**: Strong structural elements create a dynamic flow\n- **Depth perception**: Good use of layering to create a sense of depth\n\n&nbsp;\n\n## 🔍 Areas for Growth\n\n- **Color harmony**: Consider a more unified color palette\n- **Focal point**: Strengthen the main focal area to guide the viewer's eye\n- **Edge treatment**: Refine the transitions between geometric shapes\n\n&nbsp;\n\n## 💭 Reflection\n\nHow might you incorporate more organic elements to balance the geometric rigidity?"
        },
        {
          id: 'example-2',
          title: "Watercolor Portrait",
          description: "Portrait using watercolor techniques with soft color palette",
          date: "3 days ago",
          image: "/artworks/poetic_strokes.jpg",
          feedback: "## ✨ Strengths\n\n- **Delicate washes**: Beautiful transparent layering of watercolor\n- **Emotive expression**: The subject's emotion is well captured\n- **Color restraint**: Effective limited palette creates harmony\n\n&nbsp;\n\n## 🔍 Areas for Growth\n\n- **Value contrast**: Increase the range of lights and darks\n- **Edge control**: Vary hard and soft edges for more visual interest\n- **Background integration**: Better integrate the subject with the background\n\n&nbsp;\n\n## 💭 Reflection\n\nHow might you use negative space more intentionally in your composition?"
        }
      ];
      setRecentFeedback(initialFeedback);
      localStorage.setItem('artist-feedback-sessions', JSON.stringify(initialFeedback));
    }
  }, []);

  // Handle saving new feedback
  const handleFeedbackSaved = (newSession: FeedbackSession) => {
    // Limit to 10 most recent sessions to avoid localStorage quota issues
    const updatedFeedback = [newSession, ...recentFeedback].slice(0, 10);
    setRecentFeedback(updatedFeedback);
    
    try {
      localStorage.setItem('artist-feedback-sessions', JSON.stringify(updatedFeedback));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      // If we hit quota issues, try with fewer items
      try {
        const reducedFeedback = [newSession, ...recentFeedback.slice(0, 3)];
        localStorage.setItem('artist-feedback-sessions', JSON.stringify(reducedFeedback));
        setRecentFeedback(reducedFeedback);
      } catch (innerError) {
        console.error('Still failed to save to localStorage:', innerError);
        // Just keep the new session in memory without persisting
      }
    }
  };

  return (
    <RouteGuard requiredUserType="artist">
      <MainLayout>
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">AI Artist Feedback</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Get professional feedback on your artwork from our AI artist assistant
              </p>
            </div>
            
            {!showFeedbackTool && (
              <Button 
                className="mt-4 md:mt-0 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                onClick={() => setShowFeedbackTool(true)}
              >
                <Palette className="h-4 w-4 mr-2" />
                Get Feedback on Artwork
              </Button>
            )}
          </div>

          {/* AI Feedback Tool */}
          {showFeedbackTool ? (
            <div className="mb-8">
              <ArtistFeedback 
                onClose={() => {
                  setShowFeedbackTool(false);
                  setSelectedFeedback(null);
                }} 
                onFeedbackSaved={handleFeedbackSaved}
                initialSession={selectedFeedback}
              />
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <Palette className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Artist Feedback</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Upload your artwork and get professional feedback to improve your technique
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-6">
                <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-4">How it works:</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</span>
                    <span>Upload your artwork - any style or medium is welcome</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</span>
                    <span>Describe your artistic vision and goals for the piece</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">3</span>
                    <span>Receive detailed feedback on composition, technique, color theory, and more</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">4</span>
                    <span>Ask follow-up questions to get more specific guidance</span>
                  </li>
                </ul>
                
                <div className="mt-6">
                  <Button 
                    className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    onClick={() => setShowFeedbackTool(true)}
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Recent Feedback Sessions */}
          {recentFeedback.length > 0 && (
            <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Palette className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Recent Feedback Sessions
                </h2>
                <Button variant="outline" size="sm" className="text-sm">
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentFeedback.map((item) => (
                  <div
                    key={item.id}
                    className="bg-blue-50 dark:bg-blue-900/20 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:scale-[1.02] duration-300 cursor-pointer"
                    onClick={() => {
                      setSelectedFeedback(item);
                      setShowFeedbackTool(true);
                    }}
                  >
                    <div className="aspect-square relative bg-gray-200 dark:bg-gray-800">
                      {item.image ? (
                        <div className="relative w-full h-full">
                          <Image 
                            src={item.image} 
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="h-10 w-10 text-gray-400 dark:text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg text-blue-700 dark:text-blue-300">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{item.description}</p>
                      <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{item.date}</span>
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          View <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Create New Card */}
                <div 
                  className="bg-blue-50 dark:bg-blue-900/20 rounded-lg overflow-hidden border-2 border-dashed border-blue-300 dark:border-blue-700 flex flex-col items-center justify-center p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
                  onClick={() => setShowFeedbackTool(true)}
                >
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-3">
                    <PlusCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">Get New Feedback</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </MainLayout>
    </RouteGuard>
  );
}
