"use client";

import React from "react";

interface AboutMeSectionProps {
  bio: string;
  experience: string;
  primaryMedium: string;
  email: string;
  age: number;
  skills: string;
}

export default function AboutMeSection({
  bio,
  experience,
  primaryMedium,
  email,
  age,
  skills
}: AboutMeSectionProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 border-8 border-double border-indigo-100 dark:border-indigo-900/30 rounded-lg transform -rotate-1"></div>
      <div className="absolute inset-0 border-4 border-dashed border-purple-100 dark:border-purple-900/30 rounded-lg transform rotate-1"></div>
      <div className="relative bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6 z-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
        <p className="text-gray-800 dark:text-gray-200 italic text-lg">"{bio}"</p>
        
        <div className="mt-6 space-y-5 text-base">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
            <span className="block text-gray-500 dark:text-gray-400 font-medium">Experience</span>
            <span className="font-bold text-gray-900 dark:text-white">{experience}</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
            <span className="block text-gray-500 dark:text-gray-400 font-medium">Primary Medium</span>
            <span className="font-bold text-gray-900 dark:text-white">{primaryMedium}</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
            <span className="block text-gray-500 dark:text-gray-400 font-medium">Email</span>
            <span className="font-bold text-gray-900 dark:text-white">{email}</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
            <span className="block text-gray-500 dark:text-gray-400 font-medium">Age</span>
            <span className="font-bold text-gray-900 dark:text-white">{age}</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
            <span className="block text-gray-500 dark:text-gray-400 font-medium">Skills</span>
            <span className="font-bold text-gray-900 dark:text-white">{skills}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
