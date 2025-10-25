"use client";

import React from 'react';

interface PlaceholderImageProps {
  width?: number | string;
  height?: number | string;
  text?: string;
  className?: string;
  type?: 'artist' | 'artwork' | 'event' | 'speaker' | 'gallery';
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width = 300,
  height = 300,
  text = 'Image',
  className = '',
  type = 'artwork',
}) => {
  // Generate a random background color based on the text
  const getColorFromText = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Generate a pastel color based on type
    const h = hash % 360;
    
    switch (type) {
      case 'artist':
        return `hsl(${h}, 70%, 80%)`; // Pastel colors
      case 'artwork':
        return `hsl(${(h + 120) % 360}, 60%, 85%)`; // Slightly different pastel
      case 'event':
        return `hsl(${(h + 40) % 360}, 80%, 75%)`; // More vibrant
      case 'speaker':
        return `hsl(${(h + 200) % 360}, 65%, 80%)`; // Another pastel variant
      case 'gallery':
        return `hsl(${(h + 270) % 360}, 50%, 85%)`; // Softer pastel
      default:
        return `hsl(${h}, 70%, 80%)`;
    }
  };

  const bgColor = getColorFromText(text);
  const textColor = '#333';
  
  // Get emoji based on type
  const getEmoji = () => {
    switch (type) {
      case 'artist':
        return '👨‍🎨';
      case 'artwork':
        return '🖼️';
      case 'event':
        return '🎭';
      case 'speaker':
        return '🎤';
      case 'gallery':
        return '📸';
      default:
        return '📷';
    }
  };

  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <div className="text-center p-4">
        <div className="text-4xl mb-2">{getEmoji()}</div>
        <div className="font-medium">{text}</div>
      </div>
    </div>
  );
};
