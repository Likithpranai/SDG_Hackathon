"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/contexts/auth-context";
import { Zap, Image as ImageIcon, Upload, Sparkles, PlusCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function AILab() {
  const router = useRouter();
  const { isLoggedIn, isArtist } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Redirect if not logged in as artist
  useEffect(() => {
    if (!isLoggedIn || !isArtist) {
      router.push("/login");
    }
  }, [isLoggedIn, isArtist, router]);

  // Mock data for AI Lab
  const recentExperiments = [
    {
      id: 1,
      title: "Abstract Cityscape",
      prompt: "Futuristic Hong Kong cityscape with neon lights and rain",
      date: "Yesterday",
      image: "/placeholder-ai-1.jpg",
    },
    {
      id: 2,
      title: "Watercolor Portrait",
      prompt: "Portrait in the style of watercolor painting, soft colors",
      date: "3 days ago",
      image: "/placeholder-ai-2.jpg",
    },
  ];

  const suggestedPrompts = [
    "A surreal landscape with floating islands and waterfalls",
    "Abstract art in the style of traditional Chinese painting",
    "Urban scene with dramatic lighting and reflections",
    "Portrait with mixed media techniques and vibrant colors",
  ];

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    // In a real app, this would call an AI generation API
    setTimeout(() => {
      setIsGenerating(false);
      // Here you would handle the generated image
    }, 2000);
  };

  if (!isLoggedIn || !isArtist) {
    return null; // Don't render anything while checking auth
  }

  return (
    <MainLayout>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">AI Lab</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Experiment and get feedback for your next creation
            </p>
          </div>
        </div>

        {/* AI Generation Tool */}
        <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center mb-6">
            <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Image Generator</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <Input
                  label="Describe what you want to create"
                  placeholder="E.g., A surreal landscape with floating islands and waterfalls"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900"
                />
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Try these prompts:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((suggestion, index) => (
                    <button
                      key={index}
                      className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                      onClick={() => setPrompt(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  onClick={handleGenerate}
                  disabled={!prompt || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <span className="animate-pulse">Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>

                <Button variant="outline" className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Reference
                </Button>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg aspect-square flex items-center justify-center">
              {isGenerating ? (
                <div className="text-center">
                  <Sparkles className="h-12 w-12 text-blue-500 dark:text-blue-400 animate-pulse mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Creating your masterpiece...</p>
                </div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Your generated image will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Experiments */}
        <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Zap className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              Recent Experiments
            </h2>
            <Button variant="outline" size="sm" className="text-sm">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentExperiments.map((experiment) => (
              <div
                key={experiment.id}
                className="bg-blue-50 dark:bg-blue-900/20 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:scale-[1.02] duration-300 cursor-pointer"
              >
                <div className="aspect-square relative bg-gray-200 dark:bg-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* In a real app, you would have actual images */}
                    <ImageIcon className="h-10 w-10 text-gray-400 dark:text-gray-600" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg text-blue-700 dark:text-blue-300">{experiment.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{experiment.prompt}</p>
                  <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{experiment.date}</span>
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      Edit <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Create New Card */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg overflow-hidden border-2 border-dashed border-blue-300 dark:border-blue-700 flex flex-col items-center justify-center p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-3">
                <PlusCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="font-medium text-blue-700 dark:text-blue-300">New Experiment</p>
            </div>
          </div>
        </div>

        {/* AI Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full inline-flex mb-4">
              <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Style Transfer</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Apply artistic styles to your existing artwork or photos
            </p>
            <Button variant="outline" className="text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700">
              Try Style Transfer
            </Button>
          </div>

          <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full inline-flex mb-4">
              <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">AI Feedback</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get composition and color analysis on your artwork
            </p>
            <Button variant="outline" className="text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700">
              Get AI Feedback
            </Button>
          </div>

          <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full inline-flex mb-4">
              <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Concept Generator</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Generate creative concepts and ideas for your next project
            </p>
            <Button variant="outline" className="text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700">
              Generate Concepts
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
