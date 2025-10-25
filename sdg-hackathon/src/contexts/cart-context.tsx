"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Artwork } from '@/types';

interface CartItem {
  artwork: Artwork;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (artworkId: string) => void;
  updateQuantity: (artworkId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('artconnect-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('artconnect-cart', JSON.stringify(cart));
    
    // Calculate totals
    const items = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(items);
    
    const price = cart.reduce((sum, item) => {
      return sum + (item.artwork.price || 0) * item.quantity;
    }, 0);
    setTotalPrice(price);
  }, [cart]);

  const addToCart = (artwork: Artwork) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.artwork.id === artwork.id);
      
      if (existingItem) {
        // If item already exists, increase quantity
        return prevCart.map(item => 
          item.artwork.id === artwork.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Otherwise add new item with quantity 1
        return [...prevCart, { artwork, quantity: 1 }];
      }
    });
    
    // Open cart when adding an item
    setIsCartOpen(true);
  };

  const removeFromCart = (artworkId: string) => {
    setCart(prevCart => prevCart.filter(item => item.artwork.id !== artworkId));
  };

  const updateQuantity = (artworkId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(artworkId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.artwork.id === artworkId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    toggleCart,
    closeCart,
    openCart,
    totalItems,
    totalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
