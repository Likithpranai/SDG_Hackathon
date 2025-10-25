"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetStorage() {
  const router = useRouter();
  
  useEffect(() => {
    // Clear local storage
    localStorage.clear();
    
    // Redirect to home page
    router.push('/');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Clearing local storage...</p>
    </div>
  );
}
