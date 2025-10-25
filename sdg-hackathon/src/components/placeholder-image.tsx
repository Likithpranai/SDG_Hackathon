"use client";

import React from 'react';

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  text?: string;
  className?: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width = 300,
  height = 300,
  text = 'Artist Image',
  className = '',
}) => {
  // Generate a random background color based on the text
  const getColorFromText = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Generate a pastel color
    const h = hash % 360;
    return `hsl(${h}, 70%, 80%)`;
  };

  const bgColor = getColorFromText(text);
  const textColor = '#333';

  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <div className="text-center p-4">
        <div className="text-4xl mb-2">👨‍🎨</div>
        <div className="font-medium">{text}</div>
      </div>
    </div>
  );
};
