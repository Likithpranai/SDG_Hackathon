"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, Mail, Globe, MessageSquare } from "lucide-react";
import { ArtistRecommendation } from "@/lib/grok-api";

interface ArtistDetailsModalProps {
  artist: ArtistRecommendation | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArtistDetailsModal({
  artist,
  isOpen,
  onClose,
}: ArtistDetailsModalProps) {
  if (!artist) return null;

  const {
    name,
    compatibilityScore,
    location,
    bio,
    detailedAnalysis,
    collaborationPotential,
    collaborationInsights,
    portfolioHighlights,
    contactInformation,
  } = artist;

  // Helper function to render score bars
  const renderScoreBar = (score: number, maxScore: number, color: string) => {
    const percentage = (score / maxScore) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className={`h-2.5 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-700 dark:text-purple-300 flex items-center">
            <Users className="h-6 w-6 mr-2" />
            Artist Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with name and score */}
          <div className="flex justify-between items-center border-b pb-4 border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold">{name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{location}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {/* Calculate total score as sum of individual scores */}
                {(
                  detailedAnalysis.toolExpertise.score +
                  detailedAnalysis.artTypeAlignment.score +
                  detailedAnalysis.projectRelevance.score +
                  detailedAnalysis.experienceLevel.score +
                  detailedAnalysis.portfolioQuality.score
                ).toFixed(1)}/100
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Compatibility Score</p>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="font-medium mb-2">Bio</h3>
            <p className="text-gray-700 dark:text-gray-300">{bio}</p>
          </div>

          {/* Detailed Compatibility Analysis */}
          <div>
            <h3 className="font-medium mb-3">Detailed Compatibility Analysis</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Tool Expertise</span>
                  <span className="text-purple-700 dark:text-purple-300">
                    {detailedAnalysis.toolExpertise.score}/{detailedAnalysis.toolExpertise.maxScore} - {detailedAnalysis.toolExpertise.rating}
                  </span>
                </div>
                {renderScoreBar(
                  detailedAnalysis.toolExpertise.score,
                  detailedAnalysis.toolExpertise.maxScore,
                  "bg-purple-600"
                )}
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                  {detailedAnalysis.toolExpertise.description}
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Art Type Alignment</span>
                  <span className="text-purple-700 dark:text-purple-300">
                    {detailedAnalysis.artTypeAlignment.score}/{detailedAnalysis.artTypeAlignment.maxScore} - {detailedAnalysis.artTypeAlignment.rating}
                  </span>
                </div>
                {renderScoreBar(
                  detailedAnalysis.artTypeAlignment.score,
                  detailedAnalysis.artTypeAlignment.maxScore,
                  "bg-indigo-600"
                )}
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                  {detailedAnalysis.artTypeAlignment.description}
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Project Relevance</span>
                  <span className="text-purple-700 dark:text-purple-300">
                    {detailedAnalysis.projectRelevance.score}/{detailedAnalysis.projectRelevance.maxScore} - {detailedAnalysis.projectRelevance.rating}
                  </span>
                </div>
                {renderScoreBar(
                  detailedAnalysis.projectRelevance.score,
                  detailedAnalysis.projectRelevance.maxScore,
                  "bg-blue-600"
                )}
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                  {detailedAnalysis.projectRelevance.description}
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Experience Level</span>
                  <span className="text-purple-700 dark:text-purple-300">
                    {detailedAnalysis.experienceLevel.score}/{detailedAnalysis.experienceLevel.maxScore} - {detailedAnalysis.experienceLevel.rating}
                  </span>
                </div>
                {renderScoreBar(
                  detailedAnalysis.experienceLevel.score,
                  detailedAnalysis.experienceLevel.maxScore,
                  "bg-teal-600"
                )}
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                  {detailedAnalysis.experienceLevel.description}
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Portfolio Quality</span>
                  <span className="text-purple-700 dark:text-purple-300">
                    {detailedAnalysis.portfolioQuality.score}/{detailedAnalysis.portfolioQuality.maxScore} - {detailedAnalysis.portfolioQuality.rating}
                  </span>
                </div>
                {renderScoreBar(
                  detailedAnalysis.portfolioQuality.score,
                  detailedAnalysis.portfolioQuality.maxScore,
                  "bg-pink-600"
                )}
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                  {detailedAnalysis.portfolioQuality.description}
                </p>
              </div>
            </div>
          </div>

          {/* Collaboration Potential */}
          <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Collaboration Potential</h3>
            {/* Calculate total score and determine rating based on it */}
            {(() => {
              const totalScore = (
                detailedAnalysis.toolExpertise.score +
                detailedAnalysis.artTypeAlignment.score +
                detailedAnalysis.projectRelevance.score +
                detailedAnalysis.experienceLevel.score +
                detailedAnalysis.portfolioQuality.score
              );
              
              let rating, description;
              if (totalScore >= 90) {
                rating = "Excellent Match (90-100%)";
                description = "This artist would be an exceptional collaborator for your project.";
              } else if (totalScore >= 75) {
                rating = "Strong Match (75-89%)";
                description = "This artist would be a very good collaborator for your project.";
              } else if (totalScore >= 60) {
                rating = "Good Match (60-74%)";
                description = "This artist would be a suitable collaborator for your project.";
              } else {
                rating = "Moderate Match (Below 60%)";
                description = "This artist may be a potential collaborator, but there might be some compatibility challenges.";
              }
              
              return (
                <>
                  <p className="font-bold text-purple-700 dark:text-purple-300">
                    {rating}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    {description}
                  </p>
                </>
              );
            })()}
          </div>

          {/* Collaboration Insights */}
          <div>
            <h3 className="font-medium mb-2">Specific Collaboration Insights</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              {collaborationInsights.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </div>

          {/* Portfolio Highlights */}
          <div>
            <h3 className="font-medium mb-3">Portfolio Highlights</h3>
            <div className="space-y-4">
              {portfolioHighlights.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg"
                >
                  <h4 className="font-bold text-purple-700 dark:text-purple-300">
                    {project.title} ({project.year})
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {project.medium}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {project.description}
                  </p>
                  <p className="text-sm font-medium mt-2">
                    Status: {project.status}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-medium mb-3">Contact Information</h3>
            <div className="space-y-2">
              {contactInformation.website && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-gray-500" />
                  <a
                    href={`https://${contactInformation.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    {contactInformation.website}
                  </a>
                </div>
              )}
              {contactInformation.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <a
                    href={`mailto:${contactInformation.email}`}
                    className="text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    {contactInformation.email}
                  </a>
                </div>
              )}
              {contactInformation.social && (
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{contactInformation.social}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="mr-2"
          >
            Close
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Artist
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
