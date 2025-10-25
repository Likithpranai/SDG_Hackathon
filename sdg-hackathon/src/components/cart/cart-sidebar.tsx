"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

export function CartSidebar() {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity,
    totalItems,
    totalPrice
  } = useCart();

  return (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300",
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />
      
      {/* Cart Sidebar */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-[#121225] shadow-xl z-50 transform transition-transform duration-300 ease-in-out",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Your Cart ({totalItems})
            </h2>
            <button 
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="grow overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Looks like you haven't added any artwork to your cart yet.
                </p>
                <Button onClick={closeCart}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li 
                    key={item.artwork.id} 
                    className="flex border-b border-gray-100 dark:border-gray-800 pb-4"
                  >
                    {/* Artwork Image */}
                    <div className="w-20 h-20 relative rounded-md overflow-hidden shrink-0">
                      <Image
                        src={item.artwork.images[0] || '/placeholder-image.jpg'}
                        alt={item.artwork.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Item Details */}
                    <div className="ml-4 grow">
                      <Link 
                        href={`/artwork/${item.artwork.id}`}
                        className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={closeCart}
                      >
                        {item.artwork.title}
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.artwork.price?.toLocaleString()} {item.artwork.currency || 'HKD'}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={() => updateQuantity(item.artwork.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.artwork.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        
                        <button 
                          onClick={() => removeFromCart(item.artwork.id)}
                          className="ml-auto p-1 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Footer with Total and Checkout */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal:</span>
                <span className="font-bold">{totalPrice.toLocaleString()} HKD</span>
              </div>
              <Button 
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                size="lg"
                onClick={() => {
                  console.log('Checkout button clicked');
                  console.log('Cart contents:', cart);
                  console.log('Cart length:', cart.length);
                  console.log('Total price:', totalPrice);
                  
                  // Close the cart sidebar
                  closeCart();
                  
                  // Navigate programmatically
                  window.location.href = '/checkout';
                }}
              >
                Proceed to Checkout
              </Button>
              <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
                Shipping and taxes calculated at checkout
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
