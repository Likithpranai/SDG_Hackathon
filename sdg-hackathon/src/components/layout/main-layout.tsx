"use client";

import React from 'react';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { CartProvider } from '@/contexts/cart-context';
import { CartSidebar } from '@/components/cart';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <CartProvider>
      <div className="flex min-h-screen">
        <Navbar />
        <div className="flex flex-col flex-1 lg:ml-64 ml-0">
          <main className="grow">{children}</main>
          <Footer />
        </div>
        <CartSidebar />
      </div>
    </CartProvider>
  );
}
