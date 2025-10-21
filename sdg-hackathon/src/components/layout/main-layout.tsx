import React from 'react';
import { Navbar } from './navbar';
import { Footer } from './footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex flex-col flex-1 lg:ml-64 ml-0">
        <main className="grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
