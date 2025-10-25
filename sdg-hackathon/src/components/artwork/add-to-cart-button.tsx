"use client";

import React from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { Artwork } from '@/types';

interface AddToCartButtonProps {
  artwork: Artwork;
  className?: string;
  size?: 'sm' | 'lg' | 'md';
}

export function AddToCartButton({ artwork, className, size }: AddToCartButtonProps) {
  const { cart, addToCart } = useCart();
  const isInCart = cart.some(item => item.artwork.id === artwork.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(artwork);
    }
  };

  if (artwork.status !== 'available') {
    return null;
  }

  return (
    <Button
      onClick={handleAddToCart}
      variant={isInCart ? "outline" : "primary"}
      className={className}
      size={size}
      disabled={isInCart}
    >
      {isInCart ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
