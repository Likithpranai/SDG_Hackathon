"use client";

import React from 'react';
import { useCart } from '@/contexts/cart-context';
import { mockArtworks } from '@/data/mock';
import Link from 'next/link';

export default function TestCartPage() {
  const { cart, addToCart, totalItems, totalPrice } = useCart();
  
  const handleAddToCart = () => {
    // Add the first mock artwork to the cart
    if (mockArtworks.length > 0) {
      addToCart(mockArtworks[0]);
      console.log('Added item to cart:', mockArtworks[0]);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Test Cart Functionality</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Cart Status</h2>
        <p>Items in cart: {totalItems}</p>
        <p>Total price: {totalPrice.toLocaleString()} HKD</p>
        <p>Cart contents: {cart.length > 0 ? 'Has items' : 'Empty'}</p>
        
        <pre className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded overflow-auto max-h-60">
          {JSON.stringify(cart, null, 2)}
        </pre>
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Test Item to Cart
        </button>
        
        <Link href="/checkout" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Go to Checkout
        </Link>
        
        <Link href="/marketplace" className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
          Go to Marketplace
        </Link>
      </div>
    </div>
  );
}
