"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/contexts/auth-context";
import { Sparkles, Users, MessageSquare, Calendar, PlusCircle, Eye, CheckCircle, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChatbotModal } from "@/components/collaboration/chatbot-modal";
import { ArtistDetailsModal } from "@/components/collaboration/artist-details-modal";
import { ConnectionRequestModal } from "@/components/collaboration/connection-request-modal";
import { ArtistRecommendation, getArtistRecommendations } from "@/lib/grok-api";
import { NearbyMap } from "@/components/collaboration/nearby-map";

export default function CollaborationHub() {
  const router = useRouter();
  const { isLoggedIn, isArtist } = useAuth();
  
  // State for modals
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<ArtistRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // State for artist recommendations
  const [recommendedArtists, setRecommendedArtists] = useState<ArtistRecommendation[]>([]);
  
  // State for connection requests
  const [connectionRequests, setConnectionRequests] = useState<Record<string, {pending: boolean, message: string}>>({});

  // Redirect if not logged in as artist
  useEffect(() => {
    if (!isLoggedIn || !isArtist) {
      router.push("/login");
    }
  }, [isLoggedIn, isArtist, router]);
  
  // Handle preference submission
  const handlePreferenceSubmit = async (preferences: string) => {
    try {
      console.log("📣 Starting artist recommendation process with preferences:", preferences);
      setIsLoading(true);
      // Add a small delay to ensure the loading state is visible
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log("🔍 Calling Grok API for artist recommendations based on current trends...");
      const artists = await getArtistRecommendations(preferences);
      console.log("✅ Received artist recommendations from Grok API:", artists.length);
      
      setRecommendedArtists(artists);
      setIsChatbotOpen(false);
    } catch (error) {
      console.error("❌ Error getting artist recommendations:", error);
      // Keep the modal open if there's an error
      alert("Sorry, we couldn't find matching artists. Please try again with different preferences.");
    } finally {
      setIsLoading(false);
      console.log("💾 Artist recommendation process completed");
    }
  };
  
  // Open artist details modal
  const openArtistDetails = (artist: ArtistRecommendation) => {
    setSelectedArtist(artist);
    setIsDetailsModalOpen(true);
  };
  
  // Open connection request modal
  const openConnectionModal = (artist: ArtistRecommendation) => {
    setSelectedArtist(artist);
    setIsConnectionModalOpen(true);
  };
  
  // Handle connection request submission
  const handleConnectionSubmit = (message: string) => {
    if (!selectedArtist) return;
    
    // Update connection requests state
    setConnectionRequests(prev => ({
      ...prev,
      [selectedArtist.id]: {
        pending: true,
        message: message
      }
    }));
    
    // Log the action (for debugging purposes)
    console.log(`Connection request sent to ${selectedArtist.name} with message: ${message}`);
  };

  // Mock data for collaboration hub
  const activeCollaborations = [
    {
      id: 1,
      title: "Urban Landscapes Exhibition",
      members: 4,
      lastActivity: "2 hours ago",
      image: "/placeholder-collab-1.jpg",
    },
    {
      id: 2,
      title: "Digital Art Workshop Series",
      members: 7,
      lastActivity: "1 day ago",
      image: "/placeholder-collab-2.jpg",
    },
  ];

  // Use recommended artists from Grok API if available, otherwise use mock data
  const suggestedArtists = recommendedArtists.length > 0 ? recommendedArtists : [
    {
      id: "1",
      name: "Sarah Chen",
      specialty: "Digital Illustration",
      compatibilityScore: 92,
      location: "San Francisco, USA",
      bio: "Digital illustrator specializing in character design and concept art.",
      detailedAnalysis: {
        toolExpertise: {
          score: 25,
          maxScore: 30,
          rating: "Strong",
          description: "Proficient in industry-standard digital art tools."
        },
        artTypeAlignment: {
          score: 28,
          maxScore: 30,
          rating: "Excellent",
          description: "Specializes in digital illustration and character design."
        },
        projectRelevance: {
          score: 18,
          maxScore: 20,
          rating: "Strong",
          description: "Experience with similar collaborative projects."
        },
        experienceLevel: {
          score: 9,
          maxScore: 10,
          rating: "Excellent",
          description: "Over 7 years of professional experience."
        },
        portfolioQuality: {
          score: 8,
          maxScore: 10,
          rating: "Strong",
          description: "Impressive portfolio with major clients."
        }
      },
      collaborationPotential: {
        rating: "Excellent Match (90-100%)",
        description: "This artist would be an exceptional collaborator for your project."
      },
      collaborationInsights: [
        "Uses requested digital illustration tools",
        "Specializes in character design",
        "Has worked on similar projects"
      ],
      portfolioHighlights: [
        {
          title: "Fantasy Character Series",
          year: "2023",
          medium: "Digital (Procreate)",
          description: "Character designs for fantasy RPG",
          status: "Published"
        },
        {
          title: "Children's Book Illustrations",
          year: "2022",
          medium: "Digital (Photoshop)",
          description: "Full illustrations for award-winning children's book",
          status: "Published"
        },
        {
          title: "Concept Art Collection",
          year: "2021",
          medium: "Digital (Clip Studio)",
          description: "Environment concepts for animated series",
          status: "Completed"
        }
      ],
      contactInformation: {
        website: "sarahchen.art",
        email: "sarah@sarahchen.art",
        social: "@sarahchenart"
      }
    },
    {
      id: "2",
      name: "Michael Wong",
      specialty: "Traditional Painting",
      compatibilityScore: 87,
      location: "New York, USA",
      bio: "Traditional painter with focus on oil and acrylic techniques.",
      detailedAnalysis: {
        toolExpertise: {
          score: 22,
          maxScore: 30,
          rating: "Strong",
          description: "Expert in traditional painting techniques."
        },
        artTypeAlignment: {
          score: 25,
          maxScore: 30,
          rating: "Strong",
          description: "Specializes in traditional painting styles."
        },
        projectRelevance: {
          score: 16,
          maxScore: 20,
          rating: "Strong",
          description: "Relevant experience for your project needs."
        },
        experienceLevel: {
          score: 9,
          maxScore: 10,
          rating: "Excellent",
          description: "Over 10 years of professional experience."
        },
        portfolioQuality: {
          score: 8,
          maxScore: 10,
          rating: "Strong",
          description: "High-quality portfolio with gallery exhibitions."
        }
      },
      collaborationPotential: {
        rating: "Strong Match (75-89%)",
        description: "This artist would be a very good collaborator for your project."
      },
      collaborationInsights: [
        "Expert in traditional painting techniques",
        "Has gallery exhibition experience",
        "Strong technical foundation"
      ],
      portfolioHighlights: [
        {
          title: "Urban Landscapes",
          year: "2023",
          medium: "Oil on Canvas",
          description: "Series of cityscape paintings exhibited in NYC gallery",
          status: "Exhibited"
        },
        {
          title: "Portrait Collection",
          year: "2022",
          medium: "Acrylic on Canvas",
          description: "Commissioned portrait series for private collector",
          status: "Completed"
        },
        {
          title: "Abstract Expressions",
          year: "2021",
          medium: "Mixed Media",
          description: "Experimental series combining traditional and digital techniques",
          status: "Exhibited"
        }
      ],
      contactInformation: {
        website: "michaelwongart.com",
        email: "michael@michaelwongart.com",
        social: "@michaelwongart"
      }
    },
    {
      id: "3",
      name: "Aisha Patel",
      specialty: "Mixed Media",
      compatibilityScore: 85,
      location: "London, UK",
      bio: "Mixed media artist combining traditional and digital techniques.",
      detailedAnalysis: {
        toolExpertise: {
          score: 24,
          maxScore: 30,
          rating: "Strong",
          description: "Versatile with both traditional and digital tools."
        },
        artTypeAlignment: {
          score: 23,
          maxScore: 30,
          rating: "Strong",
          description: "Specializes in mixed media approaches."
        },
        projectRelevance: {
          score: 15,
          maxScore: 20,
          rating: "Good",
          description: "Experience with similar collaborative projects."
        },
        experienceLevel: {
          score: 8,
          maxScore: 10,
          rating: "Strong",
          description: "6 years of professional experience."
        },
        portfolioQuality: {
          score: 7,
          maxScore: 10,
          rating: "Good",
          description: "Solid portfolio with diverse projects."
        }
      },
      collaborationPotential: {
        rating: "Strong Match (75-89%)",
        description: "This artist would be a very good collaborator for your project."
      },
      collaborationInsights: [
        "Versatile with multiple mediums",
        "Experience with collaborative projects",
        "Innovative approach to art creation"
      ],
      portfolioHighlights: [
        {
          title: "Fusion Series",
          year: "2023",
          medium: "Mixed Media",
          description: "Combination of traditional painting with digital elements",
          status: "Exhibited"
        },
        {
          title: "Textile Art Project",
          year: "2022",
          medium: "Fabric, Digital Print",
          description: "Collaborative project with fashion designer",
          status: "Completed"
        },
        {
          title: "Interactive Installation",
          year: "2021",
          medium: "Mixed Media, Digital",
          description: "Gallery installation with interactive elements",
          status: "Exhibited"
        }
      ],
      contactInformation: {
        website: "aishapatel.co.uk",
        email: "aisha@aishapatel.co.uk",
        social: "@aishapatelart"
      }
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Virtual Sketching Session",
      date: "Tomorrow, 7:00 PM",
      participants: 12,
    },
    {
      id: 2,
      title: "Critique & Feedback Circle",
      date: "Friday, 6:30 PM",
      participants: 8,
    },
  ];

  if (!isLoggedIn || !isArtist) {
    return null; // Don't render anything while checking auth
  }

  return (
    <MainLayout>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-300">Collaboration Hub</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Fuel your creative vision with like-minded artists
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              className="bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              size="sm"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Collaboration
            </Button>
          </div>
        </div>

        {/* Active Collaborations */}
        <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
              Active Collaborations
            </h2>
            <Button variant="outline" size="sm" className="text-sm">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCollaborations.map((collab) => (
              <div
                key={collab.id}
                className="bg-purple-50 dark:bg-purple-900/20 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:scale-[1.02] duration-300 cursor-pointer"
              >
                <div className="aspect-video relative bg-gray-200 dark:bg-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* In a real app, you would have actual images */}
                    <Sparkles className="h-10 w-10 text-gray-400 dark:text-gray-600" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg text-purple-700 dark:text-purple-300">{collab.title}</h3>
                  <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" /> {collab.members} members
                    </span>
                    <span>Active {collab.lastActivity}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Create New Card */}
            <div 
              className="bg-purple-50 dark:bg-purple-900/20 rounded-lg overflow-hidden border-2 border-dashed border-purple-300 dark:border-purple-700 flex flex-col items-center justify-center p-6 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
              onClick={() => setIsChatbotOpen(true)}
            >
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-3">
                <PlusCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="font-medium text-purple-700 dark:text-purple-300">Start New Collaboration</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Suggested Artists */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                Artists You Might Like to Collaborate With
              </h2>
            </div>

            <div className="space-y-4">
              {suggestedArtists.map((artist) => (
                <div
                  key={artist.id}
                  className={`flex items-center p-4 rounded-lg transition-colors relative ${connectionRequests[artist.id]?.pending ? 'bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800' : 'bg-purple-50 dark:bg-purple-900/10 hover:bg-purple-100 dark:hover:bg-purple-900/20'}`}
                >
                  {connectionRequests[artist.id]?.pending && (
                    <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                      <div className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full shadow-sm flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> Pending
                      </div>
                    </div>
                  )}
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden mr-4">
                    <Users className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{artist.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{artist.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      {artist.compatibilityScore?.toFixed(1)}% match
                    </div>
                    <div className="flex space-x-1 mt-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs flex items-center"
                        onClick={() => openArtistDetails(artist)}
                      >
                        <Eye className="h-3 w-3 mr-1" /> View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={`text-xs transition-all ${connectionRequests[artist.id]?.pending 
                          ? 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100 hover:text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800 dark:hover:bg-amber-900/30 flex items-center' 
                          : ''}`}
                        onClick={() => !connectionRequests[artist.id]?.pending && openConnectionModal(artist)}
                        disabled={connectionRequests[artist.id]?.pending}
                      >
                        {connectionRequests[artist.id]?.pending ? (
                          <>
                            <Clock className="h-3 w-3 mr-1" /> Request Sent
                          </>
                        ) : (
                          'Connect'
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                Upcoming Events
              </h2>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white">{event.title}</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">{event.date}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <Users className="h-3 w-3 mr-1" /> {event.participants} participants
                    </span>
                    <Button variant="ghost" size="sm" className="text-xs p-1 h-auto">
                      Join
                    </Button>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full mt-4 text-sm">
                View All Events
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Artists and Studios Map */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
            Nearby Artists & Studios
          </h2>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Discover artists and studio spaces near you. Use the filters to find exactly what you're looking for.
          </p>
        </div>

        <NearbyMap />
      </div>

      {/* Chatbot Modal */}
      <ChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onSubmit={handlePreferenceSubmit}
        isLoading={isLoading}
      />

      {/* Artist Details Modal */}
      <ArtistDetailsModal
        artist={selectedArtist}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
      
      {/* Connection Request Modal */}
      {selectedArtist && (
        <ConnectionRequestModal
          isOpen={isConnectionModalOpen}
          onClose={() => setIsConnectionModalOpen(false)}
          onSubmit={handleConnectionSubmit}
          artistName={selectedArtist.name}
        />
      )}
    </MainLayout>
  );
}
