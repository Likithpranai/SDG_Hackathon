"use client";

import React from 'react';
import { CartButton } from '@/components/cart';
import { useAuth } from '@/contexts/auth-context';
import { Bell, Settings } from 'lucide-react';

export function Header() {
  const { isLoggedIn, isBuyer } = useAuth();
  
  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-white dark:bg-[#121225] border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left side - Title or breadcrumbs could go here */}
        <div>
          {/* Empty for now, could add page title or breadcrumbs */}
        </div>
        
        {/* Right side - Cart and other actions */}
        <div className="flex items-center space-x-4">
          {/* Show cart button only for buyers */}
          {isLoggedIn && isBuyer && (
            <div className="relative">
              <CartButton className="shadow-sm border border-gray-200 dark:border-gray-700" />
            </div>
          )}
          
          {/* Other header icons */}
          {isLoggedIn && (
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
