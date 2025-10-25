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
        "relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
        className
      )}
      aria-label="Open cart"
    >
      <ShoppingBag className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
}
