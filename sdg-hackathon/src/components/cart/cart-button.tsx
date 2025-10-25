"use client";

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { cn } from '@/utils/cn';

interface CartButtonProps {
  className?: string;
}

export function CartButton({ className }: CartButtonProps) {
  const { toggleCart, totalItems } = useCart();

  return (
    <button
      onClick={toggleCart}
      className={cn(
        "relative p-2.5 rounded-full transition-all transform hover:scale-105 hover:shadow-md",
        totalItems > 0 ? "bg-blue-50 dark:bg-blue-900/30" : "bg-white dark:bg-gray-800",
        className
      )}
      aria-label="Open cart"
    >
      <ShoppingBag className={cn(
        "h-6 w-6 transition-colors",
        totalItems > 0 ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
      )} />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full min-h-[20px] min-w-[20px] px-1 flex items-center justify-center">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
}
