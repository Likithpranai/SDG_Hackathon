"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/contexts/auth-context";
import { RouteGuard } from "@/components/auth/route-guard";
import { Sparkles, Users, MessageSquare, Calendar, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CollaborationHub() {
  const router = useRouter();
  const { user } = useAuth();

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

  const suggestedArtists = [
    {
      id: 1,
      name: "Sarah Chen",
      specialty: "Digital Illustration",
      matchScore: 92,
      image: "/placeholder-artist-1.jpg",
    },
    {
      id: 2,
      name: "Michael Wong",
      specialty: "Traditional Painting",
      matchScore: 87,
      image: "/placeholder-artist-2.jpg",
    },
    {
      id: 3,
      name: "Aisha Patel",
      specialty: "Mixed Media",
      matchScore: 85,
      image: "/placeholder-artist-3.jpg",
    },
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

  // RouteGuard will handle the auth check and redirection

  return (
    <RouteGuard requiredUserType="artist">
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
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg overflow-hidden border-2 border-dashed border-purple-300 dark:border-purple-700 flex flex-col items-center justify-center p-6 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer">
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
                  className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
                >
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden mr-4">
                    <Users className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{artist.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{artist.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      {artist.matchScore}% match
                    </div>
                    <Button variant="outline" size="sm" className="mt-1 text-xs">
                      Connect
                    </Button>
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
    </MainLayout>
    </RouteGuard>
  );
}
